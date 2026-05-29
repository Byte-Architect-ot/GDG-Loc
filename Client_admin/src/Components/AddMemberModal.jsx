import { useState } from "react";
import api from "../api/axios";

function AddMembersModal({ yearId, onClose, onSuccess }) {
  const [members, setMembers] = useState([
    { memberName: "", memberBranch: "", mail: "", linkedin: "", role: "", priority: "" },
  ]);
  const [loading, setLoading] = useState(false);

  /* --------- HANDLE INPUT CHANGE --------- */
  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  /* --------- ADD NEW SLAB --------- */
  const addRow = () => {
    setMembers([
      ...members,
      { memberName: "", memberBranch: "", mail: "", linkedin: "", role: "", priority: "" },
    ]);
  };

  /* --------- REMOVE SLAB --------- */
  const removeRow = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  /* --------- SUBMIT --------- */
  const handleSubmit = async () => {
    // minimal validation
    for (const m of members) {
      if (!m.memberName || !m.memberBranch) {
        return alert("Member name and branch are required");
      }
    }

    try {
      setLoading(true);

      const processedMembers = members.map(m => ({
        ...m,
        role: m.role.trim() || "Member",
        priority: m.priority !== "" ? Number(m.priority) : 99,
      }));

      const res = await api.post("/api/admin/addmembers", {
        yearGroupId: yearId,
        members: processedMembers,
      });

      if (res.data.ok) {
        onSuccess(res.data.members); // backend should return created members
        onClose();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Failed to add members");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900 rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Add Members</h2>
            <p className="text-sm text-zinc-500">Add multiple members to this academic year</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-2"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="overflow-y-auto p-6 space-y-4">
          {members.map((member, index) => (
            <div
              key={index}
              className="p-6 bg-black/40 border border-zinc-800 rounded-xl relative group transition-all hover:border-zinc-700"
            >
              {/* Header for each slab */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Member #{index + 1}
                </span>
                {members?.length > 1 && (
                  <button
                    onClick={() => removeRow(index)}
                    className="text-zinc-600 hover:text-red-500 transition-colors text-sm font-medium flex items-center gap-1"
                  >
                    <span>Remove</span>
                    <span>✕</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Member Name *"
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 text-sm"
                  value={member.memberName}
                  onChange={(e) =>
                    handleChange(index, "memberName", e.target.value)
                  }
                />

                <input
                  placeholder="Branch *"
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 text-sm"
                  value={member.memberBranch}
                  onChange={(e) =>
                    handleChange(index, "memberBranch", e.target.value)
                  }
                />

                <input
                  placeholder="Email Address"
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 text-sm"
                  value={member.mail}
                  onChange={(e) =>
                    handleChange(index, "mail", e.target.value)
                  }
                />

                <input
                  placeholder="LinkedIn URL"
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 text-sm"
                  value={member.linkedin}
                  onChange={(e) =>
                    handleChange(index, "linkedin", e.target.value)
                  }
                />

                <input
                  placeholder="Role / Tag (e.g. Lead, Developer)"
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 text-sm"
                  value={member.role}
                  onChange={(e) =>
                    handleChange(index, "role", e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Priority (e.g. 1 for Top)"
                  className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-zinc-600 text-sm"
                  value={member.priority}
                  onChange={(e) =>
                    handleChange(index, "priority", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {/* ADD ROW BUTTON */}
          <button
            onClick={addRow}
            className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 font-medium hover:text-white hover:border-zinc-600 hover:bg-zinc-800/50 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span> Add Another Member
          </button>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900 rounded-b-2xl flex justify-end gap-3 z-10">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-black px-6 py-3 text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Members"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMembersModal;