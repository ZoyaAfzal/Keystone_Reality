import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Bed, Bath, Maximize, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Property } from "@/types";
import { agents, formatPrice } from "@/lib/data";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const [saved, setSaved] = useState(false);
  const agent = agents.find((a) => a.id === property.agentId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      className="group bg-surface border border-border overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(201,169,110,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 backdrop-blur-md ${
              property.status === "sale"
                ? "bg-background/70 text-foreground border border-border"
                : "bg-green-accent/90 text-background"
            }`}
          >
            For {property.status}
          </span>
          {property.badge && (
            <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-primary text-primary-foreground">
              {property.badge}
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setSaved(!saved);
          }}
          className="absolute top-4 right-4 w-9 h-9 backdrop-blur-md bg-background/60 border border-border flex items-center justify-center hover:border-primary transition-colors"
          aria-label="Save"
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              saved ? "fill-primary text-primary scale-110" : "text-foreground"
            }`}
          />
        </button>

        <div className="absolute bottom-5 left-5">
          <div className="font-display text-3xl text-primary leading-none">
            {formatPrice(property.price)}
            {property.status === "rent" && (
              <span className="text-sm text-foreground/70 font-sans ml-1">/mo</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-2xl text-foreground mb-1 leading-tight">{property.title}</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5">
          <MapPin className="h-3.5 w-3.5" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-foreground/80 pb-5 border-b border-border">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-primary/70" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-primary/70" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-primary/70" />
            <span>{property.sqft.toLocaleString()} ft²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5">
          <div className="flex items-center gap-2.5">
            {agent && (
              <img
                src={agent.image}
                alt={agent.name}
                loading="lazy"
                className="w-8 h-8 rounded-full object-cover border border-border"
              />
            )}
            <span className="text-xs text-muted-foreground">{agent?.name}</span>
          </div>
          <Link
            to="/properties/$id"
            params={{ id: property.id }}
            className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-primary group/btn"
          >
            View
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
