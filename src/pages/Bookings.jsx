import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import BookingList from '../components/venues/BookingList';
import BookingsFilter from '../components/filters/BookingsFilter';
import { useVenueStore } from '../stores/useVenueStore';

const Bookings = () => {
  const { venues, fetchVenue, isLoading, isError } = useVenueStore();
  const [filteredBookings, setFilteredBookings] = useState([]);

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

  const displayBookings =
    filteredBookings.length > 0 ? filteredBookings : venues;

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error lodaing bookings. Please refresh the page.</p>;

  return (
    <main className="container mx-auto px-8 w-full">
      <div className="flex flex-row justify-center gap-10 w-full">
        <BookingsFilter venues={venues || []} onFilter={handleFilterResults} />
        <div>
          <SearchBar data={venues} onResults={handleSearchResults} />
          <BookingList bookings={displayBookings} />
        </div>
      </div>
    </main>
  );
};

export default Bookings;
