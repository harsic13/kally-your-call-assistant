const chips = [
  "Ask friend to book movie tickets",
  "Get refund on undelivered order",
  "Reserve table at Nobu for Saturday",
  "Cancel flight and request credit",
  "Remind friend to wake up for meeting",
  "Schedule dentist appointment",
  "Negotiate lower internet bill",
  "Follow up on insurance claim",
  "Book salon appointment for Friday",
  "Change delivery address with courier",
];

const ScrollingChips = () => {
  const doubled = [...chips, ...chips];

  return (
    <section className="py-10 overflow-hidden border-y border-border">
      <div className="animate-scroll-chips flex gap-4 whitespace-nowrap">
        {doubled.map((chip, i) => (
          <span
            key={i}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-accent border border-primary/15 text-body text-foreground font-medium shrink-0"
          >
            {chip}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ScrollingChips;
