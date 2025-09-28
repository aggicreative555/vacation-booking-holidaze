import { useEffect, useState } from 'react';
import HeroCarousel from '../components/carousels/HeroCarousel';
import HomeBookingList from '../components/venues/HomeBookingList';
import { useVenueStore } from '../stores/useVenueStore';
import CardXl from '../components/cards/CardXl';

const charmingIds = 
['c5d0e6a6-0ce9-41ab-9988-52dd354e32b8', 
  'c9cb5637-826e-4781-8f60-cf5450f0c940',
  '98321edd-5f04-45da-a642-eec21effbed1',
  '1802cf66-181d-41ff-aaaa-ba80ba2dee95',
  '3f0f0154-632c-48dc-bb8c-771eff00e217',
  '5fc12992-c704-415b-b9b1-95a7bf8302bf'];

const autumnIds = 
['20e63b52-0bb1-49d0-9ac1-c09790e2369f', 
  '33fae325-983f-4f6b-a1ed-4e74e434e43d',
  '98321edd-5f04-45da-a642-eec21effbed1',
  '1802cf66-181d-41ff-aaaa-ba80ba2dee95',
  '3f0f0154-632c-48dc-bb8c-771eff00e217',
  '6bca2a74-21f9-4349-adc2-19890389903e'];

const venueId = '5fc12992-c704-415b-b9b1-95a7bf8302bf';

const Home = () => {
  const { fetchVenuesByIds } = useVenueStore();
  const [ venueImages, setVenueImages ] = useState([]);
  const [charmingVenues, setCharmingVenues] = useState([]);
  const [autumnVenues, setAutumnVenues] = useState([]);

  useEffect(() => {
    const loadVenues = async () => {
      const charming = await fetchVenuesByIds(charmingIds);
      setCharmingVenues(charming);

      const autumn = await fetchVenuesByIds(autumnIds);
      setAutumnVenues(autumn);
    };

    loadVenues();
  }, [fetchVenuesByIds]);

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
      <h1 className="text-4xl hidden md:text-6xl text-crimson font-garamond text-center w-full cursor-default uppercase ">
        Home page
      </h1>
      <HeroCarousel bookings={venueImages} height='h-[800px]'/>
      <div className='flex flex-col gap-20 px-6'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-garamond uppercase text-marine ppercase font-bold text-center pb-4'>Most charming</h2>
          <HomeBookingList bookings={charmingVenues} venueIds={charmingIds}/>
        </div>
        <CardXl venueId={venueId}/>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-garamond uppercase text-marine ppercase font-bold text-center pb-4'>Autumn season</h2>
          <HomeBookingList bookings={autumnVenues} venueIds={autumnIds}/>
        </div>
      </div>
    </main>
  );
};

export default Home;
