import { supabase } from "@/integrations/supabase/client";

export async function fetchFavorites(userId: string) {
  const { data, error } = await supabase
    .from("favorites" as any)
    .select("id, product_id, products:product_id(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return data ?? [];
}

export async function addFavorite(userId: string, productId: string) {
  const { error } = await supabase
    .from("favorites" as any)
    .insert({ user_id: userId, product_id: productId });
  if (error && !error.message.includes("duplicate")) throw error;
}

export async function removeFavorite(userId: string, productId: string) {
  const { error } = await supabase
    .from("favorites" as any)
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  if (error) throw error;
}

export async function fetchOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders" as any)
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
