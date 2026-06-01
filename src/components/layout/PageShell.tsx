import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "motion/react";

export function PageShell({ children, withTopPad = true }: { children: ReactNode; withTopPad?: boolean }) {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={withTopPad ? "pt-20" : ""}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.35em] text-primary mb-5 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-primary" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-display text-6xl lg:text-8xl text-foreground leading-[0.95]"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-6 text-base text-foreground/70 max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
