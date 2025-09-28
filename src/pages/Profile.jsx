import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { useVenueStore } from '../stores/useVenueStore';
import { Link } from 'react-router-dom';
import ProfileVenues from '../components/venues/ProfileVenues';
import ProfileBookings from '../components/venues/ProfileBookings';
import { Pencil } from 'lucide-react';
import useBookingStore from '../stores/useBookingStore';
import CreateVenueForm from '../components/forms/CreateVenueForm';
import Modal from '../components/modal/Modal';
import EditProfileForm from '../components/forms/EditProfileForm';

function Profile() {
  const { user } = useAuthStore();
  const { fetchVenueByUser } = useVenueStore();
  const { fetchBookingsByUser, clearBookings } = useBookingStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (user?.venueManager) {
      fetchVenueByUser(user?.name);
    }
  }, [user, fetchVenueByUser]);

  useEffect(() => {
    if (user) {
      fetchBookingsByUser(user?.name);
    }
  }, [user, fetchBookingsByUser]);


  if (!user) {
    return (
      <main>
        <div className="flex flex-col gap-4 items-center justify-center">
          <h1 className="uppercase font-garamond w-full text-center max-w-[400px] md:max-w-[500px] mb-4 mt-8 text-red-800 text-3xl md:text-5xl">
            You must be logged in to view this page
          </h1>
          <Link to="/login" className="btn-l btn-primary">
            Log In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="">
      <div className="relative w-full">
        <div className="w-full h-auto group overflow-hidden max-h-80 flex md:max-h-96 justify-center items-center ">
          <img
            src={user?.banner?.url}
            alt={user?.banner?.alt}
            className="transition-transform duration-300 ease-in-out object-cover aspect-auto w-full"
          />
        </div>
        <div className="absolute lg:top-2/3 lg:left-3/12 top-3/4 left-1/2 -translate-y-1/2 -translate-x-1/2 md:w-54 w-[174px]  border-black md:border-[24px] border-[12px] group overflow-hidden md:h-72 h-[218px] justify-center items-center rounded-full">
          <img
            src={user?.avatar?.url}
            alt={user?.avatar?.alt}
            className="object-cover aspect-auto w-full h-full"
          />
        </div>
        <button
          className="absolute btn-l aspect-square flex items-center md:right-1/3 md:-bottom-1/5 right-1/10 justify-center p-3 rounded-full"
          onClick={() => setIsProfileModalOpen(true)}
          title='Edit profile'
        >
          <Pencil size={16} />
        </button>
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        >
          <EditProfileForm
            user={user}
            onClose={() => setIsProfileModalOpen(false)}
          />
        </Modal>
      </div>
      <div className="flex mx-auto flex-col items-center md:mt-14 mt-20 lg:w-[1500px] px-6 md:px-6 lg:px-0">
        <div className='flex flex-col gap-2 items-center'>
          <span className='text-xl text-brown-300 uppercase font-garamond'>Hi I'm</span>
          <p className="uppercase font-chonburi text-3xl w-full text-crimson text-center max-w-[400px] md:max-w-[500px]">
          {user?.name}
          </p>
          <p className="text-center text-xl font-garamond italic text-dark">
            {user?.bio || 'Write a few words about yourself...'}
          </p>

        </div>
        <div className='flex md:flex-row flex-col-reverse justify-center items-center w-full md:justify-between md:items-end mt-4'>
          <h2 className='text-2xl uppercase text-brown-300 w-full'>My Bookings</h2>
          {user?.venueManager ? (
            <>
              <button
                  className="btn-l btn-primary md:w-[500px] mb-10 md:mb-0"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create a new venue
                </button>
                <Modal
                  isOpen={isCreateModalOpen}
                  onClose={() => setIsCreateModalOpen(false)}
                >
                  <CreateVenueForm onClose={() => setIsCreateModalOpen(false)} />
                </Modal>
            </>
          ) : (
            <button className="btn-l btn-secondary w-full max-w-[400px] mb-10 md:mb-0" onClick={() => clearBookings()}>
              Clear all bookings
            </button>

          )} 
        </div>
        <div className="flex flex-col md:gap-6 items-center border-[1px] w-full md:px-12 py-7 border-brown-100 my-4 mx-4">
          {user?.venueManager ? (
            <>
              <ProfileVenues />
            </>
          ) : (
            <>
              <ProfileBookings />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
