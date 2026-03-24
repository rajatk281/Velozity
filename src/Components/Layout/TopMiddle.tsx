

const TopMiddle = () => {
  const viewers = [
    { initials: 'SC', color: 'bg-amber-400' },
    { initials: 'AK', color: 'bg-purple-500' },
    { initials: 'JL', color: 'bg-pink-500' },
    { initials: 'MP', color: 'bg-indigo-500' },
  ];

  return (
    <div className='flex items-center px-4 py-3 gap-3 bg-transparent'>
      
      {/* Avatar Stack */}
      <div className="flex -space-x-2.5 ">
        {viewers.map((viewer, index) => (
          <div
            key={index}
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white ${viewer.color} shadow-sm ring-1 ring-slate-200/50 transition-transform hover:-translate-y-1 hover:z-10 cursor-pointer`}
          >
            <span className="text-[11px] font-bold text-white tracking-tight">
              {viewer.initials}
            </span>
          </div>
        ))}
      </div>

      {/* Viewer Count Text */}
      <p className="text-sm font-medium text-slate-600 tracking-tight">
        <span className="font-semibold text-slate-900">{viewers.length} people</span> are viewing this board
      </p>
      
    </div>
  )
}

export default TopMiddle