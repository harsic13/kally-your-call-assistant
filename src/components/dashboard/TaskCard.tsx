import { Package, Film, UtensilsCrossed, Plane, AlarmClock, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Task {
  id: string;
  title: string;
  category: "Mundane" | "Support" | "Booking";
  status: "escalated" | "active" | "queued" | "done";
  icon: "package" | "film" | "food" | "plane" | "alarm";
  done: boolean;
}

const iconMap = {
  package: Package,
  film: Film,
  food: UtensilsCrossed,
  plane: Plane,
  alarm: AlarmClock,
};

const statusConfig = {
  escalated: { color: "bg-destructive", label: "Escalated", bg: "bg-destructive/5", border: "animate-pulse-border border-destructive/30" },
  active: { color: "bg-success", label: "Active", bg: "bg-success/5", border: "border-border" },
  queued: { color: "bg-secondary", label: "Queued", bg: "", border: "border-border" },
  done: { color: "bg-muted-foreground/30", label: "Done", bg: "", border: "border-border" },
};

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onCall: (id: string) => void;
}

const TaskCard = ({ task, onToggle, onCall }: TaskCardProps) => {
  const Icon = iconMap[task.icon];
  const config = statusConfig[task.status];

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl bg-card border ${config.border} ${config.bg} hover:border-primary/30 transition-all duration-200 group`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
          ${task.done ? "bg-primary border-primary" : "border-muted-foreground/30 hover:border-primary"}
        `}
      >
        {task.done && <CheckCircle size={12} className="text-primary-foreground" />}
      </button>

      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-primary-dim flex items-center justify-center shrink-0">
        <Icon size={18} className="text-primary" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold text-card-foreground truncate ${task.done ? "line-through opacity-50" : ""}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full ${config.color} ${task.status === "escalated" || task.status === "active" ? "animate-pulse-dot" : ""}`} />
          <span className="font-mono-label text-muted-foreground">{config.label}</span>
        </div>
      </div>

      {/* Category badge */}
      <span className="hidden sm:inline-flex font-mono-label px-2 py-0.5 rounded-md bg-accent text-muted-foreground">
        {task.category}
      </span>

      {/* Call button */}
      <Button
        variant="icon-circle"
        size="icon-sm"
        onClick={() => onCall(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Phone size={14} />
      </Button>
    </div>
  );
};

export default TaskCard;
