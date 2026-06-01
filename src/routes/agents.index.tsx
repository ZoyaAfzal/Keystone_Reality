import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { agents } from "@/lib/data";
import { motion } from "motion/react";
import { Star, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "Agents — Keystone Realty" },
      { name: "description", content: "Meet our expert advisors specializing in luxury real estate." },
    ],
  }),
  component: AgentsIndex,
});

function AgentsIndex() {
  return (
    <PageShell withTopPad={false}>
      <PageHero
        eyebrow="The Team"
        title='Expert <span class="italic text-primary">Advisors</span>'
        subtitle="A small bench of specialists, each with the discretion and architectural fluency our clients expect."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
      />
      <section className="py-24 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}>
              <Link to="/agents/$id" params={{ id: a.id }} className="group block">
                <div className="aspect-[4/5] overflow-hidden mb-5 bg-surface">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <h2 className="font-display text-3xl text-foreground group-hover:text-primary transition-colors">{a.name}</h2>
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-1 mb-4">{a.specialty}</p>
                <p className="text-sm text-foreground/70 mb-5 line-clamp-2">{a.bio}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border pt-4">
                  <span className="flex items-center gap-1.5"><Star className="h-3 w-3 fill-primary text-primary" /> {a.rating} · {a.sold} sold</span>
                  <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
