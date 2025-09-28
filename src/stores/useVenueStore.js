import { create } from 'zustand';
import { apiClient } from '../utils/apiClient';
import { showToast } from '../utils/toast';

export const useVenueStore = create((set, get) => ({
  venues: [],
  userVenues: [],
  singleVenue: null,
  isLoading: false,
  isError: false,

  fetchVenue: async () => {
    try {
      const response = await apiClient(`/holidaze/venues`, {});
      const venues = Array.isArray(response?.data) ? response.data : [];

      set({ venues, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch venues from API', error);
      set({ venues: [], isLoading: false, isError: true });
    }
  },

  fetchVenueByUser: async (name) => {
    try {
      const response = await apiClient(
        `/holidaze/profiles/${name}/venues`,
        {},
        true,
        true
      );

      set({ userVenues: response?.data ?? response });
    } catch (error) {
      console.error('Failed to fetch venues by user from API', error);
    }
  },

  fetchVenueWithBookings: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await apiClient(
        `/holidaze/venues/${id}?_owner=true&_bookings=true`,
        {},
        true,
        true
      );

      set({ singleVenue: response?.data ?? response, isLoading: false });
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
      const response = await apiClient(
        `/holidaze/venues/${id}?_owner=true`,
        {},
        false,
        false
      );
      set({ singleVenue: response?.data ?? response, isLoading: false });
    } catch (error) {
      console.error('Fetch error:', error);
      set({ isError: true, isLoading: false });
    }
  },

  fetchVenuesByIds: async (ids = []) => {
    set({ isLoading: true, isError: false });
    try {
      const responses = await Promise.all(
        ids.map(async (id) => {
          const res = await apiClient(`/holidaze/venues/${id}?_owner=true`);
          return res?.data ?? null;
        })
      );
      set({ isLoading: false });
      return responses.filter((v) => v !== null);
    } catch (error) {
      console.error('Failed to fetch venues by IDs:', error);
      set({ isLoading: false, isError: true });
      return [];
    }
  },

  addVenue: (newVenue) => {
    set((state) => ({
      venues: [newVenue, ...state.venues],
      userVenues: [newVenue, ...state.userVenues],
    }));
  },

  updateVenue: (updatedVenue) => {
    set((state) => ({
      venues: state.venues.map((v) =>
        v.id === updatedVenue.id ? updatedVenue : v
      ),
      userVenues: state.userVenues.map((v) =>
        v.id === updatedVenue.id ? updatedVenue : v
      ),
    }));
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
