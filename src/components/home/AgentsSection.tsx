import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Star, Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { agents } from "@/lib/data";

export function AgentsSection() {
  return (
    <section className="py-28 lg:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary mb-5">The Team</p>
          <h2 className="font-display text-5xl lg:text-7xl text-foreground leading-[1] mb-5">
            Our Expert <span className="italic text-primary">Advisors</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A small bench of specialists with the discretion and architectural fluency to match the residences we represent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group"
            >
              <Link to="/agents/$id" params={{ id: a.id }} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-5">
                  <img
                    src={a.image}
                    alt={a.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-2">
                      {[Linkedin, Instagram, Twitter].map((Icon, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ y: 10, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          className="w-8 h-8 bg-background/80 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-foreground mb-1 group-hover:text-primary transition-colors">
                      {a.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {a.specialty}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-foreground/70">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {a.rating}
                      </span>
                      <span className="text-border">·</span>
                      <span>{a.sold} sold</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/agents"
            className="inline-flex items-center gap-3 text-primary text-[12px] uppercase tracking-[0.22em] link-underline"
          >
            Meet All Agents
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
