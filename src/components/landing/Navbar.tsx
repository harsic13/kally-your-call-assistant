import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full border-[2.5px] border-primary animate-spin" style={{ animationDuration: "6s" }} />
            <div className="absolute inset-[3px] rounded-full border-[2px] border-secondary animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
          </div>
          <span className="font-display text-xl font-bold text-foreground">Kally</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="font-mono-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
          <a href="#use-cases" className="font-mono-sm text-muted-foreground hover:text-foreground transition-colors">Use Cases</a>
          <a href="#pricing" className="font-mono-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/dashboard">
            <Button variant="hero" size="default">Try it Free</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-4 space-y-3">
          <a href="#how-it-works" className="block font-mono-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>How it Works</a>
          <a href="#use-cases" className="block font-mono-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Use Cases</a>
          <a href="#pricing" className="block font-mono-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
          <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
            <Button variant="hero" size="default" className="w-full mt-2">Try it Free</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
