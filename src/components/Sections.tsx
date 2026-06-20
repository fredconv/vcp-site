import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import type { SectionsProps } from "@/lib/props";

export function NewsSection({ news }: Pick<SectionsProps, "news">) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="L'actu, en bref"
          title="Dernières"
          highlight="actualités"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, i) => (
            <article
              key={item.id}
              data-num={String(i + 1).padStart(2, "0")}
              className="card-watermark card-lift group flex flex-col rounded-2xl border border-vcp-dark/5 bg-white p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-vcp-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {item.category}
                </span>
                <time className="text-xs font-medium text-vcp-dark/40">
                  {item.date}
                </time>
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold uppercase leading-tight text-vcp-dark group-hover:text-vcp-red">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-vcp-dark/65">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection({ events }: Pick<SectionsProps, "events">) {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="absolute left-0 top-0 h-2 w-full bg-vcp-red" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Réservez vos dates"
          title="Prochains"
          highlight="événements"
        />

        <div className="mt-10 space-y-4">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="card-lift flex flex-col gap-4 rounded-2xl border-l-4 border-vcp-red bg-vcp-cream p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-4">
                <span className="font-display text-4xl font-extrabold text-vcp-red/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold uppercase text-vcp-dark">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-vcp-dark/65">
                    {event.description}
                  </p>
                </div>
              </div>
              <time className="shrink-0 rounded-full bg-vcp-red px-5 py-2 text-sm font-bold uppercase tracking-wide text-white">
                {event.date}
              </time>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-vcp-dark/50">
          Pour plus de renseignements,{" "}
          <Link
            href="/contact"
            className="font-bold text-vcp-red hover:underline"
          >
            contactez-nous
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
