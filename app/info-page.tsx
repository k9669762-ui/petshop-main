import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

type InfoPageProps = {
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export function InfoPage({ title, description, sections }: InfoPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{title}</h1>
          <p className="max-w-2xl text-white/80">{description}</p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-5">
            {sections.map((section) => (
              <article key={section.heading} className="rounded-xl border bg-card p-5">
                <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
