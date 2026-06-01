import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { agents, properties } from "@/lib/data";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Star, Mail, Phone, ArrowLeft, Linkedin, Instagram, Twitter } from "lucide-react";

function NotFoundView() {
  return (
    <PageShell>
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-5xl mb-3">Agent not found</h1>
        <Link to="/agents" className="text-primary uppercase text-sm tracking-[0.2em]">← Back</Link>
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

export const Route = createFileRoute("/agents/$id")({
  loader: ({ params }) => {
    const agent = agents.find((a) => a.id === params.id);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.agent.name} — Keystone Realty` },
          { name: "description", content: loaderData.agent.bio },
          { property: "og:image", content: loaderData.agent.image },
        ]
      : [{ title: "Agent" }],
  }),
  notFoundComponent: NotFoundView,
  errorComponent: ErrorView,
  component: AgentPage,
});

function AgentPage() {
  const { agent } = Route.useLoaderData();
  const listings = properties.filter((p) => p.agentId === agent.id);

  return (
    <PageShell>
      <section className="relative">
        <div className="absolute inset-0 h-[320px] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-12">
          <Link to="/agents" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary mb-12">
            <ArrowLeft className="h-3.5 w-3.5" /> All Agents
          </Link>
          <div className="grid lg:grid-cols-[300px_1fr] gap-10 items-start pb-16">
            <div className="aspect-[3/4] overflow-hidden border border-border">
              <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">{agent.specialty}</p>
              <h1 className="font-display text-6xl lg:text-7xl text-foreground leading-[1]">{agent.name}</h1>
              <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-foreground/80">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> {agent.rating} rating</span>
                <span>{agent.sold} properties sold</span>
                <span>{agent.years} years experience</span>
              </div>
              <p className="text-foreground/80 leading-relaxed text-lg mt-8 max-w-2xl">{agent.bio}</p>
              <div className="flex flex-wrap gap-3 mt-8">
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] hover:bg-primary-light"><Phone className="h-3.5 w-3.5" /> Call Agent</button>
                <button className="flex items-center gap-2 border border-border px-6 py-3 text-[11px] uppercase tracking-[0.22em] hover:border-primary hover:text-primary"><Mail className="h-3.5 w-3.5" /> Send Email</button>
                <div className="flex gap-2 ml-2">
                  {[Linkedin, Instagram, Twitter].map((I, i) => (
                    <a key={i} href="#" className="w-11 h-11 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"><I className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 border-t border-border">
        <h2 className="font-display text-4xl mb-10">Active <span className="italic text-primary">Listings</span></h2>
        {listings.length === 0 ? (
          <p className="text-muted-foreground">No active listings at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}
