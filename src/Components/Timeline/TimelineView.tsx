import React from "react";
import type { Task } from "../../../types/task";
import TimelineRow from "./TimelineRow";

interface TimelineViewProps {
  tasks: Task[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function isTaskOverdue(dueDateStr: string, today: Date): boolean {
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return due < t;
}

const TimelineView: React.FC<TimelineViewProps> = ({ tasks }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const totalDays = getDaysInMonth(year, month);
  const todayDay = today.getDate();

  const monthLabel = today.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Today line: center of todayDay cell as a percentage of the grid
  const todayLinePct = ((todayDay - 0.5) / totalDays) * 100;

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm font-sans p-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50 rounded-t-xl">
        <h2 className="text-sm font-semibold text-slate-700 tracking-wide">
          {monthLabel}
        </h2>
        <span className="text-xs text-slate-400">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Column header row */}
      <div className="flex border-b border-slate-200 bg-slate-50/80">
        {/* Left panel header */}
        <div className="w-52 shrink-0 px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-r border-slate-200">
          Task
        </div>

        {/* Day numbers — percentage grid */}
        <div className="flex-1 relative flex">
          {days.map((d) => (
            <div
              key={d}
              className="flex-1 flex items-center justify-center py-2"
              style={{ minWidth: 0 }}
            >
              <span
                className={`text-[11px] font-medium leading-none ${
                  d === todayDay
                    ? "text-blue-500 font-bold"
                    : "text-slate-400"
                }`}
              >
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="relative">
        {/* Today vertical line — spans full height of all rows */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{
            left: `calc(13rem + ${todayLinePct}% * (100% - 13rem) / 100)`,
            width: "1.5px",
            background: "linear-gradient(to bottom, #3b82f6, #93c5fd)",
          }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
        </div>

        {tasks.length === 0 ? (
          <div className="py-14 text-center text-sm text-slate-400">
            No tasks to display.
          </div>
        ) : (
          tasks.map((task, idx) => {
            const due = new Date(task.dueDate);
            const inCurrentMonth =
              due.getFullYear() === year && due.getMonth() === month;
            const dayIndex = inCurrentMonth ? due.getDate() - 1 : -1;

            return (
              <TimelineRow
                key={task.id}
                task={task}
                dayIndex={dayIndex}
                totalDays={totalDays}
                isOverdue={isTaskOverdue(task.dueDate, today)}
                isEven={idx % 2 === 0}
              />
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 border-t border-slate-100 bg-slate-50/60 rounded-b-xl flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="text-xs text-slate-400">Today</span>
        <span className="ml-4 text-xs text-slate-300">·</span>
        {[
          { label: "Low", color: "bg-green-400" },
          { label: "Medium", color: "bg-yellow-400" },
          { label: "High", color: "bg-orange-400" },
          { label: "Critical", color: "bg-red-500" },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5 ml-3">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-xs text-slate-400">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;