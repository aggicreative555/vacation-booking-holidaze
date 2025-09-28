import NavLinks from './NavLinks';

const Footer = () => {
  return (
    <footer className="bottom-0 flex flex-col mx-auto w-full justify-center bg-sand-300 items-center text-dark p-10 mt-10">
      <div className=" text-white break-word w-screen h-fit py-10 px-4 text-center flex flex-col justify-center items-center md:flex-row md:gap-3 hover:tracking-wider transition-all ease-in-out duration-300 cursor-default group mb-5">
        <div className="p-1 relative transition-all duration-300 ease-in-out mb-2">
          <img
            src="/assets/logos/holidaze-logotype.svg"
            alt="Holidaze logo"
            className="h-[64px] w-auto object-cover transition-all duration-300 ease-in-out translate-y-3"
          />
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
