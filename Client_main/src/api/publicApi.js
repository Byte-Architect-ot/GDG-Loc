import { publicClient } from './apiClient';

/**
 * Real publicApi — fetches data from the backend.
 */
export const publicApi = {
  /**
   * Returns all year-group objects.
   */
  async getAllYears() {
    const res = await publicClient.get('/public/years');
    return res.data.years || [];
  },

  /**
   * Returns events for a given yearGroup._id
   */
  async getEventsByYear(yearId) {
    const res = await publicClient.get(`/public/events/${yearId}`);
    return res.data.events || [];
  },

  /**
   * Returns members for a given yearGroup._id
   */
  async getMembersByYear(yearId) {
    const res = await publicClient.get(`/public/members/${yearId}`);
    return res.data.members || [];
  },

  /**
   * Returns a single event by its _id.
   */
  async getEventById(eventId) {
    const res = await publicClient.get(`/public/event/${eventId}`);
    return res.data.event || null;
  },

  /**
   * Converts an image key to a displayable URL.
   */
  getImageUrl(imageKey) {
    if (!imageKey) return '';
    if (imageKey.startsWith('http')) return imageKey;
    const base = import.meta.env.VITE_PUBLIC_S3_URL || '';
    return base ? `${base}/${imageKey}` : imageKey;
  },
};