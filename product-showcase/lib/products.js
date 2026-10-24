import { cacheLife } from "next/cache";

const API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  "use cache";
  cacheLife("days");

  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
  return res.json();
}

export async function getProduct(id) {
  "use cache";
  cacheLife("days");

  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to load product ${id} (${res.status})`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
