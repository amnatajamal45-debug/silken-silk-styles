import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { categories, formatPKR, products, type Category } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Sort = "newest" | "popular" | "price-asc" | "price-desc";

interface ShopSearch {
  category?: Category;
  size?: string;
  colour?: string;
  fabric?: string;
  max?: number;
  sort?: Sort;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: (search.category as Category) || undefined,
    size: (search.size as string) || undefined,
    colour: (search.colour as string) || undefined,
    fabric: (search.fabric as string) || undefined,
    max: search.max ? Number(search.max) : undefined,
    sort: (search.sort as Sort) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — Anaya Atelier" },
      {
        name: "description",
        content:
          "Browse the full Anaya Atelier collection: luxury pret, unstitched lawn, ready-to-wear, menswear and accessories, filtered by size, colour and fabric.",
      },
      { property: "og:title", content: "Shop All — Anaya Atelier" },
      {
        property: "og:description",
        content: "Filter luxury pret, unstitched and ready-to-wear by size, colour, fabric and price.",
      },
    ],
  }),
  component: Shop,
});

const sizes = ["XS", "S", "M", "L", "XL", "Unstitched"];
const colours = ["Ivory", "Charcoal", "Rose Gold", "Sage"];
const fabrics = Array.from(new Set(products.map((p) => p.fabric)));

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const set = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const list = useMemo(() => {
    let out = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.size && !p.sizes.includes(search.size)) return false;
      if (search.colour && !p.colours.includes(search.colour)) return false;
      if (search.fabric && p.fabric !== search.fabric) return false;
      if (search.max && (p.discountPrice ?? p.price) > search.max) return false;
      return true;
    });
    const price = (p: (typeof products)[number]) => p.discountPrice ?? p.price;
    if (search.sort === "price-asc") out = [...out].sort((a, b) => price(a) - price(b));
    if (search.sort === "price-desc") out = [...out].sort((a, b) => price(b) - price(a));
    if (search.sort === "popular") out = [...out].sort((a, b) => b.rating - a.rating);
    if (search.sort === "newest")
      out = [...out].sort((a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")));
    return out;
  }, [search]);

  const Filter = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value?: string;
    options: string[];
    onChange: (v?: string) => void;
  }) => (
    <div>
      <h2 className="eyebrow">{label}</h2>
      <ul className="mt-3 space-y-1.5">
        <li>
          <button
            className={`text-sm ${!value ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => onChange(undefined)}
          >
            All
          </button>
        </li>
        {options.map((o) => (
          <li key={o}>
            <button
              className={`text-left text-sm ${value === o ? "text-foreground underline decoration-accent underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
              onClick={() => onChange(o)}
            >
              {o}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="border-b border-border pb-8">
        <p className="eyebrow">Collection</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{search.category ?? "Shop All"}</h1>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-8">
          <Filter
            label="Category"
            value={search.category}
            options={categories}
            onChange={(v) => set({ category: v as Category | undefined })}
          />
          <Filter label="Size" value={search.size} options={sizes} onChange={(v) => set({ size: v })} />
          <Filter label="Colour" value={search.colour} options={colours} onChange={(v) => set({ colour: v })} />
          <Filter label="Fabric" value={search.fabric} options={fabrics} onChange={(v) => set({ fabric: v })} />
          <div>
            <h2 className="eyebrow">Max price</h2>
            <input
              type="range"
              min={3000}
              max={35000}
              step={1000}
              aria-label="Maximum price"
              value={search.max ?? 35000}
              onChange={(e) => set({ max: Number(e.target.value) })}
              className="mt-3 w-full accent-[oklch(0.78_0.09_80)]"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Up to {formatPKR(search.max ?? 35000)}
            </p>
          </div>
          <Button variant="line" onClick={() => navigate({ search: {} })}>
            Clear filters
          </Button>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">{list.length} pieces</p>
            <Select value={search.sort ?? "newest"} onValueChange={(v) => set({ sort: v as Sort })}>
              <SelectTrigger className="w-48" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {list.length === 0 ? (
            <p className="py-24 text-center text-sm text-muted-foreground">
              Nothing matches those filters yet.{" "}
              <Link to="/shop" search={{}} className="underline">
                Clear them
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
