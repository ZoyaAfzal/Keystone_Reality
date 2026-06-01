import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { blogPosts } from "@/lib/data";
import { motion } from "motion/react";
import { Clock, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — Keystone Realty" },
      { name: "description", content: "Market insights, buying guides and investment perspectives." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageShell withTopPad={false}>
      <PageHero
        eyebrow="The Journal"
        title='Market <span class="italic text-primary">Insights</span>'
        subtitle="Long-form perspective on the global luxury market from architecture and investment to buying strategy."
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
      />
      <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <span className="absolute top-5 left-5 bg-background/80 backdrop-blur-md text-[10px] uppercase tracking-[0.22em] text-primary px-3 py-1.5 border border-border">
                    {p.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  <span>{p.date}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {p.readTime}
                  </span>
                </div>
                <h3 className="font-display text-3xl text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">{p.excerpt}</p>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-primary border-t border-border/50 pt-5">
                  <span className="link-underline">Read Full Article</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
