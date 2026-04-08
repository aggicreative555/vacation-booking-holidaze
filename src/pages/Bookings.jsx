import { useEffect, useMemo, useState, useCallback } from 'react';
import SearchBar from '../components/search/SearchBar';
import BookingList from '../components/venues/BookingList';
import BookingsFilter from '../components/filters/BookingsFilter';
import { useVenueStore } from '../stores/useVenueStore';
import HeroCarousel from '../components/carousels/HeroCarousel';

const Bookings = () => {
  const { venues, fetchVenue, isLoading, isError, fetchVenuesByIds } =
    useVenueStore();
  const [venueImages, setVenueImages] = useState([]);
  const [isContentReady, setisContentReady] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    amenities: [],
    continents: [],
    guests: null,
  });

  const handleFilter = useCallback((nextFilters) => {
    setFilters(nextFilters);

  }, []);



  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  const filteredBookings = useMemo(() => {
    if (!Array.isArray(venues)) return [];

    let result = [...venues];

    //Remove faulty name
    result = result.filter((venue) => {
      const name = venue?.name?.trim();
      const image = venue?.media?.[0]?.url;

      if (!image || !name) return false;
      const firstThree = name.slice(0,3).toLowerCase();
      if (
        firstThree.length === 3 &&
        firstThree[0] === firstThree[1] &&
        firstThree[1] === firstThree[2]
      ) {
        return false;
      }

      return true;
    })

    // Amenities
    if (filters.amenities.length > 0) {
      result = result.filter((venue) =>
        filters.amenities.every((a) => venue?.meta?.[a])
      );
    }

    // Continents
    if (filters.continents.length > 0) {
      result = result.filter((venue) => {
        const continent = venue?.location?.continent
          ?.toLowerCase()
          ?.trim();

        if (!continent) return false;

        return filters.continents.some((c) =>
          continent.includes(c)
        );
      });
    }

    // Guests
    if (filters.guests) {
      const guestLimit = Number(filters.guests);
      result = result.filter((venue) => {
        const max = Number(venue?.maxGuests);
        if (isNaN(max)) return false;
        return guestLimit === 10 ? max >= 10 : max >= guestLimit;
      });
    }

    return result;
  }, [venues, filters]);

  useEffect(() => {
    const venueIds = [
      'c5d0e6a6-0ce9-41ab-9988-52dd354e32b8',
      'c9cb5637-826e-4781-8f60-cf5450f0c940',
      '98321edd-5f04-45da-a642-eec21effbed1',
    ];
    const fetchImages = async () => {
      const venues = await fetchVenuesByIds(venueIds);
      const images = venues.map((v) => v?.media?.[0] ?? null).filter(Boolean);
      setVenueImages(images);
    };

    fetchImages();
  }, [fetchVenuesByIds]);


  const visibleBookings = useMemo(() => {
    if (!searchQuery) return filteredBookings;

    return filteredBookings.filter((venue) =>
      venue?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredBookings, searchQuery]);

  const sortedBookings = [...visibleBookings].sort((a, b) => {
    const timeA = a.created ? new Date(a.created).getTime() : 0;
    const timeB = b.created ? new Date(b.created).getTime() : 0;
    return timeB - timeA; // newest first
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      const timer = setTimeout(() => setisContentReady(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isError]);

  console.log("Filtered:", filteredBookings.length);
  console.log("Visible:", visibleBookings.length);
  console.log("Sorted:", sortedBookings.length);

  if (isLoading || !isContentReady) {
    return (
      <main className="container mx-auto w-full transition-all duration-300">
        <HeroCarousel bookings={venueImages} height="h-[400px]" content={false} />
        <div className="max-w-[500] flex items-start justify-center gap-2 mb-30 md:my-40">
          <p className="text-center font-imfell italic text-crimson text-xl">
            Loading all venues. Please wait
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
      </main>
    );
  }
  if (isError)
    return (
      <div className="max-w-[500] flex items-center justify-center gap-2 my-80">
        <p className="text-center font-imfell italic text-crimson text-xl">
          No bookings found. Please refresh the page and try again
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
    <main className="container mx-auto w-full transition-all duration-300">
      <HeroCarousel bookings={venueImages} height="h-[400px]" content={false} />
      <div className="max-w-[1500px] px-8">
        <SearchBar data={venues} onResults={setSearchQuery} />
        <div className="px-6 py-4 mb-6 group transition-all duration-700">
          <BookingsFilter onFilter={handleFilter} />
        </div>
        <BookingList bookings={sortedBookings} />
      </div>
    </main>
  );
};

export default Bookings;
