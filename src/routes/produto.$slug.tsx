import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  Lock,
  MessageCircle,
} from "lucide-react";
import { fetchProductBySlug } from "@/lib/products";
import { formatBRL, resolveColorImage } from "@/lib/product-images";
import { useCart } from "@/lib/cart-store";
import { Nav, Footer, WhatsAppFab, LaunchStrip } from "@/components/nexphone";

const productQuery = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: async () => {
    const p = await fetchProductBySlug(slug);
    if (!p) throw notFound();
    return p;
  },
});

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(productQuery(params.slug)),
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — NexPhoneStore` },
      { name: "description", content: "Produto Apple original com garantia oficial na NexPhoneStore." },
    ],
  }),
  errorComponent: ({ error }) => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Erro ao carregar</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <Link to="/" className="mt-6 inline-block underline">Voltar</Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Produto não encontrado</h1>
        <Link to="/" className="mt-6 inline-block underline">Ver todos os produtos</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQuery(slug));
  const queryClient = useQueryClient();
  // prefetch for cross-navigation
  void queryClient;

  const { addItem } = useCart();
  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];
  const [selectedStorage, setSelectedStorage] = useState<string | null>(
    product.storage_options[0] ?? null,
  );
  const initialColor = product.colors[0] ?? null;
  const [selectedColor, setSelectedColor] = useState<string | null>(initialColor);
  const [activeImage, setActiveImage] = useState<string>(
    resolveColorImage(product.slug, initialColor) ?? gallery[0],
  );
  const [qty, setQty] = useState(1);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    const shot = resolveColorImage(product.slug, color);
    if (shot) setActiveImage(shot);
  };


  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;
  const variant = [selectedStorage, selectedColor].filter(Boolean).join(" · ");

  const handleAdd = () => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: variant || undefined,
      },
      qty,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <LaunchStrip />
      <Nav />
      <main className="pt-14">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1280px] px-5 pt-8 md:px-10">
          <nav className="flex flex-wrap items-center gap-1 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/categoria/$slug"
              params={{ slug: product.category }}
              className="capitalize hover:text-foreground"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-8 md:px-10 md:py-14 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[color:var(--surface)]">
              <img
                key={activeImage}
                src={activeImage}
                alt={product.name}
                width={1024}
                height={1024}
                className="h-full w-full object-contain p-8 animate-in fade-in duration-300"
              />
              {product.tag && (
                <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-background">
                  {product.tag}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute right-4 top-4 rounded-full bg-[color:var(--brand)] px-3 py-1 text-[11px] font-semibold text-white">
                  -{discount}% OFF
                </span>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((src, i) => (
                  <button
                    key={src + i}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    aria-label={`Ver imagem ${i + 1}`}
                    className={`relative aspect-square overflow-hidden rounded-2xl border-2 bg-[color:var(--surface)] transition ${
                      activeImage === src
                        ? "border-foreground"
                        : "border-transparent hover:border-[color:var(--border-strong)]"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} — vista ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-current text-yellow-500" />
              {product.rating.toFixed(1)} · em estoque
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              {product.old_price && (
                <span className="text-[14px] text-muted-foreground line-through">
                  {formatBRL(product.old_price)}
                </span>
              )}
              <span className="text-4xl font-semibold text-foreground">
                {formatBRL(product.price)}
              </span>
            </div>
            {product.installments && (
              <p className="mt-1 text-[13px] text-muted-foreground">
                ou <span className="text-foreground">{product.installments}</span> sem juros
              </p>
            )}
            <p className="mt-1 text-[13px] font-medium text-[color:var(--brand)]">
              {formatBRL(Math.round(product.price * 0.9))} no PIX (10% OFF)
            </p>

            {/* Storage */}
            {product.storage_options.length > 0 && (
              <div className="mt-8">
                <div className="text-[12px] font-medium text-foreground">
                  Armazenamento: <span className="text-muted-foreground">{selectedStorage}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.storage_options.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s)}
                      className={`inline-flex h-10 items-center rounded-full border px-4 text-[13px] font-medium transition ${
                        selectedStorage === s
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-transparent text-foreground hover:border-[color:var(--border-strong)]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mt-6">
                <div className="text-[12px] font-medium text-foreground">Cor</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleSelectColor(c)}
                      aria-label={`Cor ${c}`}
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 transition ${
                        selectedColor === c ? "border-foreground" : "border-border"
                      }`}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={{ background: c }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 place-items-center hover:bg-foreground/5"
                  aria-label="Diminuir"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[36px] text-center text-[14px] font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-11 w-11 place-items-center hover:bg-foreground/5"
                  aria-label="Aumentar"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-[14px] font-medium text-background transition-transform hover:scale-[1.01]"
              >
                Adicionar à sacola <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <a
              href={`https://wa.me/5531983194026?text=${encodeURIComponent(
                `Olá! Tenho interesse no ${product.name}${variant ? ` (${variant})` : ""}.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-transparent text-[13px] font-medium text-foreground hover:bg-foreground/5"
            >
              <MessageCircle className="h-4 w-4" /> Tirar dúvida no WhatsApp
            </a>

            {/* Trust badges */}
            <ul className="mt-8 grid grid-cols-2 gap-3 text-[12px] text-muted-foreground">
              <li className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-foreground" /> Envio em 24h</li>
              <li className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-foreground" /> Garantia oficial 12 meses</li>
              <li className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-foreground" /> Pagamento seguro</li>
              <li className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-foreground" /> Nota fiscal</li>
            </ul>
          </div>
        </section>

        {/* Highlights + Specs */}
        {(product.highlights.length > 0 || Object.keys(product.specs).length > 0) && (
          <section className="border-t border-border bg-[color:var(--surface)] py-14">
            <div className="mx-auto grid max-w-[1280px] gap-10 px-5 md:grid-cols-2 md:px-10">
              {product.highlights.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold">Destaques</h2>
                  <ul className="mt-5 space-y-3">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[14px] text-foreground">
                        <Check className="mt-0.5 h-4 w-4 text-[color:var(--brand)]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {Object.keys(product.specs).length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold">Especificações</h2>
                  <dl className="mt-5 divide-y divide-border rounded-2xl border border-border bg-background">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between px-5 py-3 text-[13px]">
                        <dt className="capitalize text-muted-foreground">{k}</dt>
                        <dd className="text-right text-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
