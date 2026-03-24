import {
  useDraggable,
} from "@dnd-kit/core";
import AvatarGroup from "../UI/AvatarGroup";

export const TaskCard = ({ task }: any) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: task.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white rounded-2xl shadow-sm p-4 mb-3 cursor-grab"
    >
      <h3 className="font-semibold text-sm">{task.title}</h3>

      <div className="mt-2">
        <span className="text-xs px-2 py-1 rounded bg-gray-200">
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-gray-500">{task.dueDate}</p>
        <AvatarGroup users={task.assignees} />
      </div>
    </div>
  );
};