import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { getContent, toRuntimeConfig } from "@/lib/content";
import type { TeamItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Équipes",
  description:
    "Découvrez les équipes du Volley Club Perwez : équipes dames, hommes et jeunes en championnat provincial.",
};

function TeamCard({ team }: { team: TeamItem }) {
  return (
    <article className="card-lift flex flex-col rounded-2xl border border-vcp-dark/5 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-extrabold uppercase text-vcp-dark">
          {team.name}
        </h3>
        <span className="shrink-0 rounded-full bg-vcp-red px-3 py-1 text-xs font-bold uppercase text-white">
          {team.division}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-vcp-dark/65">
        {team.description}
      </p>
      <dl className="mt-5 space-y-2 border-t border-vcp-dark/5 pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-vcp-dark/40">Entraîneur</dt>
          <dd className="font-semibold text-vcp-dark">{team.coach}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="font-medium text-vcp-dark/40">Entraînements</dt>
          <dd className="text-right font-bold text-vcp-blue">{team.training}</dd>
        </div>
      </dl>
    </article>
  );
}

function TeamSection({
  title,
  subtitle,
  teamList,
}: {
  title: string;
  subtitle: string;
  teamList: TeamItem[];
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamList.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
    </div>
  );
}

export default async function EquipesPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);

  return (
    <>
      <Hero
        runtime={runtime}
        title="Nos"
        highlight="équipes"
        subtitle="Équipes dames, hommes et jeunes — du loisir à la compétition provinciale."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6">
          <p className="max-w-3xl text-base leading-relaxed text-gray-600">
            {content.teamsIntro}
          </p>
          <TeamSection
            title="Équipes femmes"
            subtitle="Nos équipes dames évoluent en championnat provincial."
            teamList={content.teams.femmes}
          />
          <TeamSection
            title="Équipes mixtes & loisirs"
            subtitle="Formules loisir accessibles à tous."
            teamList={content.teams.mixtes}
          />
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
            Envie de rejoindre une équipe ?
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Les horaires et divisions peuvent évoluer chaque saison. Pour
            connaître les places disponibles, contactez le club ou remplissez le
            formulaire d&apos;inscription.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={runtime.links.inscription}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-vcp-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
            >
              S&apos;inscrire en ligne
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-vcp-blue px-6 py-3 text-sm font-semibold text-vcp-blue transition-colors hover:bg-vcp-blue hover:text-white"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
