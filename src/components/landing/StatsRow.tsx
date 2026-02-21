const stats = [
  { value: "38min", label: "Avg time saved" },
  { value: "94%", label: "Tasks resolved autonomously" },
  { value: "12+", label: "Supported service types" },
  { value: "24/7", label: "Agent availability" },
];

const StatsRow = () => {
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:border-r last:border-r-0 border-border">
              <p className="font-display text-4xl lg:text-5xl font-bold text-foreground">{stat.value}</p>
              <p className="font-mono-label text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRow;
