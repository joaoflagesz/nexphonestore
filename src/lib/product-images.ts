import prodIphone16 from "@/assets/prod-iphone16.jpg";
import prodIphone15 from "@/assets/prod-iphone15.jpg";
import prodWatch from "@/assets/prod-watch.jpg";
import prodAirpods from "@/assets/prod-airpods.jpg";
import prodMacbook from "@/assets/prod-macbook.jpg";
import prodIpad from "@/assets/prod-ipad.jpg";
import prodMagsafe from "@/assets/prod-magsafe.jpg";

// Catalog Fase 1 — iPhone flagships (4 studio angles each, Apple.com style)
import i15pmFront from "@/assets/catalog/iphone-15-pro-max/front.jpg";
import i15pmBack from "@/assets/catalog/iphone-15-pro-max/back.jpg";
import i15pmSide from "@/assets/catalog/iphone-15-pro-max/side.jpg";
import i15pmPersp from "@/assets/catalog/iphone-15-pro-max/perspective.jpg";
import i16pmFront from "@/assets/catalog/iphone-16-pro-max/front.jpg";
import i16pmBack from "@/assets/catalog/iphone-16-pro-max/back.jpg";
import i16pmSide from "@/assets/catalog/iphone-16-pro-max/side.jpg";
import i16pmPersp from "@/assets/catalog/iphone-16-pro-max/perspective.jpg";
import i17pmFront from "@/assets/catalog/iphone-17-pro-max/front.jpg";
import i17pmBack from "@/assets/catalog/iphone-17-pro-max/back.jpg";
import i17pmSide from "@/assets/catalog/iphone-17-pro-max/side.jpg";
import i17pmPersp from "@/assets/catalog/iphone-17-pro-max/perspective.jpg";

// Catalog Fase 2 — iPhone standard / Air hero shots
import i15Persp from "@/assets/catalog/iphone-15/perspective.jpg";
import i15Black from "@/assets/catalog/iphone-15/color-1a1a1a.jpg";
import i15Pink from "@/assets/catalog/iphone-15/color-f5b7c1.jpg";
import i15Green from "@/assets/catalog/iphone-15/color-a3c4b4.jpg";
import i15Yellow from "@/assets/catalog/iphone-15/color-f4d35e.jpg";
import i15Blue from "@/assets/catalog/iphone-15/color-3b82f6.jpg";
import i16Persp from "@/assets/catalog/iphone-16/perspective.jpg";
import i16Black from "@/assets/catalog/iphone-16/color-1a1a1a.jpg";
import i16White from "@/assets/catalog/iphone-16/color-f5f5f5.jpg";
import i16Blue from "@/assets/catalog/iphone-16/color-3b82f6.jpg";
import i16Green from "@/assets/catalog/iphone-16/color-3d5f4f.jpg";
import i16Pink from "@/assets/catalog/iphone-16/color-f5b7c1.jpg";
import i17Persp from "@/assets/catalog/iphone-17/perspective.jpg";
import i17Black from "@/assets/catalog/iphone-17/color-1a1a1a.jpg";
import i17White from "@/assets/catalog/iphone-17/color-f5f5f5.jpg";
import i17Blue from "@/assets/catalog/iphone-17/color-3b82f6.jpg";
import i17Red from "@/assets/catalog/iphone-17/color-e63946.jpg";
import i17Green from "@/assets/catalog/iphone-17/color-a3c4b4.jpg";
import i17AirPersp from "@/assets/catalog/iphone-17-air/perspective.jpg";
import i17AirBlack from "@/assets/catalog/iphone-17-air/color-1a1a1a.jpg";
import i17AirWhite from "@/assets/catalog/iphone-17-air/color-f5f5f5.jpg";
import i17AirSilver from "@/assets/catalog/iphone-17-air/color-c0c0c0.jpg";

