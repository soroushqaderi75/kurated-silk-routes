import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  product_id: string;
  product_code: string;
  title: string;
  brand_name?: string | null;
  image_url?: string | null;
  unit_price: number;
}

interface CartCtx {
  items: CartItem[];
  add: (i: CartItem) => void;
  remove: (product_id: string) => void;
  clear: () => void;
  subtotal: number;
  count: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "archive_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((i: CartItem) => {
    setItems((prev) => (prev.some((x) => x.product_id === i.product_id) ? prev : [...prev, i]));
  }, []);
  const remove = useCallback((product_id: string) => {
    setItems((prev) => prev.filter((x) => x.product_id !== product_id));
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.unit_price, 0), [items]);

  return (
    <Ctx.Provider value={{ items, add, remove, clear, subtotal, count: items.length }}>{children}</Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
