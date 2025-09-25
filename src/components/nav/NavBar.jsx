import NavLinks from './NavLinks';
import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import LogoutButton from '../buttons/LogoutButton';

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthStore();
  return (
    <>
      <nav className="container mx-auto flex justify-between items-center px-6 md:px-12 transition-all duration-150 py-4">
        <div
          className="p-1 relative transition-all duration-300 ease-in-out mb-2"
        >
          <img
            src="/assets/logos/holidaze-logotype.svg"
            alt="Holidaze logo"
            className="h-[64px] w-auto object-cover transition-all duration-300 ease-in-out translate-y-3"
          />
        </div>
        <button
          aria-label="Toggle menu"
          className="m-3 flex gap-[6px] flex-col items-end min-md:hidden w-fit"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-[2px] w-8 bg-black transition-transform duration-150 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          ></span>
          <span
            className={`h-[2px] w-6 bg-black transition-transform duration-150 ${menuOpen ? 'opacity-0 translate-y-1' : ''}`}
          ></span>
          <span
            className={`h-[2px] w-8 bg-black transition-transform duration-150 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          ></span>
        </button>
        {/* Desktop */}
        <ul className="hidden md:flex justify-center items-center gap-6">
          <NavLinks />
          {user && <LogoutButton />}
        </ul>
      </nav>
      {/* Mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-150 ease-in-out bg-light ${
          menuOpen
            ? 'max-h-96 opacity-100 pointer-events-auto bg-light'
            : 'max-h-0 opacity-0 pointer-events-none bg-light'
        }`}
      >
        <ul className="flex flex-col bg-light justify-center items-center gap-4 px-4 py-10">
          <NavLinks />
          {user && <LogoutButton />}
        </ul>
      </div>
    </>
  );
}

export default NavBar;
