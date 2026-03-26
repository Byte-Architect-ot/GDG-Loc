import dummyData from '../data/dummyData.json';

/**
 * Local publicApi — reads from dummyData.json instead of hitting a backend.
 * Every method returns a Promise to match the async pattern used by components.
 */

const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const publicApi = {
  /**
   * Returns all year-group objects (with nested events & members).
   */
  async getAllYears() {
    await delay();
    return dummyData.yearGroups;
  },

  /**
   * Returns events for a given yearGroup._id
   */
  async getEventsByYear(yearId) {
    await delay();
    const yearGroup = dummyData.yearGroups.find(yg => yg._id === yearId);
    return yearGroup ? yearGroup.events : [];
  },

  /**
   * Returns members for a given yearGroup._id
   */
  async getMembersByYear(yearId) {
    await delay();
    const yearGroup = dummyData.yearGroups.find(yg => yg._id === yearId);
    return yearGroup ? yearGroup.members : [];
  },

  /**
   * Returns a single event by its _id (searches across all years).
   */
  async getEventById(eventId) {
    await delay();
    for (const yg of dummyData.yearGroups) {
      const event = yg.events.find(e => e._id === eventId);
      if (event) return event;
    }
    return null;
  },

  /**
   * Converts an image key to a displayable URL.
   * For dummy data the keys are already full Unsplash URLs.
   * In production this would prepend the S3 bucket URL.
   */
  getImageUrl(imageKey) {
    if (!imageKey) return '';
    // Already a full URL (dummy data uses Unsplash links)
    if (imageKey.startsWith('http')) return imageKey;
    // Fallback: prepend the configured S3/uploads URL
    const base = import.meta.env.VITE_PUBLIC_S3_URL || '';
    return base ? `${base}/${imageKey}` : imageKey;
  },
};