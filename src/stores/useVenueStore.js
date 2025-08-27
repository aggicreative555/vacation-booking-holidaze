import { create } from 'zustand';
import { apiClient } from '../utils/apiClient';

export const useVenueStore = create((set) => ({
  venue: [],
  isLoading: false,
  isError: false,

  fetchVenue: async () => {
    set({ isLoading: true, isError: false });

    try {
      const data = await apiClient('/holidaze/venues');
      console.log(data);
      set({ venue: data.data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ isError: true, isLoading: false });
    }
  },
}));