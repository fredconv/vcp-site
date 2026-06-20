import Image from "next/image";
import Link from "next/link";
import { NavItems } from "@/components/NavItems";
import type { HeaderFooterProps } from "@/lib/props";
import { t } from "@/lib/props";

export function Header({ runtime }: HeaderFooterProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-vcp-dark/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-vcp-red/30 blur-sm transition group-hover:bg-vcp-red/50" />
            <Image
              src="/logo.png"
              alt={`Logo ${runtime.ui.site_name}`}
              width={44}
              height={44}
              className="relative h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
              priority
            />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="font-display text-xs font-bold uppercase leading-tight tracking-[0.15em] text-white/70">
              {runtime.ui.hero_ligne1} {runtime.ui.hero_ligne2}
            </p>
            <p className="font-display text-xl font-extrabold uppercase leading-tight tracking-wide text-vcp-red">
              {runtime.ui.hero_highlight}
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Navigation principale"
        >
          <NavItems nav={runtime.nav} />
        </nav>

        <Link
          href={runtime.links.inscription}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-vcp-red px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-vcp-red-dark hover:shadow-lg lg:inline-flex"
        >
          {t(runtime, "cta_rejoindre_short")}
        </Link>

        <MobileNav runtime={runtime} />
      </div>
      <div className="h-0.5 bg-gradient-to-r from-vcp-red via-vcp-gold to-vcp-blue" />
    </header>
  );
}

function MobileNav({ runtime }: HeaderFooterProps) {
  return (
    <details className="relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg border border-white/15 p-2 text-white transition-colors hover:bg-white/5 [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Ouvrir le menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <nav
        className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-vcp-dark py-2 shadow-2xl"
        aria-label="Navigation mobile"
      >
        <NavItems nav={runtime.nav} />
        <div className="mt-2 border-t border-white/10 px-3 pt-3">
          <Link
            href={runtime.links.inscription}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full bg-vcp-red py-2.5 text-center text-sm font-bold uppercase text-white"
          >
            {t(runtime, "cta_rejoindre")}
          </Link>
        </div>
      </nav>
    </details>
  );
}
