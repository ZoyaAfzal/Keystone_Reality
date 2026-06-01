import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { neighborhoods, formatPrice } from "@/lib/data";

export function NeighborhoodsSection() {
  return (
    <section className="py-28 lg:py-36 bg-surface noise">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-primary mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              Geography
            </p>
            <h2 className="font-display text-5xl lg:text-7xl text-foreground leading-[1]">
              Explore Premium
              <br />
              <span className="italic text-primary">Neighborhoods</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md lg:justify-self-end leading-relaxed">
            From oceanfront enclaves to vertical metropolises, a curated map of the world's most considered postcodes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {neighborhoods.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`h-full ${i === 0 ? "md:row-span-2" : i === 3 ? "md:col-span-2" : ""}`}
            >
              <Link
                to="/neighborhoods/$slug"
                params={{ slug: n.slug }}
                className="group block relative h-full min-h-[420px] overflow-hidden"
              >
                <motion.img
                  src={n.image}
                  alt={n.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-6 right-6 bg-background/80 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary border border-border">
                  {n.count} Properties
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                    {n.city}, {n.country}
                  </p>
                  <h3 className="font-display text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
                    {n.name}
                  </h3>
                  <div className="flex items-center justify-between border-t border-border/50 pt-4">
                    <p className="text-sm text-muted-foreground">
                      From <span className="font-display italic text-primary text-lg">{formatPrice(n.from)}</span>
                    </p>
                    <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
                      Explore
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
