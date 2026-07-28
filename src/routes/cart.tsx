import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPKR } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Anaya Atelier" },
      {
        name: "description",
        content: "Review the pieces in your Anaya Atelier bag, apply a coupon and proceed to checkout.",
      },
      { property: "og:title", content: "Your Bag — Anaya Atelier" },
      { property: "og:description", content: "Review your Anaya Atelier bag and checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { detailed, setQty, remove, subtotal, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 350;
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "ANAYA10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Coupon applied — 10% off");
    } else {
      setDiscount(0);
      toast.error("That coupon isn't valid");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Your Bag</h1>

      {detailed.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Button variant="couture" size="lg" asChild className="mt-6">
            <Link to="/shop">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ul className="divide-y divide-border border-y border-border">
            {detailed.map((line, i) => (
              <li key={`${line.id}-${line.size}-${line.colour}`} className="flex gap-4 py-6">
                <Link
                  to="/product/$productId"
                  params={{ productId: line.id }}
                  className="w-24 shrink-0 sm:w-28"
                >
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </Link>
                <div className="grid min-w-0 flex-1 content-start gap-1">
                  <h2 className="truncate text-sm font-medium">{line.product.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {line.size} · {line.colour}
                  </p>
                  <p className="text-sm">{formatPKR(line.unit)}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center border border-border">
                      <button
                        aria-label="Decrease quantity"
                        className="grid size-9 place-items-center hover:bg-secondary"
                        onClick={() => setQty(i, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{line.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        className="grid size-9 place-items-center hover:bg-secondary"
                        onClick={() => setQty(i, line.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      aria-label={`Remove ${line.product.name}`}
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => remove(i)}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm">{formatPKR(line.unit * line.qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border p-6">
            <h2 className="eyebrow">Order summary</h2>
            <form className="mt-4 flex gap-2" onSubmit={applyCoupon}>
              <Input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                aria-label="Coupon code"
              />
              <Button type="submit" variant="line">
                Apply
              </Button>
            </form>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPKR(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-accent-foreground">
                  <dt>Discount</dt>
                  <dd>−{formatPKR(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPKR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatPKR(total)}</dd>
              </div>
            </dl>
            <Button
              variant="couture"
              size="lg"
              className="mt-6 w-full"
              onClick={() => {
                toast.success("Order placed — a confirmation is on its way.");
                clear();
              }}
            >
              Proceed to checkout
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Try coupon ANAYA10 for 10% off
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
