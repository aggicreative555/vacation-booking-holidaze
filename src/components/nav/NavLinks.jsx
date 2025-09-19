import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import useBookingStore from '../../stores/useBookingStore';
import { CircleUserRound } from 'lucide-react';
import { useEffect, useState } from 'react';

function NavLinks() {
  const { user } = useAuthStore();
  const fetchBookingsByUser = useBookingStore((state) => state.fetchBookingsByUser);
  const bookings = useBookingStore((state) => state.userBookings);
  const itemCount = bookings.length;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (user?.name) {
      fetchBookingsByUser(user.name);
    }
  }, [user, fetchBookingsByUser]);

  // animation when cart amount increases
  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [itemCount]);

  const visitorLinks = [
    { to: '/', label: 'Home' },
    { to: '/bookings', label: 'Explore' },
    { to: '/contact', label: 'Contact' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];

  const userLinks = [
    { to: '/', label: 'Home', isCart: false },
    { to: '/bookings', label: 'Explore', isCart: false },
    { to: '/contact', label: 'Contact', isCart: false },
    {
      to: '/profile',
      icon: <CircleUserRound />,
      isCart: true,
    },
  ];

  const links = user ? userLinks : visitorLinks;

  return (
    <>
      {links.map(({ to, label, icon, isCart }) => (
        <li key={to} className="relative bg-white ">
          <NavLink
            to={to}
            className={({ isActive }) =>
              `block my-1 font-garamond text-lg uppercase text-black transition-all duration-50 ease-in-out ${
                isActive
                  ? 'text-red-900 font-bold border-b-[1px] border-red-900 hover:text-black hover:border-black hover:tracking-wider'
                  : 'text-black hover:border-b-[1px] border-black hover:tracking-wide'
              }`
            }
          >
            {icon}
            {label}
            {isCart && (
              <span
                aria-label="Cart booking count"
                className={`
                  absolute -top-2 -right-3 bg-red-900 text-white font-button text-xs w-5 h-5 flex items-center justify-center rounded-full
                  transition-all duration-300
                  ${itemCount > 0 ? 'block' : 'hidden'}
                  ${animate ? 'animate-bounce' : ''}
                `}
              >
                {itemCount}
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </>
  );
}

export default NavLinks;
