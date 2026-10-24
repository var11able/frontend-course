import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { formatPrice, idFromSlug, productSlug } from "@/lib/format";
import { getProduct, getProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: productSlug(product) }));
}

async function findProduct(slug) {
  const id = idFromSlug(slug);
  return id === null ? null : getProduct(id);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.description };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) notFound();

  const canonicalSlug = productSlug(product);
  if (slug !== canonicalSlug) permanentRedirect(`/products/${canonicalSlug}`);

  const { rate, count } = product.rating;

  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
        <Link href="/" className="hover:text-stone-900 hover:underline">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="capitalize">{product.category}</span>
      </nav>

      <article className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-stone-200 bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain p-12"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-stone-500">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              {product.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-3xl font-semibold text-stone-900">{formatPrice(product.price)}</p>
            <p className="flex items-center gap-1.5 text-sm text-stone-600">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4 text-amber-500"
                fill="currentColor"
              >
                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>
              <span>
                <span className="font-medium text-stone-900">{rate.toFixed(1)}</span> out of 5 from{" "}
                {count} reviews
              </span>
            </p>
          </div>

          <p className="leading-relaxed text-stone-700">{product.description}</p>

          <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-6">
            <FavoriteButton productId={product.id} />
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full px-5 font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              Back to products
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 text-sm ring-1 ring-stone-200">
            <div>
              <dt className="text-stone-500">Product ID</dt>
              <dd className="mt-1 font-medium text-stone-900">#{product.id}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Category</dt>
              <dd className="mt-1 font-medium capitalize text-stone-900">{product.category}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  );
}
