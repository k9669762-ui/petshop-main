import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, ShieldCheck, ShoppingBag, Star } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const reviewStats = [
  { label: "Average rating", value: "4.9/5" },
  { label: "Verified reviews", value: "15K+" },
  { label: "Satisfaction", value: "98%" },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="bg-gradient-to-r from-primary to-primary/80 py-14 text-white">
        <div className="container mx-auto px-4">
          <Button variant="secondary" asChild className="mb-6">
            <Link href="/#reviews">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reviews
            </Link>
          </Button>
          <h1 className="mb-4 font-display text-3xl font-bold md:text-5xl">
            All Customer Reviews
          </h1>
          <p className="max-w-2xl text-white/80">
            Verified feedback from customers who ordered fish, accessories, and pet
            essentials from Rainbow Aqua.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {reviewStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-card p-5">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((review) => (
              <article
                key={review.id}
                className="rounded-xl border bg-card p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">{review.name}</h2>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
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
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.rating.toFixed(1)}</span>
                </div>

                <p className="mt-4 leading-relaxed text-muted-foreground">
                  "{review.text}"
                </p>

                <div className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-50 px-3 py-2 text-sm text-cyan-800">
                  <ShoppingBag className="h-4 w-4 flex-shrink-0" />
                  <span>{review.product}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
