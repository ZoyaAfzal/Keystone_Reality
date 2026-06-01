import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section className="relative py-32 lg:py-40 bg-surface-2 noise overflow-hidden">
      <Quote
        className="absolute top-16 left-10 h-48 w-48 text-primary/[0.04]"
        strokeWidth={1}
      />
      <Quote
        className="absolute bottom-16 right-10 h-48 w-48 text-primary/[0.04] rotate-180"
        strokeWidth={1}
      />

      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center relative">
        <p className="text-[11px] uppercase tracking-[0.35em] text-primary mb-10">
          What Clients Say
        </p>

        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-display italic text-3xl md:text-4xl text-foreground leading-snug mb-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border border-primary/30"
                />
                <div>
                  <p className="font-display text-xl text-foreground">{t.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-px transition-all duration-500 ${
                i === idx ? "w-12 bg-primary" : "w-6 bg-border hover:bg-foreground/40"
              }`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
