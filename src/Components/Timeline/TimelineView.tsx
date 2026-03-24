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

  // Constants for layout
  const SIDEBAR_WIDTH = "208px"; // Fixed 13rem/w-52
  const DAY_CELL_WIDTH = "36px"; // Fixed width per day to prevent squishing

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-sm font-bold text-slate-700 tracking-tight flex items-center gap-2">
          <span className="w-1 h-4 bg-blue-500 rounded-full" />
          {monthLabel}
        </h2>
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-slate-200/50 px-2 py-1 rounded">
          {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
        </span>
      </div>

      {/* Scrollable Container */}
      <div className="overflow-x-auto no-scrollbar">
        {/* Container with a min-width to force horizontal scroll if screen is small */}
        <div style={{ minWidth: `calc(${SIDEBAR_WIDTH} + (${DAY_CELL_WIDTH} * ${totalDays}))` }}>
          
          {/* Column Header Row */}
          <div className="flex border-b border-slate-100 bg-slate-50/40">
            {/* Left panel header */}
            <div 
              className="shrink-0 px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100"
              style={{ width: SIDEBAR_WIDTH }}
            >
              Task Description
            </div>

            {/* Day numbers grid */}
            <div className="flex flex-1">
              {days.map((d) => (
                <div
                  key={d}
                  className={`flex-shrink-0 flex items-center justify-center border-r border-slate-50/50 last:border-r-0`}
                  style={{ width: DAY_CELL_WIDTH, height: "40px" }}
                >
                  <span
                    className={`text-[10px] font-bold transition-colors ${
                      d === todayDay
                        ? "text-white bg-blue-500 w-6 h-6 rounded-lg flex items-center justify-center shadow-sm shadow-blue-200"
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
            {/* Today vertical line - centered on the current day's cell */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{
                left: `calc(${SIDEBAR_WIDTH} + (${todayDay - 1} * ${DAY_CELL_WIDTH}) + (${DAY_CELL_WIDTH} / 2) - 1px)`,
                width: "2px",
                background: "linear-gradient(to bottom, #3b82f6 0%, #3b82f6 10%, rgba(59, 130, 246, 0.1) 100%)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-md" />
            </div>

            {tasks.length === 0 ? (
              <div className="py-20 text-center text-sm text-slate-400 italic">
                No tasks scheduled for this month.
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {tasks.map((task, idx) => {
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
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 flex flex-wrap items-center gap-y-2 gap-x-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Today</span>
        </div>
        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
        {[
          { label: "Low", color: "bg-emerald-400" },
          { label: "Medium", color: "bg-amber-400" },
          { label: "High", color: "bg-orange-500" },
          { label: "Critical", color: "bg-rose-500" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;