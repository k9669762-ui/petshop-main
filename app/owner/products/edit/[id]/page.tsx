import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface EditProductPageProps {
  params: { id: string };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link href="/owner/products" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <p className="mt-1 text-sm text-gray-500">Product ID: {params.id}</p>
          <div className="mt-6 grid gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="Enter price" />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" placeholder="Enter stock quantity" />
            </div>
            <Button className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
