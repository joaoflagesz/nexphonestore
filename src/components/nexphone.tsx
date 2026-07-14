import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Lock,
  Headphones,
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Plus,
  Minus,
  Check,
  Apple,
} from "lucide-react";

import heroIphone from "@/assets/hero-iphone.jpg";
import catWatch from "@/assets/cat-watch.jpg";
import catAirpods from "@/assets/cat-airpods.jpg";
import catMacbook from "@/assets/cat-macbook.jpg";
import catIpad from "@/assets/cat-ipad.jpg";
import prodIphone16 from "@/assets/prod-iphone16.jpg";
import prodIphone15 from "@/assets/prod-iphone15.jpg";
import prodWatch from "@/assets/prod-watch.jpg";
import prodAirpods from "@/assets/prod-airpods.jpg";
import prodMacbook from "@/assets/prod-macbook.jpg";
import prodIpad from "@/assets/prod-ipad.jpg";
import prodMagsafe from "@/assets/prod-magsafe.jpg";

import { useCart } from "@/lib/cart-store";
import { formatBRL } from "@/lib/product-images";

/* ---------------- Nav ---------------- */

const NAV_LINKS: { label: string; to: string; params?: Record<string, string> }[] = [
  { label: "iPhone", to: "/categoria/$slug", params: { slug: "iphone" } },
  { label: "Apple Watch", to: "/categoria/$slug", params: { slug: "watch" } },
  { label: "AirPods", to: "/categoria/$slug", params: { slug: "airpods" } },
  { label: "Mac", to: "/categoria/$slug", params: { slug: "mac" } },
  { label: "iPad", to: "/categoria/$slug", params: { slug: "ipad" } },
  { label: "Acessórios", to: "/categoria/$slug", params: { slug: "acessorios" } },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cart = useCart();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-black">
            <Apple className="h-4 w-4" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            NexPhone<span className="text-white/60">Store</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              params={l.params as any}
              className="text-[13px] text-white/75 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 text-white">
          <button aria-label="Buscar" className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Conta" className="hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10 sm:grid">
            <User className="h-4 w-4" />
          </button>
          <button
            aria-label="Sacola"
            onClick={cart.open}
            className="relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10"
          >
            <ShoppingBag className="h-4 w-4" />
            {cart.count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[color:var(--brand)] px-1 text-[10px] font-semibold text-white">
                {cart.count}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-dark border-t border-white/5 lg:hidden">
          <div className="mx-auto max-w-[1440px] px-5 py-4">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  params={l.params as any}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#050505] text-white">
      {/* Ambient radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,122,255,0.35), transparent 60%), radial-gradient(ellipse 60% 40% at 80% 0%, rgba(120,80,255,0.18), transparent 60%)",
        }}
      />
      {/* Grid */}
      <div
        aria-hidden
        className="grid-fade-mask pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-center gap-8 px-5 pt-24 pb-16 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ opacity }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <Sparkles className="h-3 w-3 text-[color:var(--brand)]" />
            Nova coleção · iPhone 16 Pro
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[88px]">
            Seu próximo <br />
            iPhone começa <span className="text-gradient-brand">aqui.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-lg">
            iPhones, Apple Watch, AirPods e acessórios premium com garantia oficial,
            entrega para todo o Brasil e atendimento especializado — como só a
            NexPhoneStore oferece.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/categoria/$slug"
              params={{ slug: "iphone" }}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-medium text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_0_6px_rgba(255,255,255,0.08)]"
            >
              Comprar agora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://wa.me/5531983194026"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[14px] font-medium text-white backdrop-blur transition-all hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-white/55">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Garantia 12 meses</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Pix com 10% OFF</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Até 12x sem juros</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[color:var(--brand)]" /> Frete grátis acima de R$ 999</span>
          </div>
        </motion.div>

        <motion.div style={{ y, scale }} className="relative flex justify-center lg:justify-end">
          <div className="relative aspect-square w-full max-w-[640px]">
            <div className="absolute inset-0 blur-3xl" style={{ background: "radial-gradient(circle at 50% 60%, rgba(0,122,255,0.35), transparent 55%)" }} />
            <motion.img
              src={heroIphone}
              alt="iPhone 16 Pro em titânio natural"
              width={1600}
              height={1600}
              fetchPriority="high"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_60px_80px_rgba(0,0,0,0.6)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/5 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center gap-10 overflow-hidden px-5 py-3 text-[11px] uppercase tracking-[0.24em] text-white/40 md:px-10">
          <span>Autorização Apple</span>
          <span>·</span>
          <span>Nota fiscal</span>
          <span>·</span>
          <span>Envio em 24h</span>
          <span>·</span>
          <span>Pagamento seguro</span>
          <span>·</span>
          <span>Mercado Pago</span>
          <span>·</span>
          <span>PIX 10% off</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust bar ---------------- */

const TRUST = [
  { icon: Truck, title: "Entrega para todo Brasil", sub: "Envio expresso em 24h" },
  { icon: ShieldCheck, title: "Garantia oficial", sub: "12 meses direto na Apple" },
  { icon: Lock, title: "Pagamento seguro", sub: "Criptografia + Mercado Pago" },
  { icon: Headphones, title: "Atendimento especializado", sub: "Consultores Apple 7 dias" },
];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-[color:var(--surface)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-start gap-4 bg-[color:var(--surface)] px-6 py-8">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-foreground text-background">
              <t.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-foreground">{t.title}</div>
              <div className="text-[12px] text-muted-foreground">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Featured showcase ---------------- */

export function Showcase() {
  return (
    <section id="lancamentos" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          eyebrow="Lançamentos"
          title="Feito para desejar. Pronto para durar."
          subtitle="Dispositivos Apple novos e seminovos certificados, com garantia e nota fiscal."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2 md:gap-5">
          {/* Big card */}
          <article className="group relative col-span-1 flex min-h-[520px] flex-col justify-between overflow-hidden rounded-3xl bg-black p-8 text-white md:col-span-4 md:row-span-2 md:p-12">
            <div className="relative z-10 max-w-md">
              <span className="text-[11px] uppercase tracking-[0.24em] text-white/50">Novidade</span>
              <h3 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                iPhone 16 Pro
              </h3>
              <p className="mt-3 text-white/70">
                Titânio. Chip A18 Pro. Câmera Fusion 48 MP. A partir de{" "}
                <span className="font-semibold text-white">R$ 9.499</span> à vista.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  to="/produto/$slug"
                  params={{ slug: "iphone-16-pro-256gb" }}
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-medium text-black transition-transform hover:scale-[1.03]"
                >
                  Comprar <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/produto/$slug"
                  params={{ slug: "iphone-16-pro-256gb" }}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-5 text-[13px] font-medium text-white transition-colors hover:bg-white/10"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
            <img
              src={heroIphone}
              alt=""
              loading="lazy"
              width={1600}
              height={1600}
              className="pointer-events-none absolute -right-16 -bottom-10 h-[130%] w-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-105 md:-right-6"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.35),transparent_55%)]" />
          </article>

          <BentoCard
            image={catWatch}
            title="Apple Watch S10"
            price="R$ 4.299"
            tone="dark"
            slug="apple-watch-s10-42mm"
            className="md:col-span-2"
          />
          <BentoCard
            image={catAirpods}
            title="AirPods Pro 2"
            price="R$ 1.899"
            tone="light"
            slug="airpods-pro-2-usbc"
            className="md:col-span-2"
          />

          <BentoCard
            image={catMacbook}
            title="MacBook Air M3"
            price="R$ 9.499"
            tone="dark"
            slug="macbook-air-m3-13"
            wide
            className="md:col-span-3"
          />
          <BentoCard
            image={catIpad}
            title="iPad Air M2"
            price="R$ 6.299"
            tone="dark"
            slug="ipad-air-m2-11"
            wide
            className="md:col-span-3"
          />
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  image,
  title,
  price,
  tone,
  slug,
  className = "",
  wide = false,
}: {
  image: string;
  title: string;
  price: string;
  tone: "light" | "dark";
  slug: string;
  className?: string;
  wide?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <Link
      to="/produto/$slug"
      params={{ slug }}
      className={`group relative flex ${
        wide ? "min-h-[280px]" : "min-h-[300px]"
      } flex-col justify-between overflow-hidden rounded-3xl p-7 ${
        dark ? "bg-[#0f0f10] text-white" : "bg-[color:var(--surface)] text-foreground"
      } ${className}`}
    >
      <div className="relative z-10">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
        <p className={`mt-1 text-[13px] ${dark ? "text-white/60" : "text-muted-foreground"}`}>
          A partir de <span className={dark ? "font-medium text-white" : "font-medium text-foreground"}>{price}</span>
        </p>
      </div>
      <div className="relative z-10 flex items-center gap-2 text-[12px] font-medium">
        Ver produto
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
      <img
        src={image}
        alt=""
        loading="lazy"
        className={`pointer-events-none absolute ${
          wide ? "right-0 bottom-0 h-[110%] object-right-bottom" : "-right-6 top-1/2 -translate-y-1/2 h-[85%]"
        } w-auto object-contain transition-transform duration-700 group-hover:scale-[1.06]`}
      />
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--brand)]">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] text-muted-foreground md:text-base">{subtitle}</p>
      )}
    </div>
  );
}

