import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import BookingList from '../components/venues/BookingList';
import BookingsFilter from '../components/filters/BookingsFilter';
import { useVenueStore } from '../stores/useVenueStore';
import HeroCarousel from '../components/carousels/HeroCarousel';

const Bookings = () => {
  const { venues, fetchVenue, isLoading, isError, fetchVenuesByIds } = useVenueStore();
  const [ venueImages, setVenueImages ] = useState([]);
  const [ isContentReady, setisContentReady] = useState(false);

  const [filteredBookings, setFilteredBookings] = useState([]);


  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  useEffect(() => {
   setFilteredBookings(venues);
  }, [venues]);

   useEffect(() => {
    const venueIds = ['c5d0e6a6-0ce9-41ab-9988-52dd354e32b8', 'c9cb5637-826e-4781-8f60-cf5450f0c940','98321edd-5f04-45da-a642-eec21effbed1'];
    const fetchImages = async () => {
    const venues = await fetchVenuesByIds(venueIds);
    const images = venues.map((v) => v?.media?.[0] ?? null).filter(Boolean);
    setVenueImages(images);
  };

    fetchImages();
  }, [fetchVenuesByIds]);

  const handleFilterResults = useCallback((results) => {
    setFilteredBookings(results);
  }, []);

  const handleSearchResults = useCallback((results) => {
    setFilteredBookings(results);
  }, []);

  const sortedBookings = [...filteredBookings].sort((a, b) => {
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

  if (isLoading || !isContentReady) { 
    return (
     <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
      <p className='text-center font-imfell italic text-crimson text-xl'>Loading all venues. Please wait</p>
      <span className='text-center font-imfell italic text-crimson text-xl dot dot-1'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl dot dot-2'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl dot dot-3'>.</span>
    </div>
  );
  }
  if (isError) return (
    <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
      <p className='text-center font-imfell italic text-crimson text-xl'>No bookings found. Please refresh the page and try again</p>
      <span className='text-center font-imfell italic text-crimson text-xl dot dot-1'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl dot dot-2'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl dot dot-3'>.</span>
    </div>);

  return (
    <main className="container mx-auto w-full transition-all duration-300">
      <HeroCarousel bookings={venueImages} height='h-[400px]' content={false}/>
      <div className='max-w-[1500px] px-8'>
          <SearchBar data={venues} onResults={handleSearchResults} />
          <div className='px-6 py-4 mb-6 group transition-all duration-700'>
            <BookingsFilter venues={venues} onFilter={handleFilterResults} />
          </div>
            <BookingList bookings={sortedBookings} />
      </div>
    </main>
  );
};

export default Bookings;
