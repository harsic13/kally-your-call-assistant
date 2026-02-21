import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const techChips = ["Vapi", "ElevenLabs", "Minimax", "Plivo", "Supabase"];

const CTASection = () => {
  return (
    <>
      {/* Tech stack */}
      <section className="py-10 border-t border-border">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-center gap-4">
          <span className="font-mono-label text-muted-foreground">Powered by</span>
          {techChips.map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border font-mono-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground relative overflow-hidden">
        <div className="blob w-[400px] h-[400px] -top-32 -left-32 absolute" style={{ background: "hsla(25, 95%, 53%, 0.08)" }} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-page-title lg:text-5xl text-background mb-4">
            Stop dreading the{" "}
            <span className="italic text-primary">phone call</span>
          </h2>
          <p className="font-mono-sm text-background/50 mb-8 max-w-md mx-auto">
            Let Kally handle the hold music, the transfers, and the awkward conversations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-xl bg-background/10 border border-background/20 text-background placeholder:text-background/30 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-body transition-all"
            />
            <Button variant="hero" size="lg" className="gap-2">
              Get Early Access <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-foreground border-t border-background/10">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 rounded-full border-[1.5px] border-primary" />
            </div>
            <span className="font-display text-sm font-bold text-background">Kally</span>
          </div>
          <p className="font-mono-label text-background/30">Built at SF AI Hackathon 2025</p>
        </div>
      </footer>
    </>
  );
};

export default CTASection;