// Color variants (Apple.com style, same angle/lighting as the family hero)
import i15pmBlack from "@/assets/catalog/iphone-15-pro-max/color-3a3a3a.jpg";
import i15pmNatural from "@/assets/catalog/iphone-15-pro-max/color-c0c0c0.jpg";
import i15pmDesert from "@/assets/catalog/iphone-15-pro-max/color-8e7767.jpg";
import i15pmBlue from "@/assets/catalog/iphone-15-pro-max/color-3b5f6f.jpg";
import i16pmBlack from "@/assets/catalog/iphone-16-pro-max/color-2b2b2b.jpg";
import i16pmNatural from "@/assets/catalog/iphone-16-pro-max/color-c0c0c0.jpg";
import i16pmDesert from "@/assets/catalog/iphone-16-pro-max/color-8e7767.jpg";
import i16pmBlue from "@/assets/catalog/iphone-16-pro-max/color-3b5f6f.jpg";
import i17pmBlack from "@/assets/catalog/iphone-17-pro-max/color-2b2b2b.jpg";
import i17pmNatural from "@/assets/catalog/iphone-17-pro-max/color-c0c0c0.jpg";
import i17pmDesert from "@/assets/catalog/iphone-17-pro-max/color-8e7767.jpg";
import i17pmBlue from "@/assets/catalog/iphone-17-pro-max/color-3b5f6f.jpg";

// Catalog Fase 3 — iPhone Pro (não Max)
import i15pPersp from "@/assets/catalog/iphone-15-pro/perspective.jpg";
import i15pBlack from "@/assets/catalog/iphone-15-pro/color-3a3a3a.jpg";
import i15pDesert from "@/assets/catalog/iphone-15-pro/color-8e7767.jpg";
import i15pBlue from "@/assets/catalog/iphone-15-pro/color-3b5f6f.jpg";
import i16pPersp from "@/assets/catalog/iphone-16-pro/perspective.jpg";
import i16pBlack from "@/assets/catalog/iphone-16-pro/color-2b2b2b.jpg";
import i16pDesert from "@/assets/catalog/iphone-16-pro/color-8e7767.jpg";
import i16pBlue from "@/assets/catalog/iphone-16-pro/color-3b5f6f.jpg";
import i17pPersp from "@/assets/catalog/iphone-17-pro/perspective.jpg";
import i17pBlack from "@/assets/catalog/iphone-17-pro/color-2b2b2b.jpg";
import i17pDesert from "@/assets/catalog/iphone-17-pro/color-8e7767.jpg";
import i17pBlue from "@/assets/catalog/iphone-17-pro/color-3b5f6f.jpg";

// Product family galleries — first entry is the thumbnail/main image.
// Slug variants (storage sizes) of the same physical device share the same gallery.
const IPHONE_15 = [i15Persp];
const IPHONE_16 = [i16Persp];
const IPHONE_17 = [i17Persp];
const IPHONE_17_AIR = [i17AirPersp];
const IPHONE_15_PRO_MAX = [i15pmPersp, i15pmFront, i15pmBack, i15pmSide];
const IPHONE_16_PRO_MAX = [i16pmPersp, i16pmFront, i16pmBack, i16pmSide];
const IPHONE_17_PRO_MAX = [i17pmPersp, i17pmFront, i17pmBack, i17pmSide];
const IPHONE_15_PRO = [i15pPersp, i15pBlack, i15pBlue, i15pDesert];
const IPHONE_16_PRO = [i16pPersp, i16pBlack, i16pBlue, i16pDesert];
const IPHONE_17_PRO = [i17pPersp, i17pBlack, i17pBlue, i17pDesert];

/** Strips the storage suffix so every capacity variant shares one family key. */
export function familyKey(slug: string): string {
  return slug.replace(/-(\d+(gb|tb))$/i, "");
}

const GALLERY_BY_FAMILY: Record<string, string[]> = {
  "iphone-15": IPHONE_15,
  "iphone-16": IPHONE_16,
  "iphone-17": IPHONE_17,
  "iphone-17-air": IPHONE_17_AIR,
  "iphone-15-pro-max": IPHONE_15_PRO_MAX,
  "iphone-16-pro-max": IPHONE_16_PRO_MAX,
  "iphone-17-pro-max": IPHONE_17_PRO_MAX,
  "iphone-15-pro": IPHONE_15_PRO,
  "iphone-16-pro": IPHONE_16_PRO,
  "iphone-17-pro": IPHONE_17_PRO,
};

