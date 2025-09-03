import { create } from 'zustand';
import { showToast } from '../utils/toast';
import { persist } from 'zustand/middleware';
import { apiClient } from '../utils/apiClient';

const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],

      addToBookings: async (venue, bookingDetails) => {
        const newBooking = { ...venue, ...bookingDetails }
        set({ bookings: [...get().bookings, newBooking] });

        console.log(bookingDetails)
        
        try {
            const data = await apiClient(
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
            
            console.log('booking saved to api', data)
        } catch (error) {
            console.error('Failed to save booking to API', error)

            set({
                bookings: get().bookings.filter(
                    (b) => b.venueId !== venue.id || b.dateFrom !== bookingDetails.dateFrom
                ),
            })
        }

        showToast.bookingAdded(venue.name);
      },

      removeFromBookings: (id) => {
        set({
          bookings: get().bookings.filter((b) => b.id !== id),
        });
        showToast.bookingRemoved(venue.id, venue.name);
      },

      clearBookings: () => {
        set({
          bookings: [],
        });
      },

      getTotal: () =>
        get().bookings.reduce(
            (sum, b) => sum + b.price * b.guests, 0),

      getItems: () => get().bookings.length,

    }),

    {
      name: 'bookings-storage',
      partialize: (state) => ({ bookings: state.bookings }),
    }
  )
);

export default useBookingStore;