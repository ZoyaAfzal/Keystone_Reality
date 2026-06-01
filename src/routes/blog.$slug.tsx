import { createFileRoute, notFound, Link, useRouter } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { blogPosts } from "@/lib/data";
import { Clock, ArrowLeft } from "lucide-react";

function NotFoundView() {
  return (
    <PageShell>
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-5xl mb-3">Article not found</h1>
        <Link to="/blog" className="text-primary uppercase text-sm tracking-[0.2em]">← Back</Link>
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

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Keystone Realty Journal` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:image", content: loaderData.post.image },
        ]
      : [{ title: "Article" }],
  }),
  notFoundComponent: NotFoundView,
  errorComponent: ErrorView,
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PageShell>
      <article>
        <div className="aspect-[21/9] max-h-[640px] w-full overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-10 -mt-24 relative">
          <div className="bg-background p-10 md:p-14 border border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-3.5 w-3.5" /> Journal
            </Link>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary mb-4">{post.category}</p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground leading-[1.05] mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 prose-luxe">
          <p className="text-xl text-foreground/85 leading-relaxed mb-8 font-display italic">
            {post.excerpt}
          </p>
          <p className="text-foreground/80 leading-relaxed mb-6">
            The contours of the luxury market shifted measurably this past quarter. Where once the conversation centered on raw square footage and zip code prestige, today's most sophisticated buyers are speaking a more refined language - provenance, architect, longevity of design.
          </p>
          <blockquote className="border-l-2 border-primary pl-6 my-10 font-display italic text-2xl text-primary">
            "The new luxury is permanence. Buyers want residences that will read as masterful in fifty years, not just trending today."
          </blockquote>
          <p className="text-foreground/80 leading-relaxed mb-6">
            What we are observing across our portfolio is a flight to quality that transcends macroeconomic noise. Signed architectural residences in established markets continue to compress on the bid side. Meanwhile, well-located inventory of indifferent design is sitting longer than at any point in the last decade.
          </p>
          <h2 className="font-display text-3xl text-foreground mt-12 mb-5">The Geography of Demand</h2>
          <p className="text-foreground/80 leading-relaxed mb-6">
            Cross-border buyer activity is up sharply year-over-year. The traditional capitals - New York, Los Angeles, Miami - continue to anchor the conversation, but secondary luxury markets are seeing first-time entry from buyers seeking optionality.
          </p>
        </div>

        <section className="border-t border-border py-20 bg-surface">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <h2 className="font-display text-3xl mb-8">Related <span className="italic text-primary">Reading</span></h2>
            <div className="grid md:grid-cols-2 gap-8">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group grid grid-cols-3 gap-5 items-center">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary mb-2">{p.category}</p>
                    <h3 className="font-display text-xl group-hover:text-primary transition-colors">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
