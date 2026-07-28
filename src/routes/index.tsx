import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catPret from "@/assets/cat-pret.jpg";
import catUnstitched from "@/assets/cat-unstitched.jpg";
import catMen from "@/assets/cat-men.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anaya Atelier — Premium Pakistani Clothing & Luxury Pret" },
      {
        name: "description",
        content:
          "Discover Anaya Atelier: luxury pret, unstitched lawn, ready-to-wear and menswear, hand-finished in Pakistan and delivered worldwide.",
      },
      { property: "og:title", content: "Anaya Atelier — Premium Pakistani Clothing" },
      {
        property: "og:description",
        content: "Luxury pret, unstitched lawn and ready-to-wear, hand-finished in Pakistan.",
      },
    ],
  }),
  component: Home,
});

const collections = [
  { title: "Luxury Pret", image: catPret, category: "Luxury Pret" as const },
  { title: "Unstitched", image: catUnstitched, category: "Unstitched" as const },
  { title: "Menswear", image: catMen, category: "Men" as const },
];

const testimonials = [
  { quote: "The embroidery detail is finer than anything I've bought abroad.", name: "Hira A., Lahore" },
  { quote: "Arrived in three days, beautifully packaged. The lawn is featherlight.", name: "Sana M., Karachi" },
  { quote: "My third order. The tailoring is consistently immaculate.", name: "Zainab R., London" },
];

function Section({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2>
        </div>
        {action}
      </Reveal>
      {children}
    </section>
  );
}

function Home() {
  const newArrivals = products.filter((p) => p.tags.includes("new")).slice(0, 4);
  const bestSellers = products.filter((p) => p.tags.includes("bestseller")).slice(0, 4);
  const summer = products.filter((p) => p.tags.includes("summer")).slice(0, 4);

  return (
    <>
      <section className="relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[16/7]">
          <img
            src={hero}
            alt="Model wearing an ivory and gold embroidered kurta from the Anaya Atelier campaign"
            width={1920}
            height={1088}
            fetchPriority="high"
            className="size-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
              <div className="max-w-lg">
                <p className="eyebrow">Campaign SS/26</p>
                <h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                  Quiet luxury,
                  <br />
                  woven by hand.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  An heirloom-minded collection of pret, unstitched cloth and
                  ready-to-wear — finished in our Lahore atelier.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button variant="couture" size="lg" asChild>
                    <Link to="/shop">Shop the collection</Link>
                  </Button>
                  <Button variant="line" size="lg" asChild>
                    <Link to="/shop" search={{ category: "Luxury Pret" }}>
                      Luxury pret
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 text-sm sm:grid-cols-3 sm:px-6">
          {[
            { icon: Truck, text: "Free delivery over PKR 5,000" },
            { icon: ShieldCheck, text: "14-day easy exchanges" },
            { icon: Sparkles, text: "Hand-finished in Pakistan" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-muted-foreground">
              <Icon className="size-4 shrink-0 text-accent" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <Section
        eyebrow="Just landed"
        title="New Arrivals"
        action={
          <Link to="/shop" className="link-underline text-[11px] tracking-[0.2em] uppercase">
            View all
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Explore" title="Featured Categories">
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <Link
                to="/shop"
                search={{ category: c.category }}
                className="group relative block aspect-[3/4] overflow-hidden bg-secondary"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-background">
                  <p className="font-display text-3xl">{c.title}</p>
                  <span className="mt-1 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
                    Shop now <ArrowRight className="size-3" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Most loved"
        title="Best Sellers"
        action={
          <Link to="/shop" className="link-underline text-[11px] tracking-[0.2em] uppercase">
            View all
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Limited time</p>
          <h2 className="text-4xl sm:text-5xl">Mid-Season Edit — up to 30% off</h2>
          <p className="max-w-md text-sm text-background/70">
            Selected pret and unstitched pieces, while stock lasts.
          </p>
          <Button variant="gold" size="lg" asChild className="mt-2">
            <Link to="/shop" search={{ sort: "price-asc" }}>
              Shop the sale
            </Link>
          </Button>
        </div>
      </section>

      <Section eyebrow="Warm weather" title="Summer Collection">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {summer.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="In their words" title="Customer Stories">
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="border-t border-border pt-6">
                <blockquote className="font-display text-xl leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
