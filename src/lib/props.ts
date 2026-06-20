import type { SiteRuntimeConfig } from "@/lib/site";
import type { EventItem, NewsItem, SponsorItem } from "@/lib/types";

export type HeaderFooterProps = {
  runtime: SiteRuntimeConfig;
};

export type SectionsProps = {
  news: NewsItem[];
  events: EventItem[];
};

export type SponsorBannerProps = {
  sponsors: SponsorItem[];
};

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
