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
  "valeurs",
  "etapes",
  "liens_rapides",
  "menu",
] as const;

function parseCsvRecords(text: string): string[][] {
  const records: string[][] = [];
  let currentField = "";
  let currentRecord: string[] = [];
  let inQuotes = false;
  const input = text.trim();

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '"') {
      if (inQuotes && input[i + 1] === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      currentRecord.push(currentField.trim());
      currentField = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && input[i + 1] === "\n") i++;
      currentRecord.push(currentField.trim());
      if (currentRecord.some((field) => field.length > 0)) {
        records.push(currentRecord);
      }
      currentRecord = [];
      currentField = "";
      continue;
    }

    currentField += char;
  }

  if (currentField.length > 0 || currentRecord.length > 0) {
    currentRecord.push(currentField.trim());
    if (currentRecord.some((field) => field.length > 0)) {
      records.push(currentRecord);
    }
  }

  return records;
}

export function parseCsv(text: string): CsvRow[] {
  const records = parseCsvRecords(text);
  if (records.length < 2) return [];

  const headers = records[0].map((header) => header.toLowerCase().trim());
  return records.slice(1).map((values) => {
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

export const ACTIVITY_FICHES_TAB = "fiches" as const;

function sheetUrl(sheetId: string, tab: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
}

export async function fetchSheetTab(
  sheetId: string,
  tab: string
): Promise<CsvRow[]> {
  const response = await fetch(sheetUrl(sheetId, tab), {
    cache: "no-store",
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
