import { Mic, Phone, Clock, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "Tell Kally what you need",
    desc: "Type or speak your request — \"Get a refund from Amazon for my broken headphones.\"",
  },
  {
    icon: Phone,
    title: "Kally makes the call",
    desc: "Our AI voice agent dials the number, navigates menus, and speaks with a real human.",
  },
  {
    icon: Clock,
    title: "Sit back and relax",
    desc: "Monitor the call in real-time or go about your day. Kally handles the wait and the conversation.",
  },
  {
    icon: CheckCircle,
    title: "Get the outcome",
    desc: "Receive a summary, transcript, and video recap of what happened. Task complete.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono-label text-primary mb-3">— How it Works —</p>
          <h2 className="font-display text-page-title text-foreground">
            Four steps, then you're done
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg h-full">
                <p className="font-mono-label text-muted-foreground mb-4">0{i + 1}</p>
                <div className="w-12 h-12 rounded-xl bg-primary-dim flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-card-title text-card-foreground mb-2">{step.title}</h3>
                <p className="text-body text-muted-foreground">{step.desc}</p>
              </div>

              {/* Connector arrow */}
              {i < 3 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-primary/30">
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
