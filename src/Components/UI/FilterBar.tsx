import { useState } from "react";
import { TaskSchema } from "../../../types/task";

export const initialTasks = [
  {
    id: "1",
    title: "Update documentation",
    status: "todo",
    priority: "low",
    assignees: [{ name: "Hu uh" }],
    dueDate: "2026-03-30"
  },
  {
    id: "2",
    title: "Fix authentication bug",
    status: "in-progress",
    priority: "critical",
    assignees: [{ name: "John Lee" }],
    dueDate: "2026-03-23"
  },
  {
    id: "3",
    title: "Database migration",
    status: "done",
    priority: "critical",
    assignees: [{ name: "Raj Kumar" }],
    dueDate: "2026-03-22"
  },
  {
    id: "4",
    title: "Design new landing page",
    status: "done",
    priority: "high",
    assignees: [{ name: "John Wick" }],
    dueDate: "2026-03-24"
  },
  {
    id: "5",
    title: "User testing session",
    status: "review",
    priority: "medium",
    assignees: [{ name: "Rohan Singh" }],
    dueDate: "2026-03-22"
  },
  {
    id: "6",
    title: "Optimize API performance",
    status: "in-progress",
    priority: "high",
    assignees: [{ name: "Amit Verma" }],
    dueDate: "2026-03-28"
  },
  {
    id: "7",
    title: "Setup CI/CD pipeline",
    status: "todo",
    priority: "critical",
    assignees: [{ name: "Neha Sharma" }],
    dueDate: "2026-03-31"
  },
  {
    id: "8",
    title: "Fix UI responsiveness issues",
    status: "review",
    priority: "medium",
    assignees: [{ name: "Priya Mehta" }],
    dueDate: "2026-03-27"
  },
  {
    id: "9",
    title: "Implement dark mode",
    status: "todo",
    priority: "low",
    assignees: [{ name: "Karan Malhotra" }],
    dueDate: "2026-04-02"
  },
  {
    id: "10",
    title: "Write unit tests",
    status: "in-progress",
    priority: "high",
    assignees: [{ name: "Anjali Gupta" }],
    dueDate: "2026-03-26"
  },
  {
    id: "11",
    title: "Fix payment gateway bug",
    status: "todo",
    priority: "critical",
    assignees: [{ name: "Rahul Jain" }],
    dueDate: "2026-03-25"
  },
  {
    id: "12",
    title: "Refactor dashboard code",
    status: "in-progress",
    priority: "medium",
    assignees: [{ name: "Suresh Patel" }],
    dueDate: "2026-03-29"
  },
  {
    id: "13",
    title: "Add analytics tracking",
    status: "review",
    priority: "low",
    assignees: [{ name: "Vikas Yadav" }],
    dueDate: "2026-04-01"
  },
  {
    id: "14",
    title: "Improve SEO optimization",
    status: "done",
    priority: "medium",
    assignees: [{ name: "Sneha Kapoor" }],
    dueDate: "2026-03-20"
  },
  {
    id: "15",
    title: "Fix notification system",
    status: "todo",
    priority: "high",
    assignees: [{ name: "Deepak Chauhan" }],
    dueDate: "2026-03-27"
  },
  {
    id: "16",
    title: "Create onboarding flow",
    status: "in-progress",
    priority: "high",
    assignees: [{ name: "Pooja Verma" }],
    dueDate: "2026-03-30"
  },
  {
    id: "17",
    title: "Add multi-language support",
    status: "todo",
    priority: "medium",
    assignees: [{ name: "Arjun Nair" }],
    dueDate: "2026-04-05"
  },
  {
    id: "18",
    title: "Fix logout issue",
    status: "done",
    priority: "critical",
    assignees: [{ name: "Manish Tiwari" }],
    dueDate: "2026-03-21"
  },
  {
    id: "19",
    title: "Update dependencies",
    status: "review",
    priority: "low",
    assignees: [{ name: "Kavita Joshi" }],
    dueDate: "2026-03-28"
  },
  {
    id: "20",
    title: "Improve accessibility",
    status: "todo",
    priority: "medium",
    assignees: [{ name: "Nikhil Sharma" }],
    dueDate: "2026-04-03"
  }
];

export const validatedTasks = initialTasks.map((task) =>
  TaskSchema.parse(task)
);

type FilterBarProps = {
  filters: {
    status: string[];
    priority: string[];
    assignee: string[];
  };
  toggleFilter: (type: "status" | "priority" | "assignee", value: string) => void;
  clearFilters: () => void;
  users: string[];
};

const FilterBar = ({ filters, toggleFilter, clearFilters, users }: FilterBarProps) => {

  useState(validatedTasks);

  return (
    <div className="p-4 flex flex-col gap-3 bg-white">

      {/* STATUS */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold whitespace-nowrap flex-shrink-0">STATUS:</span>
        {["todo", "in-progress", "review", "done"].map(status => (
          <button
            key={status}
            onClick={() => toggleFilter("status", status)}
            className={`px-3 py-1 rounded-full text-sm border transition whitespace-nowrap ${
              filters.status.includes(status)
                ? "bg-blue-100 text-blue-600 border-blue-300"
                : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* PRIORITY */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold whitespace-nowrap flex-shrink-0">PRIORITY:</span>
        {["low", "medium", "high", "critical"].map(p => (
          <button
            key={p}
            onClick={() => toggleFilter("priority", p)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              filters.priority.includes(p)
                ? "bg-purple-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ASSIGNEE — label on its own line, pills wrap freely below */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold whitespace-nowrap">ASSIGNEE:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {users.map(user => (
            <button
              key={user}
              onClick={() => toggleFilter("assignee", user)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                filters.assignee.includes(user)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {user}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="px-3 py-1 bg-red-500 text-white rounded self-start"
      >
        Clear
      </button>
    </div>
  );
};

export default FilterBar;