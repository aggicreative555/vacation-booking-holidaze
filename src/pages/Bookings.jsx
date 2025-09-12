import { useCallback, useState } from "react";
import { useVenueStore } from "../stores/useVenueStore";
import VenueList from "../components/venues/VenueList";
import SearchBar from "../components/search/SearchBar";

const Bookings = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const venues = useVenueStore((state) => state.venues);
    const handleResults = useCallback((results) => {
      setFilteredProducts(results);
      }, []);

    return (
      <main className="container mx-auto px-8">
          <h1 className="text-4xl md:text-6xl text-red-800 font-garamond text-center w-full cursor-default uppercase mb-10 ">
            All Bookings
          </h1>
          <SearchBar onResults={handleResults}/>
          <VenueList venues={filteredProducts.length ? filteredProducts : venues}/>
      </main>
  );

};

export default Bookings;
