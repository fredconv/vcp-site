type CsvRow = Record<string, string>;

const SHEET_TABS = [
  "config",
  "actualites",
  "evenements",
  "equipes",
  "activites",
  "sponsors",
  "comite",
  "stats",
  "pages",
] as const;

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values.map((v) => v.trim());
}

export function parseCsv(text: string): CsvRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: CsvRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });
    return row;
  });
}

export function isPublished(row: CsvRow): boolean {
  const value = (row.publie ?? row.published ?? "TRUE").toUpperCase();
  return value === "TRUE" || value === "1" || value === "OUI" || value === "YES";
}

function sheetUrl(sheetId: string, tab: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
}

export async function fetchSheetTab(
  sheetId: string,
  tab: string
): Promise<CsvRow[]> {
  const response = await fetch(sheetUrl(sheetId, tab), {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Sheet "${tab}" : HTTP ${response.status}`);
  }

  const text = await response.text();
  if (text.includes("<!DOCTYPE html") || text.includes("<html")) {
    throw new Error(`Sheet "${tab}" : accès refusé (vérifiez le partage)`);
  }

  return parseCsv(text);
}

export async function fetchAllSheetTabs(
  sheetId: string
): Promise<Record<string, CsvRow[]>> {
  const entries = await Promise.all(
    SHEET_TABS.map(async (tab) => {
      try {
        const rows = await fetchSheetTab(sheetId, tab);
        return [tab, rows] as const;
      } catch {
        return [tab, []] as const;
      }
    })
  );

  return Object.fromEntries(entries);
}

export function rowsToConfigMap(rows: CsvRow[]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const row of rows) {
    const key = (row.cle ?? row.key ?? "").trim().toLowerCase();
    const value = (row.valeur ?? row.value ?? "").trim();
    if (key) map[key] = value;
  }
  return map;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parsePhoneHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `tel:+32${digits.slice(1)}`;
  }
  return `tel:+${digits}`;
}

export function parseSponsorTier(
  value: string
): "gold" | "silver" | "bronze" {
  const tier = value.toLowerCase().trim();
  if (tier === "gold" || tier === "or") return "gold";
  if (tier === "bronze") return "bronze";
  return "silver";
}

export function parseTeamCategory(
  value: string
): "femmes" | "mixtes" | null {
  const cat = value.toLowerCase().trim();
  if (cat === "femmes" || cat === "femme" || cat === "dames") return "femmes";
  if (cat === "mixtes" || cat === "mixte" || cat === "loisirs" || cat === "hommes")
    return "mixtes";
  return null;
}
