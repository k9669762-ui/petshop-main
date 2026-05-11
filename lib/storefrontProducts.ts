"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "./store";
import type { DBProduct } from "./firebaseService";
import { FIREBASE_PRODUCT_TAG } from "./productLinks";

const fallbackFishImage = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800";
const fallbackAccessoryImage = "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800";

const categoryMap: Record<string, string> = {
  fish: "aquarium-fish",
  "aquarium fish": "aquarium-fish",
  "aquarium-fish": "aquarium-fish",
  accessories: "accessories",
  accessory: "accessories",
  birds: "birds",
};

const subcategoryMap: Record<string, string> = {
  betta: "betta-fish",
  "betta fish": "betta-fish",
  goldfish: "goldfish",
  guppy: "guppies",
  guppies: "guppies",
  discus: "discus",
  angelfish: "tropical-fish",
  tetra: "tropical-fish",
  molly: "tropical-fish",
  flowerhorn: "flowerhorn",
  aquarium: "aquarium-tanks",
  filter: "filters",
  filters: "filters",
  heater: "heaters",
  heaters: "heaters",
  light: "lighting",
  lighting: "lighting",
  food: "food-nutrition",
  decor: "decorations",
  decorations: "decorations",
};

const normalizeKey = (value?: string) =>
  (value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

const normalizeCategory = (value?: string) => {
  const key = normalizeKey(value);
  return categoryMap[key] ?? (value || "accessories");
};

const normalizeSubcategory = (value?: string) => {
  const key = normalizeKey(value);
  return subcategoryMap[key] ?? value?.toLowerCase().trim().replace(/\s+/g, "-");
};

export const mapDBProductToStorefrontProduct = (product: DBProduct): Product => {
  const category = normalizeCategory(product.category);
  const subcategory = normalizeSubcategory(product.subcategory);
  const images = product.images?.filter(Boolean);
  const fallbackImage = category === "accessories" ? fallbackAccessoryImage : fallbackFishImage;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category,
    subcategory,
    price: Number(product.price) || 0,
    originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
    images: images?.length ? images : [fallbackImage],
    description: product.description || "Premium product from Rainbow Aqua.",
    specifications: {
      ...(product.sku ? { SKU: product.sku } : {}),
      ...(product.stock !== undefined ? { Stock: String(product.stock) } : {}),
      Category: category,
      ...(subcategory ? { Subcategory: subcategory } : {}),
    },
    variants: product.variants?.length
      ? [{ name: "Options", options: product.variants }]
      : undefined,
    inStock: product.inStock ?? Number(product.stock) > 0,
    isNew: product.isNew,
    isFeatured: product.isFeatured,
    rating: 4.6,
    reviews: 0,
    tags: [FIREBASE_PRODUCT_TAG, product.name, product.category, product.subcategory, product.sku]
      .filter(Boolean)
      .map(String),
  };
};

const mergeProducts = (firebaseProducts: Product[]) => {
  // Only show Firebase products — no local static products
  return firebaseProducts;
};

export function useStorefrontProducts() {
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // No orderBy to avoid composite index requirement
    const productsQuery = collection(db, "products");

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const products = snapshot.docs
          .map((docSnap) =>
            mapDBProductToStorefrontProduct({
              ...(docSnap.data() as Omit<DBProduct, "id">),
              id: docSnap.id,
            } as DBProduct)
          )
          .sort((a, b) => {
            // Featured first, then by name
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return a.name.localeCompare(b.name);
          });

        setFirebaseProducts(products);
        setIsLoading(false);
      },
      () => {
        setFirebaseProducts([]);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const products = useMemo(() => mergeProducts(firebaseProducts), [firebaseProducts]);

  return { products, isLoading };
}
