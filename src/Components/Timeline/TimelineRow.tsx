import React from "react";
import type { Task } from "../../../types/task";
import Avatar from "../UI/Avatar";
import TimelineBar from "./TimelineBar";

interface TimelineRowProps {
  task: Task;
  dayIndex: number;
  totalDays: number;
  isOverdue: boolean;
  isEven: boolean;
}

const TimelineRow: React.FC<TimelineRowProps> = ({
  task,
  dayIndex,
  totalDays,
  isOverdue,
  isEven,
}) => {
  const rowBg = isEven ? "bg-white" : "bg-slate-50/50";

  return (
    <div
      className={`flex items-center h-14 border-b border-slate-100 last:border-b-0 group transition-colors hover:bg-blue-50/40 ${rowBg}`}
    >
      {/* LEFT: sticky task info */}
      <div className="w-52 shrink-0 flex items-center gap-2.5 px-4 border-r border-slate-200 h-full">
        {task.assignees[0] ? (
          <Avatar name={task.assignees[0].name} />
        ) : (
          <div className="w-7 h-7 rounded-full bg-slate-200 shrink-0" />
        )}
        <div className="min-w-0">
          <p
            className={`text-sm font-medium truncate leading-tight ${
              isOverdue ? "text-red-500" : "text-slate-800"
            }`}
          >
            {task.title}
          </p>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {task.assignees.length > 0
              ? task.assignees.map((u) => u.name).join(", ")
              : "Unassigned"}
          </p>
        </div>
      </div>

      {/* RIGHT: bar area — fills remaining width */}
      <div className="flex-1 relative h-full min-w-0">
        {dayIndex >= 0 && (
          <TimelineBar
            task={task}
            dayIndex={dayIndex}
            totalDays={totalDays}
            isOverdue={isOverdue}
          />
        )}
      </div>
    </div>
  );
};

export default TimelineRow;