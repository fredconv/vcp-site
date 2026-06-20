import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { getContent, getPageContent, toRuntimeConfig } from "@/lib/content";
import { pageHeroImage } from "@/lib/image-url";
import { splitParagraphs, t } from "@/lib/props";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.ui.nav_club,
    description: t(toRuntimeConfig(content), "club_meta_description"),
  };
}

export default async function ClubPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const clubPage = getPageContent(content, "club");
  const paragraphs = splitParagraphs(clubPage?.content ?? "");

  return (
    <>
      <Hero
        runtime={runtime}
        title={t(runtime, "club_hero_titre")}
        highlight={t(runtime, "club_hero_highlight")}
        subtitle={t(runtime, "club_hero_sous_titre")}
        imageUrl={pageHeroImage(runtime.ui, "club")}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-vcp-blue">
                {clubPage?.title ?? t(runtime, "nav_club")}
              </p>
              <h2 className="font-display mt-1 text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
                {t(runtime, "club_section_histoire_titre")}
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt={`Logo ${runtime.ui.site_name}`}
                width={400}
                height={400}
                className="max-w-sm drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-vcp-blue">
            {t(runtime, "club_valeurs_eyebrow")}
          </p>
          <h2 className="font-display mt-1 text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
            {t(runtime, "club_valeurs_titre")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {content.values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-bold uppercase text-vcp-red">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-vcp-blue">
            {t(runtime, "saison_courante")}
          </p>
          <h2 className="font-display mt-1 text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
            {t(runtime, "club_comite_titre")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {content.committee.map((member) => (
              <div
                key={member.role}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-vcp-blue">
                  {member.role}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-vcp-red">
                  {member.name}
                </h3>
                <ul className="mt-4 space-y-1 text-sm text-gray-600">
                  <li>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-vcp-blue hover:text-vcp-red hover:underline"
                    >
                      {member.email}
                    </a>
                  </li>
                  {member.phone && (
                    <li>
                      <a
                        href={runtime.contact.phoneHref}
                        className="hover:text-vcp-red hover:underline"
                      >
                        {member.phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vcp-red py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
            {t(runtime, "club_galerie_titre")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            {t(runtime, "club_galerie_texte")}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={runtime.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-vcp-blue"
            >
              {t(runtime, "label_facebook")}
            </a>
            <a
              href={runtime.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-vcp-blue"
            >
              {t(runtime, "label_instagram")}
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-square rounded-xl border border-dashed border-white/20 bg-white/5"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Link
            href="/equipes"
            className="inline-flex rounded-full bg-vcp-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
          >
            {t(runtime, "cta_equipes")}
          </Link>
        </div>
      </section>
    </>
  );
}
