import { DndContext } from "@dnd-kit/core";
import { Column } from "./Column";
import type { Task } from "../../../types/task";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "review", title: "In Review" },
  { id: "done", title: "Done" }
];

const Kanban = ({ tasks, setTasks }: Props) => {

  // ✅ group tasks by column
  const groupedTasks = columns.map(col => ({
    ...col,
    tasks: tasks.filter(task => task.status === col.id)
  }));

  // 🔥 drag logic
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === active.id
          ? { ...task, status: over.id }
          : task
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen no-scrollbar flex-wrap flex justify-center ">

        {groupedTasks.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={column.tasks}
          />
        ))}

      </div>
    </DndContext>
  );
};

export default Kanban;