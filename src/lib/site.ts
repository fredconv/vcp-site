export const siteConfig = {
  name: "Volley Club Perwez",
  shortName: "VCP",
  description:
    "Club de volley à Perwez, Brabant wallon. Volleyball pour tous de 7 à 77 ans — dynamique, familial et ambitieux.",
  founded: 1962,
  url: "https://www.volleyclubperwez.be",
  locale: "fr-BE",
  colors: {
    primary: "#D51900",
    secondary: "#333370",
  },
  contact: {
    email: "info@volleyclubperwez.be",
    presidentEmail: "volleyclubperwez@gmail.com",
    treasurerEmail: "tresorier@volleyclubperwez.be",
    phone: "0475 35 47 26",
    phoneHref: "tel:+32475354726",
    address: {
      name: "Salle communale de Perwez",
      street: "Rue de la Station",
      city: "Perwez",
      zip: "1360",
      region: "Brabant wallon",
      country: "Belgique",
    },
  },
  social: {
    facebook: "https://www.facebook.com/VCPerwez",
    instagram: "https://www.instagram.com/volley_club_perwez/",
  },
  links: {
    inscription: "https://forms.gle/wqnAdXCRZSxbozqM8",
    boutique: "https://www.volleyclubperwez.be/boutique/fr/",
  },
  committee: [
    {
      role: "Président",
      name: "Christophe Becquevort",
      email: "volleyclubperwez@gmail.com",
      phone: "0475 35 47 26",
    },
    {
      role: "Secrétaire",
      name: "Frédéric Convert",
      email: "info@volleyclubperwez.be",
    },
    {
      role: "Trésorier",
      name: "Vincent Petron",
      email: "tresorier@volleyclubperwez.be",
    },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/club", label: "Le Club" },
  { href: "/equipes", label: "Équipes" },
  { href: "/contact", label: "Contact" },
] as const;

export const externalLinks = [
  { href: siteConfig.links.inscription, label: "Inscriptions", external: true },
  { href: siteConfig.links.boutique, label: "Boutique", external: true },
] as const;

export const events = [
  {
    id: "familles-2026",
    title: "Journée des familles",
    date: "17 mai 2026",
    description:
      "Une journée conviviale pour découvrir le club, rencontrer les équipes et partager un moment en famille.",
  },
  {
    id: "beach-2026",
    title: "Week-end beach-volley",
    date: "25 & 26 juillet 2026",
    description:
      "Le traditionnel week-end beach-volley du VCP — soleil, sable et bonne humeur garantis !",
  },
  {
    id: "adeps-2026",
    title: "Week-end volley ADEPS Loverval",
    date: "4 au 6 septembre 2026",
    description:
      "Stage et week-end volley au centre ADEPS de Loverval. Réservez vos dates !",
  },
] as const;

export const news = [
  {
    id: "saison-2025",
    title: "Bienvenue à la saison 2025-2026",
    date: "Septembre 2025",
    excerpt:
      "Les entraînements ont repris ! Retrouvez vos équipes et découvrez les nouveaux créneaux sur la page Équipes.",
    category: "Club",
  },
  {
    id: "inscriptions-ouvertes",
    title: "Inscriptions ouvertes",
    date: "Août 2025",
    excerpt:
      "Vous souhaitez rejoindre le VCP ? Le formulaire d'inscription en ligne est disponible — de 7 à 77 ans, tous les niveaux.",
    category: "Inscriptions",
  },
  {
    id: "evenements-2026",
    title: "Dates à retenir en 2026",
    date: "Juin 2025",
    excerpt:
      "Journée des familles, beach-volley et week-end ADEPS : trois temps forts à ne pas manquer cette année.",
    category: "Événements",
  },
] as const;

export const teams = {
  femmes: [
    {
      name: "P2 Dames",
      division: "Provinciale 2",
      coach: "À confirmer",
      training: "Mardi & jeudi — 20h00",
      description:
        "Équipe compétitive en province, avec un esprit d'équipe fort et des ambitions pour la saison.",
    },
    {
      name: "P3 Dames",
      division: "Provinciale 3",
      coach: "À confirmer",
      training: "Lundi & mercredi — 19h30",
      description:
        "Équipe dynamique qui allie plaisir du jeu et progression technique tout au long de la saison.",
    },
    {
      name: "P4 Dames",
      division: "Provinciale 4",
      coach: "À confirmer",
      training: "Mercredi — 20h00",
      description:
        "Parfaite pour celles qui veulent jouer en compétition dans une ambiance conviviale.",
    },
  ],
  mixtes: [
    {
      name: "P2 Hommes",
      division: "Provinciale 2",
      coach: "À confirmer",
      training: "Mardi & vendredi — 20h00",
      description:
        "Équipe masculine de haut niveau provincial, engagée et motivée pour chaque match.",
    },
    {
      name: "P3 Hommes",
      division: "Provinciale 3",
      coach: "À confirmer",
      training: "Lundi & jeudi — 20h00",
      description:
        "Un collectif soudé qui progresse saison après saison en championnat provincial.",
    },
    {
      name: "Jeunes",
      division: "École de volley",
      coach: "À confirmer",
      training: "Samedi — 10h00",
      description:
        "Initiation et perfectionnement pour les jeunes de 7 à 16 ans. Le volley, c'est pour tous !",
    },
  ],
} as const;

export const sponsors = [
  { name: "Sponsor 1", tier: "gold" as const },
  { name: "Sponsor 2", tier: "silver" as const },
  { name: "Sponsor 3", tier: "silver" as const },
  { name: "Sponsor 4", tier: "bronze" as const },
] as const;
