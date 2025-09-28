import { useEffect, useState } from 'react';
import { useVenueStore } from '../../stores/useVenueStore';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function CardXl({ venueId }) {
  const { fetchVenuesByIds } = useVenueStore();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!venueId) return;

    const loadVenue = async () => {
      setIsLoading(true);
      try {
        const venues = await fetchVenuesByIds([venueId]);
        setVenue(venues[0] ?? null);
      } catch (error) {
        console.error('Failed to fetch venue:', error);
        setVenue(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadVenue();
  }, [venueId, fetchVenuesByIds]);

  if (isLoading)
    return (
      <div className="max-w-[500] flex items-center justify-center gap-2 my-80">
        <p className="text-center font-imfell italic text-crimson text-xl">
          Loading venue display
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

  if (!venue)
    return (
      <div className="max-w-[500] flex items-center justify-center gap-2 my-80">
        <p className="text-center font-imfell italic text-crimson text-xl">
          Venue not found. Please refresh the page
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
    <div className="flex flex-col md:flex-row bg-lamp text-light p-4 w-full max-w-[1200px] mx-auto md:h-fit transition-all ease-in-out duration-300 group">
      <Link
        to={`/booking/${venue.id}`}
        className="cursor-pointer flex flex-col md:flex-row gap-6 sm:w-full md:w-full items-center justify-center"
      >
        <div className="flex justify-center items-center border-3 border-brown-200 w-full md:w-[500px] p-2 md:h-fit overflow-hidden">
          <img
            className="object-cover h-[400px] w-full border-2 border-brown-100  group-hover:scale-110 transition-all duration-300"
            src={venue?.media?.[0]?.url}
            alt={venue?.media?.[0]?.alt || 'Venue image'}
          />
        </div>

        <div className="flex flex-col justify-center items-center flex-1 border-1 border-brown-200 group-hover:border-3 transition-all duation-300 md:h-full md:px-8 px-6 py-6 gap-4">
          <p className="text-2xl italic text-brown-100  text-center font-imfell">
            Stay at
          </p>
          <h2 className="text-4xl md:text-6xl text-center font-chonburi uppercase text-light mb-4 group-hover:tracking-widest transition-all duration-300">
            {venue?.name}
          </h2>
          <p className="flex flex-row text-sm md:text-base text-center tracking-wider text-brown-100 font-garamond capitalize line-clamp-4 gap-2 items-center">
            <MapPin size={20} />
            {venue?.description}
          </p>
          <div className="flex flex-row justify-center items-center p-4 mt-4 border-brown-200 border-1">
            <p className="text-2xl font-chonburi">{venue?.price} NOK</p>
            <span className="text-sm uppercase font-garamond">/ night</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardXl;
