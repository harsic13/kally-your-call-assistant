import { useState } from "react";
import { X, MessageSquare, Radio, List, CheckCircle, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EscalationModalProps {
  open: boolean;
  onClose: () => void;
}

const quickReplies = ["Full Refund", "Replacement"];

const liveBubbles = [
  { speaker: "kally", text: "Hi, I am calling about order number 112-884 which never arrived." },
  { speaker: "rep", text: "Let me pull that up... I can see the order. It shows delivered on February 18th." },
  { speaker: "kally", text: "It was not received at the address. I would like a refund or resolution please." },
  { speaker: "rep", text: "I can offer a full refund of $43 to the original payment method, or we can send a replacement item. Which would you prefer?" },
  { speaker: "kally", text: "One moment please, let me check with the account holder.", highlight: true },
];

const summarySteps = [
  { done: true, bold: "Connected to Amazon", rest: " after 2 min hold time" },
  { done: true, bold: "Reported order not received", rest: ", rep confirmed delivery marked Feb 18" },
  { done: true, bold: "Rep offered 2 options", rest: ", full refund of $43 or replacement item" },
  { done: false, bold: "Waiting for your preference", rest: ", Kally is currently on hold" },
];

const tabs = [
  { id: "message", label: "Message", icon: MessageSquare },
  { id: "transcript", label: "Live Transcript", icon: Radio },
  { id: "summary", label: "Summary", icon: List },
] as const;

const EscalationModal = ({ open, onClose }: EscalationModalProps) => {
  const [activeTab, setActiveTab] = useState<string>("message");
  const [selectedReply, setSelectedReply] = useState<string>("Full Refund");
  const [customMsg, setCustomMsg] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-[460px] max-h-[85vh] bg-card rounded-3xl overflow-hidden animate-spring-up flex flex-col"
        style={{
          border: "1px solid rgba(239,68,68,0.3)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.12), 0 0 40px rgba(239,68,68,0.04)",
        }}
      >
        {/* Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-dot" />
                <p className="text-sm font-bold text-foreground">Kally needs your help</p>
              </div>
              <p className="font-mono-label text-muted-foreground">Amazon Refund · Order #112-884 · On hold now</p>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-xl hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 font-mono-label transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-b-destructive text-destructive"
                  : "border-b-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Message tab */}
          {activeTab === "message" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <p className="font-mono-label text-destructive mb-1.5" style={{ fontSize: "0.6rem" }}>AGENT'S QUESTION</p>
                <p className="text-foreground" style={{ fontSize: "0.88rem" }}>
                  Amazon is offering a full refund ($43) or a replacement item. Which would you prefer?
                </p>
              </div>

              <div className="flex gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => setSelectedReply(reply)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all duration-200 ${
                      selectedReply === reply
                        ? "bg-primary-dim border border-primary/40 text-primary font-semibold"
                        : "bg-accent border border-border text-muted-foreground"
                    }`}
                    style={{ fontSize: "0.78rem" }}
                  >
                    {selectedReply === reply && <CheckCircle size={13} />}
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Or type a custom instruction..."
                  className="flex-1 h-10 px-3 rounded-xl bg-accent border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-body transition-all"
                />
                <Button variant="default" size="icon-sm" className="shrink-0 h-10 w-10 rounded-xl">
                  <Send size={14} />
                </Button>
              </div>
            </div>
          )}

          {/* Live Transcript tab */}
          {activeTab === "transcript" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                <p className="font-mono-label text-success" style={{ fontSize: "0.6rem" }}>LIVE · 4:32 ELAPSED · ON HOLD</p>
              </div>

              <div className="space-y-2.5 max-h-[150px] overflow-y-auto pr-1">
                {liveBubbles.map((msg, i) => {
                  const isKally = msg.speaker === "kally";
                  return (
                    <div key={i} className={`flex ${isKally ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-3 py-2 text-body ${
                          isKally
                            ? "bg-primary-dim text-foreground rounded-xl rounded-br-sm"
                            : "bg-accent text-muted-foreground rounded-xl rounded-bl-sm"
                        } ${(msg as any).highlight ? "border border-primary animate-pulse-border" : ""}`}
                        style={{ fontSize: "0.8rem" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Summary tab */}
          {activeTab === "summary" && (
            <div className="space-y-3">
              {summarySteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    step.done ? "bg-success" : "border-2 border-secondary"
                  }`}>
                    {step.done ? <CheckCircle size={12} className="text-success-foreground" /> : <Clock size={10} className="text-secondary" />}
                  </div>
                  <p className={`text-foreground ${!step.done ? "text-secondary" : ""}`} style={{ fontSize: "0.8rem" }}>
                    <span className="font-bold">{step.bold}</span>{step.rest}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EscalationModal;
