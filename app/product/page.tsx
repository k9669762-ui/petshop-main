"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductPageClient from "@/components/product/ProductPageClient";

function ProductQueryPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";

  return <ProductPageClient slug={slug} />;
}

export default function ProductQueryPage() {
  return (
    <Suspense fallback={null}>
      <ProductQueryPageContent />
    </Suspense>
  );
}
