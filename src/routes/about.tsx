import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Anaya Atelier" },
      {
        name: "description",
        content:
          "The Anaya Atelier story: heritage craft, responsible manufacturing and a fashion philosophy built on longevity rather than trend.",
      },
      { property: "og:title", content: "Our Story — Anaya Atelier" },
      {
        property: "og:description",
        content: "Heritage craft, responsible manufacturing and clothes made to last.",
      },
    ],
  }),
  component: About,
});

const pillars = [
  {
    title: "Mission",
    body: "To make Pakistani craft feel contemporary — clothes that travel between a Lahore courtyard and a London evening without changing register.",
  },
  {
    title: "Sustainability",
    body: "Deadstock-first sourcing, natural dyes where colour permits, and packaging that is fully recyclable. We produce in small runs and restock only what sells.",
  },
  {
    title: "Manufacturing",
    body: "Every garment passes three hands: cutting, embroidery and final finish. Our karigars are salaried year-round, not per-piece.",
  },
  {
    title: "Philosophy",
    body: "We design for the tenth wear, not the first. Fewer pieces, better cloth, longer lives.",
  },
];

function About() {
  return (
    <div>
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <img
          src={hero}
          alt="Anaya Atelier campaign imagery"
          width={1920}
          height={1088}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/25" />
        <h1 className="absolute inset-0 grid place-items-center px-4 text-center text-4xl text-background sm:text-6xl">
          A house built on patience
        </h1>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <p className="mt-4 font-display text-2xl leading-relaxed sm:text-3xl">
            Anaya began in 2014 with a single roll of hand-loomed khaddar and a
            conviction that Pakistani cloth deserved a modern language.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            A decade later we work with fourteen embroidery families across Punjab,
            print in low-water facilities, and finish every luxury pret piece by hand
            in our Lahore atelier. The collections change with the season; the
            standards do not.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <h2 className="text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
