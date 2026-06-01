import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { properties } from "@/lib/data";
import { PropertyCard } from "@/components/properties/PropertyCard";

const tabs = ["All", "For Sale", "For Rent", "Featured", "New"] as const;
type Tab = (typeof tabs)[number];

export function FeaturedProperties() {
  const [active, setActive] = useState<Tab>("All");

  const filtered = properties.filter((p) => {
    if (active === "All") return true;
    if (active === "For Sale") return p.status === "sale";
    if (active === "For Rent") return p.status === "rent";
    if (active === "Featured") return p.badge === "featured";
    if (active === "New") return p.badge === "new";
    return true;
  }).slice(0, 6);

  return (
    <section className="py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] uppercase tracking-[0.35em] text-primary mb-5 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-primary" />
              The Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-5xl lg:text-7xl text-foreground leading-[1]"
            >
              Featured <span className="italic text-primary">Residences</span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-1 relative">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`relative px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors z-10 ${
                  active === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === t && (
                  <motion.span
                    layoutId="tabPill"
                    transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                    className="absolute inset-0 bg-primary -z-10"
                  />
                )}
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/properties"
            className="inline-flex items-center gap-3 border border-primary text-primary px-8 py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-primary hover:text-primary-foreground transition-colors group"
          >
            View All Properties
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
