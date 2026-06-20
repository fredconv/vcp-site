import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-vcp-blue shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt={`Logo ${siteConfig.name}`}
            width={48}
            height={48}
            className="h-10 w-10 rounded-full object-cover transition-transform group-hover:scale-105 sm:h-12 sm:w-12"
            priority
          />
          <div className="hidden min-w-0 sm:block">
            <p className="font-display text-sm font-bold uppercase leading-tight tracking-wide text-white sm:text-base">
              Volley Club
            </p>
            <p className="font-display text-lg font-extrabold uppercase leading-tight tracking-wider text-vcp-red sm:text-xl">
              Perwez
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          <NavItems />
        </nav>

        <Link
          href={siteConfig.links.inscription}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-vcp-red px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark lg:inline-flex"
        >
          Rejoindre le club
        </Link>

        <MobileNav />
      </div>
    </header>
  );
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { navLinks, externalLinks } = require("@/lib/site") as typeof import("@/lib/site");

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
      {externalLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

function MobileNav() {
  return (
    <details className="relative lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg border border-white/20 p-2 text-white transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Ouvrir le menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </summary>
      <nav
        className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-vcp-blue-dark py-2 shadow-xl"
        aria-label="Navigation mobile"
      >
        <NavItems />
        <div className="mt-2 border-t border-white/10 px-3 pt-3">
          <Link
            href={siteConfig.links.inscription}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full bg-vcp-red px-4 py-2 text-center text-sm font-semibold text-white hover:bg-vcp-red-dark"
          >
            Rejoindre le club
          </Link>
        </div>
      </nav>
    </details>
  );
}
