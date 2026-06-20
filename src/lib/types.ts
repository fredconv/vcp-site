export type CommitteeMember = {
  role: string;
  name: string;
  email: string;
  phone?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

export type TeamCategory = "dames" | "messieurs" | "mixte";

export type TeamItem = {
  name: string;
  division: string;
  category: TeamCategory;
  coach: string;
  training: string;
  description: string;
};

export type ActivityItem = {
  id: string;
  /** Identifiant URL — doit correspondre au slug dans la Sheet 2 fiches */
  slug: string;
  title: string;
  /** ISO YYYY-MM-DD — pour le tri passé / à venir */
  dateStart: string;
  /** ISO YYYY-MM-DD — fin de plage (optionnel) */
  dateEnd?: string;
  /** Texte libre affiché à la place des dates (ex. « dernier week-end de septembre ») */
  dateDisplay?: string;
  /** Libellé date calculé ou issu du Sheet */
  date: string;
  time?: string;
  location: string;
  description: string;
  inscriptionUrl?: string;
  /** Fiche détaillée disponible dans la Sheet 2 */
  hasDetailPage?: boolean;
};

export type ActivityDetail = {
  slug: string;
  title: string;
  content: string;
  heroImage?: string;
};

export type SponsorItem = {
  name: string;
  logoUrl?: string;
  url?: string;
  tier: "gold" | "silver" | "bronze";
};

export type StatItem = {
  value: string;
  label: string;
};

export type PageBlock = {
  slug: string;
  title: string;
  content: string;
};

export type ValueItem = {
  title: string;
  text: string;
};

export type StepItem = {
  title: string;
  text: string;
};

export type QuickLinkItem = {
  order: string;
  label: string;
  description: string;
  href: string;
};

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
};

export type SiteContact = {
  email: string;
  presidentEmail: string;
  treasurerEmail: string;
  phone: string;
  phoneHref: string;
  address: {
    name: string;
    street: string;
    city: string;
    zip: string;
    region: string;
    country: string;
  };
};

export type SiteContent = {
  config: {
    founded: number;
    description: string;
    contact: SiteContact;
    social: {
      facebook: string;
      instagram: string;
    };
    links: {
      inscription: string;
      boutique: string;
      journeeFamilles: string;
    };
  };
  ui: Record<string, string>;
  nav: NavItem[];
  news: NewsItem[];
  teamsIntro: string;
  teams: {
    dames: TeamItem[];
    messieurs: TeamItem[];
    mixtes: TeamItem[];
  };
  activities: ActivityItem[];
  activityDetails: ActivityDetail[];
  sponsors: SponsorItem[];
  committee: CommitteeMember[];
  stats: StatItem[];
  pages: PageBlock[];
  values: ValueItem[];
  steps: StepItem[];
  quickLinks: QuickLinkItem[];
};
