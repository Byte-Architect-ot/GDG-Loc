import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import ENV from "../config/env";

function MemberDetailsModal({ memberId, onClose, onUpdate }) {
  const [member, setMember] = useState(null);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Always fetch latest member
  useEffect(() => {
    const fetchMember = async () => {
      const res = await api.get(`/public/member/${memberId}`);
      setMember(res.data.member);
    };
    fetchMember();
  }, [memberId]);

  const deleteMember = async () => {
    if (!window.confirm("Delete this member?")) return;
  
    await api.post(`/admin/deletemember/${memberId}`);
    onClose();
    onUpdate({ _id: memberId, deleted: true });
  };
  

  /* -------- UPLOAD IMAGE -------- */
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    const res = await api.post(
      `/admin/member/${memberId}/image`,
      formData
    );

    const updated = {
      ...member,
      memberImageKey: res.data.memberImageKey,
    };

    setMember(updated);
    onUpdate(updated);
    setLoading(false);
  };

  /* -------- DELETE IMAGE -------- */
  const deleteImage = async () => {
    if (!window.confirm("Delete image?")) return;

    setLoading(true);
    await api.delete(`/admin/member/${memberId}/image`);

    const updated = { ...member, memberImageKey: undefined };
    setMember(updated);
    onUpdate(updated);
    setLoading(false);
  };

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="flex justify-between items-start p-6 pb-2">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{member.memberName}</h2>
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Member Details</span>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* IMAGE SECTION */}
          <div className="space-y-3">
            {member.memberImageKey ? (
              <div className="relative group">
                <img
                  src={`https://${ENV.PUBLIC_S3_URL}/${member.memberImageKey}`}
                  className="w-full h-56 object-cover rounded-xl border border-zinc-800 shadow-lg"
                  alt={member.memberName}
                />
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-xl flex items-center justify-center gap-3">
                  <button
                    onClick={() => fileRef.current.click()}
                    className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors shadow-lg"
                  >
                    Replace
                  </button>
                  <button
                    onClick={deleteImage}
                    className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current.click()}
                className="w-full h-40 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-2 group-hover:bg-zinc-700">
                    <span className="text-xl">+</span>
                </div>
                <span className="text-xs font-medium">Upload Profile Photo</span>
              </button>
            )}

            <input
              type="file"
              hidden
              ref={fileRef}
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </div>

          {/* DETAILS LIST */}
          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-zinc-800/50">
            <div className="flex justify-between border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
              <span className="text-sm text-zinc-500">Branch</span>
              <span className="text-sm font-medium text-white">{member.memberBranch}</span>
            </div>
            
            <div className="flex justify-between border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
              <span className="text-sm text-zinc-500">Email</span>
              <span className="text-sm font-medium text-white truncate max-w-[150px]" title={member.mail}>{member.mail || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-zinc-500">LinkedIn</span>
              <span className="text-sm font-medium text-white truncate max-w-[150px] text-right">
                {member.linkedin ? (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
                        View Profile
                    </a>
                ) : "-"}
              </span>
            </div>
          </div>

          {/* LOADING INDICATOR */}
          {loading && (
            <div className="text-center">
              <p className="text-xs text-zinc-400 animate-pulse">Processing changes...</p>
            </div>
          )}

          {/* DELETE MEMBER BUTTON */}
          <button
            onClick={deleteMember}
            className="w-full py-3 rounded-lg text-sm font-bold text-red-500 bg-red-500/10 border border-transparent hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            Delete Member
          </button>

        </div>
      </div>
    </div>
  );
}

export default MemberDetailsModal;