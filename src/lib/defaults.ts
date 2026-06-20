import type { SiteContent } from "./types";
import { NAV_ROUTES, buildUi, defaultUi } from "./ui-defaults";

const ui = buildUi({});

export const defaultContent: SiteContent = {
  config: {
    founded: 1962,
    description:
      "Club de volley à Perwez, Brabant wallon. Volleyball pour tous de 7 à 77 ans — dynamique, familial et ambitieux.",
    contact: {
      email: "info@volleyclubperwez.be",
      presidentEmail: "volleyclubperwez@gmail.com",
      treasurerEmail: "tresorier@volleyclubperwez.be",
      phone: "0475 35 47 26",
      phoneHref: "tel:+32475354726",
      address: {
        name: "Centre Sportif de Perwez",
        street: "Rue des Marronniers, 17",
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
      journeeFamilles:
        "https://spond.com/client/sponds/ACFC1E6567694D898E986A372CF705BC",
    },
  },
  ui,
  nav: [
    ...NAV_ROUTES.map((item) => ({
      href: item.href,
      label: ui[item.key] ?? defaultUi[item.key] ?? item.key,
      external: false,
    })),
    {
      href: "https://www.volleyclubperwez.be/boutique/fr/",
      label: ui.label_boutique ?? defaultUi.label_boutique,
      external: true,
    },
  ],
  news: [
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
  ],
  teamsIntro:
    "Le Volley Club Perwez s'agrandit de saisons en saisons. Des nouvelles têtes arrivent, des plus anciennes reviennent. Nous sommes désormais un club gros de 11 équipes ! Nous aimerions redémarrer une section masculine — au moins en jeunes, voire en P4H selon les demandes. Nous recherchons également des personnes pour encadrer les équipes (entraîneur, arbitre, animateur).",
  teams: {
    dames: [
      { name: "U11", division: "Jeunes", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Initiation au volley pour les plus jeunes." },
      { name: "U13", division: "Jeunes", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Progression technique et esprit d'équipe." },
      { name: "U15", division: "Jeunes", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Préparation aux compétitions jeunes." },
      { name: "U17", division: "Jeunes", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Équipe jeunes en développement." },
      { name: "U19", division: "Jeunes", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Dernière étape avant le volley senior." },
      { name: "Provinciale 4 Jeunes", division: "P4 Jeunes", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Première expérience en compétition provinciale." },
      { name: "Provinciale 4", division: "P4", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Compétition provinciale dans une ambiance conviviale." },
      { name: "Provinciale 3", division: "P3", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Équipe ambitieuse en championnat provincial." },
      { name: "Provinciale 2", division: "P2", category: "dames", coach: "À confirmer", training: "À confirmer", description: "Haut niveau provincial, esprit d'équipe fort." },
    ],
    messieurs: [],
    mixtes: [
      { name: "Loisirs 3", division: "Loisir", category: "mixte", coach: "À confirmer", training: "À confirmer", description: "Volley loisir accessible à tous les niveaux." },
      { name: "Loisirs 5", division: "Loisir", category: "mixte", coach: "À confirmer", training: "À confirmer", description: "Formule loisir conviviale, l'esprit du jeu avant tout." },
    ],
  },
  activities: [
    {
      id: "familles-2026",
      slug: "journee-familles",
      title: "Journée des familles",
      dateStart: "2026-05-17",
      date: "17 mai 2026",
      time: "À partir de 10h00",
      location: "Centre Sportif de Perwez — Rue des Marronniers, 17, 1360 Perwez",
      description: "Une journée conviviale ouverte aux familles du club et aux nouveaux curieux.",
      inscriptionUrl:
        "https://spond.com/client/sponds/ACFC1E6567694D898E986A372CF705BC",
      hasDetailPage: true,
    },
    {
      id: "beach-2026",
      slug: "beach-volley",
      title: "Tournoi de Beach-Volley du VCP",
      dateStart: "2026-07-25",
      dateEnd: "2026-07-26",
      date: "25 & 26 juillet 2026",
      location: "À confirmer",
      description: "Le traditionnel week-end beach-volley — soleil, sable et bonne humeur !",
    },
    {
      id: "adeps-2026",
      slug: "week-end-adeps",
      title: "Week-end ADEPS",
      dateStart: "2026-09-04",
      dateEnd: "2026-09-06",
      dateDisplay: "Premier week-end de septembre 2026",
      date: "Premier week-end de septembre 2026",
      location: "Centre ADEPS de Loverval",
      description: "Ouvert à tous les joueurs du club à partir de la U15. Réservez déjà vos dates !",
    },
  ],
  activityDetails: [
    {
      slug: "journee-familles",
      title: "Journée des familles",
      content:
        "Une journée conviviale ouverte à toutes les familles du club et aux nouveaux curieux.\n\nAu programme : découverte du volley, rencontres avec les équipes, animations pour les enfants et moment de partage autour d'un verre.\n\nRendez-vous au Centre Sportif de Perwez — inscription recommandée via le lien Spond.",
    },
  ],
  sponsors: [
    { name: "Sponsor 1", tier: "gold" },
    { name: "Sponsor 2", tier: "silver" },
    { name: "Sponsor 3", tier: "silver" },
    { name: "Sponsor 4", tier: "bronze" },
  ],
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
  stats: [
    { value: "1962", label: "Fondé en" },
    { value: "11", label: "Équipes" },
    { value: "7–77", label: "Ans" },
    { value: "60+", label: "Ans d'histoire" },
  ],
  pages: [
    {
      slug: "club",
      title: "Qui sommes-nous",
      content:
        "Le Volley Club Perwez a été créé en 1962. Depuis plus de 60 ans, notre association fait vivre le volleyball dans la région de Perwez, en Brabant wallon.\n\nNotre club vous propose la pratique du volleyball pour tous de 7 à 77 ans. Les possibilités d'évolution et les diverses formules d'entraînements en font un club dynamique, familial et ambitieux.\n\nQue vous soyez débutant, joueur confirmé, parent à la recherche d'une activité pour votre enfant ou sponsor potentiel — vous êtes les bienvenus au VCP.",
    },
  ],
  values: [
    {
      title: "Dynamique",
      text: "Des entraînements variés, des matchs engagés et une vie de club riche en événements.",
    },
    {
      title: "Familial",
      text: "Un accueil chaleureux pour tous les âges, des jeunes aux vétérans, joueurs et supporters.",
    },
    {
      title: "Ambitieux",
      text: "La progression de chaque joueur et le rayonnement du club au niveau provincial.",
    },
  ],
  steps: [
    {
      title: "Remplir le formulaire",
      text: "Complétez le formulaire d'inscription en ligne avec vos coordonnées et vos préférences.",
    },
    {
      title: "Confirmation du club",
      text: "Le comité vous recontacte pour confirmer votre place et vous orienter vers la bonne équipe.",
    },
    {
      title: "Premier entraînement",
      text: "Rendez-vous au Centre Sportif de Perwez pour votre premier entraînement — bienvenue au VCP !",
    },
  ],
  quickLinks: [
    {
      order: "01",
      label: "Équipes",
      description: "11 équipes — jeunes, provinciales et loisirs",
      href: "/equipes",
    },
    {
      order: "02",
      label: "Activités",
      description: "Familles, beach-volley, stages ADEPS",
      href: "/activites",
    },
    {
      order: "03",
      label: "Le Club",
      description: "Histoire, valeurs et comité depuis 1962",
      href: "/club",
    },
    {
      order: "04",
      label: "Inscriptions",
      description: "Rejoignez le VCP en quelques clics",
      href: "/inscriptions",
    },
  ],
};
