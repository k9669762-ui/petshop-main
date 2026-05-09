import { blogPosts } from "@/lib/data";
import BlogPostClient from "@/components/blog/BlogPostClient";

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  return <BlogPostClient slug={params.slug} />;
}
