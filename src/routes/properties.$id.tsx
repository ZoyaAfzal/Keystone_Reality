import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { properties, agents, formatPrice } from "@/lib/data";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Bed,
  Bath,
  Maximize,
  Calendar,
  Car,
  MapPin,
  Share2,
  Heart,
  Phone,
  Mail,
  ArrowLeft,
  Check,
} from "lucide-react";

function loaderFn({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);
  if (!property) throw notFound();
  return { property };
}

function NotFoundView() {
  return (
    <PageShell>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-4">404</p>
        <h1 className="font-display text-5xl text-foreground mb-3">Property not found</h1>
        <p className="text-muted-foreground mb-6">This listing may have been removed or is no longer available.</p>
        <Link to="/properties" className="text-primary link-underline text-sm uppercase tracking-[0.2em]">
          ← Back to portfolio
        </Link>
      </div>
    </PageShell>
  );
}

function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <PageShell>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl text-foreground mb-4">Something went wrong</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="text-primary uppercase tracking-[0.2em] text-sm"
        >
          Try again
        </button>
      </div>
    </PageShell>
  );
}

export const Route = createFileRoute("/properties/$id")({
  loader: loaderFn,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.property.title} — Keystone Realty` },
          { name: "description", content: loaderData.property.description?.slice(0, 160) },
          { property: "og:title", content: `${loaderData.property.title} — Keystone Realty` },
          { property: "og:image", content: loaderData.property.image },
        ]
      : [{ title: "Property — Keystone Realty" }],
  }),
  notFoundComponent: NotFoundView,
  errorComponent: ErrorView,
  component: PropertyPage,
});

function PropertyPage() {
  const { property } = Route.useLoaderData();
  const agent = agents.find((a) => a.id === property.agentId);
  const similar = properties.filter((p) => p.id !== property.id).slice(0, 3);
  const [tab, setTab] = useState<"overview" | "details" | "location">("overview");
  const [activeImg, setActiveImg] = useState(0);

  return (
    <PageShell>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-8 pb-4">
        <Link to="/properties" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
        </Link>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
        <div className="flex flex-col gap-4">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-video lg:aspect-[21/9] overflow-hidden"
          >
            <img
              src={(property.gallery ?? [property.image])[activeImg]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {(property.gallery ?? [property.image]).map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`flex-shrink-0 w-32 md:w-48 aspect-video overflow-hidden border transition-all ${
                  i === activeImg ? "border-primary scale-[1.02]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-[2fr_1fr] gap-12 pb-24">
        <div>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className={`text-[10px] uppercase tracking-[0.25em] px-3 py-1 ${property.status === "sale" ? "bg-primary/10 text-primary border border-primary/30" : "bg-green-accent/20 text-green-accent border border-green-accent/30"}`}>
                For {property.status}
              </span>
              <h1 className="font-display text-5xl lg:text-6xl text-foreground mt-5 leading-[1]">
                {property.title}
              </h1>
              <p className="flex items-center gap-2 text-muted-foreground mt-3">
                <MapPin className="h-4 w-4" /> {property.location}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display italic shimmer text-5xl">{formatPrice(property.price)}</p>
              {property.status === "rent" && <p className="text-sm text-muted-foreground">per month</p>}
              <div className="flex gap-2 mt-4 justify-end">
                <button className="w-10 h-10 border border-border hover:border-primary flex items-center justify-center transition-colors"><Heart className="h-4 w-4" /></button>
                <button className="w-10 h-10 border border-border hover:border-primary flex items-center justify-center transition-colors"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border my-10">
            {[
              { icon: Bed, label: "Bedrooms", value: property.beds },
              { icon: Bath, label: "Bathrooms", value: property.baths },
              { icon: Maximize, label: "Sq Ft", value: property.sqft.toLocaleString() },
              { icon: Calendar, label: "Year Built", value: property.yearBuilt },
              { icon: Car, label: "Garage", value: property.garage },
            ].map((s) => (
              <div key={s.label} className="bg-surface p-5 text-center">
                <s.icon className="h-5 w-5 text-primary mx-auto mb-3" strokeWidth={1.4} />
                <p className="font-display text-2xl text-foreground">{s.value}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-6 border-b border-border mb-8">
            {(["overview", "details", "location"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-4 text-[11px] uppercase tracking-[0.22em] transition-colors relative ${
                  tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {tab === t && (
                  <motion.span layoutId="propTab" className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                )}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div>
              <p className="text-foreground/80 leading-relaxed text-lg mb-10">{property.description}</p>
              <h3 className="font-display text-2xl mb-5 text-foreground">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities?.map((a: string) => (
                  <div key={a} className="flex items-center gap-3 text-sm text-foreground/80 py-3 border-b border-border/60">
                    <Check className="h-4 w-4 text-primary" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "details" && (
            <div className="space-y-3">
              {[
                ["Property Type", "Single Family Residence"],
                ["Lot Size", "1.2 acres"],
                ["Architectural Style", "Contemporary"],
                ["Heating", "Forced air, radiant"],
                ["Cooling", "Central"],
                ["MLS #", `LXN-${property.id.toUpperCase()}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b border-border/60 text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground">{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "location" && (
            <div className="aspect-video bg-surface border border-border flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-3" strokeWidth={1.2} />
                <p className="font-display text-2xl text-foreground">{property.location}</p>
                <p className="text-sm mt-1">Interactive map available on request</p>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 self-start">
          {agent && (
            <div className="border border-border bg-surface p-6">
              <div className="flex items-center gap-4 mb-5">
                <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full object-cover border border-primary/30" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Listed by</p>
                  <p className="font-display text-xl text-foreground">{agent.name}</p>
                  <p className="text-xs text-primary">{agent.specialty}</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-primary-light transition-colors">
                  <Phone className="h-3.5 w-3.5" /> Schedule Viewing
                </button>
                <button className="w-full flex items-center justify-center gap-2 border border-border py-3 text-[11px] uppercase tracking-[0.22em] hover:border-primary hover:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5" /> Send Inquiry
                </button>
              </div>
            </div>
          )}

          <div className="border border-border bg-surface p-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-4">Mortgage Estimate</p>
            <p className="font-display italic text-primary text-4xl">
              {formatPrice(Math.round((property.price * 0.8 * 0.0055)))}
              <span className="text-sm text-muted-foreground font-sans not-italic ml-1">/mo</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Based on 20% down, 30-yr fixed at 6.5% APR
            </p>
          </div>
        </aside>
      </section>

      <section className="bg-surface border-t border-border py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-4xl text-foreground mb-10">
            Similar <span className="italic text-primary">Residences</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similar.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