/** Per-color hero shots, keyed by family then by the hex stored in products.colors. */
const COLOR_IMAGES_BY_FAMILY: Record<string, Record<string, string>> = {
  "iphone-15": {
    "#1a1a1a": i15Black,
    "#f5b7c1": i15Pink,
    "#a3c4b4": i15Green,
    "#f4d35e": i15Yellow,
    "#3b82f6": i15Blue,
  },
  "iphone-16": {
    "#1a1a1a": i16Black,
    "#f5f5f5": i16White,
    "#3b82f6": i16Blue,
    "#3d5f4f": i16Green,
    "#f5b7c1": i16Pink,
  },
  "iphone-17": {
    "#1a1a1a": i17Black,
    "#f5f5f5": i17White,
    "#3b82f6": i17Blue,
    "#e63946": i17Red,
    "#a3c4b4": i17Green,
  },
  "iphone-17-air": {
    "#1a1a1a": i17AirBlack,
    "#f5f5f5": i17AirWhite,
    "#c0c0c0": i17AirSilver,
  },
  "iphone-15-pro-max": {
    "#3a3a3a": i15pmBlack,
    "#c0c0c0": i15pmNatural,
    "#8e7767": i15pmDesert,
    "#3b5f6f": i15pmBlue,
  },
  "iphone-16-pro-max": {
    "#2b2b2b": i16pmBlack,
    "#c0c0c0": i16pmNatural,
    "#8e7767": i16pmDesert,
    "#3b5f6f": i16pmBlue,
  },
  "iphone-17-pro-max": {
    "#2b2b2b": i17pmBlack,
    "#c0c0c0": i17pmNatural,
    "#8e7767": i17pmDesert,
    "#3b5f6f": i17pmBlue,
  },
};

export const PRODUCT_GALLERY_BY_SLUG: Record<string, string[]> = GALLERY_BY_FAMILY;

// Legacy single-image map (kept for slugs without a full gallery yet).
export const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  "iphone-16-pro-256gb": prodIphone16,
  "iphone-15-pro-128gb": prodIphone15,
  "iphone-15-128gb": prodIphone15,
  "apple-watch-s10-42mm": prodWatch,
  "airpods-pro-2-usbc": prodAirpods,
  "macbook-air-m3-13": prodMacbook,
  "ipad-air-m2-11": prodIpad,
  "carregador-magsafe-25w": prodMagsafe,
};

/** Image for a specific color of a product, when one exists. */
export function resolveColorImage(slug: string, color: string | null): string | null {
  if (!color) return null;
  const map = COLOR_IMAGES_BY_FAMILY[familyKey(slug)];
  return map?.[color.toLowerCase()] ?? null;
}

/** All color hexes that have a dedicated shot for this product. */
export function colorImageMap(slug: string): Record<string, string> {
  return COLOR_IMAGES_BY_FAMILY[familyKey(slug)] ?? {};
}

export function resolveProductImage(slug: string, fallback?: string | null): string {
  const gallery = GALLERY_BY_FAMILY[familyKey(slug)];
  if (gallery && gallery.length > 0) return gallery[0];
  return PRODUCT_IMAGE_BY_SLUG[slug] ?? fallback ?? prodIphone16;
}

export function resolveProductGallery(slug: string, fallbackGallery: string[] = []): string[] {
  const key = familyKey(slug);
  const gallery = GALLERY_BY_FAMILY[key] ?? [];
  const colorShots = Object.values(COLOR_IMAGES_BY_FAMILY[key] ?? {});
  const combined = [...gallery, ...colorShots];
  if (combined.length > 0) return Array.from(new Set(combined));
  const legacy = PRODUCT_IMAGE_BY_SLUG[slug];
  if (legacy) return [legacy, ...fallbackGallery.filter((g) => g !== legacy)];
  return fallbackGallery;
}


export function formatBRL(value: number): string {
  return `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
