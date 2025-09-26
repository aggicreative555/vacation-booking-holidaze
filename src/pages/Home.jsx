import { useEffect, useState } from 'react';
import HeroCarousel from '../components/carousels/HeroCarousel';
import HomeBookingList from '../components/venues/HomeBookingList';
import { useVenueStore } from '../stores/useVenueStore';

const Home = () => {
  const { fetchVenuesByIds, userVenues } = useVenueStore();
  const [ venueImages, setVenueImages ] = useState([]);

  useEffect(() => {
    const venueIds = ['c5d0e6a6-0ce9-41ab-9988-52dd354e32b8', 'c9cb5637-826e-4781-8f60-cf5450f0c940','98321edd-5f04-45da-a642-eec21effbed1'];
    const fetchImages = async () => {
    const venues = await fetchVenuesByIds(venueIds);
    const images = venues.map((v) => v?.media?.[0] ?? null).filter(Boolean);
    setVenueImages(images);
  };

  fetchImages();
}, [fetchVenuesByIds]);

  return (
    <main className="bg-light">
      <h1 className="text-4xl md:text-6xl text-crimson font-garamond text-center w-full cursor-default uppercase mb-10 ">
        Home page
      </h1>
      <HeroCarousel bookings={venueImages} height='h-[800px]'/>
      <HomeBookingList bookings={userVenues}/>
    </main>
  );
};

export default Home;
