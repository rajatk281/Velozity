import React, { useState } from "react";
import type { Task } from "../../../types/task";

const PRIORITY_BG: Record<string, string> = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-orange-400",
  critical: "bg-red-500",
};

const PRIORITY_HOVER: Record<string, string> = {
  low: "hover:bg-green-500",
  medium: "hover:bg-yellow-500",
  high: "hover:bg-orange-500",
  critical: "hover:bg-red-600",
};

const PRIORITY_RING: Record<string, string> = {
  low: "ring-green-300",
  medium: "ring-yellow-300",
  high: "ring-orange-300",
  critical: "ring-red-300",
};

interface TimelineBarProps {
  task: Task;
  dayIndex: number;   // 0-based
  totalDays: number;
  isOverdue: boolean;
}

const BAR_SPAN_DAYS = 3;

const TimelineBar: React.FC<TimelineBarProps> = ({
  task,
  dayIndex,
  totalDays,
  isOverdue,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Clamp so bar never overflows right edge
  const clampedStart = Math.min(dayIndex, totalDays - BAR_SPAN_DAYS);
  const leftPct = (clampedStart / totalDays) * 100;
  const widthPct = (BAR_SPAN_DAYS / totalDays) * 100;

  const colorBg = PRIORITY_BG[task.priority] ?? "bg-slate-400";
  const colorHover = PRIORITY_HOVER[task.priority] ?? "hover:bg-slate-500";
  const colorRing = PRIORITY_RING[task.priority] ?? "ring-slate-300";

  const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="absolute inset-0 flex items-center">
      {/* Bar */}
      <div
        className={`absolute h-7 rounded-full cursor-pointer transition-all duration-150 ${colorBg} ${colorHover} ${
          isOverdue ? `ring-2 ${colorRing} ring-offset-1` : ""
        }`}
        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute z-30 bottom-[calc(50%+20px)] bg-slate-900 text-white text-xs rounded-lg px-3 py-2.5 shadow-2xl whitespace-nowrap pointer-events-none"
          style={{ left: `${leftPct}%` }}
        >
          <p className="font-semibold text-white">{task.title}</p>
          <p className="text-slate-400 mt-1">Due: {formattedDate}</p>
          <p className="capitalize text-slate-400">
            {task.priority} priority · {task.status}
          </p>
          {isOverdue && (
            <p className="text-red-400 font-medium mt-1">Overdue</p>
          )}
          {/* Arrow */}
          <div className="absolute top-full left-5 border-[5px] border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};

export default TimelineBar;