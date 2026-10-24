import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-sm font-medium text-stone-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-3 text-stone-600">The product may not exist, or the link may be wrong.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
      >
        Back to products
      </Link>
    </div>
  );
}
