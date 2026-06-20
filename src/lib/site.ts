import { defaultContent } from "./defaults";

export const siteConfig = {
  name: "Volley Club Perwez",
  shortName: "VCP",
  url: "https://www.volleyclubperwez.be",
  locale: "fr-BE",
  colors: {
    primary: "#D51900",
    secondary: "#333370",
  },
  get founded() {
    return defaultContent.config.founded;
  },
  get description() {
    return defaultContent.config.description;
  },
} as const;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/club", label: "Le Club" },
  { href: "/equipes", label: "Équipes" },
  { href: "/activites", label: "Activités" },
  { href: "/inscriptions", label: "Inscriptions" },
  { href: "/contact", label: "Contact" },
] as const;

export type SiteLinks = {
  inscription: string;
  boutique: string;
  journeeFamilles: string;
};

export type SiteRuntimeConfig = {
  contact: (typeof defaultContent.config.contact);
  social: (typeof defaultContent.config.social);
  links: SiteLinks;
  founded: number;
};
