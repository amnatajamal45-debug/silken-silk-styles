import { Link } from "@tanstack/react-router";
import { formatPKR, type Product } from "@/lib/products";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const sale = product.discountPrice != null;
  return (
    <Link
      to="/product/$productId"
      params={{ productId: product.id }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading={priority ? undefined : "lazy"}
          width={800}
          height={1000}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {sale && (
          <span className="absolute top-3 left-3 bg-accent px-2 py-1 text-[10px] tracking-[0.18em] text-accent-foreground uppercase">
            Sale
          </span>
        )}
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-foreground px-2 py-1 text-[10px] tracking-[0.18em] text-background uppercase">
            Sold out
          </span>
        )}
      </div>
      <div className="pt-4">
        <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {product.category}
        </p>
        <h3 className="mt-1 text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm">
          {sale ? (
            <>
              <span className="text-accent-foreground/90 font-medium">
                {formatPKR(product.discountPrice!)}
              </span>{" "}
              <span className="text-muted-foreground line-through">
                {formatPKR(product.price)}
              </span>
            </>
          ) : (
            formatPKR(product.price)
          )}
        </p>
      </div>
    </Link>
  );
}
