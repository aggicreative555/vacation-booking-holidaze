import { create } from 'zustand';
import { showToast } from '../utils/toast';
import { persist } from 'zustand/middleware';
import { apiClient } from '../utils/apiClient';

const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],
      isLoading: false,
      isError: false,

      fetchBookings: async () => {
        try {
          const data = await apiClient(
            `/holidaze/bookings?_customer=true&_venue=true`,
            {},
            true,
            true
          );

          set({ bookings: data.data || [] });
        } catch (error) {
          console.error('Failed to fetch bookings from API', error);
        }
      },

      fetchBookingsByUser: async (name) => {
        try {
          const data = await apiClient(
            `/holidaze/profiles/${name}/bookings?_venue=true`,
            {},
            true,
            true
          );

          set({ bookings: data.data || [] });
        } catch (error) {
          console.error('Failed to fetch bookings from API', error);
        }
      },

      addToBookings: async (venue, bookingDetails, name) => {
        try {
          await apiClient(
            '/holidaze/bookings',
            {
              method: 'POST',
              body: JSON.stringify({
                dateFrom: new Date(bookingDetails?.dateFrom).toISOString(),
                dateTo: new Date(bookingDetails?.dateTo).toISOString(),
                guests: bookingDetails?.guests,
                venueId: venue?.id,
              }),
            },
            true,
            true
          );
          await get().fetchBookings(name);
          showToast.bookingAdded(venue?.id, venue?.name || 'Booking');
        } catch (error) {
          console.error('Failed to save booking to API', error);
        }
      },

      removeFromBookings: async (id) => {
        try {
          await apiClient(
            `/holidaze/bookings/${id}`,
            { method: 'DELETE' },
            true,
            true
          );
          const booking = get().bookings.find((b) => b.id === id);
          set({
            bookings: get().bookings.filter((b) => b.id !== id),
          });
          showToast.bookingRemoved(
            booking?.id,
            booking?.venue?.name || 'Your booking'
          );
        } catch (error) {
          console.error('Failed to delete booking from API', error);
        }
      },

      clearBookings: async () => {
        try {
          const currentBookings = get().bookings;
          await Promise.all(
            currentBookings.map((b) =>
              apiClient(
                `/holidaze/bookings/${b.id}`,
                { method: 'DELETE' },
                true,
                true
              )
            )
          );
          set({
            bookings: [],
          });
          showToast.bookingsEmpty();
        } catch (error) {
          console.error('Failed to clear bookings from API', error);
        }
      },

      getTotal: () =>
        get().bookings.reduce(
          (sum, b) => sum + (b.venue.price || 0) * (b.guests || 1),
          0
        ),

      getItems: () => get().bookings.length,
    }),

    {
      name: 'bookings-storage',
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);

export default useBookingStore;
