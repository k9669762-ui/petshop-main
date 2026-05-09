"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, ShieldCheck, ShoppingBag, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

const reviewStats = [
  { label: "Average rating", value: "4.9/5" },
  { label: "Verified reviews", value: "15K+" },
  { label: "Live-arrival satisfaction", value: "98%" },
];

export function Testimonials() {
  const averageRating =
    testimonials.reduce((total, testimonial) => total + testimonial.rating, 0) /
    testimonials.length;

  return (
    <section id="reviews" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary mb-3">
              Customer Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Trusted by aquarium and pet lovers
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              Real feedback from customers who bought fish, accessories, and pet
              essentials from Rainbow Aqua.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-3">
            {reviewStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-gray-50 p-4">
                <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop={testimonials.length > 3}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="reviews-swiper pb-12"
        >
          {testimonials.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.name}</h3>
                      <p className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {review.location}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          "h-4 w-4",
                          index < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {review.rating.toFixed(1)}
                  </span>
                </div>

                <p className="mt-4 text-gray-600 leading-relaxed line-clamp-5">
                  "{review.text}"
                </p>

                <div className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-2 text-sm text-cyan-800">
                  <ShoppingBag className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{review.product}</span>
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-2 flex flex-col items-center justify-between gap-4 rounded-xl border bg-gray-50 p-5 sm:flex-row">
          <div>
            <p className="font-semibold text-gray-900">
              Rated {averageRating.toFixed(1)} out of 5 by verified customers
            </p>
            <p className="text-sm text-gray-500">
              Read all customer reviews before choosing the right fish or pet product.
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/reviews">
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .reviews-swiper .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: #cbd5e1;
          opacity: 1;
        }

        .reviews-swiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: #06b6d4;
        }
      `}</style>
    </section>
  );
}
