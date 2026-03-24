import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";

export const Column = ({ column, tasks }: any) => {
  const { setNodeRef } = useDroppable({
    id: column.id
  });

  return (
    <div
      ref={setNodeRef}
      className="md:w-1/4 bg-gray-100 rounded-2xl p-4 my-2 md:flex md:m-3"
    >
      <div className="flex justify-between mb-3 no-scrollbar">
        <h2>{column.title}</h2>
        <span>{tasks.length}</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};