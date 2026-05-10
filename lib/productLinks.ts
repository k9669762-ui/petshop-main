import type { Product } from "./store";

export const FIREBASE_PRODUCT_TAG = "firebase-product";

export const isFirebaseProduct = (product: Product) =>
  product.tags?.includes(FIREBASE_PRODUCT_TAG) ?? false;

export const getProductHref = (product: Product) =>
  isFirebaseProduct(product)
    ? `/product?slug=${encodeURIComponent(product.slug)}`
    : `/product/${product.slug}`;
