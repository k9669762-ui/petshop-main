"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data";
import { Newsletter } from "@/components/newsletter";

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Button asChild className="mt-4">
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <Navigation />

      <article>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl"
              >
                <Badge className="mb-4">{post.category}</Badge>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:flex-1 max-w-3xl">
                <Button variant="ghost" asChild className="mb-6">
                  <Link href="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>

                  <h2>Introduction</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                    nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl 
                    nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia.
                  </p>

                  <h2>Understanding the Basics</h2>
                  <p>
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
                    posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, 
                    ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit.
                  </p>

                  <blockquote>
                    &quot;The key to successful fishkeeping is understanding the unique needs 
                    of each species and creating an environment that mimics their natural habitat.&quot;
                  </blockquote>

                  <h2>Best Practices</h2>
                  <ul>
                    <li>Maintain consistent water parameters</li>
                    <li>Perform regular water changes (20-30% weekly)</li>
                    <li>Feed a varied diet appropriate for the species</li>
                    <li>Monitor fish behavior for signs of stress or illness</li>
                    <li>Quarantine new fish before adding to main tank</li>
                  </ul>

                  <h2>Conclusion</h2>
                  <p>
                    By following these guidelines and staying committed to proper care, 
                    you can enjoy a thriving aquarium for years to come. Remember, patience 
                    is key in this hobby!
                  </p>
                </div>

                {/* Share */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t">
                  <span className="font-medium">Share:</span>
                  <Button variant="outline" size="icon">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:w-80">
                <div className="sticky top-24 space-y-6">
                  {/* Author */}
                  <div className="bg-card rounded-xl border p-6">
                    <h3 className="font-semibold mb-4">About the Author</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{post.author}</p>
                        <p className="text-sm text-muted-foreground">Aquarium Expert</p>
                      </div>
                    </div>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-card rounded-xl border p-6">
                      <h3 className="font-semibold mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relPost) => (
                          <Link
                            key={relPost.id}
                            href={`/blog/${relPost.slug}`}
                            className="block group"
                          >
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-secondary transition-colors">
                              {relPost.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {relPost.readTime}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </article>

      <Newsletter />
      <Footer />
    </main>
  );
}

