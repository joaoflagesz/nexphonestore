import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage } from "./product-images";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tag: string | null;
  description: string;
  price: number;
  old_price: number | null;
  installments: string;
  image: string;
  gallery: string[];
  colors: string[];
  storage_options: string[];
  rating: number;
  stock: number;
  featured: boolean;
  specs: Record<string, string>;
  highlights: string[];
};

function normalize(raw: any): Product {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    category: raw.category,
    tag: raw.tag,
    description: raw.description ?? "",
    price: Number(raw.price),
    old_price: raw.old_price != null ? Number(raw.old_price) : null,
    installments: raw.installments ?? "",
    image: resolveProductImage(raw.slug, raw.image),
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
    colors: Array.isArray(raw.colors) ? raw.colors : [],
    storage_options: Array.isArray(raw.storage_options) ? raw.storage_options : [],
    rating: Number(raw.rating ?? 5),
    stock: Number(raw.stock ?? 0),
    featured: Boolean(raw.featured),
    specs: raw.specs && typeof raw.specs === "object" ? raw.specs : {},
    highlights: Array.isArray(raw.highlights) ? raw.highlights : [],
  };
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(normalize);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? normalize(data) : null;
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(normalize);
}
