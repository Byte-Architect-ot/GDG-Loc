import { useEffect, useState } from 'react'
import api from '../api/axios'
import EventCard from './EventCard'
import AddEventModal from './AddEventModal'
import EventDetailsModal from './EventDetailsModal'

function EventsSection ({ year }) {
  const [events, setEvents] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get(`/public/events/${year._id}`)
      setEvents(res.data.events)
    }
    fetchEvents()
  }, [year])

  return (
    <div className='mb-12 animate-fade-in'>
      <div className="flex items-center justify-between mb-6">
        <h2 className='text-2xl font-bold text-white tracking-tight'>Events</h2>
        <span className="text-sm text-zinc-500 font-medium">
          {events?.length} {events?.length === 1 ? 'Event' : 'Events'}
        </span>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {/* Render Events */}
        {events?.map(event => (
          <EventCard
            key={event._id}
            event={event}
            onClick={() => setSelectedEvent(event)}
            onDeleted={id => setEvents(prev => prev.filter(e => e._id !== id))}
          />
        ))}

        {/* Add Event Button (Styled as a Card) */}
        <button
          onClick={() => setShowAddModal(true)}
          className='group flex flex-col items-center justify-center h-40 border-2 border-dashed border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200'
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center mb-3 group-hover:bg-zinc-800 transition-colors border border-zinc-800">
            <span className="text-xl text-zinc-400 group-hover:text-white">+</span>
          </div>
          <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">Add New Event</span>
        </button>
      </div>

      {showAddModal && (
        <AddEventModal
          yearId={year._id}
          onClose={() => setShowAddModal(false)}
          onSuccess={newEvent => setEvents(prev => [...prev, newEvent])}
        />
      )}

      {selectedEvent && (
        <EventDetailsModal
          eventId={selectedEvent._id}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}

export default EventsSection