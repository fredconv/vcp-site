import type { ActivityItem } from "./types";

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function startOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/** Parse une date saisie dans Google Sheets (ISO, JJ/MM/AAAA, etc.). */
export function parseSheetDate(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  const dmy = trimmed.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (dmy) {
    const day = Number(dmy[1]);
    const month = Number(dmy[2]);
    const year = Number(dmy[3]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${year}-${pad2(month)}-${pad2(day)}`;
    }
  }

  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    return toIsoDate(new Date(parsed));
  }

  return null;
}

function parseIsoToDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatFrenchDate(iso: string): string {
  return parseIsoToDate(iso).toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatFrenchDateRange(startIso: string, endIso: string): string {
  const start = parseIsoToDate(startIso);
  const end = parseIsoToDate(endIso);

  if (startIso === endIso) {
    return formatFrenchDate(startIso);
  }

  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return `${start.getDate()} & ${end.getDate()} ${end.toLocaleDateString("fr-BE", { month: "long", year: "numeric" })}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    const startPart = start.toLocaleDateString("fr-BE", {
      day: "numeric",
      month: "long",
    });
    const endPart = end.toLocaleDateString("fr-BE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return `${startPart} au ${endPart}`;
  }

  return `${formatFrenchDate(startIso)} au ${formatFrenchDate(endIso)}`;
}

export function formatActivityDate(activity: ActivityItem): string {
  if (activity.dateDisplay?.trim()) {
    return activity.dateDisplay.trim();
  }

  if (activity.dateStart && activity.dateEnd) {
    return formatFrenchDateRange(activity.dateStart, activity.dateEnd);
  }

  if (activity.dateStart) {
    return formatFrenchDate(activity.dateStart);
  }

  return activity.date;
}

function getActivityEndDate(activity: ActivityItem): Date | null {
  const iso = activity.dateEnd || activity.dateStart;
  if (!iso) return null;
  return parseIsoToDate(iso);
}

export function isActivityPast(
  activity: ActivityItem,
  today: Date = startOfToday()
): boolean {
  const endDate = getActivityEndDate(activity);
  if (!endDate) return false;
  return endDate < today;
}

export function splitActivities(activities: ActivityItem[]): {
  upcoming: ActivityItem[];
  past: ActivityItem[];
} {
  const upcoming: ActivityItem[] = [];
  const past: ActivityItem[] = [];

  for (const activity of activities) {
    if (isActivityPast(activity)) {
      past.push(activity);
    } else {
      upcoming.push(activity);
    }
  }

  const byStart = (a: ActivityItem, b: ActivityItem) =>
    (a.dateStart || "9999-99-99").localeCompare(b.dateStart || "9999-99-99");

  upcoming.sort(byStart);
  past.sort((a, b) => (b.dateStart || "").localeCompare(a.dateStart || ""));

  return { upcoming, past };
}

type ActivityRow = Record<string, string>;

export function mapActivityFromRow(
  row: ActivityRow,
  slugify: (value: string) => string
): ActivityItem | null {
  const title = row.titre ?? row.title ?? "";
  if (!title) return null;

  const dateStart =
    parseSheetDate(row.date_debut ?? row.date_start ?? "") ??
    parseSheetDate(row.date ?? "");
  const dateEnd = parseSheetDate(row.date_fin ?? row.date_end ?? "");
  const dateDisplay = (
    row.texte_date ??
    row.date_affichage ??
    row.date_display ??
    ""
  ).trim();

  const legacyDate = (row.date ?? "").trim();
  const display =
    dateDisplay ||
    (dateStart
      ? formatActivityDate({
          id: "",
          title,
          dateStart,
          dateEnd: dateEnd || undefined,
          date: legacyDate,
          location: "",
          description: "",
        })
      : legacyDate);

  return {
    id: row.id || slugify(title),
    title,
    dateStart: dateStart ?? "",
    dateEnd: dateEnd || undefined,
    dateDisplay: dateDisplay || undefined,
    date: display,
    time: row.horaire || row.heure || undefined,
    location: row.lieu ?? row.location ?? "",
    description: row.description ?? "",
    inscriptionUrl: row.lien_inscription || row.inscription_url || undefined,
  };
}
