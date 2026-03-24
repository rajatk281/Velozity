import React from "react";
import { LayoutGrid, List, Calendar } from "lucide-react"; // Icons help on mobile

type ViewType = "kanban" | "list" | "timeline";

type Props = {
  view: ViewType;
  setView: (view: ViewType) => void;
};

const ToggleBar = ({ view, setView }: Props) => {
  const options: { id: ViewType; icon: React.ReactNode }[] = [
    { id: "kanban", icon: <LayoutGrid size={14} /> },
    { id: "list", icon: <List size={14} /> },
    { id: "timeline", icon: <Calendar size={14} /> },
  ];

  return (
    <div className="flex items-center bg-slate-200/60 p-1 rounded-xl w-fit border border-slate-300/20 backdrop-blur-sm">
      {options.map((option) => {
        const isActive = view === option.id;
        
        return (
          <button
            key={option.id}
            onClick={() => setView(option.id)}
            className={`
              flex items-center gap-1.5 
              /* Responsive Padding & Text */
              px-2.5 py-1 sm:px-4 sm:py-1.5 
              text-[11px] sm:text-sm font-bold tracking-tight
              rounded-lg transition-all duration-200 
              ${
                isActive
                  ? "bg-white shadow-sm text-blue-600 scale-[1.02]"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-300/30"
              }
            `}
          >
            {/* Icon is always visible, Text scales with screen */}
            {option.icon}
            <span className="capitalize">
              {option.id}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ToggleBar;