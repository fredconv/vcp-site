"use client";

import { useEffect, useState } from "react";
import BlurText from "@/components/BlurText";
import { Button } from "@/components/ui";

type HomeHeroContentProps = {
  eyebrow: string;
  line1: string;
  line2: string;
  highlight: string;
  description: string;
  ctaRejoindre: string;
  ctaDecouvrir: string;
  inscriptionHref: string;
  relative?: boolean;
  descriptionMuted?: boolean;
};

const titleClass =
  "font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl block w-full max-w-2xl";

export function HomeHeroContent({
  eyebrow,
  line1,
  line2,
  highlight,
  description,
  ctaRejoindre,
  ctaDecouvrir,
  inscriptionHref,
  relative = false,
  descriptionMuted = false,
}: HomeHeroContentProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const position = relative ? "relative" : "";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) setReducedMotion(true);
    const update = () => setReducedMotion(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const descriptionClass = descriptionMuted ? "text-white/70" : "text-white/80";

  if (reducedMotion) {
    return (
      <>
        <p
          className={`${position} text-xs font-bold uppercase tracking-[0.25em] text-vcp-gold`}
        >
          {eyebrow}
        </p>
        <h1
          className={`${position} font-display mt-4 max-w-2xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white sm:text-6xl lg:text-7xl`}
        >
          {line1}
          <br />
          {line2}
          <br />
          <span className="text-vcp-red">{highlight}</span>
        </h1>
        <p
          className={`${position} mt-6 max-w-md text-base leading-relaxed ${descriptionClass} sm:text-lg`}
        >
          {description}
        </p>
        <div className={`${position} mt-8 flex flex-wrap gap-4`}>
          <Button href={inscriptionHref} variant="primary" external>
            {ctaRejoindre}
          </Button>
          <Button href="/club" variant="ghost">
            {ctaDecouvrir}
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <p
        className={`${position} hero-fade-in text-xs font-bold uppercase tracking-[0.25em] text-vcp-gold`}
      >
        {eyebrow}
      </p>
      <div className={`${position} mt-4`} role="heading" aria-level={1}>
        <h1 className="sr-only">
          {line1} {line2} {highlight}
        </h1>
        <BlurText
          text={line1}
          className={`${titleClass} mt-0`}
          delay={70}
          stepDuration={0.3}
        />
        <BlurText
          text={line2}
          className={titleClass}
          delay={70}
          stepDuration={0.3}
        />
        <BlurText
          text={highlight}
          className={`${titleClass} text-vcp-red`}
          delay={70}
          stepDuration={0.3}
        />
      </div>
      <p
        className={`${position} hero-fade-in hero-fade-in-delay-2 mt-6 max-w-md text-base leading-relaxed ${descriptionClass} sm:text-lg`}
      >
        {description}
      </p>
      <div
        className={`${position} hero-fade-in hero-fade-in-delay-3 mt-8 flex flex-wrap gap-4`}
      >
        <Button href={inscriptionHref} variant="primary" external>
          {ctaRejoindre}
        </Button>
        <Button href="/club" variant="ghost">
          {ctaDecouvrir}
        </Button>
      </div>
    </>
  );
}
