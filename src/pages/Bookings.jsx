import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import BookingList from '../components/venues/BookingList';
import BookingsFilter from '../components/filters/BookingsFilter';
import { useVenueStore } from '../stores/useVenueStore';

const Bookings = () => {
  const {venues, fetchVenue, isLoading, isError } = useVenueStore();

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchBookings, setSearchedBookings] = useState([]);

  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  useEffect(() => {
   setFilteredBookings(venues);
  }, [venues]);

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

    return [...data].sort((a, b) => {
      const dateA = a.created ? new Date(a.created) : a.id;
      const dateB = b.created ? new Date(b.created) : b.id;
      return dateB - dateA;
    })
  }, [venues, searchBookings, filteredBookings]);

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error lodaing bookings. Please refresh the page.</p>;

  return (
    <main className="container mx-auto px-8 w-full">
      <div className="flex flex-row justify-center gap-10 w-full">
        <BookingsFilter venues={venues || []} onFilter={handleFilterResults} />
        <div>
    <main className="container mx-auto px-8 w-full transition-all duarion-300">
      <HeroCarousel bookings={venueImages} height='h-[500px]' content={false}/>
      <div className='max-w-[1500px]'>
          <SearchBar data={venues} onResults={handleSearchResults} />
          <BookingList bookings={displayBookings} />
        </div>
          <div className='px-6 py-4 mb-6 group'>
            <BookingsFilter venues={venues} onFilter={handleFilterResults} />
          </div>
          <BookingList bookings={sortedBookings} />
      </div>
    </main>
  );
};

export default Bookings;
