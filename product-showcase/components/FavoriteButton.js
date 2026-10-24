"use client";

import { useEffect, useState } from "react";
import { subscribeToFavorites, toggleFavorite } from "@/lib/favorites";

export default function FavoriteButton({ productId, size = "md" }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    return subscribeToFavorites((ids) => setIsFavorite(ids.includes(productId)));
  }, [productId]);

  function handleClick() {
    setIsFavorite(toggleFavorite(productId).includes(productId));
  }

  const sizes = {
    sm: "h-10 px-3 text-sm",
    md: "h-12 px-5 text-base",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isFavorite}
      className={`inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-colors ${sizes[size]} ${
        isFavorite
          ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
          : "border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50"
      }`}
    >
      <HeartIcon filled={isFavorite} />
      {isFavorite ? "Favorited" : "Add to Favorite"}
    </button>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5 shrink-0"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
