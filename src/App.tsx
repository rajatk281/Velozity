import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TopBar from "./Components/Layout/TopBar";
import TopMiddle from "./Components/Layout/TopMiddle";
import Kanban from "./Components/Kanban/page";
import ListView from "./Components/List/ListView";
import TimelineView from "./Components/Timeline/TimelineView";
import FilterBar, { initialTasks } from "./Components/UI/FilterBar";
import type { Task } from "../types/task";
import { TaskSchema } from "../types/task";

gsap.registerPlugin(ScrollTrigger);

type ViewType = "kanban" | "list" | "timeline";

// ✅ ZOD VALIDATION
const validatedTasks: Task[] = initialTasks
  .map((task) => {
    const result = TaskSchema.safeParse(task);
    if (!result.success) {
      console.error("Invalid task:", result.error.format());
      return null;
    }
    return result.data;
  })
  .filter(Boolean) as Task[];

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainViewRef = useRef<HTMLElement>(null);

  const [view, setView] = useState<ViewType>("kanban");
  const [taskList, setTaskList] = useState<Task[]>(validatedTasks);

  const [filters, setFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    assignee: [] as string[]
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(mainViewRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200",
          scrub: 1,
          pin: true,
        },
        marginTop: "0px",
        height: "100vh",
        borderRadius: "0px",
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  const filteredTasks = taskList.filter(task => {
    if (filters.status.length && !filters.status.includes(task.status)) return false;
    if (filters.priority.length && !filters.priority.includes(task.priority)) return false;
    if (filters.assignee.length && !task.assignees.some(a => filters.assignee.includes(a.name))) return false;
    return true;
  });

  const allUsers = [...new Set(taskList.flatMap(t => t.assignees.map(a => a.name)))];

  return (
    <div ref={containerRef} className="bg-gray-100 min-h-[120vh] overflow-x-hidden no-scrollbar">
      <header className="relative z-20 bg-white shadow-sm no-scrollbar">
        <TopBar view={view} setView={setView} />
        <TopMiddle />
        <FilterBar
          filters={filters}
          toggleFilter={toggleFilter}
          clearFilters={() => setFilters({ status: [], priority: [], assignee: [] })}
          users={allUsers}
        />
      </header>

      <section
        ref={mainViewRef}
        className="relative z-10 bg-white mt-4 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] overflow-y-auto overflow-x-hidden no-scrollbar"
        style={{ height: "80vh" }}
      >
        <div className="p-6 border no-scrollbar">
          {view === "kanban" && <Kanban tasks={filteredTasks} setTasks={setTaskList} />}

          {view === "list" && (
            <ListView
              tasks={filteredTasks}
              onStatusChange={(id: string, status: Task["status"]) =>
                setTaskList(prev =>
                  prev.map(t => (t.id === id ? { ...t, status } : t))
                )
              }
            />
          )}

          {view === "timeline" && <TimelineView tasks={filteredTasks} />}
        </div>
      </section>
    </div>
  );
};

export default App;