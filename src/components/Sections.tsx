import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import type { EventsSectionProps, NewsSectionProps } from "@/lib/props";
import { t } from "@/lib/props";

export function NewsSection({ runtime, news }: NewsSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t(runtime, "home_news_eyebrow")}
          title={t(runtime, "home_news_titre")}
          highlight={t(runtime, "home_news_highlight")}
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

export function EventsSection({ runtime, events }: EventsSectionProps) {
  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="absolute left-0 top-0 h-2 w-full bg-vcp-red" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t(runtime, "home_events_eyebrow")}
          title={t(runtime, "home_events_titre")}
          highlight={t(runtime, "home_events_highlight")}
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
          {t(runtime, "texte_contact_footer")}{" "}
          <Link
            href="/contact"
            className="font-bold text-vcp-red hover:underline"
          >
            {t(runtime, "cta_contactez_nous")}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
