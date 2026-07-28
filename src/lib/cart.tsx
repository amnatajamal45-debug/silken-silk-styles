import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export interface CartLine {
  id: string;
  size: string;
  colour: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: Array<CartLine & { product: Product; unit: number }>;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "anaya-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const detailed = lines
      .map((l) => {
        const product = products.find((p) => p.id === l.id);
        if (!product) return null;
        return { ...l, product, unit: product.discountPrice ?? product.price };
      })
      .filter(Boolean) as CartCtx["detailed"];

    return {
      lines,
      detailed,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: detailed.reduce((n, l) => n + l.unit * l.qty, 0),
      add: (line) =>
        setLines((prev) => {
          const i = prev.findIndex(
            (p) => p.id === line.id && p.size === line.size && p.colour === line.colour,
          );
          if (i === -1) return [...prev, line];
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + line.qty };
          return next;
        }),
      remove: (index) => setLines((prev) => prev.filter((_, i) => i !== index)),
      setQty: (index, qty) =>
        setLines((prev) =>
          prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, qty) } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
