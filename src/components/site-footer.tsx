import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl tracking-[0.3em] uppercase">Anaya</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Contemporary Pakistani luxury. Hand-finished cloth, considered cuts and
            a quiet devotion to craft.
          </p>
          <form
            className="mt-8 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list — welcome to Anaya.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <Input type="email" required placeholder="Email address" aria-label="Email address" />
            <Button type="submit" variant="gold">
              Join
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/shop" search={{ category: "Luxury Pret" }} className="hover:text-foreground">Luxury Pret</Link></li>
            <li><Link to="/shop" search={{ category: "Unstitched" }} className="hover:text-foreground">Unstitched</Link></li>
            <li><Link to="/shop" search={{ category: "Men" }} className="hover:text-foreground">Men</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase">House</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
          </ul>
          <div className="mt-6 flex gap-3 text-muted-foreground">
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-foreground"><Instagram className="size-4" /></a>
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-foreground"><Facebook className="size-4" /></a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-foreground"><Twitter className="size-4" /></a>
            <a href="mailto:care@anaya.example" aria-label="Email us" className="hover:text-foreground"><Mail className="size-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Anaya Atelier. All rights reserved.
      </div>
    </footer>
  );
}
