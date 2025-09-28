import { useEffect } from 'react';
import { useVenueStore } from '../../stores/useVenueStore';

function BookingGuestList({ venueId }) {
  const { singleVenue, fetchVenueWithBookings, isLoading, isError } =
    useVenueStore();

  useEffect(() => {
    fetchVenueWithBookings(venueId);
  }, [venueId, fetchVenueWithBookings]);

  if (isLoading) {
    return (
      <div className="w-full justify-center items-center flex flex-row gap-2">
        <p className="text-center font-imfell italic text-crimson text-xl">
          Loading Bookings. Please wait
        </p>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-1">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-2">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-3">
          .
        </span>
      </div>
    );
  }
  if (isError)
    return (
      <div className="w-full justify-center items-center flex flex-row gap-2">
        <p className="text-center font-imfell italic text-crimson text-xl">
          Error loading bookings. Please try again later{' '}
        </p>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-1">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-2">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-3">
          .
        </span>
      </div>
    );
  if (!singleVenue?.bookings?.length)
    return (
      <div className="w-full justify-center items-center flex flex-row gap-2 ">
        <p className="text-center font-imfell italic text-crimson text-xl">
          No bookings have been made yet
        </p>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-1">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-2">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-3">
          .
        </span>
      </div>
    );

  return (
    <div className="bg-light overflow-x-auto w-full pb-8 px-10 flex justify-center items-center">
      {singleVenue.bookings.map((booking) => (
        <table key={booking.id} className="w-fit">
          <thead className=" font-garamond font-semibold text-2xl uppercase pb-5 text-left">
            <tr>
              <th className="pr-8 py-2 text-left text-brown-300  tracking-wide font-garamond uppercase">
                Customer
              </th>
              <th className="pr-8 py-2 text-left text-brown-300  tracking-wide font-garamond uppercase">
                Date
              </th>
              <th className="pr-8 py-2 text-left text-brown-300  tracking-wide font-garamond uppercase">
                Guests
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={booking.id}
              className="border-t border-gray-300 font-caslon uppercase pt-5 tracking-wider text-left"
            >
              <td className="pr-8 py-2 text-left text-dark  tracking-wide font-garamond uppercase">
                {booking.customer?.name}
              </td>
              <td className="pr-8 py-2 text-left text-dark  tracking-wide font-garamond uppercase">
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
              <td className="pr-8 py-2 text-left text-dark  tracking-wide font-garamond uppercase">
                {booking?.guests}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default BookingGuestList;
