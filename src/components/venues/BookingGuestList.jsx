import { useEffect } from 'react';
import { useVenueStore } from '../../stores/useVenueStore';

function BookingGuestList({ venueId }) {
  const { singleVenue, fetchVenueWithBookings, isLoading, isError } =
    useVenueStore();

  useEffect(() => {
    fetchVenueWithBookings(venueId);
  }, [venueId, fetchVenueWithBookings]);

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error loading bookings. Please refresh the page.</p>;
  if (!singleVenue?.bookings?.length)
    return <p> No bookings have been made yet </p>;

  return (
    <div className="overflow-x-auto pb-8 px-10">
      {singleVenue.bookings.map((booking) => (
        <table className="w-fit">
          <thead className=" font-garamond font-semibold text-2xl uppercase pb-5 text-left">
            <tr>
              <th className="px-8 py-2 text-left">Customer</th>
              <th className="px-8 py-2 text-left">Date</th>
              <th className="px-8 py-2 text-left">Guests</th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={booking.id}
              className="border-t border-gray-300 font-caslon uppercase pt-5 tracking-wider text-left"
            >
              <td className="px-4 py-2">{booking.customer?.name}</td>
              <td className="px-4 py-2">
                <span>
                  {booking.dateFrom
                    ? new Date(booking.dateFrom).toLocaleDateString()
                    : '01/01/2025'}
                </span>
                <span> - </span>
                <span>
                  {booking.dateFrom
                    ? new Date(booking.dateTo).toLocaleDateString()
                    : '01/01/2025'}
                </span>
              </td>
              <td className="px-4 py-2">{booking?.guests}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default BookingGuestList;
