"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const FEATURED_COUNT = 5;

export default function ProductSearch({ products }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const results = term
    ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term),
      )
    : products.slice(0, FEATURED_COUNT);

  return (
    <section aria-labelledby="products-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="products-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
            {term ? "Search results" : "Featured products"}
          </h2>
          <p className="mt-1 text-sm text-stone-500" aria-live="polite">
            {term
              ? `${results.length} of ${products.length} products match “${query.trim()}”`
              : `Showing ${results.length} of ${products.length} products. Search to see the rest.`}
          </p>
        </div>

        <label className="relative block w-full sm:w-80">
          <span className="sr-only">Search products</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or category"
            className="h-11 w-full rounded-full border border-stone-300 bg-white pl-10 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10"
          />
        </label>
      </div>

      {results.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <li key={product.id} className="flex">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
          <p className="font-medium text-stone-900">No products match “{query.trim()}”.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-3 text-sm font-medium text-stone-600 underline hover:text-stone-900"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
