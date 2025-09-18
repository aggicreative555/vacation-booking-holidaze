import NavLinks from './NavLinks';

const Footer = () => {
  return (
    <footer className="bottom-0 flex flex-col mx-auto w-full justify-center items-center text-black border-t-[.5px] border-gray-200 bg-white p-10 mt-10">
      <div className=" text-white break-word w-screen h-fit py-10 px-4 bg-red-800 text-center flex flex-col justify-center items-center md:flex-row md:gap-3 hover:tracking-wider transition-all ease-in-out duration-300 cursor-default group mb-5">
        <img
          src="*"
          alt="Holidaze logo"
          className="w-[150px] h-auto object-cover transition-all duration-300 ease-in-out group-hover:translate-x-2 md:group-hover:-translate-x-2"
        />
        <div className="flex flex-col justify-center items-center">
          <span className="font-ballet text-6xl translate-y-2">Thank you</span>
          <span className="group-hover:italic font-button text-sm uppercase font-light">
            for booking your vacation with us
          </span>
        </div>
      </div>
      <nav>
        <ul className="flex flex-col gap-4 lg:flex-col lg:gap-6  mb-10 md:mb-20 items-center mt-5 md:mt-10 transition-all duration-300 ease-in-out">
          <NavLinks />
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
