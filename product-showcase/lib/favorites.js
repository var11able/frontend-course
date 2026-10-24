const STORAGE_KEY = "product-showcase:favorites";
export const FAVORITES_EVENT = "favorites-change";

export function readFavorites() {
  try {
    const ids = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id) {
  const ids = readFavorites();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new Event(FAVORITES_EVENT));
  return next;
}

export function subscribeToFavorites(onChange) {
  const update = () => onChange(readFavorites());
  update();
  window.addEventListener(FAVORITES_EVENT, update);
  window.addEventListener("storage", update);
  return () => {
    window.removeEventListener(FAVORITES_EVENT, update);
    window.removeEventListener("storage", update);
  };
}
