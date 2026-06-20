import Image from "next/image";
import { Button } from "@/components/ui";
import type { SiteRuntimeConfig } from "@/lib/content";
import { resolveImageUrl } from "@/lib/image-url";
import { t } from "@/lib/props";

type HeroRuntimeProps = {
  runtime: SiteRuntimeConfig;
};

export function HomeHero({ runtime }: HeroRuntimeProps) {
  const heroImage = resolveImageUrl(runtime.ui.home_hero_image);

  if (heroImage) {
    return (
      <section className="relative min-h-[420px] overflow-hidden bg-vcp-dark sm:min-h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${heroImage}")` }}
          role="img"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vcp-dark/95 via-vcp-dark/80 to-vcp-dark/50" />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[480px] lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-vcp-gold">
            {t(runtime, "hero_eyebrow")}
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {runtime.ui.hero_ligne1}
            <br />
            {runtime.ui.hero_ligne2}
            <br />
            <span className="text-vcp-red">{runtime.ui.hero_highlight}</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            {runtime.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              href={runtime.links.inscription}
              variant="primary"
              external
            >
              {t(runtime, "cta_rejoindre")}
            </Button>
            <Button href="/club" variant="ghost">
              {t(runtime, "cta_decouvrir")}
            </Button>
          </div>
        </div>
        <div
          className="relative h-12 bg-vcp-dark sm:h-16"
          style={{
            background:
              "linear-gradient(to bottom right, transparent 50%, var(--vcp-dark) 50%)",
          }}
          aria-hidden
        />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-vcp-dark">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <div className="relative flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
          <div className="absolute -left-20 top-0 h-full w-1/2 bg-vcp-red/10 blur-3xl" />
          <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-vcp-gold">
            {t(runtime, "hero_eyebrow")}
          </p>
          <h1 className="relative font-display mt-4 text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {runtime.ui.hero_ligne1}
            <br />
            {runtime.ui.hero_ligne2}
            <br />
            <span className="text-vcp-red">{runtime.ui.hero_highlight}</span>
          </h1>
          <p className="relative mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            {runtime.description}
          </p>
          <div className="relative mt-8 flex flex-wrap gap-4">
            <Button
              href={runtime.links.inscription}
              variant="primary"
              external
            >
              {t(runtime, "cta_rejoindre")}
            </Button>
            <Button href="/club" variant="ghost">
              {t(runtime, "cta_decouvrir")}
            </Button>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-vcp-red px-8 py-16 lg:py-0">
          <div
            className="absolute inset-y-0 left-0 hidden w-16 bg-vcp-red lg:block"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            aria-hidden
          />
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-vcp-blue/20 blur-2xl" />
            <Image
              src="/logo.png"
              alt={`Logo ${runtime.ui.site_name}`}
              width={360}
              height={360}
              className="relative max-w-[280px] drop-shadow-2xl sm:max-w-xs lg:max-w-sm"
              priority
            />
          </div>
        </div>
      </div>

      <div
        className="h-12 bg-vcp-dark sm:h-16"
        style={{
          background:
            "linear-gradient(to bottom right, var(--vcp-red) 50%, var(--vcp-dark) 50%)",
        }}
        aria-hidden
      />
    </section>
  );
}

type HeroProps = HeroRuntimeProps & {
  title: string;
  highlight?: string;
  subtitle?: string;
  cta?: { label: string; href: string; external?: boolean };
  imageUrl?: string;
};

function HeroTextContent({
  runtime,
  title,
  highlight,
  subtitle,
  cta,
  onImage = false,
}: HeroProps & { onImage?: boolean }) {
  return (
    <>
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] text-vcp-gold ${
          onImage ? "relative" : ""
        }`}
      >
        {runtime.ui.site_short_name}
      </p>
      <h1
        className={`font-display mt-3 max-w-2xl text-4xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl ${
          onImage ? "relative" : ""
        }`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-vcp-red">{highlight}</span>
          </>
        )}
      </h1>
      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-base sm:text-lg ${
            onImage ? "relative text-white/85" : "text-white/70"
          }`}
        >
          {subtitle}
        </p>
      )}
      {cta && (
        <div className={`mt-8 ${onImage ? "relative" : ""}`}>
          <Button href={cta.href} variant="primary" external={cta.external}>
            {cta.label}
          </Button>
        </div>
      )}
    </>
  );
}

export function Hero({
  runtime,
  title,
  highlight,
  subtitle,
  cta,
  imageUrl,
}: HeroProps) {
  const resolved = resolveImageUrl(imageUrl);

  if (resolved) {
    return (
      <section className="relative min-h-[280px] overflow-hidden bg-vcp-dark sm:min-h-[360px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${resolved}")` }}
          role="img"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-vcp-dark/90 via-vcp-dark/75 to-vcp-dark/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <HeroTextContent
            runtime={runtime}
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            cta={cta}
            onImage
          />
        </div>
        <div
          className="relative h-8 bg-background"
          style={{
            background:
              "linear-gradient(to bottom right, transparent 50%, var(--background) 50%)",
          }}
          aria-hidden
        />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-vcp-dark pattern-court">
      <div
        className="absolute right-0 top-0 h-full w-1/3 bg-vcp-red opacity-90"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <HeroTextContent
          runtime={runtime}
          title={title}
          highlight={highlight}
          subtitle={subtitle}
          cta={cta}
        />
      </div>
      <div
        className="h-8 bg-background"
        style={{
          background:
            "linear-gradient(to bottom right, var(--vcp-dark) 50%, var(--background) 50%)",
        }}
        aria-hidden
      />
    </section>
  );
}

export function CTASection({ runtime }: HeroRuntimeProps) {
  return (
    <section className="relative overflow-hidden bg-vcp-red">
      <div className="absolute inset-0 pattern-court opacity-50" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl">
          {t(runtime, "home_cta_titre1")}
          <br />
          <span className="text-vcp-gold">{t(runtime, "home_cta_titre2")}</span>
        </h2>
        <p className="max-w-lg text-base text-white/85">
          {t(runtime, "home_cta_texte")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href={runtime.links.inscription}
            variant="primary"
            external
            className="!bg-white !text-vcp-red hover:!bg-vcp-cream"
          >
            {t(runtime, "cta_inscrire")}
          </Button>
          <Button href="/contact" variant="ghost">
            {t(runtime, "cta_contact")}
          </Button>
        </div>
      </div>
    </section>
  );
}
