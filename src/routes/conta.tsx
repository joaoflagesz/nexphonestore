import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  User as UserIcon,
  Package,
  Heart,
  KeyRound,
  LogOut,
  Loader2,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-store";
import { fetchOrders, fetchFavorites, removeFavorite } from "@/lib/favorites";
import { formatBRL, resolveProductImage } from "@/lib/product-images";
import { Nav, Footer, WhatsAppFab, LaunchStrip } from "@/components/nexphone";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  tab: fallback(z.string(), "perfil").default("perfil"),
});

export const Route = createFileRoute("/conta")({
  component: AccountPage,
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [{ title: "Minha conta — NexPhoneStore" }],
  }),
});

type Tab = "perfil" | "pedidos" | "favoritos" | "senha";

function AccountPage() {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const tab = (search.tab as Tab) ?? "perfil";

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LaunchStrip />
      <Nav />
      <main className="pt-14">
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
          <nav className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Minha conta</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Olá, {profile?.full_name?.split(" ")[0] || "cliente"}
          </h1>
          <p className="mt-2 text-[14px] text-muted-foreground">Gerencie seus dados, pedidos e favoritos.</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-1">
              <TabLink current={tab} value="perfil" icon={UserIcon}>Meus dados</TabLink>
              <TabLink current={tab} value="pedidos" icon={Package}>Meus pedidos</TabLink>
              <TabLink current={tab} value="favoritos" icon={Heart}>Favoritos</TabLink>
              <TabLink current={tab} value="senha" icon={KeyRound}>Alterar senha</TabLink>
              <button
                onClick={async () => { await signOut(); navigate({ to: "/" }); }}
                className="mt-4 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-muted-foreground hover:bg-foreground/5"
              >
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </aside>

            <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
              {tab === "perfil" && <ProfileTab />}
              {tab === "pedidos" && <OrdersTab userId={user.id} />}
              {tab === "favoritos" && <FavoritesTab userId={user.id} />}
              {tab === "senha" && <PasswordTab />}
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function TabLink({
  current,
  value,
  icon: Icon,
  children,
}: {
  current: Tab;
  value: Tab;
  icon: typeof UserIcon;
  children: React.ReactNode;
}) {
  const active = current === value;
  return (
    <Link
      to="/conta"
      search={{ tab: value } as any}
      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
        active ? "bg-foreground text-background" : "text-foreground hover:bg-foreground/5"
      }`}
    >
      <Icon className="h-4 w-4" /> {children}
    </Link>
  );
}

function ProfileTab() {
  const { profile } = useAuth();
  if (!profile) return null;
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Meus dados</h2>
      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
        <Row label="Nome" value={profile.full_name} />
        <Row label="CPF" value={maskDisplayCpf(profile.cpf)} />
        <Row label="Telefone" value={profile.phone ?? "—"} />
        <Row label="E-mail" value={profile.email} />
      </dl>
    </div>
  );
}

function maskDisplayCpf(cpf: string): string {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11) return cpf;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-5 py-3 text-[13px]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

function OrdersTab({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<any[] | null>(null);
  useEffect(() => {
    fetchOrders(userId).then(setOrders).catch(() => setOrders([]));
  }, [userId]);

  if (!orders) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Meus pedidos</h2>
      {orders.length === 0 ? (
        <p className="mt-6 text-[14px] text-muted-foreground">Você ainda não tem pedidos.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {orders.map((o) => (
            <li key={o.id} className="rounded-2xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-foreground">Pedido #{o.id.slice(0, 8)}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("pt-BR")} · {o.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold">{formatBRL(o.total)}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {(o.order_items ?? []).length} {(o.order_items ?? []).length === 1 ? "item" : "itens"}
                  </p>
                </div>
              </div>
              {o.order_items && o.order_items.length > 0 && (
                <ul className="mt-3 space-y-1 border-t border-border pt-3 text-[12px] text-muted-foreground">
                  {o.order_items.map((it: any) => (
                    <li key={it.id}>{it.quantity}× {it.product_name} {it.variant ? `(${it.variant})` : ""}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FavoritesTab({ userId }: { userId: string }) {
  const [favs, setFavs] = useState<any[] | null>(null);
  const load = () => fetchFavorites(userId).then(setFavs).catch(() => setFavs([]));
  useEffect(() => { load(); }, [userId]);

  if (!favs) return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Favoritos</h2>
      {favs.length === 0 ? (
        <p className="mt-6 text-[14px] text-muted-foreground">Você ainda não favoritou nenhum produto.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {favs.map((f) => {
            const p = f.products;
            if (!p) return null;
            return (
              <div key={f.id} className="flex gap-3 rounded-2xl border border-border p-3">
                <Link to="/produto/$slug" params={{ slug: p.slug }} className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-[color:var(--surface)]">
                  <img src={resolveProductImage(p.slug, p.image)} alt={p.name} className="h-full w-full object-contain p-2" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to="/produto/$slug" params={{ slug: p.slug }} className="line-clamp-2 text-[13px] font-semibold text-foreground hover:underline">{p.name}</Link>
                  <p className="mt-1 text-[13px] text-foreground">{formatBRL(Number(p.price))}</p>
                  <button
                    onClick={async () => { await removeFavorite(userId, p.id); load(); }}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="h-3 w-3" /> Remover
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PasswordTab() {
  const { updatePassword } = useAuth();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setOk(false);
    if (pw.length < 6) return setMsg("Mínimo 6 caracteres.");
    if (pw !== confirm) return setMsg("As senhas não coincidem.");
    setLoading(true);
    try {
      await updatePassword(pw);
      setOk(true);
      setPw(""); setConfirm("");
    } catch (err: any) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">Alterar senha</h2>
      <form onSubmit={submit} className="mt-6 max-w-sm space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium">Nova senha</span>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="input" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] font-medium">Confirmar senha</span>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input" />
        </label>
        {msg && <p className="text-[13px] text-red-500">{msg}</p>}
        {ok && <p className="text-[13px] text-green-600">Senha atualizada com sucesso.</p>}
        <button disabled={loading} className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-[13px] font-medium text-background disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Salvar"}
        </button>
      </form>
    </div>
  );
}
// keep supabase import referenced to prevent tree-shake surprises in dev
void supabase;
