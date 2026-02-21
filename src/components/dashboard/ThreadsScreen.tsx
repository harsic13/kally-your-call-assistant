import { useState } from "react";
import { Repeat, CheckCircle, Clock, ArrowLeftRight } from "lucide-react";

interface Thread {
  id: string;
  name: string;
  callCount: number;
  status: "pending" | "resolved" | "awaiting";
  statusLabel: string;
  lastActivity: string;
}

const threads: Thread[] = [
  { id: "1", name: "Amazon Refund · Order #112", callCount: 3, status: "pending", statusLabel: "Pending", lastActivity: "Last call 2h ago" },
  { id: "2", name: "Delta Flight Cancellation", callCount: 2, status: "resolved", statusLabel: "Resolved", lastActivity: "Completed today" },
  { id: "3", name: "Marriott Check-in Change", callCount: 2, status: "awaiting", statusLabel: "Awaiting callback", lastActivity: "Last call 5h ago" },
];

interface TimelineStep {
  type: "completed" | "escalated" | "pending";
  label: string;
  description: string;
  highlightPhrase?: string;
}

const threadDetails: Record<string, { title: string; subtitle: string; steps: TimelineStep[] }> = {
  "1": {
    title: "Amazon Refund · Order #112-884",
    subtitle: "3 calls · Started Feb 20 · In progress",
    steps: [
      { type: "completed", label: "Call 1 · Feb 20, 9:14 AM · 6 min", description: "Reached Amazon support. Reported item not delivered. Rep opened case #AMZ-9921 and asked to call back in 24 hours." },
      { type: "escalated", label: "Call 2 · Feb 21, 10:02 AM · 4 min", description: "Called back. Rep offered replacement or full refund. Escalated to user, waiting on preference.", highlightPhrase: "Escalated to user" },
      { type: "pending", label: "Call 3 · Pending user response", description: "Will call back once user confirms: refund or replacement." },
    ],
  },
  "2": {
    title: "Delta Flight Cancellation",
    subtitle: "2 calls · Started Feb 19 · Resolved",
    steps: [
      { type: "completed", label: "Call 1 · Feb 19, 2:30 PM · 8 min", description: "Called Delta to cancel flight DL-482. Agent confirmed cancellation and initiated travel credit." },
      { type: "completed", label: "Call 2 · Feb 20, 9:00 AM · 3 min", description: "Confirmed $312 travel credit applied to account. Valid for 12 months." },
    ],
  },
  "3": {
    title: "Marriott Check-in Change",
    subtitle: "2 calls · Started Feb 20 · Awaiting callback",
    steps: [
      { type: "completed", label: "Call 1 · Feb 20, 11:15 AM · 5 min", description: "Called Marriott to change check-in from Feb 24 to Feb 25. Front desk said manager approval needed." },
      { type: "escalated", label: "Call 2 · Feb 20, 3:00 PM · 2 min", description: "Manager unavailable. Hotel will call back within 24 hours to confirm.", highlightPhrase: "Hotel will call back" },
    ],
  },
};

const statusBadge = {
  pending: "bg-primary-dim text-primary",
  resolved: "bg-success/10 text-success",
  awaiting: "bg-primary-dim text-primary",
};

const ThreadsScreen = () => {
  const [selectedId, setSelectedId] = useState("1");
  const detail = threadDetails[selectedId];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left panel */}
      <div className="w-[280px] border-r border-border overflow-y-auto p-5">
        <h1 className="font-display text-page-title text-foreground mb-1">Threads</h1>
        <p className="font-mono-label text-muted-foreground mb-5">{threads.filter(t => t.status !== "resolved").length} ACTIVE THREADS</p>

        <div className="space-y-1">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedId(thread.id)}
              className={`w-full text-left p-3 rounded-2xl transition-all duration-200 border-l-[3px] ${
                selectedId === thread.id
                  ? "border-l-primary bg-primary-dim"
                  : "border-l-transparent hover:bg-accent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary-dim flex items-center justify-center shrink-0 mt-0.5">
                  <Repeat size={14} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{thread.name}</p>
                  <p className="font-mono-label text-muted-foreground mt-0.5">{thread.lastActivity} · {thread.statusLabel}</p>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full font-mono-label ${statusBadge[thread.status]}`}>
                  {thread.callCount} calls
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
          <h2 className="font-display text-2xl text-foreground">{detail.title}</h2>
          <p className="font-mono-label text-muted-foreground mt-1">{detail.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {detail.steps.map((step, i) => {
            const isLast = i === detail.steps.length - 1;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    step.type === "completed" ? "bg-primary" :
                    step.type === "escalated" ? "border-2 border-secondary" :
                    "border-2 border-muted-foreground/30"
                  }`}>
                    {step.type === "completed" && <CheckCircle size={14} className="text-primary-foreground" />}
                    {step.type === "escalated" && <ArrowLeftRight size={12} className="text-secondary" />}
                    {step.type === "pending" && <Clock size={12} className="text-muted-foreground/50" />}
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 min-h-[40px] bg-primary/15" />
                  )}
                </div>

                <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                  <p className="font-mono-label text-muted-foreground mb-1">{step.label}</p>
                  <p className={`text-body ${step.type === "pending" ? "text-muted-foreground" : "text-foreground"}`}>
                    {step.highlightPhrase ? (
                      <>
                        {step.description.split(step.highlightPhrase)[0]}
                        <span className="font-bold text-secondary">{step.highlightPhrase}</span>
                        {step.description.split(step.highlightPhrase)[1]}
                      </>
                    ) : step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ThreadsScreen;
