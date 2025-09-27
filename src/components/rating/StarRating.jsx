import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useVenueStore } from '../../stores/useVenueStore';
import Stars from './Stars';

function StarRating({ venue: propVenue }) {
  const { id } = useParams();
  const { venue: storeVenue, fetchVenue, isLoading } = useVenueStore();

  useEffect(() => {
    if (!propVenue && (!storeVenue || storeVenue.length === 0)) {
      fetchVenue();
    }
  }, [propVenue, storeVenue, fetchVenue]);

  const venueToUse =
    propVenue || storeVenue?.find((v) => String(v.id) === String(id));

  if (isLoading && !venueToUse) {
    return <p className="text-base font-garamond italic text-crimson">Loading rating...</p>;
  }

  if (!venueToUse) {
    return (
      <div>
        <Stars rating={0}/>
      </div>)
  }

  const currentRate = venueToUse.rating ?? 0;

  return (
    <div value={currentRate} className="flex flex-row gap-4 items-start">
      <div className="flex flex-col gap-3 items-center justify-center">
        <Stars rating={currentRate} />
      </div>
    </div>
  );
}

export default StarRating;
