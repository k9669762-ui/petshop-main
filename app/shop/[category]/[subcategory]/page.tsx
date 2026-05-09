import { categories } from "@/lib/data";
import SubcategoryPageClient from "@/components/shop/SubcategoryPageClient";

// Generate static params for all category/subcategory combinations
export function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  
  categories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((subcategory) => {
        params.push({
          category: category.slug,
          subcategory: subcategory.slug,
        });
      });
    }
  });
  
  return params;
}

interface PageProps {
  params: { category: string; subcategory: string };
}

export default function SubcategoryPage({ params }: PageProps) {
  return (
    <SubcategoryPageClient 
      categorySlug={params.category} 
      subcategorySlug={params.subcategory} 
    />
  );
}
