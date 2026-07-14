import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatBRL } from "@/lib/product-images";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, subtotal, shipping, total } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Sacola de compras"
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-background text-foreground shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <h2 className="text-[15px] font-semibold">Sua sacola</h2>
            <span className="text-[12px] text-muted-foreground">
              ({items.reduce((s, i) => s + i.quantity, 0)} itens)
            </span>
          </div>
          <button
            onClick={close}
            aria-label="Fechar"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-foreground/5"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-foreground/5">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="mt-4 text-[15px] font-medium">Sua sacola está vazia</p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Adicione produtos para continuar.
              </p>
              <button
                onClick={close}
                className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-[13px] font-medium text-background"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.slug}-${item.variant ?? ""}`} className="flex gap-4 py-5">
                  <Link
                    to="/produto/$slug"
                    params={{ slug: item.slug }}
                    onClick={close}
                    className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-[color:var(--surface)]"
                  >
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/produto/$slug"
                      params={{ slug: item.slug }}
                      onClick={close}
                      className="line-clamp-2 text-[13px] font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </Link>
                    {item.variant && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{item.variant}</p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          aria-label="Diminuir"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1, item.variant)}
                          className="grid h-8 w-8 place-items-center hover:bg-foreground/5"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[28px] text-center text-[12px] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Aumentar"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1, item.variant)}
                          className="grid h-8 w-8 place-items-center hover:bg-foreground/5"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-[13px] font-semibold">
                          {formatBRL(item.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeItem(item.slug, item.variant)}
                          className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="h-3 w-3" /> Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border bg-[color:var(--surface)] px-6 py-5">
            <dl className="space-y-1.5 text-[13px]">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="text-foreground">{formatBRL(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Frete</dt>
                <dd className="text-foreground">
                  {shipping === 0 ? "Grátis" : formatBRL(shipping)}
                </dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-border pt-3 text-[15px] font-semibold">
                <dt>Total</dt>
                <dd>{formatBRL(total)}</dd>
              </div>
              <p className="text-[11px] text-[color:var(--brand)]">
                No PIX: {formatBRL(Math.round(total * 0.9))} (10% OFF)
              </p>
            </dl>
            <a
              href={`https://wa.me/5531983194026?text=${encodeURIComponent(
                "Olá! Quero finalizar meu pedido:\n\n" +
                  items.map((i) => `• ${i.quantity}x ${i.name} — ${formatBRL(i.price * i.quantity)}`).join("\n") +
                  `\n\nTotal: ${formatBRL(total)}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-[14px] font-medium text-background transition-transform hover:scale-[1.01]"
            >
              Finalizar no WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={close}
              className="mt-2 w-full text-center text-[12px] text-muted-foreground hover:text-foreground"
            >
              Continuar comprando
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
