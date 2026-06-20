import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { getContent, toRuntimeConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Inscriptions",
  description:
    "Rejoignez le Volley Club Perwez : informations pratiques et formulaire d'inscription en ligne.",
};

const steps = [
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
] as const;

export default async function InscriptionsPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const { contact, links } = runtime;

  return (
    <>
      <Hero
        runtime={runtime}
        title="Rejoindre"
        highlight="le club"
        subtitle="De 7 à 77 ans, tous les niveaux bienvenus — inscription simple en ligne."
        cta={{
          label: "Formulaire d'inscription",
          href: links.inscription,
          external: true,
        }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
                Comment rejoindre le club ?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Le Volley Club Perwez accueille de nouveaux joueurs et joueuses
                chaque saison. Que vous soyez débutant ou confirmé, il y a une
                place pour vous parmi nos {content.teams.femmes.length + content.teams.mixtes.length} équipes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {content.teamsIntro}
              </p>

              <div className="mt-8 space-y-6">
                {steps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vcp-red text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-vcp-red">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-vcp-red">
                Informations pratiques
              </h2>
              <ul className="mt-6 space-y-4 text-sm text-gray-600">
                <li>
                  <strong className="text-vcp-red">Âge :</strong> de 7 à 77 ans
                </li>
                <li>
                  <strong className="text-vcp-red">Lieu :</strong>{" "}
                  {contact.address.name}, {contact.address.street},{" "}
                  {contact.address.zip} {contact.address.city}
                </li>
                <li>
                  <strong className="text-vcp-red">Contact :</strong>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-vcp-red hover:underline"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <strong className="text-vcp-red">Téléphone :</strong>{" "}
                  <a
                    href={contact.phoneHref}
                    className="text-vcp-red hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              </ul>

              <Link
                href={links.inscription}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center rounded-full bg-vcp-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
              >
                Accéder au formulaire Google Forms
              </Link>

              <p className="mt-4 text-center text-xs text-gray-400">
                Vous avez des questions avant de vous inscrire ?{" "}
                <Link href="/contact" className="text-vcp-red hover:underline">
                  Demande de renseignements
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
