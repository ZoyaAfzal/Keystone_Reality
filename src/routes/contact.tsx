import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/layout/PageShell";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Keystone Realty" },
      { name: "description", content: "Begin a discreet conversation about your next residence." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell withTopPad={false}>
      <PageHero
        eyebrow="Get in Touch"
        title='Begin the <span class="italic text-primary">conversation</span>'
        subtitle="Whether you're considering a sale, an acquisition, or simply exploring, a discreet introduction is the first step."
        image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85"
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 grid lg:grid-cols-[1fr_1.3fr] gap-16">
        <div className="space-y-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-3">Headquarters</p>
            <h2 className="font-display text-4xl text-foreground mb-3">By appointment only.</h2>
            <p className="text-muted-foreground">We meet by referral and introduction. Please tell us a little about what you're considering, and we'll be in touch within 24 hours.</p>
          </div>

          {[
            { icon: Mail, label: "Email", value: "private@keystonerealty.com" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 border-t border-border pt-5">
              <c.icon className="h-5 w-5 text-primary mt-0.5" strokeWidth={1.4} />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">{c.label}</p>
                <p className="text-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form className="bg-surface border border-border p-10 space-y-7">
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary">Private Inquiry</p>
          <div className="grid sm:grid-cols-2 gap-7">
            <FloatInput label="First Name" />
            <FloatInput label="Last Name" />
          </div>
          <FloatInput label="Email" type="email" />
          <FloatInput label="What are you considering?" />
          <FloatInput label="Tell us more" textarea />
          <button type="submit" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-[12px] uppercase tracking-[0.22em] hover:bg-primary-light transition-colors">
            Send Inquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </section>
    </PageShell>
  );
}

function FloatInput({ label, type = "text", textarea }: { label: string; type?: string; textarea?: boolean }) {
  return (
    <label className="block group relative">
      <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">{label}</span>
      {textarea ? (
        <textarea rows={4} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground resize-none transition-colors" />
      ) : (
        <input type={type} className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-foreground transition-colors" />
      )}
    </label>
  );
}
