"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive } from "@/lib/nav-active";
import type { NavItem } from "@/lib/types";

type NavItemsProps = {
  nav: NavItem[];
  onNavigate?: () => void;
  layout?: "row" | "column";
};

export function NavItems({
  nav,
  onNavigate,
  layout = "row",
}: NavItemsProps) {
  const pathname = usePathname();
  const stacked = layout === "column";

  return (
    <div
      className={
        stacked ? "flex flex-col gap-0.5 px-2" : "flex items-center gap-0.5"
      }
    >
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
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              stacked ? "block w-full" : ""
            } ${
              active
                ? "bg-vcp-red/20 font-semibold text-vcp-gold"
                : "text-white/75 hover:bg-white/5 hover:text-vcp-gold"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