/* ---------------- Categories ---------------- */

const CATEGORIES: { name: string; count: number; slug: string }[] = [
  { name: "iPhone", count: 42, slug: "iphone" },
  { name: "Apple Watch", count: 18, slug: "watch" },
  { name: "AirPods", count: 12, slug: "airpods" },
  { name: "MacBook", count: 22, slug: "mac" },
  { name: "iPad", count: 16, slug: "ipad" },
  { name: "Acessórios", count: 87, slug: "acessorios" },
  { name: "Capinhas", count: 87, slug: "acessorios" },
  { name: "Cabos", count: 28, slug: "acessorios" },
  { name: "Carregadores", count: 31, slug: "acessorios" },
  { name: "MagSafe", count: 19, slug: "acessorios" },
  { name: "Power Bank", count: 14, slug: "acessorios" },
  { name: "Caixas de Som", count: 11, slug: "acessorios" },
];

export function Categories() {
  return (
    <section id="categorias" className="relative bg-[color:var(--surface)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Categorias"
            title="Explore o ecossistema Apple."
            subtitle="Do iPhone ao MagSafe. Do trabalho ao lazer. Tudo com procedência."
          />
          <Link to="/categoria/$slug" params={{ slug: "iphone" }} className="story-link inline-flex items-center gap-1 text-[13px] font-medium text-foreground">
            Ver tudo <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Link
              key={`${c.name}-${i}`}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-5 text-left transition-all hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:shadow-[var(--shadow-soft)]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-foreground/5 text-foreground transition-colors group-hover:bg-[color:var(--brand)] group-hover:text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[14px] font-semibold text-foreground">{c.name}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{c.count} produtos</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products grid ---------------- */

type Product = {
  id: string;
  slug: string;
  name: string;
  tag?: string;
  price: number;
  oldPrice?: number;
  installments: string;
  image: string;
  colors?: string[];
  rating: number;
};

const PRODUCTS: Product[] = [
  { id: "1", slug: "iphone-16-pro-256gb", name: "iPhone 16 Pro 256GB", tag: "Lançamento", price: 9499, oldPrice: 10499, installments: "12x R$ 791,58", image: prodIphone16, colors: ["#8b7d6c", "#111", "#e3e3e3", "#3a5a8a"], rating: 4.9 },
  { id: "2", slug: "iphone-15-pro-128gb", name: "iPhone 15 Pro 128GB", tag: "Mais vendido", price: 6799, oldPrice: 7999, installments: "12x R$ 566,58", image: prodIphone15, colors: ["#2a5a8a", "#111", "#8b7d6c", "#fff"], rating: 4.8 },
  { id: "3", slug: "apple-watch-s10-42mm", name: "Apple Watch S10 GPS 42mm", price: 4299, installments: "12x R$ 358,25", image: prodWatch, colors: ["#111", "#e3e3e3", "#f7b6c2"], rating: 4.9 },
  { id: "4", slug: "airpods-pro-2-usbc", name: "AirPods Pro 2 USB-C", tag: "Oferta", price: 1899, oldPrice: 2299, installments: "10x R$ 189,90", image: prodAirpods, rating: 4.9 },
  { id: "5", slug: "macbook-air-m3-13", name: "MacBook Air M3 13\" 256GB", price: 9499, installments: "12x R$ 791,58", image: prodMacbook, colors: ["#111", "#e3e3e3", "#8b7d6c"], rating: 5.0 },
  { id: "6", slug: "ipad-air-m2-11", name: "iPad Air M2 11\" 128GB", price: 6299, installments: "12x R$ 524,92", image: prodIpad, colors: ["#111", "#e3e3e3", "#b9c4d9", "#c8a2a2"], rating: 4.8 },
  { id: "7", slug: "carregador-magsafe-25w", name: "Carregador MagSafe 25W", tag: "Novo", price: 599, installments: "6x R$ 99,83", image: prodMagsafe, rating: 4.7 },
  { id: "8", slug: "iphone-15-128gb", name: "iPhone 15 128GB", price: 5299, oldPrice: 5999, installments: "12x R$ 441,58", image: prodIphone15, colors: ["#3a5a8a", "#111"], rating: 4.7 },
];

export function Products() {
  return (
    <section id="produtos" className="relative bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="Produtos em destaque" title="Escolhidos a dedo." subtitle="Curadoria semanal dos itens mais desejados." />
          <div className="flex gap-2">
            <FilterPill active>Todos</FilterPill>
            <FilterPill>iPhone</FilterPill>
            <FilterPill>Watch</FilterPill>
            <FilterPill>AirPods</FilterPill>
            <FilterPill>Mac</FilterPill>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterPill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`inline-flex h-9 items-center rounded-full border px-4 text-[12px] font-medium transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-transparent text-foreground hover:border-[color:var(--border-strong)]"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  const { addItem } = useCart();
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ slug: p.slug, name: p.name, price: p.price, image: p.image });
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
          width={800}
          height={800}
          className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />
        <button
          aria-label="Adicionar à sacola"
          onClick={handleAdd}
          className="absolute right-3 bottom-3 grid h-10 w-10 translate-y-4 place-items-center rounded-full bg-foreground text-background opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110"
        >
          <Plus className="h-4 w-4" />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Star className="h-3 w-3 fill-current text-yellow-500" /> {p.rating.toFixed(1)}
          <span className="text-border">·</span>
          <span>em estoque</span>
        </div>
        <Link
          to="/produto/$slug"
          params={{ slug: p.slug }}
          className="text-[14px] font-semibold leading-tight text-foreground hover:underline"
        >
          {p.name}
        </Link>
        {p.colors && (
          <div className="flex gap-1.5">
            {p.colors.map((c) => (
              <span key={c} className="h-3 w-3 rounded-full border border-border" style={{ background: c }} />
            ))}
          </div>
        )}
        <div className="mt-1 flex items-baseline gap-2">
          {p.oldPrice && (
            <span className="text-[12px] text-muted-foreground line-through">
              {formatBRL(p.oldPrice)}
            </span>
          )}
          <span className="text-[18px] font-semibold text-foreground">
            {formatBRL(p.price)}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          ou <span className="text-foreground">{p.installments}</span> sem juros
        </div>
        <div className="text-[11px] font-medium text-[color:var(--brand)]">
          {formatBRL(Math.round(p.price * 0.9))} no PIX
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleAdd}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-foreground text-[12px] font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Adicionar à sacola
          </button>
          <Link
            to="/produto/$slug"
            params={{ slug: p.slug }}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border px-4 text-[12px] font-medium text-foreground hover:bg-foreground/5"
          >
            Ver
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------- Promo banner ---------------- */

export function PromoBanner() {
  return (
    <section id="promocoes" className="relative overflow-hidden bg-background py-8 md:py-14">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0a0a0a] via-[#101020] to-[#0a0a0a] p-8 text-white md:p-16">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,122,255,0.35), transparent 60%)" }} />
          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                <Zap className="h-3 w-3 text-yellow-300" /> Semana Premium
              </span>
              <h3 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Até <span className="text-gradient-brand">30% OFF</span> em toda a linha Apple.
              </h3>
              <p className="mt-4 max-w-md text-white/70">
                Aproveite condições especiais em iPhone, Watch, AirPods e MacBook. Pix com 10% adicional.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/categoria/$slug"
                  params={{ slug: "iphone" }}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-medium text-black transition-transform hover:scale-[1.03]"
                >
                  Ver ofertas <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://wa.me/5531983194026?text=Ol%C3%A1!%20Quero%20usar%20o%20cupom%20NEXPRO10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-6 text-[13px] font-medium text-white hover:bg-white/10"
                >
                  Cupom NEXPRO10
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <StatCard value="+50 mil" label="Clientes satisfeitos" />
                <StatCard value="4.9/5" label="Avaliação média" />
                <StatCard value="24h" label="Envio expresso" />
                <StatCard value="12x" label="Sem juros" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="font-display text-3xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[12px] text-white/60">{label}</div>
    </div>
  );
}

/* ---------------- Reviews ---------------- */

const REVIEWS = [
  { name: "Marina S.", city: "São Paulo, SP", text: "Comprei o iPhone 15 Pro e chegou em 24h, embalagem impecável. Melhor atendimento que já tive.", stars: 5 },
  { name: "Rafael A.", city: "Curitiba, PR", text: "Preço melhor que a Apple oficial, com garantia e nota. Recomendo demais.", stars: 5 },
  { name: "Carla P.", city: "Belo Horizonte, MG", text: "Consultora tirou todas as dúvidas antes da compra. Chegou tudo certinho.", stars: 5 },
  { name: "Bruno L.", city: "Rio de Janeiro, RJ", text: "Meu terceiro pedido. Confiança total. Já indiquei para minha família toda.", stars: 5 },
  { name: "Julia F.", city: "Porto Alegre, RS", text: "Loja mais bonita e organizada que já vi. Compra rápida e sem estresse.", stars: 5 },
];

export function Reviews() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--surface)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          eyebrow="Avaliações reais"
          title="Mais de 50 mil clientes satisfeitos."
          subtitle="Nota 4.9/5 no Google e Reclame Aqui RA1000."
          align="center"
        />
      </div>
      <div className="relative mt-14 overflow-hidden">
        <div className="flex w-max marquee gap-5 px-5">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <div key={i} className="w-[340px] shrink-0 rounded-3xl border border-border bg-background p-6">
              <div className="flex gap-0.5 text-yellow-500">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-foreground">"{r.text}"</p>
              <div className="mt-4 text-[12px] font-medium text-foreground">{r.name}</div>
              <div className="text-[11px] text-muted-foreground">{r.city} · Compra verificada</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners / Instagram / FAQ / Footer ---------------- */

export function Partners() {
  const items = ["Apple", "Mercado Pago", "Cielo", "PagBank", "Correios", "Loggi", "Google", "Trustvox"];
  return (
    <section className="border-y border-border bg-background py-12">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="text-center text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          Parceiros de confiança
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold text-muted-foreground opacity-70">
          {items.map((i) => (
            <span key={i} className="tracking-tight">{i}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramSection() {
  const grid = [prodIphone16, prodWatch, prodAirpods, prodMacbook, prodIpad, prodMagsafe];
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow="@nexphonestore.br" title="Siga a NexPhone no Instagram." subtitle="Novidades, unboxings e ofertas exclusivas todos os dias." />
          <a href="https://instagram.com/nexphonestore.br" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground">
            <Instagram className="h-4 w-4" /> Seguir
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
          {grid.map((img, i) => (
            <a key={i} href="https://instagram.com/nexphonestore.br" target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-2xl bg-[color:var(--surface)]">
              <img src={img} alt="" loading="lazy" className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                <Instagram className="h-6 w-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: "Os produtos são originais?", a: "Sim. Todos os produtos vendidos pela NexPhoneStore são 100% originais Apple, lacrados e acompanham nota fiscal + garantia oficial de 12 meses." },
  { q: "Qual o prazo de entrega?", a: "Envio em até 24h úteis após confirmação do pagamento. Entregamos em todo o Brasil via Correios e transportadoras premium (SEDEX, Loggi)." },
  { q: "Posso parcelar sem juros?", a: "Sim, em até 12x sem juros nos cartões Visa, Mastercard, Elo e Amex via Mercado Pago. Boleto e Pix têm 10% de desconto." },
  { q: "Como funciona a garantia?", a: "Garantia oficial Apple de 12 meses, cobrindo defeitos de fabricação. Assistência técnica em toda rede autorizada Apple no Brasil." },
  { q: "Trocas e devoluções?", a: "Você tem 7 dias corridos após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[color:var(--surface)] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <SectionHeader eyebrow="Dúvidas frequentes" title="Tudo o que você precisa saber." align="center" />
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-background">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-foreground">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <div
                  className="overflow-hidden px-6 text-[14px] leading-relaxed text-muted-foreground transition-all duration-300"
                  style={{ maxHeight: isOpen ? 200 : 0, paddingBottom: isOpen ? 20 : 0 }}
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] pt-20 pb-10 text-white/70">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,122,255,0.15), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black">
                <Apple className="h-4 w-4" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight">
                NexPhone<span className="text-white/60">Store</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed">
              A loja premium do universo Apple no Brasil. iPhones, Apple Watch, AirPods, Macs e acessórios com garantia oficial e atendimento especializado.
            </p>
            <div className="mt-6 flex gap-2">
              <a href="https://instagram.com/nexphonestore.br" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://wa.me/5531983194026" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors hover:bg-white/10">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 transition-colors hover:bg-white/10">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 text-[12px] text-white/50">
              <p>Vendas: (31) 98319-4026</p>
              <p>Suporte: (31) 99733-1486</p>
            </div>
          </div>
          <FooterCol title="Loja" items={["iPhone", "Apple Watch", "AirPods", "MacBook", "iPad", "Acessórios"]} />
          <FooterCol title="Ajuda" items={["Central de ajuda", "Rastrear pedido", "Trocas e devoluções", "Formas de pagamento", "Garantia"]} />
          <FooterCol title="NexPhoneStore" items={["Sobre nós", "Contato", "Blog", "Trabalhe conosco", "Política de privacidade"]} />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-[12px] text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} NexPhoneStore · CNPJ 00.000.000/0001-00 · Todos os direitos reservados.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Compra 100% segura</span>
            <span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> SSL 256-bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">{title}</div>
      <ul className="mt-5 space-y-3 text-[13px]">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="transition-colors hover:text-white">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/5531983194026"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.5)] transition-transform hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}

export function LaunchStrip() {
  return (
    <div className="bg-black py-2.5 text-center text-[11px] font-medium tracking-wide text-white/80">
      Frete grátis acima de R$ 999 · Pix com 10% OFF · 12x sem juros ·
      <a href="#" className="ml-1 text-white underline underline-offset-2">saiba mais</a>
    </div>
  );
}
