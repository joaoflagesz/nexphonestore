import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string, variant?: string) => void;
  updateQuantity: (slug: string, quantity: number, variant?: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "nexphone.cart.v1";
const FREE_SHIPPING_THRESHOLD = 999;
const FLAT_SHIPPING = 29.9;

function sameLine(a: CartItem, slug: string, variant?: string) {
  return a.slug === slug && (a.variant ?? "") === (variant ?? "");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
    const total = subtotal + shipping;

    return {
      items,
      count,
      subtotal,
      shipping,
      total,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
      addItem: (item, quantity = 1) => {
        setItems((current) => {
          const idx = current.findIndex((c) => sameLine(c, item.slug, item.variant));
          if (idx >= 0) {
            const copy = [...current];
            copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
            return copy;
          }
          return [...current, { ...item, quantity }];
        });
        setIsOpen(true);
      },
      removeItem: (slug, variant) => {
        setItems((current) => current.filter((c) => !sameLine(c, slug, variant)));
      },
      updateQuantity: (slug, quantity, variant) => {
        setItems((current) => {
          if (quantity <= 0) return current.filter((c) => !sameLine(c, slug, variant));
          return current.map((c) =>
            sameLine(c, slug, variant) ? { ...c, quantity } : c,
          );
        });
      },
      clear: () => setItems([]),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
