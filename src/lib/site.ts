import { defaultContent } from "./defaults";

export const siteConfig = {
  name: defaultContent.ui.site_name,
  shortName: defaultContent.ui.site_short_name,
  url: "https://www.volleyclubperwez.be",
  locale: "fr-BE",
  colors: {
    primary: "#D51900",
    secondary: "#333370",
  },
} as const;

export type { SiteRuntimeConfig } from "./content";

export type SiteLinks = {
  inscription: string;
  boutique: string;
  journeeFamilles: string;
};
