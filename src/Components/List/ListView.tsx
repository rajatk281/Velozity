  import React, { useMemo, useState } from "react";
  import ListRow from "./ListRow";
  import type { Task } from "../../../types/task";

  interface ListViewProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  }



  type SortDirection = "asc" | "desc" | null;

  const ListView: React.FC<ListViewProps> = ({ tasks, onStatusChange }) => {
    const [sortDir, setSortDir] = useState<SortDirection>(null);

    const handleSortToggle = () => {
      setSortDir((prev) => {
        if (prev === null) return "asc";
        if (prev === "asc") return "desc";
        return null;
      });
    };

    const sortedTasks = useMemo(() => {
      if (!sortDir) return tasks;
      return [...tasks].sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return sortDir === "asc" ? dateA - dateB : dateB - dateA;
      });
    }, [tasks, sortDir]);

    const SortIcon = () => (
      <span className="ml-1 inline-flex flex-col leading-none text-[10px]">
        <span className={sortDir === "asc" ? "text-blue-500" : "text-slate-300"}>▲</span>
        <span className={sortDir === "desc" ? "text-blue-500" : "text-slate-300"}>▼</span>
      </span>
    );



    return (
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[35%]">
                Title
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[20%]">
                Assignee
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[12%]">
                Priority
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[18%]">
                <button
                  onClick={handleSortToggle}
                  className="flex items-center hover:text-slate-700 transition-colors"
                  title="Sort by due date"
                >
                  Due Date
                  <SortIcon />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-[15%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-slate-400">
                  No tasks found.
                </td>
              </tr>
            ) : (
              sortedTasks.map((task) => (
                <ListRow
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                />
              ))
            )}
          </tbody>
        </table>

        <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 text-xs text-slate-400 text-right">
          {sortedTasks.length} task{sortedTasks.length !== 1 ? "s" : ""}
        </div>
      </div>
    );
  };

  export default ListView;