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
            const continent = (venue?.location?.continent || '').toLowerCase().trim();
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
  }, [
    venues,
    selectedAmenities,
    selectedContinents,
    selectedGuests,
    onFilter,
  ]);

  return (
    <div className="max-w-40 pt-60 flex flex-col gap-6 p-6 mr-8">
      {/* Amenities */}
      <div>
        <h3 className="font-garamond text-cl mb-2 uppercase text-gray-600 tracking-wider">
          Amenities
        </h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {amenitiesOptions.map((amenity) => (
            <label key={amenity.key} className="flex items-center gap-2">
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
        <h3 className="font-garamond text-cl mb-2 uppercase text-gray-600 tracking-wider">
          Location
        </h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {continentOptions.map((c) => (
            <label key={c.key} className="flex items-center gap-2">
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
        <h3 className="font-garamond text-cl mb-2 uppercase text-gray-600 tracking-wider">
          Guests
        </h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {guestOptions.map((g) => (
            <label key={g.key} className="flex items-center gap-2">
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
  );
}

export default BookingsFilter;
