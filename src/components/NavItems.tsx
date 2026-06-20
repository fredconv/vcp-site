"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive } from "@/lib/nav-active";
import type { NavItem } from "@/lib/types";

type NavItemsProps = {
  nav: NavItem[];
  onNavigate?: () => void;
};

export function NavItems({ nav, onNavigate }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <>
      {nav.map((link) => {
        const active = isNavLinkActive(pathname, link.href, link.external);

        return (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-vcp-red/20 font-semibold text-vcp-gold"
                : "text-white/75 hover:bg-white/5 hover:text-vcp-gold"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
