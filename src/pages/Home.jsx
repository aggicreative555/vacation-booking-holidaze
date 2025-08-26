import LogoutButton from "../components/buttons/LogoutButton";

const Home = () => {
    return (
    <main className="container mx-auto px-8 flex flex-col items-center">
       <h1 className="uppercase font-garamond w-full text-center break-word max-w-[400px] md:max-w-[450px] mb-4 mt-8 text-red-800 text-3xl md:text-5xl">
          Home Page
        </h1>
      <LogoutButton/>
    </main>
  );

};

export default Home;
