import ENV from "../config/env";

function MemberCard({ member, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-4/5 w-full bg-zinc-800 overflow-hidden">
        {member.memberImageKey ? (
          <img
            src={`https://${ENV.PUBLIC_S3_URL}/${member.memberImageKey}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={member.memberName}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-800/50">
            <svg 
              className="w-12 h-12 mb-2 opacity-50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">No Image</span>
          </div>
        )}
        
        {/* Subtle Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* BASIC INFO */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800 relative z-10">
        <h3 className="font-bold text-white text-lg truncate mb-1 group-hover:text-zinc-200 transition-colors">
          {member.memberName}
        </h3>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider truncate">
          {member.memberBranch || "Unknown Branch"}
        </p>
      </div>
    </div>
  );
}

export default MemberCard;