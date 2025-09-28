import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useVenueStore } from '../../stores/useVenueStore';

function HomeBookingList({ bookings = [], venueIds = [] }) {
  const { fetchVenuesByIds } = useVenueStore();
  const [venues, setVenues] = useState(Array.isArray(bookings) ? bookings : []);
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsMdUp(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load venues
  useEffect(() => {
    const loadVenues = async () => {
      if (venueIds.length > 0) {
        const fetched = await fetchVenuesByIds(venueIds);
        setVenues(fetched);
      } else if (Array.isArray(bookings)) {
        setVenues(bookings);
      } else {
        setVenues([]);
      }
    };
    loadVenues();
  }, [venueIds, bookings, fetchVenuesByIds]);

  if (!venues.length)
    return (
      <div className="max-w-[500px] flex items-center justify-center gap-2 my-20 mx-auto">
        <p className="text-center font-imfell italic text-crimson text-xl">
          No bookings found. Please refresh the page and try again
        </p>
      </div>
    );

  return (
    <div className={`${isMdUp ? 'marquee-track' : ''}`}>
      <ul className="marquee-container flex flex-col md:flex-row md:overflow-x-auto md:space-x-6 space-y-6 md:space-y-0 hide-scrollbar">
        {[...venues, ...venues].map((booking, i) => (
          <li
            key={i}
            className={`flex-shrink-0 flex flex-col md:flex-row w-full md:w-[658px] max-w-[800px] bg-sand-100 text-brown-300 p-2 transition-all duration-300 group ${isMdUp ? 'marquee' : ''}`}
          >
            <Link
              to={`/booking/${booking.id}`}
              className="cursor-pointer flex flex-col md:flex-row gap-4 items-center justify-center w-full"
            >
              {/* Image */}
              <div className="flex justify-center items-center border-3 border-brown-300 w-full md:w-[334px] overflow-hidden">
                <img
                  src={booking?.media?.[0]?.url}
                  alt={booking?.media?.[0]?.alt || 'Venue image'}
                  className="object-cover h-[200px] w-full group-hover:scale-110 transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="w-full flex flex-col justify-center items-center flex-1 md:h-full border-1 group-hover:border-2 transition-all duration-300 border-brown-400 px-6 py-4 group-hover:tracking-wider">
                <p className="text-xl italic text-center font-imfell">Stay at</p>
                <h2 className="text-2xl md:text-4xl text-center font-chonburi uppercase text-marine line-clamp-2 mb-2 ">
                  {booking?.name}
                </h2>
                <p className="flex flex-row text-xs uppercase font-garamond">
                  <MapPin size={16} />
                  {booking?.location?.country}
                </p>
                <div className="flex flex-row justify-center items-center p-2 mt-2 border-brown-200 border-1">
                  <p className="text-xl font-chonburi">{booking?.price} NOK</p>
                  <span className="text-xs uppercase font-garamond">/ night</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeBookingList;
