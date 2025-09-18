import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';
import StarRating from '../rating/StarRating';
import { MapPin } from 'lucide-react';

function BookingList({ bookings = [], itemsPerPage = 6 }) {
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = bookings.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
        {currentProducts.map((booking) => {
          const { venue } = booking;

          return (
            <div
              className="h-[600px] w-60 md:w-80 shadow-md flex flex-col justify-between transition-all ease-in-out duration-300 hover:shadow-xl group"
              key={booking.id}
            >
              <Link to={`/booking/${venue.id}`} className="cursor-pointer">
                <div className="h-64 w-fit overflow-clip">
                  <img
                    className="h-64 w-100"
                    src={venue.media?.[0]?.url}
                    alt={venue.media?.[0]?.alt || 'Venue image'}
                  />
                </div>
                <div className="px-6 py-4 flex justify-between items-center flex-col relative w-full overflow-hidden h-fit">
                  <h2 className="text-3xl text-center font-garamond uppercase text-red-800 mb-2 line-clamp-1 h-fit w-40">
                    {venue?.name}
                  </h2>
                  <div className="mb-4">
                    <StarRating venue={venue} />
                  </div>
                  <p className="text-2xl font-button text-black">
                    {venue.price} NOK
                  </p>
                  <p className="text-center text-xs font-caslon text-black line-clamp-2 mt-4">
                    {venue.description}
                  </p>
                  <p className="text-center text-gray-600 uppercase font-button text-xs line-clamp-2 mt-4 flex justify-center items-center gap-1">
                    <MapPin size={16} />
                    {venue.location.city}, {venue.location.country}
                  </p>
                  <div className="flex gap-2 text-xs mt-2">
                    {Object.entries(venue.meta)
                      .filter(([__dirname, value]) => value)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="px-3 py-1 pb-2 my-2 border rounded-full text-gray-600"
                        >
                          {key}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
              <div className="px-6 pb-4 h-full flex flex-col justify-end items-center">
                <button
                  className="flex w-full btn-l mb-5"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  See Venue
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center mt-6 mb-12 md:mt-10 md:mb-18">
        <Pagination totalItems={bookings.length} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
}

export default BookingList;
