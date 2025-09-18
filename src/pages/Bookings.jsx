import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import BookingList from '../components/venues/BookingList';
import BookingsFilter from '../components/filters/BookingsFilter';
import useBookingStore from '../stores/useBookingStore';

const Bookings = () => {
  const { bookings, fetchBookings, isLoading, isError } = useBookingStore();
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  const handleFilterResults = useCallback((results) => {
    setFilteredBookings(results);
  }, []);

  const handleSearchResults = useCallback((results) => {
    setFilteredBookings(results);
  }, []);

  const displayBookings =
    filteredBookings.length > 0 ? filteredBookings : bookings;

  if (isLoading) return <p>Loading bookings...</p>;
  if (isError) return <p>Error lodaing bookings. Please refresh the page.</p>;

  return (
    <main className="container mx-auto px-8 w-full">
      <div className="flex flex-row justify-center gap-10 w-full">
        <BookingsFilter bookings={bookings} onFilter={handleFilterResults} />
        <div>
          <SearchBar data={bookings} onResults={handleSearchResults} />
          <BookingList bookings={displayBookings} />
        </div>
      </div>
    </main>
  );
};

export default Bookings;
