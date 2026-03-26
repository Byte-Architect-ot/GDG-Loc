import { useState } from "react";
import api from "../api/axios";

function CreateYearModal({ onClose, onSuccess }) {
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!year) return alert("Year is required");

    try {
      setLoading(true);
      const res = await api.post("/admin/addyear", { year });

      if (res.data.ok) {
        onSuccess(res.data.yearGroup); // pass created year
        onClose();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Failed to create year");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur and darkness */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl transform transition-all">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Create New Year
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wide">
              Academic Year
            </label>
            <input
              type="text"
              placeholder="e.g. 2024"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors border border-transparent"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              disabled={loading}
              className="flex-1 bg-white text-black px-4 py-3 text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              {loading ? "Creating..." : "Create Year"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateYearModal;