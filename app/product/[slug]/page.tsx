import { products } from "@/lib/data";
import { birdsAndFishProducts } from "@/lib/birdsAndFishData";
import ProductPageClient from "@/components/product/ProductPageClient";

// Generate static params for all products (including birds & fish)
export function generateStaticParams() {
  // Combine all products from both data sources
  const allProducts = [...products, ...birdsAndFishProducts];
  
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: PageProps) {
  return <ProductPageClient slug={params.slug} />;
}
