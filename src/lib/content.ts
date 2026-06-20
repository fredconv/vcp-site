import { cache } from "react";
import { defaultContent } from "./defaults";
import {
  fetchAllSheetTabs,
  isPublished,
  parsePhoneHref,
  parseSponsorTier,
  parseTeamCategory,
  rowsToConfigMap,
  slugify,
} from "./sheets";
import type { SiteContent } from "./types";

function buildContentFromSheets(
  tabs: Record<string, Record<string, string>[]>
): SiteContent {
  const base = structuredClone(defaultContent);
  const configMap = rowsToConfigMap(tabs.config ?? []);

  if (configMap.founded) base.config.founded = Number(configMap.founded) || base.config.founded;
  if (configMap.description) base.config.description = configMap.description;
  if (configMap.email) base.config.contact.email = configMap.email;
  if (configMap.president_email) base.config.contact.presidentEmail = configMap.president_email;
  if (configMap.tresorier_email || configMap.treasurer_email) {
    base.config.contact.treasurerEmail =
      configMap.tresorier_email ?? configMap.treasurer_email ?? base.config.contact.treasurerEmail;
  }
  if (configMap.phone) {
    base.config.contact.phone = configMap.phone;
    base.config.contact.phoneHref = parsePhoneHref(configMap.phone);
  }
  if (configMap.address_name) base.config.contact.address.name = configMap.address_name;
  if (configMap.address_street) base.config.contact.address.street = configMap.address_street;
  if (configMap.address_city) base.config.contact.address.city = configMap.address_city;
  if (configMap.address_zip) base.config.contact.address.zip = configMap.address_zip;
  if (configMap.facebook) base.config.social.facebook = configMap.facebook;
  if (configMap.instagram) base.config.social.instagram = configMap.instagram;
  if (configMap.lien_inscription) base.config.links.inscription = configMap.lien_inscription;
  if (configMap.lien_boutique) base.config.links.boutique = configMap.lien_boutique;
  if (configMap.lien_journee_familles) {
    base.config.links.journeeFamilles = configMap.lien_journee_familles;
  }
  if (configMap.equipes_intro) base.teamsIntro = configMap.equipes_intro;

  const news = (tabs.actualites ?? [])
    .filter(isPublished)
    .map((row) => ({
      id: row.id || slugify(row.titre ?? "actualite"),
      title: row.titre ?? "",
      date: row.date ?? "",
      excerpt: row.extrait ?? row.description ?? "",
      category: row.categorie ?? row.category ?? "Club",
    }))
    .filter((item) => item.title);
  if (news.length) base.news = news;

  const events = (tabs.evenements ?? [])
    .filter(isPublished)
    .map((row) => ({
      id: row.id || slugify(row.titre ?? "evenement"),
      title: row.titre ?? "",
      date: row.date ?? "",
      description: row.description ?? row.extrait ?? "",
    }))
    .filter((item) => item.title);
  if (events.length) base.events = events;

  const femmes: SiteContent["teams"]["femmes"] = [];
  const mixtes: SiteContent["teams"]["mixtes"] = [];
  for (const row of (tabs.equipes ?? []).filter(isPublished)) {
    const category = parseTeamCategory(row.categorie ?? row.category ?? "");
    const team = {
      name: row.nom ?? row.name ?? "",
      division: row.division ?? "",
      coach: row.entraineur ?? row.coach ?? "À confirmer",
      training: row.horaire ?? row.entrainement ?? row.training ?? "À confirmer",
      description: row.description ?? "",
    };
    if (!team.name) continue;
    if (category === "femmes") femmes.push(team);
    else if (category === "mixtes") mixtes.push(team);
  }
  if (femmes.length) base.teams.femmes = femmes;
  if (mixtes.length) base.teams.mixtes = mixtes;

  const activities = (tabs.activites ?? [])
    .filter(isPublished)
    .map((row) => ({
      id: row.id || slugify(row.titre ?? "activite"),
      title: row.titre ?? "",
      date: row.date ?? "",
      time: row.horaire || row.heure || undefined,
      location: row.lieu ?? row.location ?? "",
      description: row.description ?? "",
      inscriptionUrl: row.lien_inscription || row.inscription_url || undefined,
    }))
    .filter((item) => item.title);
  if (activities.length) base.activities = activities;

  const sponsors = (tabs.sponsors ?? [])
    .filter(isPublished)
    .map((row) => ({
      name: row.nom ?? row.name ?? "",
      logoUrl: row.logo_url || row.logo || undefined,
      url: (row.lien ?? row.url) || undefined,
      tier: parseSponsorTier(row.niveau ?? row.tier ?? "silver"),
    }))
    .filter((item) => item.name);
  if (sponsors.length) base.sponsors = sponsors;

  const committee = (tabs.comite ?? [])
    .filter(isPublished)
    .map((row) => ({
      role: row.role ?? row.fonction ?? "",
      name: row.nom ?? row.name ?? "",
      email: row.email ?? "",
      phone: (row.telephone ?? row.phone) || undefined,
    }))
    .filter((item) => item.role && item.name);
  if (committee.length) base.committee = committee;

  const stats = (tabs.stats ?? [])
    .filter(isPublished)
    .map((row) => ({
      value: row.valeur ?? row.value ?? "",
      label: row.label ?? row.libelle ?? "",
    }))
    .filter((item) => item.value && item.label);
  if (stats.length) base.stats = stats;

  const pages = (tabs.pages ?? [])
    .filter(isPublished)
    .map((row) => ({
      slug: row.slug ?? slugify(row.titre ?? ""),
      title: row.titre ?? row.title ?? "",
      content: row.contenu ?? row.content ?? "",
    }))
    .filter((item) => item.slug && item.content);
  if (pages.length) base.pages = pages;

  return base;
}

export const getContent = cache(async (): Promise<SiteContent> => {
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();

  if (!sheetId) {
    return defaultContent;
  }

  try {
    const tabs = await fetchAllSheetTabs(sheetId);
    return buildContentFromSheets(tabs);
  } catch {
    return defaultContent;
  }
});

export function getPageContent(
  content: SiteContent,
  slug: string
): SiteContent["pages"][number] | undefined {
  return content.pages.find((page) => page.slug === slug);
}

export function toRuntimeConfig(content: SiteContent) {
  return {
    contact: content.config.contact,
    social: content.config.social,
    links: content.config.links,
    founded: content.config.founded,
    description: content.config.description,
  };
}
