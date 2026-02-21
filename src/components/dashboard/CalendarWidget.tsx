import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarWidgetProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  taskDates: string[]; // ISO date strings that have tasks
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarWidget = ({ selectedDate, onSelectDate, taskDates }: CalendarWidgetProps) => {
  const [viewMonth, setViewMonth] = useState(new Date(selectedDate));

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const prevMonth = () => setViewMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setViewMonth(new Date(year, month + 1, 1));

  const monthName = viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cells: { day: number; inMonth: boolean; dateStr: string }[] = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    const m = month === 0 ? 12 : month;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, inMonth: false, dateStr: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, dateStr: `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }

  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month + 2 > 12 ? 1 : month + 2;
    const y = month + 2 > 12 ? year + 1 : year;
    cells.push({ day: d, inMonth: false, dateStr: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` });
  }

  const selectedStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-semibold text-card-foreground">{monthName}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition-colors">
            <ChevronLeft size={16} className="text-muted-foreground" />
          </button>
          <button onClick={nextMonth} className="w-7 h-7 rounded-lg hover:bg-accent flex items-center justify-center transition-colors">
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-mono-label text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((cell, i) => {
          const isToday = cell.dateStr === todayStr;
          const isSelected = cell.dateStr === selectedStr;
          const hasTask = taskDates.includes(cell.dateStr);

          return (
            <button
              key={i}
              onClick={() => {
                if (cell.inMonth) {
                  const [y, m, d] = cell.dateStr.split("-").map(Number);
                  onSelectDate(new Date(y, m - 1, d));
                }
              }}
              className={`relative w-full aspect-square flex flex-col items-center justify-center rounded-lg text-xs font-medium transition-all duration-200
                ${!cell.inMonth ? "text-muted-foreground/30" : "text-foreground hover:bg-accent"}
                ${isToday && !isSelected ? "bg-primary text-primary-foreground" : ""}
                ${isSelected ? "bg-primary-dim border border-primary text-primary font-bold" : ""}
              `}
            >
              {cell.day}
              {hasTask && cell.inMonth && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
