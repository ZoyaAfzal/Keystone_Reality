import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { neighborhoods, formatPrice } from "@/lib/data";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/neighborhoods/")({
  head: () => ({
    meta: [
      { title: "Neighborhoods — Keystone Realty" },
      { name: "description", content: "Explore the world's most considered postcodes." },
    ],
  }),
  component: NeighborhoodsIndex,
});

function NeighborhoodsIndex() {
  return (
    <PageShell withTopPad={false}>
      <PageHero
        eyebrow="Geography"
        title='Premium <span class="italic text-primary">Neighborhoods</span>'
        subtitle="From oceanfront enclaves to vertical metropolises, a curated atlas of the world's most considered addresses."
        image="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=85"
      />
      <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {neighborhoods.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <Link to="/neighborhoods/$slug" params={{ slug: n.slug }} className="group block relative aspect-[5/4] overflow-hidden">
                <img src={n.image} alt={n.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">{n.city}, {n.country}</p>
                  <h2 className="font-display text-5xl text-foreground mb-3">{n.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md">{n.description}</p>
                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="text-sm text-muted-foreground">{n.count} listings · from <span className="text-primary font-display italic text-lg">{formatPrice(n.from)}</span></span>
                    <ArrowUpRight className="h-4 w-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
