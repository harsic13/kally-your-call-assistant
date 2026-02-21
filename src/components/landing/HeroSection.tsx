import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="blob blob-orange animate-blob-pulse w-[500px] h-[500px] -top-40 -right-40 absolute" />
      <div className="blob blob-light animate-blob-pulse w-[400px] h-[400px] bottom-0 -left-32 absolute" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="space-y-6 relative z-10">
            <div className="opacity-0 animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-dim border border-primary/20 font-mono-label text-primary">
                AI Personal Assistant · Makes real phone calls for you
              </span>
            </div>

            <h1 className="opacity-0 animate-fade-up delay-100 font-display text-page-title lg:text-5xl text-foreground leading-tight">
              You've got places to be.{" "}
              <span className="text-primary">We'll call.</span>
            </h1>

            <p className="opacity-0 animate-fade-up delay-200 text-body text-muted-foreground max-w-md">
              Kally is your AI voice agent that handles phone calls on your behalf. From customer support to reservations to awkward reminders, just type what you need and Kally takes care of the rest.
            </p>

            <div className="opacity-0 animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-2xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-body transition-all"
              />
              <Button variant="hero" size="lg" className="gap-2 rounded-2xl">
                Get Started <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          {/* Right column phone mockup */}
          <div className="relative z-10 flex justify-center opacity-0 animate-fade-up delay-400">
            <div className="relative w-72 h-[500px] rounded-[2.5rem] bg-card border-2 border-border shadow-2xl overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/90 rounded-full flex items-center justify-center gap-2 z-20">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
              </div>

              {/* Call screen */}
              <div className="absolute inset-0 bg-gradient-to-b from-foreground/95 to-foreground/80 flex flex-col items-center justify-center gap-5 pt-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <img src={heroIllustration} alt="Kally AI" className="w-10 h-10 object-contain" />
                </div>
                <div className="text-center">
                  <p className="font-display text-lg text-primary-foreground">Amazon Support</p>
                  <p className="font-mono-label text-primary-foreground/50 mt-1">Kally · AI Voice Agent</p>
                </div>

                {/* Timer */}
                <p className="font-mono text-2xl text-primary font-bold tracking-wider" style={{ textShadow: "0 0 20px hsla(24, 94%, 50%, 0.4)" }}>
                  02:34
                </p>

                <p className="font-mono-label text-primary-foreground/40">Speaking with agent</p>

                {/* Waveform */}
                <div className="flex items-center gap-1 h-8">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-primary"
                      style={{
                        animation: `waveform 1.2s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                        height: "8px",
                      }}
                    />
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/60 font-mono-label">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                  Kally is handling this call
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
