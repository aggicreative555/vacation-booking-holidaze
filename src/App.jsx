import { Routes, Route } from 'react-router';
import Layout from './layout/Layout';
import { BookingId, Bookings, Contact, Home, Login, MyBooking, NotFound, Profile, Register } from './pages';
// import { Slide, ToastContainer } from 'react-toastify';
// import ScrollToTop from './hooks/useScrollToTop';

function App() {
  return (
    <>
      {/* <ScrollToTop />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="auto"
        closeButton={true}
        transition={Slide}
        className="transition-all duration-150 ease-in-out"
      /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="booking/:id" element={<BookingId />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-booking" element={<MyBooking />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
