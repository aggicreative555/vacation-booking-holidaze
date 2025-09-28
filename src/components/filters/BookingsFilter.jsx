import { SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

const amenitiesOptions = [
  { key: 'wifi', label: 'Wifi' },
  { key: 'pets', label: 'Pets' },
  { key: 'parking', label: 'Parking' },
  { key: 'breakfast', label: 'Breakfast' },
];

const continentOptions = [
  { key: 'africa', label: 'Africa' },
  { key: 'america', label: 'America' },
  { key: 'asia', label: 'Asia' },
  { key: 'europe', label: 'Europe' },
  { key: 'oceania', label: 'Oceania' },
];

const guestOptions = [
  { key: 2, label: '2 max' },
  { key: 4, label: '4 max' },
  { key: 6, label: '6 max' },
  { key: 8, label: '8 max' },
  { key: 10, label: '10 or more' },
];

function BookingsFilter({ venues, onFilter }) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleAmenity = (key) => {
    setSelectedAmenities((prev) =>
      prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]
    );
  };

  const toggleContinent = (key) => {
    setSelectedContinents((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleGuestChange = (key) => {
    setSelectedGuests((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    let filtered = [...venues];

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((venue) =>
        selectedAmenities.every((amenity) => venue?.meta?.[amenity])
      );
    }

    if (selectedContinents.length > 0) {
      filtered = filtered.filter((venue) => {
        const continent = (venue?.location?.continent || '')
          .toLowerCase()
          .trim();
        return selectedContinents.some((c) => continent.includes(c));
      });
    }

    if (selectedGuests) {
      const guestLimit = Number(selectedGuests);

      filtered = filtered.filter((venue) => {
        const max = Number(venue?.maxGuests); // ensure numeric
        if (isNaN(max)) return false; // skip invalid maxGuests
        if (guestLimit === 10) return max >= 10; // 10 or more
        return max >= guestLimit; // allow venues that can accommodate at least the selected guests
      });
    }
    onFilter(filtered);
  }, [venues, selectedAmenities, selectedContinents, selectedGuests, onFilter]);

  return (
    <div className="relative z-0 bg-light transition-all duration-700 ease-in-out">
      <button
        aria-label="Toggle menu"
        className="cursor-pointer m-3 flex gap-[10px] flex-row w-fit text-2xl items-center my-4 mx-2 font-garamond uppercase text-brown-300 tracking-wider group-hover:text-dark group-hover:tracking-widest transition-all duration-300"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        Filters
        <SlidersHorizontal className="text-brown-400 group-hover:text-dark transition-all duration-300" />
      </button>
      <div
        className={`transform transition-all duration-700 ease-in-out origin-top ${
          menuOpen
            ? 'h-fit translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-30 opacity-0 max-h-0 pointer-events-none'
        }`}
      >
        <div className="w-full border-brown-100 border-[1px] flex md:flex-row flex-col gap-14 px-[46px] py-7 transition-all duration-300">
          {/* Amenities */}
          <div>
            <h3 className="font-garamond text-2xl uppercase mb-2  text-brown-300 tracking-wider">
              Amenities
            </h3>
            <div className="flex flex-wrap flex-col gap-2">
              {amenitiesOptions.map((amenity) => (
                <label
                  key={amenity.key}
                  className="flex items-center gap-2 font-medium font-garamond text-base text-brown-300 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.key)}
                    onChange={() => toggleAmenity(amenity.key)}
                  />
                  {amenity.label}
                </label>
              ))}
            </div>
          </div>
          {/* Location */}
          <div>
            <h3 className="font-garamond text-2xl uppercase mb-2  text-brown-300 tracking-wider">
              Location
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {continentOptions.map((c) => (
                <label
                  key={c.key}
                  className="flex items-center gap-2 font-medium font-garamond text-base text-brown-300 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    checked={selectedContinents.includes(c.key)}
                    onChange={() => toggleContinent(c.key)}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>
          {/* Max guests */}
          <div>
            <h3 className="font-garamond text-2xl uppercase mb-2  text-brown-300 tracking-wider">
              Guests
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {guestOptions.map((g) => (
                <label
                  key={g.key}
                  className="flex items-center gap-2 font-medium font-garamond text-base text-brown-300 uppercase tracking-wider"
                >
                  <input
                    type="checkbox"
                    checked={selectedGuests === g.key}
                    onChange={() => handleGuestChange(g.key)}
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingsFilter;
