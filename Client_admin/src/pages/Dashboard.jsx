import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../api/axios'
import SidebarYears from '../Components/SidebarYears'
import EventsSection from '../Components/EventSection'
import MembersSection from '../Components/MemberSection'
import CreateYearModal from '../Components/CreatYearModal'
import { useNavigate } from 'react-router-dom'

function Dashboard () {
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }


    const fetchyears = async () => {
      const res = await api.get('public/years')
      setYears(res.data.years)
      console.log(res.data.years)
    
      if (res.data.years?.length === 0) {
        setShowCreateModal(true);
      }
    }
    fetchyears()
  }, [])


  const handleYearCreated = (newYear) => {
    setYears((prev) => [...prev, newYear]);
    setSelectedYear(newYear);
  };

  return (
    <>
     <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
      {/* LEFT SIDEBAR - Wrapped in a fixed width container with border */}
      <aside className="w-72 border-r border-zinc-800 flex-shrink-0 h-full overflow-y-auto">
        <SidebarYears
          years={years}
          selectedYear={selectedYear}
          onSelect={setSelectedYear}
          onCreateYear={() => setShowCreateModal(true)}
        />
      </aside>

      {/* MAIN CONTENT - Added scrolling and padding */}
      <main className="flex-1 h-full overflow-y-auto bg-black p-8 scrollbar-hide">
        {!selectedYear ? (
          <div className="flex flex-col justify-center items-center h-full opacity-0 animate-fade-in fill-mode-forwards" style={{animationDuration: '0.5s', opacity: 1}}>
            <div className="text-zinc-500 mb-6 text-sm">No academic year selected</div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-all shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              + Create Year
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-12">
            <EventsSection year={selectedYear} />
            
            {/* Visual separator between sections */}
            <div className="border-t border-zinc-900 pt-8">
               <MembersSection year={selectedYear} />
            </div>
          </div>
        )}
      </main>


       {/* CREATE YEAR MODAL */}
       {showCreateModal && (
        <CreateYearModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleYearCreated}
        />
      )}
    </div>
    </>
  )
}

export default Dashboard