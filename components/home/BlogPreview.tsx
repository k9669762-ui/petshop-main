'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/mockData'
import { formatDate } from '@/lib/utils'

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-light overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary-500 font-semibold text-lg">Pet Care Tips</span>
            <h2 className="section-title mt-2">From Our Blog</h2>
            <p className="section-subtitle">
              Expert advice and helpful guides for pet parents
            </p>
          </div>
          <Link href="/blog" className="btn-secondary hidden md:inline-flex">
            View All Articles
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="card card-hover overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm 
                                     px-3 py-1 rounded-full text-sm font-semibold text-primary-500">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 
                                   group-hover:text-primary-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-sm text-gray-700">{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="btn-primary">
            <span>View All Articles</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

