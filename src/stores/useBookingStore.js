import { create } from 'zustand';
import { showToast } from '../utils/toast';
import { persist } from 'zustand/middleware';
import { apiClient } from '../utils/apiClient';

const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],
      userBookings: [],
      isLoading: false,
      isError: false,

      fetchBookings: async () => {
        try {
          const response = await apiClient(
            `/holidaze/bookings`,
            {},
            true,
            true
          );

          set({ bookings: response?.data ?? response });
          
        } catch (error) {
          console.error('Failed to fetch bookings from API', error);
        }
      },

      fetchBookingsByUser: async (name) => {
        try {
          const response = await apiClient(
            `/holidaze/profiles/${name}/bookings?_venue=true`,
            {},
            true,
            true
          );

          set({ userBookings: response?.data ?? response });
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

          if (name) {
            await get().fetchBookingsByUser(name)
          } 

          showToast.bookingAdded(venue?.id, venue?.name || 'Booking');
        } catch (error) {
          console.error('Failed to save booking to API', error);
        }
      },

      removeFromBookings: async (id, name, venue) => {
        try {
          await apiClient(
            `/holidaze/bookings/${id}`,
            { method: 'DELETE' },
            true,
            true
          );

          set({
            userBookings: get().userBookings.filter((b) => b.id !== id),
          });

          if (name) {
            await get().fetchBookingsByUser(name);
          }

          showToast.bookingRemoved(id, name || 'Your booking');
        } catch (error) {
          console.error('Failed to delete booking from API', error);
        }
      },

      clearBookings: async () => {
        try {
          const currentBookings = get().userBookings;
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
            userBookings: [],
          });
          showToast.bookingsEmpty();
        } catch (error) {
          console.error('Failed to clear bookings from API', error);
        }
      },

      getTotal: () =>
        get().userBookings.reduce(
          (sum, b) => sum + (b.venue.price || 0) * (b.guests || 1),
          0
        ),
    }),

    {
      name: 'bookings-storage',
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);

export default useBookingStore;
