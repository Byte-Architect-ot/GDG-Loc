import api from "../api/axios";

export default function EventCard({ event, onDeleted, onClick }) {
  const handleDelete = async (e) => {
    e.stopPropagation(); // 🚫 prevent opening details modal

    if (!window.confirm("Delete this event?")) return;

    await api.post(`/api/admin/deleteevent/${event._id}`);
    onDeleted(event._id);
  };

  return (
    <div
      onClick={onClick}
      className="group relative h-40 bg-zinc-900 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:shadow-xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300 flex flex-col justify-between"
    >
      {/* DELETE BUTTON - Only visible on hover */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 p-1.5 rounded-full text-zinc-600 hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="Delete Event"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div>
        <h3 className="font-bold text-lg text-white mb-1 line-clamp-1 pr-6">
            {event.eventName}
        </h3>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
          {new Date(event.eventDate).toDateString()}
        </p>
      </div>

      {/* Decorative tiny line at bottom */}
      <div className="w-8 h-1 bg-zinc-800 rounded-full group-hover:bg-zinc-600 transition-colors"></div>
    </div>
  );
}