type ViewType = "kanban" | "list" | "timeline";

type Props = {
  view: ViewType;
  setView: (view: ViewType) => void;
};

const ToggleBar = ({ view, setView }: Props) => {
  const options: ViewType[] = ["kanban", "list", "timeline"];

  return (
    <div className="flex items-center bg-gray-200 rounded-xl p-1 w-fit">
      {options.map(option => (
        <button
          key={option}
          onClick={() => setView(option)}
          className={`px-4 py-1.5 text-sm rounded-lg transition ${
            view === option
              ? "bg-white shadow text-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ToggleBar;