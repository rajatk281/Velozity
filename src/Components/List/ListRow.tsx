import React, { useState } from "react";
import type { Task } from "../../../types/task";
import AvatarGroup from "../UI/AvatarGroup";
import { Calendar, ChevronDown, AlertCircle, Circle } from "lucide-react";

const STATUSES = ["todo", "in-progress", "review", "done"] as const;

// More refined, professional color palette
const PRIORITY_STYLES: Record<string, { bg: string; dot: string; text: string }> = {
  low: { bg: "bg-blue-50", dot: "bg-blue-400", text: "text-blue-700" },
  medium: { bg: "bg-amber-50", dot: "bg-amber-400", text: "text-amber-700" },
  high: { bg: "bg-orange-50", dot: "bg-orange-400", text: "text-orange-700" },
  critical: { bg: "bg-rose-50", dot: "bg-rose-400", text: "text-rose-700" },
};

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  todo: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  "in-progress": { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
  review: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  done: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
};

interface ListRowProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

function isOverdue(dueDateStr: string): boolean {
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

const ListRow: React.FC<ListRowProps> = ({ task, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overdue = isOverdue(task.dueDate);
  const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;
  const status = STATUS_CONFIG[task.status] || STATUS_CONFIG.todo;

  return (
    <tr className="group border-b border-slate-100/80 hover:bg-slate-50/50 transition-all duration-200">
      {/* Title Section */}
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
            {task.title}
          </span>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
            Task ID: {task.id.slice(0, 8)}
          </span>
        </div>
      </td>

      {/* Assignee Section */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <AvatarGroup users={task.assignees} />
          {task.assignees.length === 1 && (
            <span className="text-xs font-medium text-slate-500">{task.assignees[0].name}</span>
          )}
        </div>
      </td>

      {/* Priority Badge */}
      <td className="py-4 px-6">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${priority.bg} ${priority.text}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          <span className="text-xs font-bold capitalize">{task.priority}</span>
        </div>
      </td>

      {/* Due Date with Icon */}
      <td className="py-4 px-6">
        <div className={`flex items-center gap-2 text-xs font-medium ${overdue ? "text-rose-500" : "text-slate-500"}`}>
          {overdue ? <AlertCircle size={14} /> : <Calendar size={14} />}
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      </td>

      {/* Status Dropdown */}
      <td className="py-4 px-6 text-right">
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-slate-200 transition-all active:scale-95 ${status.bg} ${status.text}`}
          >
            <span className="text-xs font-bold capitalize">{task.status}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 mt-2 z-40 w-40 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="p-1">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        onStatusChange(task.id, s);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium capitalize text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
                    >
                      <Circle size={8} className={`${STATUS_CONFIG[s].dot} fill-current`} />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ListRow;