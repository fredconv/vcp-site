import { formatText } from "./format-text";

export const defaultUi: Record<string, string> = {
  site_name: "Volley Club Perwez",
  site_short_name: "VCP",
  meta_title_suffix: "Volley à Perwez",
  age_range: "7 à 77 ans",
  saison_courante: "Saison 2025-2026",
  hero_eyebrow: "Brabant wallon · Depuis {founded}",
  hero_ligne1: "Volley",
  hero_ligne2: "Club",
  hero_highlight: "Perwez",
  footer_blurb:
    "Club de volley à Perwez depuis {founded}. Dynamique, familial et ambitieux — de {age_range}.",
  footer_rejoindre_texte:
    "Envie de jouer ? Inscrivez-vous en ligne ou contactez le club.",
  footer_copyright: "Tous droits réservés.",
  cta_rejoindre: "Rejoindre le club",
  cta_rejoindre_short: "Rejoindre",
  cta_decouvrir: "Découvrir",
  cta_inscrire: "S'inscrire",
  cta_inscrire_ligne: "S'inscrire en ligne",
  cta_contact: "Nous contacter",
  cta_formulaire: "Formulaire d'inscription",
  cta_formulaire_long: "Accéder au formulaire Google Forms",
  cta_sponsor: "Devenir sponsor",
  cta_equipes: "Découvrir nos équipes",
  cta_en_savoir_plus: "En savoir plus",
  cta_page_inscriptions: "Page inscriptions",
  cta_renseignements: "Demande de renseignements",
  cta_explorer: "Explorer →",
  label_boutique: "Boutique",
  nav_accueil: "Accueil",
  nav_club: "Le Club",
  nav_equipes: "Équipes",
  nav_activites: "Activités",
  nav_inscriptions: "Inscriptions",
  nav_contact: "Contact",
  home_about_eyebrow: "Depuis {founded}",
  home_about_titre: "Plus qu'un club,",
  home_about_highlight: "une famille",
  home_quick_eyebrow: "Navigation",
  home_quick_titre: "Besoin d'",
  home_quick_highlight: "informations ?",
  home_news_eyebrow: "L'actu, en bref",
  home_news_titre: "Dernières",
  home_news_highlight: "actualités",
  home_events_eyebrow: "Réservez vos dates",
  home_events_titre: "Prochains",
  home_events_highlight: "événements",
  home_sponsors_eyebrow: "Partenaires",
  home_sponsors_titre: "Ils nous",
  home_sponsors_highlight: "soutiennent",
  home_sponsors_texte: "Vous souhaitez soutenir le club ?",
  home_cta_titre1: "Envie de jouer",
  home_cta_titre2: "au volley ?",
  home_cta_texte:
    "Rejoignez le {site_name} — de {age_range}, tous les niveaux bienvenus.",
  texte_contact_footer: "Pour plus de renseignements,",
  cta_contactez_nous: "contactez-nous",
  label_entraineur: "Entraîneur",
  label_categorie: "Catégorie",
  team_categorie_dames: "Dames",
  team_categorie_messieurs: "Messieurs",
  team_categorie_mixte: "Mixte",
  label_entrainements: "Entraînements",
  label_horaire: "Horaire :",
  label_age: "Âge :",
  label_lieu: "Lieu :",
  label_contact: "Contact :",
  label_telephone: "Téléphone :",
  label_email_general: "Email général",
  label_president: "Président",
  label_tresorier: "Trésorier",
  label_salle: "Salle d'entraînement",
  label_suivez_nous: "Suivez-nous",
  label_facebook: "Facebook",
  label_instagram: "Instagram",
  form_success_titre: "Merci !",
  form_success_texte:
    "Votre client mail devrait s'ouvrir. Sinon, écrivez à {email}",
  form_nouveau_message: "Nouveau message",
  form_label_nom: "Nom complet",
  form_label_email: "Email",
  form_label_sujet: "Sujet",
  form_label_message: "Message",
  form_placeholder_nom: "Votre nom",
  form_placeholder_email: "votre@email.com",
  form_placeholder_sujet: "Inscription, sponsor...",
  form_placeholder_message: "Votre message...",
  form_submit: "Envoyer",
  club_meta_description:
    "Découvrez le Volley Club Perwez : notre histoire depuis 1962, nos valeurs et notre comité.",
  club_hero_titre: "Le",
  club_hero_highlight: "Club",
  club_hero_sous_titre:
    "Fondé en {founded}, le VCP est un club de volley dynamique, familial et ambitieux à Perwez.",
  club_section_histoire_titre: "Plus de 60 ans de volley à Perwez",
  club_valeurs_eyebrow: "Nos valeurs",
  club_valeurs_titre: "Esprit d'équipe & plaisir du jeu",
  club_comite_titre: "Membres du comité",
  club_galerie_titre: "Galerie photos",
  club_galerie_texte:
    "Les photos du club seront bientôt disponibles ici. En attendant, suivez-nous sur nos réseaux sociaux.",
  equipes_meta_description:
    "Découvrez les équipes du Volley Club Perwez : équipes dames, hommes et jeunes en championnat provincial.",
  equipes_hero_titre: "Nos",
  equipes_hero_highlight: "équipes",
  equipes_hero_sous_titre:
    "Équipes dames, hommes et jeunes — du loisir à la compétition provinciale.",
  equipes_section_femmes_titre: "Équipes dames",
  equipes_section_femmes_sous_titre:
    "Nos équipes dames évoluent en championnat provincial.",
  equipes_section_messieurs_titre: "Équipes messieurs",
  equipes_section_messieurs_sous_titre:
    "Section masculine — jeunes et compétition selon les effectifs.",
  equipes_section_mixtes_titre: "Équipes mixtes & loisirs",
  equipes_section_mixtes_sous_titre: "Formules loisir accessibles à tous.",
  equipes_cta_titre: "Envie de rejoindre une équipe ?",
  equipes_cta_texte:
    "Les horaires et divisions peuvent évoluer chaque saison. Pour connaître les places disponibles, contactez le club ou remplissez le formulaire d'inscription.",
  activites_meta_description:
    "Activités du Volley Club Perwez : journée des familles, beach-volley, stages ADEPS et événements tout au long de la saison.",
  activites_hero_titre: "Activités",
  activites_hero_highlight: "du club",
  activites_hero_sous_titre:
    "Soupers, beach-volley, stages… Plein d'activités tout au long de la saison !",
  activites_section_titre: "Prochains événements",
  activites_section_a_venir: "Événements à venir",
  activites_section_termines: "Événements terminés",
  activites_aucun_a_venir: "Aucun événement à venir pour le moment. Revenez bientôt !",
  activites_lieu_titre: "Lieu d'entraînement",
  cta_voir_evenement: "Voir l'événement",
  activites_retour: "← Retour aux activités",
  inscriptions_meta_description:
    "Rejoignez le Volley Club Perwez : informations pratiques et formulaire d'inscription en ligne.",
  inscriptions_hero_titre: "Rejoindre",
  inscriptions_hero_highlight: "le club",
  inscriptions_hero_sous_titre:
    "De {age_range}, tous les niveaux bienvenus — inscription simple en ligne.",
  inscriptions_titre: "Comment rejoindre le club ?",
  inscriptions_intro:
    "Le Volley Club Perwez accueille de nouveaux joueurs et joueuses chaque saison. Que vous soyez débutant ou confirmé, il y a une place pour vous parmi nos {team_count} équipes.",
  inscriptions_pratique_titre: "Informations pratiques",
  inscriptions_questions: "Vous avez des questions avant de vous inscrire ?",
  contact_meta_description:
    "Contactez le Volley Club Perwez : coordonnées, formulaire, adresse de la salle et réseaux sociaux.",
  contact_hero_titre: "Nous",
  contact_hero_highlight: "contacter",
  contact_hero_sous_titre:
    "Une question, une inscription ou une proposition de sponsoring ? Écrivez-nous.",
  contact_coord_titre: "Coordonnées",
  contact_coord_texte:
    "Pour nous contacter, remplissez le formulaire ci-contre ou envoyez-nous un email à {email}.",
  contact_form_titre: "Formulaire de contact",
  contact_form_texte:
    "Remplissez ce formulaire et votre client mail s'ouvrira avec le message pré-rempli.",
  contact_inscriptions_titre: "Inscriptions",
  contact_inscriptions_texte:
    "Pour rejoindre le club, consultez notre page dédiée avec le formulaire en ligne et les étapes à suivre.",
};

export const NAV_ROUTES = [
  { href: "/", key: "nav_accueil" },
  { href: "/club", key: "nav_club" },
  { href: "/equipes", key: "nav_equipes" },
  { href: "/activites", key: "nav_activites" },
  { href: "/inscriptions", key: "nav_inscriptions" },
  { href: "/contact", key: "nav_contact" },
] as const;

export function buildUi(configMap: Record<string, string>): Record<string, string> {
  const ui = { ...defaultUi };
  for (const [key, value] of Object.entries(configMap)) {
    if (value.trim()) ui[key] = value.trim();
  }
  return ui;
}

export function uiText(
  ui: Record<string, string>,
  key: string,
  vars: Record<string, string | number> = {}
): string {
  return formatText(ui[key] ?? defaultUi[key] ?? key, {
    site_name: ui.site_name,
    age_range: ui.age_range,
    ...vars,
  });
}
