import { create } from "zustand";
import axios from "axios";

const useEventStore = create((set) => ({
  startDate: null, // Default value
  setStartDate: (date) => set({ startDate: date }),
  events: [], // Default empty event list
  loading: false, // Loading state
  error: null, // Error state

  fetchEvents: async () => {
    set({ loading: true, error: null }); // Start loading
    try {
      const response = await axios.get("/api/events");
      set({ events: response.data, loading: false }); // Store events
    } catch (error) {
      set({ error: error.message, loading: false }); // Store error
    }
  },
  addEvents: async (newEvent) => {
    try {
      const response = await axios.post("/api/events", newEvent);
      set((state) => ({
        events: [...state.events, response.data.event], // Append new event
      }));
      return response.data.event;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  },
}));

export default useEventStore;
