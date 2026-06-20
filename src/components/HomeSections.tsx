import Image from "next/image";
import Link from "next/link";
import { Button, SectionHeader } from "@/components/ui";
import type { HomeSectionsProps, SponsorBannerProps } from "@/lib/props";
import { t } from "@/lib/props";
import type { SiteRuntimeConfig } from "@/lib/content";

type AboutPreviewProps = {
  runtime: SiteRuntimeConfig;
};

export function AboutPreview({ runtime }: AboutPreviewProps) {
  return (
    <section className="bg-vcp-cream py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative flex justify-center">
          <div className="absolute -inset-4 rounded-3xl bg-vcp-red/10" />
          <Image
            src="/logo.png"
            alt={`Logo ${runtime.ui.site_name}`}
            width={320}
            height={320}
            className="relative max-w-xs drop-shadow-xl sm:max-w-sm"
          />
        </div>
        <div>
          <SectionHeader
            eyebrow={t(runtime, "home_about_eyebrow")}
            title={t(runtime, "home_about_titre")}
            highlight={t(runtime, "home_about_highlight")}
          />
          <p className="mt-6 text-base leading-relaxed text-vcp-dark/80">
            {runtime.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/club" variant="primary">
              {t(runtime, "cta_en_savoir_plus")}
            </Button>
            <Button href={runtime.social.facebook} variant="outline" external>
              {t(runtime, "label_facebook")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function QuickLinks({ runtime, quickLinks }: HomeSectionsProps) {
  return (
    <section className="bg-vcp-dark py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t(runtime, "home_quick_eyebrow")}
          title={t(runtime, "home_quick_titre")}
          highlight={t(runtime, "home_quick_highlight")}
          align="center"
          light
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-num={link.order}
              className="card-watermark card-lift group rounded-2xl bg-white p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-vcp-red/10 text-sm font-bold text-vcp-red">
                {link.order}
              </span>
              <h3 className="font-display mt-4 text-lg font-extrabold uppercase text-vcp-dark group-hover:text-vcp-red">
                {link.label}
              </h3>
              <p className="mt-2 text-sm text-vcp-dark/60">{link.description}</p>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-vcp-blue group-hover:text-vcp-red">
                {t(runtime, "cta_explorer")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SponsorBanner({ runtime, sponsors }: SponsorBannerProps) {
  return (
    <section className="border-y border-vcp-dark/5 bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t(runtime, "home_sponsors_eyebrow")}
          title={t(runtime, "home_sponsors_titre")}
          highlight={t(runtime, "home_sponsors_highlight")}
          align="center"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {sponsors.map((sponsor) => (
            <div key={sponsor.name} className="flex flex-col items-center gap-2">
              {sponsor.logoUrl ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift flex h-20 w-36 items-center justify-center rounded-xl border border-vcp-dark/10 bg-vcp-cream p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </a>
              ) : (
                <div className="flex h-20 w-36 items-center justify-center rounded-xl border-2 border-dashed border-vcp-dark/10 bg-vcp-cream text-xs font-medium text-vcp-dark/40">
                  {sponsor.name}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-vcp-dark/60">
          {t(runtime, "home_sponsors_texte")}{" "}
          <Link href="/contact" className="font-bold text-vcp-red hover:underline">
            {t(runtime, "cta_sponsor")}
          </Link>
        </p>
      </div>
    </section>
  );
}
