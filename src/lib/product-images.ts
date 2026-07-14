import prodIphone16 from "@/assets/prod-iphone16.jpg";
import prodIphone15 from "@/assets/prod-iphone15.jpg";
import prodWatch from "@/assets/prod-watch.jpg";
import prodAirpods from "@/assets/prod-airpods.jpg";
import prodMacbook from "@/assets/prod-macbook.jpg";
import prodIpad from "@/assets/prod-ipad.jpg";
import prodMagsafe from "@/assets/prod-magsafe.jpg";

// Map product slugs to bundled asset URLs so that we render real images
// regardless of what path is stored in the database.
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
  return PRODUCT_IMAGE_BY_SLUG[slug] ?? fallback ?? prodIphone16;
}

export function formatBRL(value: number): string {
  return `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
