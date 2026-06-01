import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function BlogSection() {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              The Journal
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-foreground leading-[1]">
              Market Insights <span className="italic text-primary">&amp;</span> News
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-[12px] uppercase tracking-[0.22em] text-primary link-underline inline-flex items-center gap-2"
          >
            All Articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

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
                <p className="text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
