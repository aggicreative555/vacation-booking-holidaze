import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";


function NavLinks() {
    const { user } = useAuthStore();

    const visitorLinks = [
        { to: '/', label: 'Home'},
        { to: '/bookings', label: 'Explore'},
        { to: '/contact', label: 'Contact'},
        { to: '/login', label: 'Login'},
        { to: '/register', label: 'Register'},
    ];

    const userLinks = [
        { to: '/', label: 'Home'},
        { to: '/bookings', label: 'Explore'},
        { to: '/contact', label: 'Contact'},
        { to: '/profile', label: 'Profile'},
        { to: '/my-bookings', label: 'My Bookings'},
    ];

    const links = user ? userLinks : visitorLinks;


  return (
     <>
      {links.map(({ to, label, icon }) => (
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
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default NavLinks