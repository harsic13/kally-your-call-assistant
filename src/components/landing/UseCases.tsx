import { Film, Package, UtensilsCrossed, CheckCircle } from "lucide-react";

const cases = [
  {
    icon: Film,
    situation: "Movie Night",
    title: "Book last-minute tickets",
    quote: "\"Hey Kally, call AMC and book two tickets for Dune Part Two tonight, 7pm showing.\"",
    outcome: "Tickets confirmed for 7:15pm, Row G seats 4-5",
  },
  {
    icon: Package,
    situation: "Missing Order",
    title: "Get a refund on lost package",
    quote: "\"Kally, call Amazon about order #4821 — headphones never arrived. Get a refund.\"",
    outcome: "Full refund of $89.99 processed, arrives in 3-5 business days",
  },
  {
    icon: UtensilsCrossed,
    situation: "Date Night",
    title: "Reserve a table",
    quote: "\"Book a table for two at Nobu Malibu, Saturday 8pm. Mention it's an anniversary.\"",
    outcome: "Reservation confirmed, window table, complimentary dessert noted",
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-20 bg-accent/50 relative">
      <div className="blob blob-orange animate-blob-pulse w-[300px] h-[300px] top-20 -right-20 absolute" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="font-mono-label text-primary mb-3">— Use Cases —</p>
          <h2 className="font-display text-page-title text-foreground">
            Real scenarios, real results
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-dim flex items-center justify-center">
                  <c.icon size={20} className="text-primary" />
                </div>
                <span className="font-mono-label text-muted-foreground">{c.situation}</span>
              </div>

              <h3 className="font-display text-card-title text-card-foreground mb-3">{c.title}</h3>

              <blockquote className="text-body italic text-muted-foreground border-l-2 border-primary/30 pl-3 mb-4">
                {c.quote}
              </blockquote>

              <div className="flex items-start gap-2 text-success">
                <CheckCircle size={16} className="mt-0.5 shrink-0" />
                <p className="text-body font-medium">{c.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
