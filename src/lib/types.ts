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

export type EventItem = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export type TeamItem = {
  name: string;
  division: string;
  coach: string;
  training: string;
  description: string;
};

export type ActivityItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  inscriptionUrl?: string;
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
  events: EventItem[];
  teamsIntro: string;
  teams: {
    femmes: TeamItem[];
    mixtes: TeamItem[];
  };
  activities: ActivityItem[];
  sponsors: SponsorItem[];
  committee: CommitteeMember[];
  stats: StatItem[];
  pages: PageBlock[];
  values: ValueItem[];
  steps: StepItem[];
  quickLinks: QuickLinkItem[];
};
