import { cache } from "react";
import { defaultContent } from "./defaults";
import { NAV_ROUTES, buildUi } from "./ui-defaults";
import { mapActivityFromRow } from "./activity-dates";
import { resolveImageUrl } from "./image-url";
import {
  ACTIVITY_FICHES_TAB,
  fetchAllSheetTabs,
  fetchSheetTab,
  isPublished,
  parsePhoneHref,
  parseSponsorTier,
  parseTeamCategory,
  rowsToConfigMap,
  slugify,
} from "./sheets";
import type { ActivityDetail, NavItem, SiteContent } from "./types";

function parseMenuRows(rows: Record<string, string>[]): NavItem[] {
  return rows
    .filter(isPublished)
    .map((row) => {
      const href = (row.url ?? row.href ?? row.lien ?? "").trim();
      const label = (row.label ?? row.libelle ?? row.titre ?? "").trim();
      const externalFlag = (row.externe ?? row.external ?? "").toUpperCase();
      const external =
        externalFlag === "TRUE" ||
        externalFlag === "1" ||
        externalFlag === "OUI" ||
        externalFlag === "YES" ||
        /^https?:\/\//i.test(href);

      return {
        order: row.ordre ?? row.order ?? "",
        href,
        label,
        external,
      };
    })
    .filter((item) => item.href && item.label)
    .sort((a, b) =>
      a.order.localeCompare(b.order, undefined, { numeric: true })
    )
    .map(({ href, label, external }) => ({ href, label, external }));
}

function buildNav(
  menuRows: Record<string, string>[],
  ui: Record<string, string>,
  boutiqueHref: string
): NavItem[] {
  const fromSheet = parseMenuRows(menuRows);
  if (fromSheet.length) return fromSheet;

  return [
    ...NAV_ROUTES.map((item) => ({
      href: item.href,
      label: ui[item.key] ?? item.key,
      external: false,
    })),
    {
      href: boutiqueHref,
      label: ui.label_boutique ?? "Boutique",
      external: true,
    },
  ];
}

function parseActivityDetails(
  rows: Record<string, string>[]
): ActivityDetail[] {
  return rows
    .filter(isPublished)
    .map((row) => ({
      slug: (row.slug ?? slugify(row.titre ?? "")).trim().toLowerCase(),
      title: row.titre ?? row.title ?? "",
      content: row.contenu ?? row.content ?? "",
      heroImage:
        resolveImageUrl(
          row.hero_image ?? row.image_hero ?? row.image ?? ""
        ) ?? undefined,
    }))
    .filter((item) => item.slug && item.content);
}

function applyActivityDetails(
  content: SiteContent,
  details: ActivityDetail[]
): void {
  content.activityDetails = details;
  const detailSlugs = new Set(details.map((d) => d.slug));
  for (const activity of content.activities) {
    activity.hasDetailPage = detailSlugs.has(activity.slug);
  }
}

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

  base.ui = buildUi(configMap);
  base.nav = buildNav(
    tabs.menu ?? [],
    base.ui,
    base.config.links.boutique
  );

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

  const femmes: SiteContent["teams"]["femmes"] = [];
  const mixtes: SiteContent["teams"]["mixtes"] = [];
  for (const row of (tabs.equipes ?? []).filter(isPublished)) {
    const category = parseTeamCategory(row.categorie ?? row.category ?? "");
    const team = {
      name: row.nom ?? row.name ?? "",
      division: row.division ?? "",
      coach: row.entraineur ?? row.coach ?? base.ui.label_entraineur,
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
    .map((row) => mapActivityFromRow(row, slugify))
    .filter((item): item is NonNullable<typeof item> => item !== null);
  if (activities.length) base.activities = activities;

  const sponsors = (tabs.sponsors ?? [])
    .filter(isPublished)
    .map((row) => ({
      name: row.nom ?? row.name ?? "",
      logoUrl:
        resolveImageUrl(row.logo_url ?? row.logo ?? "") ?? undefined,
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

  const values = (tabs.valeurs ?? [])
    .filter(isPublished)
    .map((row) => ({
      title: row.titre ?? row.title ?? "",
      text: row.description ?? row.texte ?? row.contenu ?? "",
    }))
    .filter((item) => item.title && item.text);
  if (values.length) base.values = values;

  const steps = (tabs.etapes ?? [])
    .filter(isPublished)
    .map((row) => ({
      title: row.titre ?? row.title ?? "",
      text: row.description ?? row.texte ?? row.contenu ?? "",
    }))
    .filter((item) => item.title && item.text);
  if (steps.length) base.steps = steps;

  const quickLinks = (tabs.liens_rapides ?? [])
    .filter(isPublished)
    .map((row) => ({
      order: row.ordre ?? row.order ?? "",
      label: row.titre ?? row.label ?? row.nom ?? "",
      description: row.description ?? row.extrait ?? "",
      href: row.url ?? row.lien ?? row.href ?? "",
    }))
    .filter((item) => item.label && item.href);
  if (quickLinks.length) base.quickLinks = quickLinks;

  return base;
}

export const getContent = cache(async (): Promise<SiteContent> => {
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();

  if (!sheetId) {
    return defaultContent;
  }

  try {
    const tabs = await fetchAllSheetTabs(sheetId);
    const content = buildContentFromSheets(tabs);
    const configMap = rowsToConfigMap(tabs.config ?? []);
    const fichesSheetId = configMap.sheet_fiches_activites?.trim();

    if (fichesSheetId) {
      try {
        const fichesRows = await fetchSheetTab(
          fichesSheetId,
          ACTIVITY_FICHES_TAB
        );
        applyActivityDetails(content, parseActivityDetails(fichesRows));
      } catch {
        applyActivityDetails(content, []);
      }
    }

    return content;
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

export function getActivityBySlug(
  content: SiteContent,
  slug: string
): { activity: SiteContent["activities"][number]; detail: ActivityDetail } | undefined {
  const normalized = slug.trim().toLowerCase();
  const detail = content.activityDetails.find((d) => d.slug === normalized);
  const activity = content.activities.find((a) => a.slug === normalized);
  if (!detail || !activity) return undefined;
  return { activity, detail };
}

export function getActivitiesWithDetailPages(
  content: SiteContent
): SiteContent["activities"] {
  return content.activities.filter((a) => a.hasDetailPage);
}

export function toRuntimeConfig(content: SiteContent) {
  const teamCount =
    content.teams.femmes.length + content.teams.mixtes.length;

  return {
    contact: content.config.contact,
    social: content.config.social,
    links: content.config.links,
    founded: content.config.founded,
    description: content.config.description,
    ui: content.ui,
    nav: content.nav,
    teamCount,
  };
}

export type SiteRuntimeConfig = ReturnType<typeof toRuntimeConfig>;
