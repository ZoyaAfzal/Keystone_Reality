import { Building2, Users, Award, Globe } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

const stats = [
  { icon: Building2, value: 2400, suffix: "+", label: "Properties Listed" },
  { icon: Users, value: 18000, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 15, suffix: "+", label: "Years of Excellence" },
  { icon: Globe, value: 42, suffix: "+", label: "Cities Worldwide" },
];

export function StatsSection() {
  return (
    <section className="bg-surface border-y border-border noise">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            whileHover={{ y: -4 }}
            className="group p-10 lg:p-12 border-r border-b lg:border-b-0 border-border last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r relative"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-0 bg-primary transition-all duration-500 group-hover:h-16" />
            <s.icon className="h-6 w-6 text-primary mb-6" strokeWidth={1.2} />
            <div className="font-display italic text-primary text-5xl lg:text-6xl mb-2">
              <AnimatedCounter to={s.value} suffix={s.suffix} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
