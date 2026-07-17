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

// Product family galleries — first entry is the thumbnail/main image.
// Slug variants (storage sizes) of the same physical device share the same gallery.
const IPHONE_15_PRO_MAX = [i15pmPersp, i15pmFront, i15pmBack, i15pmSide];
const IPHONE_16_PRO_MAX = [i16pmPersp, i16pmFront, i16pmBack, i16pmSide];
const IPHONE_17_PRO_MAX = [i17pmPersp, i17pmFront, i17pmBack, i17pmSide];

export const PRODUCT_GALLERY_BY_SLUG: Record<string, string[]> = {
  "iphone-15-pro-max-256gb": IPHONE_15_PRO_MAX,
  "iphone-15-pro-max-128gb": IPHONE_15_PRO_MAX,
  "iphone-15-pro-max-512gb": IPHONE_15_PRO_MAX,
  "iphone-15-pro-max-1tb": IPHONE_15_PRO_MAX,
  "iphone-16-pro-max-256gb": IPHONE_16_PRO_MAX,
  "iphone-16-pro-max-128gb": IPHONE_16_PRO_MAX,
  "iphone-16-pro-max-512gb": IPHONE_16_PRO_MAX,
  "iphone-16-pro-max-1tb": IPHONE_16_PRO_MAX,
  "iphone-17-pro-max-256gb": IPHONE_17_PRO_MAX,
  "iphone-17-pro-max-128gb": IPHONE_17_PRO_MAX,
  "iphone-17-pro-max-512gb": IPHONE_17_PRO_MAX,
  "iphone-17-pro-max-1tb": IPHONE_17_PRO_MAX,
};

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

export function resolveProductImage(slug: string, fallback?: string | null): string {
  const gallery = PRODUCT_GALLERY_BY_SLUG[slug];
  if (gallery && gallery.length > 0) return gallery[0];
  return PRODUCT_IMAGE_BY_SLUG[slug] ?? fallback ?? prodIphone16;
}

export function resolveProductGallery(slug: string, fallbackGallery: string[] = []): string[] {
  const gallery = PRODUCT_GALLERY_BY_SLUG[slug];
  if (gallery && gallery.length > 0) return gallery;
  const legacy = PRODUCT_IMAGE_BY_SLUG[slug];
  if (legacy) return [legacy, ...fallbackGallery.filter((g) => g !== legacy)];
  return fallbackGallery;
}

export function formatBRL(value: number): string {
  return `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
