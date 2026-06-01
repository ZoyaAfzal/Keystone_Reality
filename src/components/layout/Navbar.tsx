import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/agents", label: "Agents" },
  { to: "/blog", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <Home className="h-5 w-5 text-primary transition-transform group-hover:rotate-[8deg]" />
          <span className="font-display text-2xl tracking-wide text-foreground">
            Keystone<span className="text-primary italic"> Realty</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => {
            const active = path === l.to || (l.to !== "/" && path.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`link-underline text-[13px] uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-primary" : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          Book Consultation
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-foreground p-2"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-[82%] max-w-sm bg-surface border-l border-border z-50 lg:hidden p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-2xl text-primary italic">Keystone Realty</span>
              <button onClick={() => setOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
