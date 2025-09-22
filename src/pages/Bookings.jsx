import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/search/SearchBar';
import BookingList from '../components/venues/BookingList';
import BookingsFilter from '../components/filters/BookingsFilter';
import { useVenueStore } from '../stores/useVenueStore';
import { preview } from 'vite';

const Bookings = () => {
  const {venues, fetchVenue, isLoading, isError } = useVenueStore();

  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchBookings, setSearchedBookings] = useState([]);

  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  useEffect(() => {
    setFilteredBookings((prev => {
      const venueIds = new Set(preview.map(v => v.id));
      const merged = [...prev];
      venues.forEach(v => {
        if (!venueIds.has(v.id)) merged.push(v);
      })
      return merged;
    }));
  }, [venues]);

  const handleFilterResults = useCallback((results) => {
    setFilteredBookings(results);
  }, []);

  const handleSearchResults = useCallback((results) => {
    setSearchedBookings(results);
  }, []);

  const displayBookings = useMemo(() => {
    let data = searchBookings.length > 0 ? searchBookings : filteredBookings.length > 0 ? filteredBookings : venues;

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
          <SearchBar data={venues} onResults={handleSearchResults} />
          <BookingList bookings={displayBookings} />
        </div>
      </div>
    </main>
  );
};

export default Bookings;
