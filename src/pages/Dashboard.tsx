import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Send, Package, Film, UtensilsCrossed, Plane, AlarmClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskCard, { type Task } from "@/components/dashboard/TaskCard";
import CalendarWidget from "@/components/dashboard/CalendarWidget";

const initialTasks: Task[] = [
  { id: "1", title: "Get refund for broken headphones", category: "Support", status: "escalated", icon: "package", done: false },
  { id: "2", title: "Book Dune tickets for tonight", category: "Booking", status: "active", icon: "film", done: false },
  { id: "3", title: "Reserve table at Nobu Saturday", category: "Booking", status: "queued", icon: "food", done: false },
  { id: "4", title: "Cancel Delta flight, request credit", category: "Support", status: "queued", icon: "plane", done: false },
  { id: "5", title: "Remind Jake about 7am standup", category: "Mundane", status: "done", icon: "alarm", done: true },
];

const tabs = ["Tasks", "Threads", "Post-Call", "Escalation"];
const filterTabs = ["All", "Mundane", "Support", "Booking"];

const statusOrder = { escalated: 0, active: 1, queued: 2, done: 3 };
const statusLabels = { escalated: "Needs Attention", active: "Active", queued: "Queued", done: "Done" };

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Tasks");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState("");

  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }).toUpperCase();

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done, status: t.done ? "queued" : "done" } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => filter === "All" || t.category === filter);

  // Group tasks by status
  const grouped = filteredTasks.reduce<Record<string, Task[]>>((acc, t) => {
    const key = t.done ? "done" : t.status;
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  const sortedGroups = Object.entries(grouped).sort(
    ([a], [b]) => (statusOrder[a as keyof typeof statusOrder] ?? 99) - (statusOrder[b as keyof typeof statusOrder] ?? 99)
  );

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const taskDates = [todayStr]; // In a real app, these would come from task data

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      category: "Mundane",
      status: "queued",
      icon: "alarm",
      done: false,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 h-[52px] bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-spin" style={{ animationDuration: "6s" }} />
          </div>
          <span className="font-display text-base font-bold text-foreground">Kally</span>
        </Link>

        {/* Tabs */}
        <div className="flex-1 flex justify-center">
          <div className="flex bg-accent rounded-full p-1 gap-0.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full font-mono-sm transition-all duration-200
                  ${activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">K</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel — Tasks */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="font-mono-label text-muted-foreground mb-1">TODAY · {dateLabel} · {tasks.filter(t => !t.done).length} TASKS</p>
              <h1 className="font-display text-page-title text-foreground">Today</h1>
            </div>
          </div>

          {/* New task input */}
          <div className="flex gap-2 mb-5">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Tell Kally what to handle — type or speak..."
                className="w-full h-11 pl-4 pr-12 rounded-xl bg-accent border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-body transition-all"
              />
            </div>
            <Button variant="icon-circle" size="icon" className="shrink-0">
              <Mic size={18} />
            </Button>
            <Button variant="icon-filled" size="icon" className="shrink-0" onClick={addTask}>
              <Send size={18} />
            </Button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 mb-5">
            {filterTabs.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg font-mono-label transition-all
                  ${filter === f ? "bg-accent border border-primary/30 text-foreground" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task groups */}
          <div className="space-y-5">
            {sortedGroups.map(([status, tasks]) => (
              <div key={status}>
                <p className="font-mono-label text-muted-foreground mb-2">
                  {statusLabels[status as keyof typeof statusLabels] || status}
                </p>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onCall={() => {}}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — Calendar */}
        <div className="hidden lg:block w-[300px] border-l border-border overflow-y-auto p-4 space-y-4">
          <CalendarWidget
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            taskDates={taskDates}
          />

          {/* Today's mini tasks */}
          <div>
            <p className="font-mono-label text-muted-foreground mb-3">TODAY'S TASKS</p>
            <div className="space-y-2">
              {tasks.map((task) => {
                const icons = { package: Package, film: Film, food: UtensilsCrossed, plane: Plane, alarm: AlarmClock };
                const Icon = icons[task.icon];
                const statusColors = { escalated: "text-destructive", active: "text-success", queued: "text-secondary-foreground", done: "text-muted-foreground" };

                return (
                  <div key={task.id} className="flex items-center gap-2 py-1.5">
                    <Icon size={14} className="text-primary shrink-0" />
                    <span className={`text-xs truncate flex-1 ${task.done ? "line-through opacity-50" : "text-foreground"}`}>
                      {task.title}
                    </span>
                    <span className={`font-mono-label ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
