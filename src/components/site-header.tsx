import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, Search, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-[0_1px_24px_-12px_oklch(0_0_0/0.35)]" : ""
      }`}
    >
      <p className="bg-foreground py-2 text-center text-[11px] tracking-[0.25em] text-background uppercase">
        Complimentary delivery on orders over PKR 5,000
      </p>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">Anaya</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1 px-4 pb-8">
              {categories.map((c) => (
                <Link
                  key={c}
                  to="/shop"
                  search={{ category: c }}
                  className="py-2 text-sm tracking-wide text-foreground"
                >
                  {c}
                </Link>
              ))}
              <span className="mt-4 mb-1 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                More
              </span>
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="py-2 text-sm tracking-wide">
                  {n.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden min-w-0 items-center gap-7 md:flex">
          {categories.slice(0, 4).map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ category: c }}
              className="link-underline text-[12px] tracking-[0.16em] uppercase"
            >
              {c}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="font-display justify-self-center text-2xl tracking-[0.3em] uppercase sm:text-3xl md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Anaya
        </Link>

        <div className="flex items-center justify-end gap-1">
          <Link to="/shop" aria-label="Search products" className="hidden sm:block">
            <Button variant="ghost" size="icon" aria-label="Search products">
              <Search />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex">
            <Heart />
          </Button>
          <Link to="/cart" aria-label="Open cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Open cart">
              <ShoppingBag />
            </Button>
            {count > 0 && (
              <span className="bg-accent text-accent-foreground pointer-events-none absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-medium">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex gap-6 overflow-x-auto border-t border-border/60 px-4 py-2 text-[11px] tracking-[0.16em] uppercase md:hidden">
        {categories.map((c) => (
          <Link key={c} to="/shop" search={{ category: c }} className="shrink-0">
            {c}
          </Link>
        ))}
      </nav>
    </header>
  );
}
