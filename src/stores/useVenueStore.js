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

    removeFromVenues: async (id) => {
        try {
            await apiClient(`/holidaze/venues/${id}`, { method: 'DELETE' }, true, true);
            const venue = get().venues.find((b) => b.id === id);
            set({
                venues: get().venues.filter((b) => b.id !== id),
            });
            showToast.venueRemoved(venue?.id, venue?.venue?.name || 'Your venue');

        } catch (error) {
            console.error('Failed to delete venue from API', error);
        }
    },
}));