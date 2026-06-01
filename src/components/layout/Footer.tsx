import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Twitter, Facebook, Home, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border noise">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-5">
            <Home className="h-5 w-5 text-primary" />
            <span className="font-display text-2xl">
              Keystone<span className="text-primary italic"> Realty</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
            A curated portfolio of the world's most considered residences. Discretion, architecture, longevity.
          </p>
          <div className="flex gap-3">
            {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:-translate-y-0.5"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["/properties", "Properties"],
              ["/neighborhoods", "Neighborhoods"],
              ["/agents", "Agents"],
              ["/blog", "Journal"],
              ["/about", "About"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-foreground/70 hover:text-primary transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary mb-5">Categories</h4>
          <ul className="space-y-3 text-sm">
            {["Villas", "Penthouses", "Apartments", "Estates", "Commercial", "Land"].map((c) => (
              <li key={c}>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-primary mb-5">The Quiet List</h4>
          <p className="text-sm text-muted-foreground mb-5">
            Private previews of off-market residences, delivered monthly.
          </p>
          <form className="flex border-b border-border focus-within:border-primary transition-colors">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="text-primary px-2" aria-label="subscribe">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row justify-end items-center gap-3 text-xs text-muted-foreground">
          <a 
            href="https://axistechgroup.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            Powered by <span className="text-foreground font-medium">AxisTechGroup</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
