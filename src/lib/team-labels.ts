import type { SiteRuntimeConfig } from "@/lib/content";
import { t } from "@/lib/props";
import type { TeamCategory } from "@/lib/types";

const CATEGORY_LABEL_KEYS: Record<TeamCategory, string> = {
  dames: "team_categorie_dames",
  messieurs: "team_categorie_messieurs",
  mixte: "team_categorie_mixte",
};

export function teamCategoryLabel(
  runtime: SiteRuntimeConfig,
  category: TeamCategory
): string {
  return t(runtime, CATEGORY_LABEL_KEYS[category]);
}
