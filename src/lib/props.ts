import type { SiteRuntimeConfig } from "@/lib/content";
import { uiText } from "@/lib/ui-defaults";

export type HeaderFooterProps = {
  runtime: SiteRuntimeConfig;
};

export type NewsSectionProps = {
  runtime: SiteRuntimeConfig;
  news: import("@/lib/types").NewsItem[];
};

export type EventsSectionProps = {
  runtime: SiteRuntimeConfig;
  activities: import("@/lib/types").ActivityItem[];
};

export type SponsorBannerProps = {
  runtime: SiteRuntimeConfig;
  sponsors: import("@/lib/types").SponsorItem[];
};

export type HomeSectionsProps = {
  runtime: SiteRuntimeConfig;
  quickLinks: import("@/lib/types").QuickLinkItem[];
};

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function textVars(runtime: SiteRuntimeConfig) {
  return {
    founded: runtime.founded,
    age_range: runtime.ui.age_range,
    site_name: runtime.ui.site_name,
    email: runtime.contact.email,
    team_count: runtime.teamCount,
  };
}

export function t(runtime: SiteRuntimeConfig, key: string) {
  return uiText(runtime.ui, key, textVars(runtime));
}
