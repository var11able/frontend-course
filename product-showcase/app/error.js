"use client";

export default function Error({ retry }) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
        Something went wrong.
      </h1>
      <p className="mt-3 text-stone-600">We couldn&apos;t load the products. Please try again.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 inline-flex h-11 items-center rounded-full bg-stone-900 px-5 text-sm font-medium text-white hover:bg-stone-700"
      >
        Try again
      </button>
    </div>
  );
}
