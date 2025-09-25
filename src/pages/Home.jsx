import HomeBookingList from '../components/venues/HomeBookingList';
import { useVenueStore } from '../stores/useVenueStore';

const Home = () => {
  const { userVenues } = useVenueStore();
  return (
    <main className="bg-light">
      <h1 className="text-4xl md:text-6xl text-crimson font-garamond text-center w-full cursor-default uppercase mb-10 ">
        Home page
      </h1>
      <HomeBookingList bookings={userVenues} />
    </main>
  );
};

export default Home;
