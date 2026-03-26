import { useEffect, useState } from "react";
import api from "../api/axios";
import MemberCard from "./MemberCard";
import MemberDetailsModal from "./MemberDetailsModal";
import AddMembersModal from "./AddMemberModal";

function MembersSection({ year }) {
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await api.get(`/public/members/${year._id}`);
      setMembers(res.data.members);
    };
    fetchMembers();
  }, [year]);

  return (
    <div className="mt-16 animate-fade-in">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8 border-b border-zinc-900 pb-4">
        <div>
           <h2 className="text-2xl font-bold text-white tracking-tight">Members</h2>
           <p className="text-zinc-500 text-sm mt-1 font-medium">
             {members.length} {members.length === 1 ? 'Member' : 'Members'}
           </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> 
          <span>Add Members</span>
        </button>
      </div>

      {/* MEMBERS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member._id}
            member={member}
            onClick={() => setSelectedMember(member)}
          />
        ))}

        {/* Empty State (Optional Visual Polish) */}
        {members.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-600 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
                No members added to this year yet.
            </div>
        )}
      </div>

      {/* ADD MEMBERS MODAL */}
      {showAddModal && (
        <AddMembersModal
          yearId={year._id}
          onClose={() => setShowAddModal(false)}
          onSuccess={(newMembers) =>
            setMembers((prev) => [...prev, ...newMembers])
          }
        />
      )}

      {/* MEMBER DETAILS MODAL */}
      {selectedMember && (
        <MemberDetailsModal
          memberId={selectedMember._id}
          onClose={() => setSelectedMember(null)}
          onUpdate={(updatedMember) =>
            setMembers((prev) =>
              prev.map((m) =>
                m._id === updatedMember._id ? updatedMember : m
              )
            )
          }
        />
      )}
    </div>
  );
}

export default MembersSection;