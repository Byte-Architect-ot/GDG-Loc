import { useState } from "react";
import api from "../api/axios";

function AddEventModal({ yearId, onClose, onSuccess }) {
  const [eventName, setEventName] = useState("");
  const [eventInfo, setEventInfo] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddEvent = async () => {
    if (!eventName || !eventInfo || !eventDate) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);
      const res = await api.post("/api/admin/addevent", {
        yearGroupId: yearId,
        eventName,
        eventInfo,
        eventDate,
      });

      if (res.data.ok) {
        onSuccess(res.data.event);
        onClose();
      }
    } catch (err) {
      alert("Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Add Event</h2>

        <div className="space-y-4">
          <input
            placeholder="Event Name"
            className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600"
            onChange={(e) => setEventName(e.target.value)}
          />

          <textarea
            placeholder="Event Info"
            rows="3"
            className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 resize-none"
            onChange={(e) => setEventInfo(e.target.value)}
          />

          <input
            type="date"
            className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all [color-scheme:dark]"
            onChange={(e) => setEventDate(e.target.value)}
          />

          <div className="flex gap-3 pt-4">
            <button 
                onClick={onClose} 
                className="flex-1 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEvent}
              disabled={loading}
              className="flex-1 bg-white text-black px-4 py-3 text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEventModal;