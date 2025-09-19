import { create } from 'zustand';
import { apiClient } from '../utils/apiClient';

export const useVenueStore = create((set, get) => ({
  venues: [],
  userVenues: [],
  singleVenue: null,
  isLoading: false,
  isError: false,

  fetchVenue: async () => {
    try {
      const data = await apiClient(`/holidaze/venues`, {});

      set({ venues: data.data || [] });
    } catch (error) {
      console.error('Failed to fetch venues from API', error);
    }
  },

  fetchVenueByUser: async (name) => {
    try {
      const data = await apiClient(
        `/holidaze/profiles/${name}/venues`,
        {},
        true,
        true
      );

      set({ userVenues: data.data || [] });
    } catch (error) {
      console.error('Failed to fetch venues by user from API', error);
    }
  },

  fetchVenueWithBookings: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      const data = await apiClient(
        `/holidaze/venues/${id}?_owner=true&_bookings=true`,
        {},
        true,
        true
      );

      set({ singleVenue: data.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch bookings by user from API', error);
      set({ isLoading: false, isError: true });
    }
  },

  fetchVenueById: async (id) => {
    set({ isLoading: true, isError: false });

    const existing = Array.isArray(get().venue)
      ? get().venue.find((v) => v.id === id)
      : null;

    if (existing) {
      set({ singleVenue: existing, isLoading: false });
      return existing;
    }

    try {
      const data = await apiClient(
        `/holidaze/venues/${id}?_owner=true`,
        {},
        false,
        false
      );
      set({ singleVenue: data.data, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ isError: true, isLoading: false });
    }
  },

  removeFromVenues: async (id) => {
    try {
      await apiClient(
        `/holidaze/venues/${id}`,
        { method: 'DELETE' },
        true,
        true
      );
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
