import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import ENV from "../config/env";

function EventDetailsModal({ eventId, onClose }) {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);

  const thumbnailInputRef = useRef(null);
  const subImagesInputRef = useRef(null);

  // 🔥 fetch latest event data
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/public/event/${eventId}`);
      setEventData(res.data.event);
    };
    fetchEvent();
  }, [eventId]);

  /* ---------------- THUMBNAIL UPLOAD ---------------- */
  const uploadThumbnail = async (file) => {
    const formData = new FormData();
    formData.append("thumbnail", file);

    setLoading(true);
    const res = await api.post(
      `/admin/${eventId}/thumbnail`,
      formData
    );

    setEventData((prev) => ({
      ...prev,
      thumbnailKey: res.data.thumbnailKey,
    }));
    setLoading(false);
  };

  /* ---------------- DELETE THUMBNAIL ---------------- */
  const deleteThumbnail = async () => {
    if (!window.confirm("Delete thumbnail?")) return;

    setLoading(true);
    await api.delete(`/api/admin/${eventId}/thumbnail`);

    setEventData((prev) => ({
      ...prev,
      thumbnailKey: null,
    }));
    setLoading(false);
  };

  /* ---------------- SUB IMAGES UPLOAD ---------------- */
  const uploadSubImages = async (files) => {
    const formData = new FormData();
    files.forEach((f) => formData.append("images", f));

    setLoading(true);
    const res = await api.post(
      `/api/admin/${eventId}/sub-images`,
      formData
    );

    setEventData((prev) => ({
      ...prev,
      eventsubImagesKey: [
        ...(prev.eventsubImagesKey || []),
        ...res.data.eventsubImagesKey,
      ],
    }));
    setLoading(false);
  };

  /* ---------------- DELETE ONE SUB IMAGE ---------------- */
  const deleteSubImage = async (imageKey) => {
    if (!window.confirm("Delete this image?")) return;

    setLoading(true);
    await api.delete(
      `/api/admin/${eventId}/sub-images/${encodeURIComponent(imageKey)}`
    );

    setEventData((prev) => ({
      ...prev,
      eventsubImagesKey: prev.eventsubImagesKey.filter(
        (key) => key !== imageKey
      ),
    }));
    setLoading(false);
  };

  if (!eventData) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-zinc-900 text-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-zinc-800 flex flex-col">
        
        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{eventData.eventName}</h2>
            <p className="text-sm text-zinc-500 mt-1">
              {new Date(eventData.eventDate).toDateString()}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-6 space-y-8">
          
          {/* INFO */}
          <div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-zinc-300 leading-relaxed bg-black/30 p-4 rounded-lg border border-zinc-800">
               {eventData.eventInfo}
            </p>
          </div>

          <hr className="border-zinc-800" />

          {/* ---------------- THUMBNAIL ---------------- */}
          <div>
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Thumbnail</h3>

            {eventData.eventThumbnailKey ? (
              <div className="relative group w-fit">
                <img
                  src={`https://${ENV.PUBLIC_S3_URL}/${eventData.eventThumbnailKey}`}
                  className="w-64 h-40 object-cover rounded-lg border border-zinc-800"
                  alt="Thumbnail"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                   <button
                    onClick={() => thumbnailInputRef.current.click()}
                    className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded hover:bg-zinc-200"
                  >
                    Replace
                  </button>
                  <button
                    onClick={deleteThumbnail}
                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => thumbnailInputRef.current.click()}
                className="w-64 h-32 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all text-sm"
              >
                + Add Thumbnail
              </button>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              ref={thumbnailInputRef}
              onChange={(e) => uploadThumbnail(e.target.files[0])}
            />
          </div>

          {/* ---------------- SUB IMAGES ---------------- */}
          <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Gallery</h3>
                <button
                    onClick={() => subImagesInputRef.current.click()}
                    className="text-xs bg-white text-black px-3 py-1.5 font-bold rounded hover:bg-zinc-200 transition-colors"
                >
                    + Add Images
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {eventData.eventsubImagesKey?.map((key) => (
                <div key={key} className="relative group aspect-square">
                  <img
                    src={`https://${ENV.PUBLIC_S3_URL}/${key}`}
                    className="w-full h-full object-cover rounded-lg border border-zinc-800"
                    alt="Gallery"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-start justify-end p-2">
                    <button
                        onClick={() => deleteSubImage(key)}
                        className="bg-red-600 text-white p-1.5 rounded-md hover:bg-red-700 transition-colors"
                        title="Delete Image"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty placeholder if no images */}
              {(!eventData.eventsubImagesKey || eventData.eventsubImagesKey.length === 0) && (
                  <div className="col-span-full py-8 text-center text-zinc-600 text-sm italic">
                      No gallery images added yet.
                  </div>
              )}
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              ref={subImagesInputRef}
              onChange={(e) => uploadSubImages(Array.from(e.target.files))}
            />
          </div>

          {loading && (
            <div className="text-center py-4">
                <p className="text-sm text-zinc-400 animate-pulse">Processing changes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;