import React from 'react'

// Added 'onCreateYear' to the props
function SidebarYears ({ years, selectedYear, onSelect, onCreateYear }) {
  return (
    <div className='w-full h-full p-4 flex flex-col'>
      
      <div className="px-3 mb-2 text-xs font-bold text-zinc-600 uppercase tracking-widest">
        Timeline
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {years.map(year => (
          <div
            key={year._id}
            onClick={() => onSelect(year)}
            className={`cursor-pointer px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group
            ${
              selectedYear?._id === year._id
                ? 'bg-zinc-800 text-white shadow-inner'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <span>{year.year}</span>
            
            {/* Active Indicator */}
            {selectedYear?._id === year._id && (
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
            )}
          </div>
        ))}
      </div>

      {/* "Add Year" Button pinned to the bottom */}
      <div className="pt-4 mt-2 border-t border-zinc-900">
        <button
          onClick={onCreateYear}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-zinc-500 border border-dashed border-zinc-800 hover:border-zinc-600 hover:text-white hover:bg-zinc-900 transition-all duration-200"
        >
          <span>+</span>
          <span>Add Year</span>
        </button>
      </div>

    </div>
  )
}

export default SidebarYears