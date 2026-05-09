import { categories } from "@/lib/data";
import CategoryPageClient from "@/components/shop/CategoryPageClient";

// Generate static params for all categories
export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

interface PageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: PageProps) {
  return <CategoryPageClient categorySlug={params.category} />;
}
