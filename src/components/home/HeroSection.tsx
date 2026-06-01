import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Search, ChevronDown, Play, MapPin, ArrowDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[760px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt="Luxury villa exterior"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.95] text-foreground max-w-5xl"
          >
            Find Your
            <br />
            Perfect <span className="italic text-primary">Haven</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 text-base md:text-lg text-foreground/70 max-w-xl leading-relaxed"
          >
            Discover extraordinary properties curated for those who appreciate
            the finest in architecture, craftsmanship and design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/properties"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-[12px] uppercase tracking-[0.2em] hover:bg-primary-light transition-colors"
            >
              Browse Properties
              <ArrowDown className="h-4 w-4 rotate-[-90deg] transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Dialog>
              <DialogTrigger asChild>
                <button className="group inline-flex items-center gap-3 text-foreground text-[12px] uppercase tracking-[0.2em] hover:text-primary transition-colors cursor-pointer">
                  <span className="w-11 h-11 border border-foreground/30 group-hover:border-primary rounded-full flex items-center justify-center transition-colors">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </span>
                  Watch Story
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/y9j-BL5ocW8?autoplay=1"
                  title="Luxury Real Estate Story"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pb-12"
        >
          <SearchBar />
        </motion.div>
      </motion.div>

      {/* Floating property cards */}
      <FloatingCard
        className="hidden xl:block absolute top-1/3 right-10 w-56"
        delay={1.4}
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80"
        title="Villa Belvedere"
        price="$12.9M"
        location="Manhattan"
      />
      <FloatingCard
        className="hidden xl:block absolute bottom-44 left-10 w-56"
        delay={1.6}
        image="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80"
        title="Skyline 41"
        price="$8.4M"
        location="Tribeca"
        floatDuration={5}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-border relative overflow-hidden">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-px h-6 bg-primary"
          />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  image,
  title,
  price,
  location,
  delay = 0,
  floatDuration = 4,
}: {
  className?: string;
  image: string;
  title: string;
  price: string;
  location: string;
  delay?: number;
  floatDuration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="bg-surface/85 backdrop-blur-md border border-border p-3"
      >
        <div className="relative aspect-[4/3] overflow-hidden mb-3">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[9px] uppercase tracking-widest px-2 py-0.5">
            New
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="font-display text-base text-foreground leading-tight">{title}</p>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="h-2.5 w-2.5" />
              {location}
            </p>
          </div>
          <p className="font-display italic text-primary text-lg">{price}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SearchBar() {
  return (
    <div className="bg-surface/90 backdrop-blur-xl border border-border p-2">
      <div className="flex gap-1 px-2 pt-2">
        {["Buy", "Rent", "Sell"].map((t, i) => (
          <button
            key={t}
            className={`text-[11px] uppercase tracking-[0.2em] px-4 py-2 transition-colors ${
              i === 0 ? "text-primary border-b border-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-border mt-2">
        <SelectField label="Location" value="Any City" />
        <SelectField label="Type" value="All Types" />
        <SelectField label="Price" value="No Limit" />
        <SelectField label="Bedrooms" value="Any" />
        <button className="bg-primary text-primary-foreground flex items-center justify-center gap-2 py-5 text-[12px] uppercase tracking-[0.2em] hover:bg-primary-light transition-colors">
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </div>
  );
}

function SelectField({ label, value }: { label: string; value: string }) {
  return (
    <button className="bg-surface text-left px-5 py-4 hover:bg-surface-2 transition-colors group">
      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">{value}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
}
