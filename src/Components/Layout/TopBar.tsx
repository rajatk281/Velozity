import ToggleBar from "../UI/ToggleBar";

type ViewType = "kanban" | "list" | "timeline";

type Props = {
  view: ViewType;
  setView: (view: ViewType) => void;
};

const TopBar = ({ view, setView }: Props) => {
  return (
    <nav className=" w-full border-b border-white/10 backdrop-blur-md ">
      <div className=" py-4 p-5 flex items-center justify-between ">
        
        {/* Logo */}
        <h1 className="
  text-xl sm:text-2xl 
  font-extrabold 
  tracking-tight 
  cursor-default
  bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
  bg-clip-text 
  text-transparent">
  Project Tracker
</h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          
          {/* 🔥 ToggleBar now controlled */}
          <ToggleBar view={view} setView={setView} />

          {/* Avatar */}
          <div/>
        </div>
        
      </div>
    </nav>
  );
};

export default TopBar;