import ProductSearch from "@/components/ProductSearch";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-12">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Good things, picked for you.
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Browse a few of our favorite products, open one for the full details, and save the ones
          you like.
        </p>
      </section>

      <ProductSearch products={products} />
    </div>
  );
}
