export function productSlug(product) {
  const title = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${product.id}-${title}`;
}

export function idFromSlug(slug) {
  const match = /^(\d+)(-|$)/.exec(slug);
  return match ? Number(match[1]) : null;
}

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(price) {
  return priceFormat.format(price);
}
