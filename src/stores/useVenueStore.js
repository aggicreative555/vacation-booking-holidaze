import { create } from 'zustand';
import { apiClient } from '../utils/apiClient';

export const useVenueStore = create((set, get) => ({
  venue: [],
  singleVenue: null,
  isLoading: false,
  isError: false,

  fetchVenue: async () => {
    set({ isLoading: true, isError: false });

    try {
      const data = await apiClient('/holidaze/venues');
      set({ venue: data.data || [], isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ isError: true, isLoading: false, venue: [] });
    }
  },

  fetchVenueById: async (id) => {
    set({ isLoading: true, isError: false });

    const existing = Array.isArray(get().venue)
    ? get().venue.find((v) => v.id === id) 
    : null;
    
    if (existing) {
        set({ singleVenue: existing, isLoading: false});
        return existing;
    }


    try {
      const data = await apiClient(`/holidaze/venues/${id}`);
      set({ singleVenue: data.data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ isError: true, isLoading: false });
    }
  },
}));