import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, ChevronRight } from "lucide-react";
import { fetchProductsByCategory } from "@/lib/products";
import { formatBRL } from "@/lib/product-images";
import { useCart } from "@/lib/cart-store";
import { Nav, Footer, WhatsAppFab, LaunchStrip } from "@/components/nexphone";

const CATEGORY_LABELS: Record<string, string> = {
  iphone: "iPhone",
  watch: "Apple Watch",
  airpods: "AirPods",
  mac: "Mac",
  ipad: "iPad",
  acessorios: "Acessórios",
};

const categoryQuery = (slug: string) => ({
  queryKey: ["category", slug],
  queryFn: () => fetchProductsByCategory(slug),
});

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(categoryQuery(params.slug)),
  component: CategoryPage,
  head: ({ params }) => ({
    meta: [
      { title: `${CATEGORY_LABELS[params.slug] ?? params.slug} — NexPhoneStore` },
      { name: "description", content: `Confira todos os produtos da categoria ${CATEGORY_LABELS[params.slug] ?? params.slug} na NexPhoneStore.` },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <p>{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <p>Categoria não encontrada</p>
    </div>
  ),
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data: products } = useSuspenseQuery(categoryQuery(slug));
  const { addItem } = useCart();
  const label = CATEGORY_LABELS[slug] ?? slug;

  return (
    <div className="min-h-screen bg-background">
      <LaunchStrip />
      <Nav />
      <main className="pt-14">
        <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
          <nav className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{label}</span>
          </nav>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-6xl">
            {label}
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            {products.length} {products.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>

          {products.length === 0 ? (
            <div className="mt-16 rounded-3xl border border-border bg-[color:var(--surface)] p-14 text-center">
              <p className="text-[15px] text-muted-foreground">
                Nenhum produto disponível nesta categoria ainda.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-[13px] font-medium text-background"
              >
                Voltar para a Home
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => {
                const discount = p.old_price
                  ? Math.round(((p.old_price - p.price) / p.old_price) * 100)
                  : 0;
                return (
                  <article
                    key={p.id}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                  >
                    <Link
                      to="/produto/$slug"
                      params={{ slug: p.slug }}
                      className="relative block aspect-square overflow-hidden bg-[color:var(--surface)]"
                    >
                      {p.tag && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                          {p.tag}
                        </span>
                      )}
                      {discount > 0 && (
                        <span className="absolute right-3 top-3 z-10 rounded-full bg-[color:var(--brand)] px-2.5 py-1 text-[10px] font-semibold text-white">
                          -{discount}%
                        </span>
                      )}
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Star className="h-3 w-3 fill-current text-yellow-500" /> {p.rating.toFixed(1)}
                      </div>
                      <Link
                        to="/produto/$slug"
                        params={{ slug: p.slug }}
                        className="text-[14px] font-semibold leading-tight text-foreground hover:underline"
                      >
                        {p.name}
                      </Link>
                      <div className="mt-1 flex items-baseline gap-2">
                        {p.old_price && (
                          <span className="text-[12px] text-muted-foreground line-through">
                            {formatBRL(p.old_price)}
                          </span>
                        )}
                        <span className="text-[18px] font-semibold text-foreground">
                          {formatBRL(p.price)}
                        </span>
                      </div>
                      {p.installments && (
                        <div className="text-[11px] text-muted-foreground">
                          ou <span className="text-foreground">{p.installments}</span>
                        </div>
                      )}
                      <button
                        onClick={() =>
                          addItem({
                            slug: p.slug,
                            name: p.name,
                            price: p.price,
                            image: p.image,
                          })
                        }
                        className="mt-3 inline-flex h-10 items-center justify-center rounded-full bg-foreground text-[12px] font-medium text-background transition-transform hover:scale-[1.02]"
                      >
                        Adicionar à sacola
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
