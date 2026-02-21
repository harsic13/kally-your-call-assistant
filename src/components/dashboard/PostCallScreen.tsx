import { useState } from "react";
import { Film, AlarmClock, Plane, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TranscriptBubble {
  speaker: string;
  speakerLabel: string;
  text: string;
}

interface CompletedCallData {
  id: string;
  icon: "film" | "alarm" | "plane";
  title: string;
  time: string;
  detailTitle: string;
  outcome: string;
  transcriptDuration: string;
  transcript: TranscriptBubble[];
  videoText: string;
}

const completedCalls: CompletedCallData[] = [
  {
    id: "1",
    icon: "film",
    title: "Called Priya, Movie tickets",
    time: "Done, 11:42 am",
    detailTitle: "Called Priya, Interstellar tickets tonight",
    outcome: "Priya confirmed, booking 2 tickets, 7:45pm show at AMC",
    transcriptDuration: "2 MIN 14 SEC",
    transcript: [
      { speaker: "other", speakerLabel: "PRIYA", text: "Hey, who's this?" },
      { speaker: "kally", speakerLabel: "KALLY", text: "Hi Priya, this is Harshitha's assistant calling. She wanted to check if you could book 2 tickets for Interstellar tonight, the 7:45pm showing at AMC?" },
      { speaker: "other", speakerLabel: "PRIYA", text: "Oh yeah totally, I was going to text her! I'll book it right now." },
      { speaker: "kally", speakerLabel: "KALLY", text: "Perfect, she'll meet you there. Thanks Priya, have a great evening!" },
    ],
    videoText: "Reached Priya after 1 ring...",
  },
  {
    id: "2",
    icon: "alarm",
    title: "Reminded Sam, Wake-up call",
    time: "Done, 9:02 am",
    detailTitle: "Reminded Sam about morning standup",
    outcome: "Sam confirmed he is awake and will join the 9:30am standup",
    transcriptDuration: "1 MIN 08 SEC",
    transcript: [
      { speaker: "other", speakerLabel: "SAM", text: "Hello?" },
      { speaker: "kally", speakerLabel: "KALLY", text: "Good morning Sam! This is a reminder from Harshitha. You have a standup meeting at 9:30am today." },
      { speaker: "other", speakerLabel: "SAM", text: "Oh right, thanks. I just woke up. Tell her I'll be there." },
      { speaker: "kally", speakerLabel: "KALLY", text: "Great, I'll let her know. Have a good morning!" },
    ],
    videoText: "Connected with Sam on first attempt...",
  },
  {
    id: "3",
    icon: "plane",
    title: "Delta, Travel credit issued",
    time: "Done, Yesterday",
    detailTitle: "Delta Airlines, Flight cancellation credit",
    outcome: "Delta issued $340 travel credit to account, valid for 12 months",
    transcriptDuration: "8 MIN 42 SEC",
    transcript: [
      { speaker: "kally", speakerLabel: "KALLY", text: "Hi, I am calling about a cancelled flight, booking reference DL-4892. I'd like to request a travel credit." },
      { speaker: "other", speakerLabel: "DELTA REP", text: "Let me pull that up. I can see the flight was cancelled by Delta due to weather. You are eligible for a full travel credit." },
      { speaker: "kally", speakerLabel: "KALLY", text: "That would be great. Can you apply it to the SkyMiles account ending in 7741?" },
      { speaker: "other", speakerLabel: "DELTA REP", text: "Done. A $340 credit has been applied. It's valid for 12 months from today. Is there anything else I can help with?" },
      { speaker: "kally", speakerLabel: "KALLY", text: "No, that's everything. Thank you for the help!" },
    ],
    videoText: "On hold with Delta for 3 minutes...",
  },
];

const iconMap = { film: Film, alarm: AlarmClock, plane: Plane };

const PostCallScreen = () => {
  const [selectedId, setSelectedId] = useState("1");
  const [showVideo, setShowVideo] = useState(false);

  const selected = completedCalls.find((c) => c.id === selectedId)!;

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Left panel */}
      <div className="w-[280px] border-r border-border overflow-y-auto p-5">
        <h1 className="font-display text-page-title text-foreground mb-1">Post-Call</h1>
        <p className="font-mono-label text-muted-foreground mb-5">COMPLETED CALLS</p>

        <div className="space-y-1">
          {completedCalls.map((call) => {
            const Icon = iconMap[call.icon];
            return (
              <button
                key={call.id}
                onClick={() => { setSelectedId(call.id); setShowVideo(false); }}
                className={`w-full text-left p-3 rounded-2xl transition-all duration-200 border-l-[3px] ${
                  selectedId === call.id
                    ? "border-l-primary bg-primary-dim"
                    : "border-l-transparent hover:bg-accent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary-dim flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{call.title}</p>
                    <p className="font-mono-label text-muted-foreground mt-0.5">{call.time}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header + outcome */}
        <div className="p-6 pb-0">
          <h2 className="font-display text-2xl text-foreground mb-3">
            {selected.detailTitle}
          </h2>
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-success/8 border border-success/25">
            <CheckCircle size={18} className="text-success shrink-0" />
            <p className="text-body font-bold text-success">
              {selected.outcome}
            </p>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <p className="font-mono-label text-muted-foreground">CALL TRANSCRIPT, {selected.transcriptDuration}</p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-4 max-w-xl">
            {selected.transcript.map((msg, i) => {
              const isKally = msg.speaker === "kally";
              return (
                <div key={i} className={`flex ${isKally ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start gap-2 max-w-[85%] ${isKally ? "flex-row-reverse" : ""}`}>
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-[0.55rem] font-bold ${
                      isKally ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {isKally ? "K" : msg.speakerLabel[0]}
                    </div>
                    <div>
                      <p className="font-mono-label text-muted-foreground/60 mb-1" style={{ fontSize: "0.55rem" }}>
                        {msg.speakerLabel}
                      </p>
                      <div className={`px-3.5 py-2.5 text-body ${
                        isKally
                          ? "bg-primary-dim text-foreground rounded-2xl rounded-br-sm"
                          : "bg-surface-2 text-muted-foreground rounded-2xl rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border p-4">
          {showVideo && (
            <div className="mb-3 rounded-2xl overflow-hidden animate-spring-up" style={{ background: "#1C1917" }}>
              <div className="h-[90px] flex items-center justify-center px-6">
                <p className="font-display text-sm text-primary-foreground text-center animate-pulse">
                  {selected.videoText}
                </p>
              </div>
              <div className="h-1 w-full bg-muted-foreground/20">
                <div className="h-full animate-progress" style={{ background: "linear-gradient(90deg, hsl(24 94% 50%), hsl(217 91% 60%))" }} />
              </div>
            </div>
          )}
          <Button
            variant="outline"
            className="w-full h-11 gap-2 border-primary/30 text-primary hover:bg-primary-dim font-semibold rounded-2xl"
            style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.06), rgba(59,130,246,0.06))" }}
            onClick={() => setShowVideo(!showVideo)}
          >
            <Play size={16} />
            Generate Video Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostCallScreen;
