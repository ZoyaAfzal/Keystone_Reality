import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Keystone Realty" },
      { name: "description", content: "A small firm with a singular focus: representing the world's most considered residences." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell withTopPad={false}>
      <PageHero
        eyebrow="Our Story"
        title='A <span class="italic text-primary">considered</span><br/>practice.'
        subtitle="Founded in 2010 around a simple conviction: that great architecture deserves great representation."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=85"
      />

      <section className="py-24 max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p className="font-display italic text-3xl md:text-4xl text-foreground leading-snug">
          "We don't list properties. We curate residences and the lives they make possible."
        </p>
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary mt-6">Founding Statement</p>
      </section>

      <section className="grid lg:grid-cols-2 max-w-[1400px] mx-auto px-6 md:px-10 gap-16 pb-24">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80" alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-5">The Philosophy</p>
          <h2 className="font-display text-5xl text-foreground leading-[1] mb-6">Quietly, <span className="italic text-primary">deliberately</span> different.</h2>
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p>From day one, we limited the size of our agent bench. We turned away listings that didn't meet our threshold. We invested in relationships with architects, designers and developers rather than billboards and SEO.</p>
            <p>The result is a small firm with disproportionate access to off-market opportunities, to discerning buyers, and to the kind of trust that takes a decade to build.</p>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface border-y border-border py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: 2400, suffix: "+", label: "Residences Represented" },
            { value: 4, suffix: "B+", label: "Total Transactional Volume ($)" },
            { value: 15, suffix: "+", label: "Years in Practice" },
            { value: 97, suffix: "%", label: "Client Referral Rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display italic text-primary text-5xl"><AnimatedCounter to={s.value} suffix={s.suffix} /></div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-3">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
