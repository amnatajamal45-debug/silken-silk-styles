import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Anaya Atelier" },
      {
        name: "description",
        content:
          "Reach the Anaya Atelier client care team by email, phone or WhatsApp, or visit our flagship studio in Lahore.",
      },
      { property: "og:title", content: "Contact Us — Anaya Atelier" },
      { property: "og:description", content: "Client care, studio address and opening hours." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(1000),
});

function Contact() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    toast.success("Thank you — our client care team will reply within 24 hours.");
    form.reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Client care</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Contact Us</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="eyebrow">Name</label>
            <Input id="name" name="name" required maxLength={100} className="mt-2" />
          </div>
          <div>
            <label htmlFor="email" className="eyebrow">Email</label>
            <Input id="email" name="email" type="email" required maxLength={255} className="mt-2" />
          </div>
          <div>
            <label htmlFor="message" className="eyebrow">Message</label>
            <Textarea id="message" name="message" rows={6} required maxLength={1000} className="mt-2" />
          </div>
          <Button type="submit" variant="couture" size="lg">
            Send message
          </Button>
        </form>

        <div className="space-y-8">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>Anaya Atelier, 24-C Gulberg III, Lahore, Pakistan</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href="tel:+924235000000" className="hover:underline">+92 42 3500 0000</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
              <a href="mailto:care@anaya.example" className="hover:underline">care@anaya.example</a>
            </li>
          </ul>
          <div className="aspect-[4/3] w-full overflow-hidden border border-border">
            <iframe
              title="Anaya Atelier studio location map"
              src="https://www.google.com/maps?q=Gulberg+III+Lahore&output=embed"
              loading="lazy"
              className="size-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
