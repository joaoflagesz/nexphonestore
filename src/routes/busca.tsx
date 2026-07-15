import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { useEffect, useState } from "react";
import { Star, ChevronRight, Search as SearchIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage, formatBRL } from "@/lib/product-images";
import { Nav, Footer, WhatsAppFab, LaunchStrip } from "@/components/nexphone";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/busca")({
  component: SearchPage,
  validateSearch: zodValidator(searchSchema),
  head: ({ search }) => ({
    meta: [{ title: `Buscar por "${(search as any).q}" — NexPhoneStore` }],
  }),
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setResults(null);
      if (!q.trim()) { setResults([]); return; }
      const { data } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${q}%`)
        .limit(60);
      if (!cancelled) setResults(data ?? []);
    }
    run();
    return () => { cancelled = true; };
  }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <LaunchStrip />
      <Nav />
      <main className="pt-14">
        <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
          <nav className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Busca</span>
          </nav>
          <h1 className="mt-4 flex items-center gap-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <SearchIcon className="h-8 w-8" /> "{q}"
          </h1>

          {results === null ? (
            <div className="mt-14 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : results.length === 0 ? (
            <p className="mt-8 text-[15px] text-muted-foreground">Nenhum produto encontrado.</p>
          ) : (
            <>
              <p className="mt-2 text-[13px] text-muted-foreground">{results.length} produtos</p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    to="/produto/$slug"
                    params={{ slug: p.slug }}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  >
                    <div className="aspect-square overflow-hidden bg-[color:var(--surface)]">
                      <img src={resolveProductImage(p.slug, p.image)} alt={p.name} className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-5">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Star className="h-3 w-3 fill-current text-yellow-500" /> {Number(p.rating).toFixed(1)}
                      </div>
                      <p className="text-[14px] font-semibold leading-tight text-foreground">{p.name}</p>
                      <p className="text-[16px] font-semibold text-foreground">{formatBRL(Number(p.price))}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
