import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { properties } from "@/lib/data";
import { useState } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal, Grid3x3, Map as MapIcon, X } from "lucide-react";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties — Keystone Realty" },
      { name: "description", content: "Browse our complete portfolio of luxury properties for sale and rent." },
    ],
  }),
  component: PropertiesPage,
});

const types = ["All", "Villa", "Penthouse", "Estate", "Apartment"];
const statuses = ["Any", "For Sale", "For Rent"];

function PropertiesPage() {
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("Any");
  const [bedrooms, setBedrooms] = useState(0);
  const [sort, setSort] = useState("featured");

  let list = [...properties];
  if (status === "For Sale") list = list.filter((p) => p.status === "sale");
  if (status === "For Rent") list = list.filter((p) => p.status === "rent");
  if (bedrooms > 0) list = list.filter((p) => p.beds >= bedrooms);
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (status !== "Any") activeFilters.push({ label: status, clear: () => setStatus("Any") });
  if (type !== "All") activeFilters.push({ label: type, clear: () => setType("All") });
  if (bedrooms > 0) activeFilters.push({ label: `${bedrooms}+ Beds`, clear: () => setBedrooms(0) });

  return (
    <PageShell>
      <section className="border-b border-border bg-surface py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary mb-4">All Listings</p>
          <h1 className="font-display text-5xl lg:text-7xl text-foreground">
            The <span className="italic text-primary">Portfolio</span>
          </h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 grid lg:grid-cols-[280px_1fr] gap-10">
        <aside className="lg:sticky lg:top-28 self-start space-y-8">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>

          <FilterGroup label="Status">
            {statuses.map((s) => (
              <FilterOption key={s} active={status === s} onClick={() => setStatus(s)}>
                {s}
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup label="Type">
            {types.map((t) => (
              <FilterOption key={t} active={type === t} onClick={() => setType(t)}>
                {t}
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup label="Min Bedrooms">
            <div className="flex gap-2 flex-wrap">
              {[0, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setBedrooms(n)}
                  className={`w-10 h-10 text-sm border transition-colors ${
                    bedrooms === n
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n === 0 ? "Any" : `${n}+`}
                </button>
              ))}
            </div>
          </FilterGroup>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-foreground font-display italic text-xl">{list.length}</span> of {properties.length} residences
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-surface border border-border text-sm px-3 py-2 outline-none focus:border-primary"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
              <div className="hidden md:flex border border-border">
                <button className="p-2 bg-primary text-primary-foreground"><Grid3x3 className="h-4 w-4" /></button>
                <button className="p-2 text-muted-foreground hover:text-foreground"><MapIcon className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((f) => (
                <motion.button
                  key={f.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={f.clear}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10"
                >
                  {f.label}
                  <X className="h-3 w-3" />
                </motion.button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">{label}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterOption({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left text-sm py-1.5 transition-colors ${
        active ? "text-primary" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      <span className={active ? "border-b border-primary pb-0.5" : ""}>{children}</span>
    </button>
  );
}

export { notFound };
