import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import useBookingStore from '../../stores/useBookingStore';
import { apiClient } from '../../utils/apiClient';

function CheckoutButton() {
  const { bookings, clearBookings, getTotal } = useBookingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      for (const booking of bookings) {
        await apiClient(
          `/holidaze/bookings`,
          {
            method: 'POST',
            body: {
              dateFrom: booking.dateFrom,
              dateTo: booking.dateTo,
              guests: booking.guests,
              venueId: booking.id,
            },
          },
          true
        );
      }

      clearBookings();
      navigate('/profile');
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  return (
    <button className="btn-l btn-primary" onClick={handleCheckout}>
      Checkout ({getTotal()} NOK)
    </button>
  );
}

export default CheckoutButton;
