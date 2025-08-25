import { Outlet } from 'react-router-dom';
import Header from '../components/nav/header';
import Footer from '../components/nav/footer';

export function Layout() {
  return (
    <div className="flex justify-center flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;