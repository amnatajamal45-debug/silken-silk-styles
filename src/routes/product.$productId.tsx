import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { formatPKR, getProduct, products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/product/$productId")({
  loader: ({ params }): { product: Product } => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Anaya Atelier" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Anaya Atelier`;
    const description = `${product.name} in ${product.fabric}. ${formatPKR(product.discountPrice ?? product.price)}. Hand-finished ${product.category.toLowerCase()} from Anaya Atelier.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
  errorComponent: () => (
    <div className="mx-auto max-w-md px-4 py-32 text-center">
      <h1 className="text-2xl">This piece couldn't load</h1>
      <Link to="/shop" className="mt-4 inline-block underline">
        Back to shop
      </Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-32 text-center">
      <h1 className="text-2xl">Piece not found</h1>
      <Link to="/shop" className="mt-4 inline-block underline">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [colour, setColour] = useState(product.colours[0]);
  const [qty, setQty] = useState(1);
  const price = product.discountPrice ?? product.price;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const addToCart = () => {
    add({ id: product.id, size, colour, qty });
    toast.success(`${product.name} added to your bag`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="eyebrow mb-8" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid gap-3 sm:grid-cols-2 lg:sticky lg:top-32 lg:self-start">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`group overflow-hidden bg-secondary ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <img
                src={product.image}
                alt={`${product.name} view ${i + 1}`}
                loading={i === 0 ? undefined : "lazy"}
                width={800}
                height={1000}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="lg:pl-8">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex text-accent">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            {product.rating.toFixed(1)} · SKU {product.sku}
          </div>

          <p className="mt-6 text-2xl">
            {formatPKR(price)}
            {product.discountPrice && (
              <span className="ml-3 text-base text-muted-foreground line-through">
                {formatPKR(product.price)}
              </span>
            )}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="eyebrow">Size</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-h-11 min-w-11 border px-4 text-xs tracking-[0.12em] uppercase transition-colors ${
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="eyebrow">Colour — {colour}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button
                  key={c}
                  onClick={() => setColour(c)}
                  className={`min-h-11 border px-4 text-xs tracking-[0.12em] uppercase transition-colors ${
                    colour === c
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid size-11 place-items-center hover:bg-secondary"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid size-11 place-items-center hover:bg-secondary"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button
              variant="couture"
              size="lg"
              disabled={!product.inStock}
              onClick={addToCart}
              className="flex-1"
            >
              {product.inStock ? "Add to bag" : "Sold out"}
            </Button>
            <Button
              variant="line"
              size="icon"
              aria-label="Add to wishlist"
              className="min-h-11 min-w-11"
              onClick={() => toast("Saved to your wishlist")}
            >
              <Heart />
            </Button>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="size-4 text-accent" /> {product.delivery}
          </p>

          <Accordion type="single" collapsible className="mt-10">
            <AccordionItem value="spec">
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent>
                <dl className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
                  <dt>Fabric</dt><dd>{product.fabric}</dd>
                  <dt>SKU</dt><dd>{product.sku}</dd>
                  <dt>Category</dt><dd>{product.category}</dd>
                  <dt>Stock</dt><dd>{product.inStock ? "In stock" : "Sold out"}</dd>
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care instructions</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {product.care}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>Customer reviews</AccordionTrigger>
              <AccordionContent className="space-y-4 text-sm text-muted-foreground">
                <p>“The fit is true to size and the finishing is beautiful.” — Ayesha K.</p>
                <p>“Rich colour, and it photographs exactly as shown.” — Mariam T.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-8 text-3xl">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
