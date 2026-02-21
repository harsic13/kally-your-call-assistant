import { useState } from "react";
import { Link } from "react-router-dom";
import { Mic, Send, Package, Film, UtensilsCrossed, Plane, AlarmClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskCard, { type Task } from "@/components/dashboard/TaskCard";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import ThreadsScreen from "@/components/dashboard/ThreadsScreen";
import PostCallScreen from "@/components/dashboard/PostCallScreen";
import EscalationModal from "@/components/dashboard/EscalationModal";
import CallModal from "@/components/dashboard/CallModal";

const initialTasks: Task[] = [
  { id: "1", title: "Get refund for broken headphones", category: "Support", status: "escalated", icon: "package", done: false },
  { id: "2", title: "Book Dune tickets for tonight", category: "Booking", status: "active", icon: "film", done: false },
  { id: "3", title: "Reserve table at Nobu Saturday", category: "Booking", status: "queued", icon: "food", done: false },
  { id: "4", title: "Cancel Delta flight, request credit", category: "Support", status: "queued", icon: "plane", done: false },
  { id: "5", title: "Remind Jake about 7am standup", category: "Mundane", status: "done", icon: "alarm", done: true },
];

// Tasks mapped by date offset from today for calendar selection
const generateDateTasks = (): Record<string, Task[]> => {
  const today = new Date();
  const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const d = (offset: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    return fmt(date);
  };

  return {
    [d(0)]: initialTasks,
    [d(-1)]: [
      { id: "y1", title: "Follow up on insurance claim", category: "Support", status: "done", icon: "package", done: true },
      { id: "y2", title: "Book dentist appointment", category: "Booking", status: "done", icon: "alarm", done: true },
      { id: "y3", title: "Order groceries from Whole Foods", category: "Mundane", status: "done", icon: "food", done: true },
    ],
    [d(-2)]: [
      { id: "p1", title: "Call Verizon about plan upgrade", category: "Support", status: "done", icon: "package", done: true },
      { id: "p2", title: "Send birthday flowers to Mom", category: "Mundane", status: "done", icon: "alarm", done: true },
    ],
    [d(1)]: [
      { id: "t1", title: "Schedule car service at Tesla", category: "Booking", status: "queued", icon: "plane", done: false },
      { id: "t2", title: "Renew gym membership", category: "Mundane", status: "queued", icon: "alarm", done: false },
      { id: "t3", title: "Book flight to NYC next Friday", category: "Booking", status: "queued", icon: "plane", done: false },
    ],
    [d(2)]: [
      { id: "f1", title: "Pick up dry cleaning", category: "Mundane", status: "queued", icon: "package", done: false },
      { id: "f2", title: "Reserve campsite at Yosemite", category: "Booking", status: "queued", icon: "food", done: false },
    ],
    [d(-3)]: [
      { id: "w1", title: "Dispute charge with Chase bank", category: "Support", status: "done", icon: "package", done: true },
      { id: "w2", title: "Return package to Amazon locker", category: "Mundane", status: "done", icon: "package", done: true },
      { id: "w3", title: "Book spa appointment for weekend", category: "Booking", status: "done", icon: "film", done: true },
      { id: "w4", title: "Call landlord about leak", category: "Support", status: "done", icon: "alarm", done: true },
    ],
  };
};

const dateTasks = generateDateTasks();

const navTabs = ["Tasks", "Threads", "Post-Call", "Escalation"];
const filterTabs = ["All", "Mundane", "Support", "Booking"];

const statusOrder = { escalated: 0, active: 1, queued: 2, done: 3 };
const statusLabels: Record<string, string> = { escalated: "Needs Attention", active: "Active", queued: "Queued", done: "Done" };

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Tasks");
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTask, setNewTask] = useState("");
  const [escalationOpen, setEscalationOpen] = useState(false);
  const [callModal, setCallModal] = useState<{ open: boolean; title: string; icon: Task["icon"] }>({ open: false, title: "", icon: "package" });

  const today = new Date();
  const dateLabel = today.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }).toUpperCase();

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done, status: t.done ? "queued" : "done" } : t
      )
    );
  };

  const openCall = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) setCallModal({ open: true, title: task.title, icon: task.icon });
  };

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const selectedStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const isToday = todayStr === selectedStr;

  // Load tasks for selected date
  const dateLevelTasks = dateTasks[selectedStr];
  const displayTasks = dateLevelTasks || [];
  const selectedDateLabel = selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }).toUpperCase();

  const filteredTasks = displayTasks.filter((t) => filter === "All" || t.category === filter);

  const grouped = filteredTasks.reduce<Record<string, Task[]>>((acc, t) => {
    const key = t.done ? "done" : t.status;
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  const sortedGroups = Object.entries(grouped).sort(
    ([a], [b]) => (statusOrder[a as keyof typeof statusOrder] ?? 99) - (statusOrder[b as keyof typeof statusOrder] ?? 99)
  );

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, {
      id: Date.now().toString(),
      title: newTask,
      category: "Mundane",
      status: "queued",
      icon: "alarm",
      done: false,
    }]);
    setNewTask("");
  };

  const handleTabClick = (tab: string) => {
    if (tab === "Escalation") {
      setEscalationOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 h-[52px] bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-spin" style={{ animationDuration: "6s" }} />
          </div>
          <span className="font-display text-base text-foreground">Kally</span>
        </Link>

        <div className="flex-1 flex justify-center">
          <div className="flex bg-accent rounded-full p-1 gap-0.5">
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${activeTab === tab && tab !== "Escalation" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">K</span>
        </div>
      </header>

      {/* Content area */}
      <div className={`flex-1 flex overflow-hidden ${escalationOpen ? "filter blur-[3px] opacity-35 pointer-events-none" : ""}`}>
        {activeTab === "Tasks" && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                   <p className="font-mono-label text-muted-foreground mb-1">{selectedDateLabel} · {displayTasks.filter(t => !t.done).length} TASKS</p>
                   <h1 className="font-display text-page-title text-foreground">{isToday ? "Today" : selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</h1>
                </div>
              </div>

              <div className="flex gap-2 mb-5">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    placeholder="Tell Kally what to handle..."
                    className="w-full h-11 pl-4 pr-4 rounded-2xl bg-accent border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-body transition-all"
                  />
                </div>
                <Button variant="icon-circle" size="icon" className="shrink-0 rounded-2xl">
                  <Mic size={18} />
                </Button>
                <Button variant="icon-filled" size="icon" className="shrink-0 rounded-2xl" onClick={addTask}>
                  <Send size={18} />
                </Button>
              </div>

              <div className="flex gap-1 mb-5">
                {filterTabs.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-xl font-mono-label transition-all ${
                      filter === f ? "bg-accent border border-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                {sortedGroups.map(([status, groupTasks]) => (
                  <div key={status}>
                    <p className="font-mono-label text-muted-foreground mb-2">{statusLabels[status] || status}</p>
                    <div className="space-y-2">
                      {groupTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onToggle={toggleTask} onCall={openCall} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-[300px] border-l border-border overflow-y-auto p-4 space-y-4">
               <CalendarWidget selectedDate={selectedDate} onSelectDate={setSelectedDate} taskDates={Object.keys(dateTasks)} />
               <div>
                 <p className="font-mono-label text-muted-foreground mb-3">{isToday ? "TODAY'S" : selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()} TASKS</p>
                 {displayTasks.length === 0 ? (
                   <p className="text-xs text-muted-foreground">No tasks for this date</p>
                 ) : (
                   <div className="space-y-2">
                     {displayTasks.map((task) => {
                       const icons = { package: Package, film: Film, food: UtensilsCrossed, plane: Plane, alarm: AlarmClock };
                       const Icon = icons[task.icon];
                       const statusColors: Record<string, string> = { escalated: "text-destructive", active: "text-success", queued: "text-secondary-foreground", done: "text-muted-foreground" };
                       return (
                         <div key={task.id} className="flex items-center gap-2 py-1.5">
                           <Icon size={14} className="text-primary shrink-0" />
                           <span className={`text-xs truncate flex-1 ${task.done ? "line-through opacity-50" : "text-foreground"}`}>{task.title}</span>
                           <span className={`font-mono-label ${statusColors[task.status]}`}>{task.status}</span>
                         </div>
                       );
                     })}
                   </div>
                 )}
               </div>
            </div>
          </>
        )}

        {activeTab === "Threads" && <ThreadsScreen />}
        {activeTab === "Post-Call" && <PostCallScreen />}
      </div>

      <EscalationModal open={escalationOpen} onClose={() => setEscalationOpen(false)} />
      <CallModal
        open={callModal.open}
        onClose={() => setCallModal({ open: false, title: "", icon: "package" })}
        taskTitle={callModal.title}
        taskIcon={callModal.icon}
      />
    </div>
  );
};

export default Dashboard;
