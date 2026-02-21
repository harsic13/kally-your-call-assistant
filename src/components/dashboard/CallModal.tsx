import { useState, useEffect, useRef } from "react";
import { PhoneOff, Package, Film, Plane, UtensilsCrossed, AlarmClock } from "lucide-react";

interface CallModalProps {
  open: boolean;
  onClose: () => void;
  taskTitle: string;
  taskIcon: "package" | "film" | "food" | "plane" | "alarm";
}

const iconMap = { package: Package, film: Film, food: UtensilsCrossed, plane: Plane, alarm: AlarmClock };
const serviceNames: Record<string, string> = {
  package: "Amazon Support",
  film: "AMC Theaters",
  food: "Restaurant",
  plane: "Delta Airlines",
  alarm: "Reminder Call",
};

const statusMessages = ["Connecting...", "On hold...", "Speaking with agent", "Processing request..."];
const statusTimings = [0, 4, 12, 25]; // seconds when each status appears

const providers = ["VAPI", "ELEVENLABS", "PLIVO", "MINIMAX"];

const waveHeights = [8, 16, 24, 18, 28, 20, 14, 26, 10];
const waveDelays = [0, 0.1, 0.2, 0.15, 0.25, 0.05, 0.18, 0.08, 0.22];

const CallModal = ({ open, onClose, taskTitle, taskIcon }: CallModalProps) => {
  const [seconds, setSeconds] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const Icon = iconMap[taskIcon];

  useEffect(() => {
    if (open) {
      setSeconds(0);
      setStatusIndex(0);
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  useEffect(() => {
    for (let i = statusTimings.length - 1; i >= 0; i--) {
      if (seconds >= statusTimings[i]) {
        setStatusIndex(i);
        break;
      }
    }
  }, [seconds]);

  if (!open) return null;

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(14px)" }}>
      {/* ESC label */}
      <p className="absolute top-5 right-6 font-mono-label" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.55rem" }}>ESC TO CLOSE</p>

      {/* iPhone frame */}
      <div
        className="animate-spring-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-[290px]"
          style={{
            background: "#111115",
            borderRadius: "52px",
            padding: "9px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* Inner device */}
          <div
            className="relative overflow-hidden"
            style={{
              background: "#1A1A1F",
              borderRadius: "44px",
            }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2"
              style={{ width: "100px", height: "26px", background: "#000", borderRadius: "18px" }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#2A2A2E" }} />
              <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
            </div>

            {/* Call screen */}
            <div
              className="flex flex-col items-center pt-16 pb-4 px-5"
              style={{
                minHeight: "560px",
                background: "linear-gradient(165deg, #2A1F1A 0%, #1A120F 40%, #0E0A08 100%)",
              }}
            >
              {/* Orange glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-60 h-60 rounded-full" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-4 flex-1">
                {/* Service icon */}
                <div
                  className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(249,115,22,0.15)",
                    animation: "float 3s ease-in-out infinite",
                  }}
                >
                  <Icon size={30} style={{ color: "#F97316" }} />
                </div>

                <div className="text-center">
                  <p className="font-display text-xl font-bold" style={{ color: "#fff" }}>
                    {serviceNames[taskIcon]}
                  </p>
                  <p className="font-mono-label mt-1" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>
                    KALLY · AI VOICE AGENT
                  </p>
                </div>

                {/* Timer */}
                <p className="font-mono text-3xl font-bold" style={{ color: "#F97316", textShadow: "0 0 20px rgba(249,115,22,0.4)", fontSize: "2.1rem" }}>
                  {mins}:{secs}
                </p>

                {/* Status */}
                <p className="font-mono-label transition-opacity duration-500" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.58rem" }}>
                  {statusMessages[statusIndex]}
                </p>

                {/* Waveform */}
                <div className="flex items-center gap-[3px] h-8">
                  {waveHeights.map((h, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: "3px",
                        height: `${h}px`,
                        background: "#F97316",
                        animation: `waveform 1.2s ease-in-out infinite`,
                        animationDelay: `${waveDelays[i]}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Handling badge */}
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono-label"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    border: "1px solid rgba(249,115,22,0.25)",
                    color: "#F97316",
                    fontSize: "0.55rem",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" style={{ boxShadow: "0 0 4px #22C55E" }} />
                  KALLY IS HANDLING THIS CALL
                </span>

                {/* Provider chips */}
                <div className="flex gap-1.5 mt-2">
                  {providers.map((p) => (
                    <span
                      key={p}
                      className="px-2 py-0.5 rounded-full font-mono"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        fontSize: "0.48rem",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* End call */}
                <button
                  onClick={onClose}
                  className="w-[58px] h-[58px] rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{
                    background: "#E53935",
                    boxShadow: "0 8px 22px rgba(229,57,53,0.4)",
                  }}
                >
                  <PhoneOff size={22} style={{ color: "#fff" }} />
                </button>
              </div>

              {/* Home indicator */}
              <div className="mt-3 flex justify-center">
                <div className="rounded-sm" style={{ width: "105px", height: "4px", background: "rgba(255,255,255,0.22)", borderRadius: "3px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default CallModal;
