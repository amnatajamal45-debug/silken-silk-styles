import pret from "@/assets/cat-pret.jpg";
import unstitched from "@/assets/cat-unstitched.jpg";
import men from "@/assets/cat-men.jpg";

export type Category =
  | "Luxury Pret"
  | "Unstitched"
  | "Ready to Wear"
  | "Men"
  | "Accessories";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: Category;
  price: number;
  discountPrice?: number;
  sizes: string[];
  colours: string[];
  fabric: string;
  care: string;
  delivery: string;
  inStock: boolean;
  image: string;
  description: string;
  tags: ("new" | "bestseller" | "summer")[];
  rating: number;
}

const img: Record<string, string> = { pret, unstitched, men };

const seed: Array<
  [string, Category, number, number | undefined, keyof typeof img, Product["tags"], string]
> = [
  ["Meher Embroidered Kurta", "Luxury Pret", 18900, 14900, "pret", ["new", "bestseller"], "Silk Organza"],
  ["Noor Chikankari Ensemble", "Luxury Pret", 24500, undefined, "pret", ["new"], "Cotton Net"],
  ["Sahar Zari Gown", "Luxury Pret", 32000, 27500, "pret", ["bestseller"], "Raw Silk"],
  ["Rehmat 3-Piece Lawn", "Unstitched", 8900, 6900, "unstitched", ["summer", "bestseller"], "Premium Lawn"],
  ["Sitara Printed Lawn", "Unstitched", 7400, undefined, "unstitched", ["new", "summer"], "Cambric Lawn"],
  ["Gulzar Jacquard Suit", "Unstitched", 11200, 9800, "unstitched", [], "Jacquard Cotton"],
  ["Aiza Straight Shirt", "Ready to Wear", 5600, undefined, "pret", ["new"], "Viscose Blend"],
  ["Zeba Wide Leg Trouser", "Ready to Wear", 4200, 3400, "unstitched", ["summer"], "Cotton Twill"],
  ["Hadi Textured Kurta", "Men", 7900, undefined, "men", ["bestseller"], "Wash & Wear"],
  ["Arsal Waistcoat", "Men", 12900, 10900, "men", ["new"], "Suiting Wool"],
  ["Daniyal Shalwar Kameez", "Men", 9400, undefined, "men", [], "Egyptian Cotton"],
  ["Meena Silk Stole", "Accessories", 3200, 2600, "pret", ["summer"], "Pure Silk"],
];

export const products: Product[] = seed.map(
  ([name, category, price, discountPrice, key, tags, fabric], i) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    sku: `AN-${String(1000 + i)}`,
    category,
    price,
    discountPrice,
    sizes: category === "Unstitched" ? ["Unstitched"] : ["XS", "S", "M", "L", "XL"],
    colours: ["Ivory", "Charcoal", "Rose Gold", "Sage"],
    fabric,
    care: "Dry clean only. Do not bleach. Warm iron on reverse.",
    delivery: "Dispatched in 2–3 working days. Free delivery over PKR 5,000.",
    inStock: i % 7 !== 5,
    image: img[key],
    description:
      "A considered piece from our atelier — cut from responsibly sourced cloth and finished by hand. Designed to move quietly between occasions, season after season.",
    tags,
    rating: 4 + ((i % 5) + 1) / 10,
  }),
);

export const categories: Category[] = [
  "Luxury Pret",
  "Unstitched",
  "Ready to Wear",
  "Men",
  "Accessories",
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPKR = (v: number) =>
  `PKR ${v.toLocaleString("en-PK")}`;
