import VenueList from "../components/venues/VenueList";

const Home = () => {
    return (
      <main className="container mx-auto px-8">
          <h1 className="text-4xl md:text-6xl text-red-800 font-garamond text-center w-full cursor-default uppercase mb-10 ">
            Home page
          </h1>
          <VenueList/>
      </main>
  );

};

export default Home;
