/**
 * Indique si un lien de menu correspond à la page courante.
 */
export function isNavLinkActive(
  pathname: string,
  href: string,
  external?: boolean
): boolean {
  if (external || /^https?:\/\//i.test(href)) return false;

  const normalize = (value: string) => {
    const base = value.split("?")[0].split("#")[0];
    if (base.length > 1 && base.endsWith("/")) return base.slice(0, -1);
    return base || "/";
  };

  const target = normalize(href);
  const current = normalize(pathname);

  if (target === "/") return current === "/";

  return current === target || current.startsWith(`${target}/`);
}
