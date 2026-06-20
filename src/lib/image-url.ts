/**
 * Normalise les URLs d'images saisies dans le Google Sheet (Drive, lien direct…).
 */
export function resolveImageUrl(input?: string): string | null {
  const url = input?.trim();
  if (!url) return null;

  const driveFile = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFile) {
    return `https://drive.google.com/uc?export=view&id=${driveFile[1]}`;
  }

  const driveOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (driveOpen) {
    return `https://drive.google.com/uc?export=view&id=${driveOpen[1]}`;
  }

  const driveUc = url.match(/drive\.google\.com\/uc\?[^#]*\bid=([^&]+)/);
  if (driveUc) {
    return `https://drive.google.com/uc?export=view&id=${driveUc[1]}`;
  }

  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  }

  return null;
}

export function pageHeroImage(
  ui: Record<string, string>,
  pageKey: string
): string | undefined {
  return resolveImageUrl(ui[`${pageKey}_hero_image`]) ?? undefined;
}
