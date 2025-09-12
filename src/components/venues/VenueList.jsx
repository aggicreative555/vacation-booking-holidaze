import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useVenueStore } from '../../stores/useVenueStore';
import Pagination from '../Pagination';
import StarRating from '../rating/StarRating';
import { MapPin } from 'lucide-react';

function VenueList({ venues: propVenue, itemsPerPage = 6 }) {
  const {
    venues: storeVenue,
    isLoading,
    isError,
    fetchVenue,
  } = useVenueStore();

  const venue = propVenue?.length ? propVenue : storeVenue;
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = venue.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (!propVenue?.length && storeVenue.length === 0) {
      fetchVenue();
    }
  }, [propVenue, storeVenue.length, fetchVenue]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (isLoading) return <p>Loading Content...</p>;
  if (isError) return <p>Error loading products, please refresh the page...</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
        {currentProducts.map((venue) => {
          const { name, price, media, amenities, bookings, location, maxGuests } = venue;

          return (
            <div
              className="h-[600px] w-60 md:w-80 shadow-md flex flex-col justify-between transition-all ease-in-out duration-300 hover:shadow-xl group"
              key={venue.id}
            >
              <Link to={`/booking/${venue.id}`} className="cursor-pointer">
                <div className="h-64 w-fit overflow-clip">
                  <img
                    className="h-64 w-100"
                      src={media?.[0]?.url}
                      alt={media?.[0]?.alt || "Venue image"}
                  />
                </div>
                <div className="px-6 py-4 flex justify-between items-center flex-col relative w-full overflow-hidden h-fit">
                  <h2 className="text-3xl text-center font-garamond uppercase text-red-800 mb-2 line-clamp-1 h-fit w-40">
                    {name}
                  </h2>
                  <div className='mb-4'>
                    <StarRating venue={venue}/>

                  </div>
                    <p className="text-2xl font-button text-black">
                      {price} NOK
                    </p>
                  <p className="text-center text-xs font-caslon text-black line-clamp-2 mt-4">
                    {venue.description}
                  </p>
                  <p className="text-center text-sm font-caslon text-black line-clamp-2 mt-4 flex justify-center items-center gap-1">
                    <MapPin
                    size={16}
                    />
                    {venue.location.city}
                  </p>
                </div>
              </Link>
              <div className="px-6 pb-4 h-full flex flex-col justify-center">
                <button
                  className="flex justify-center items-center btn-l mb-5"
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
        <Pagination totalItems={venue.length} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
}

export default VenueList;
