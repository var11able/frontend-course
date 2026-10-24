import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { formatPrice, productSlug } from "@/lib/format";

export default function ProductCard({ product }) {
  const href = `/products/${productSlug(product)}`;

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={href} className="relative block aspect-square bg-white p-8" tabIndex={-1}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
          className="object-contain p-8"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 border-t border-stone-100 p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          {product.category}
        </p>
        <h2 className="line-clamp-2 font-semibold leading-snug text-stone-900">
          <Link href={href} className="hover:underline">
            {product.title}
          </Link>
        </h2>
        <p className="text-lg font-semibold text-stone-900">{formatPrice(product.price)}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link
            href={href}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-stone-900 px-4 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            View Details
          </Link>
          <FavoriteButton productId={product.id} size="sm" />
        </div>
      </div>
    </article>
  );
}
