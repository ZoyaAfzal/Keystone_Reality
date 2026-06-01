import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { neighborhoods, properties, formatPrice } from "@/lib/data";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ArrowLeft, Building2, TrendingUp, Footprints } from "lucide-react";

function NotFoundView() {
  return (
    <PageShell>
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-5xl mb-3">Neighborhood not found</h1>
        <Link to="/neighborhoods" className="text-primary uppercase text-sm tracking-[0.2em]">← Back</Link>
      </div>
    </PageShell>
  );
}
function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <PageShell>
      <div className="min-h-[50vh] flex items-center justify-center">
        <button onClick={() => { router.invalidate(); reset(); }} className="text-primary uppercase tracking-[0.2em]">Try again</button>
      </div>
    </PageShell>
  );
}

export const Route = createFileRoute("/neighborhoods/$slug")({
  loader: ({ params }) => {
    const n = neighborhoods.find((x) => x.slug === params.slug);
    if (!n) throw notFound();
    return { n };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.n.name} — Keystone Realty Neighborhoods` },
          { name: "description", content: loaderData.n.description },
          { property: "og:image", content: loaderData.n.image },
        ]
      : [{ title: "Neighborhood" }],
  }),
  notFoundComponent: NotFoundView,
  errorComponent: ErrorView,
  component: NeighborhoodPage,
});

function NeighborhoodPage() {
  const { n } = Route.useLoaderData();
  const list = properties.filter((p) => p.neighborhood === n.slug);

  return (
    <PageShell withTopPad={false}>
      <PageHero
        eyebrow={`${n.city}, ${n.country}`}
        title={`<span class="italic text-primary">${n.name}</span>`}
        subtitle={n.description}
        image={n.image}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10">
        <Link to="/neighborhoods" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> All Neighborhoods
        </Link>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
        {[
          { icon: Building2, label: "Listings", value: n.count },
          { icon: TrendingUp, label: "Avg. From", value: formatPrice(n.from) },
          { icon: Footprints, label: "Walk Score", value: "92" },
          { icon: Building2, label: "Median Days", value: "28" },
        ].map((s) => (
          <div key={s.label} className="bg-background p-8">
            <s.icon className="h-5 w-5 text-primary mb-4" strokeWidth={1.4} />
            <p className="font-display italic text-primary text-4xl">{s.value}</p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-2">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <h2 className="font-display text-4xl text-foreground mb-10">
          Residences in <span className="italic text-primary">{n.name}</span>
        </h2>
        {list.length === 0 ? (
          <p className="text-muted-foreground">No active listings — please contact us for off-market opportunities.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}
