export function resolveContentLink(
  raw: string
): { href: string; external: boolean } | null {
  const url = raw.trim();
  if (!url) return null;

  if (/^https?:\/\//i.test(url)) {
    return { href: url, external: true };
  }

  const href = url.startsWith("/") ? url : `/${url}`;
  return { href, external: false };
}
