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
  const { fetchBookingsByUser } = useBookingStore();
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
        <div className="flex flex-col gap-4 itemscenter justify-center">
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
            className="transition-transform duration-300 ease-in-out object-cover aspect-auto group-hover:scale-110 w-full"
          />
        </div>
        <div className="absolute top-2/3 left-3/12 w-54 border-black border-8 group overflow-hidden h-72 justify-center items-center rounded-full">
          <img
            src={user?.avatar?.url}
            alt={user?.avatar?.alt}
            className="transition-transform duration-300 ease-in-out object-cover aspect-auto group-hover:scale-110 w-full h-full"
          />
        </div>
        <button
          className="absolute flex items-center bg-red-800 text-white right-1/3 -bottom-1/6 justify-center h-20 w-20 border-white border-8 shadow-lg rounded-full"
          onClick={() => setIsProfileModalOpen(true)}
        >
          <Pencil size={24} />
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
      <div className="container flex mx-auto flex-col items-center">
        <h1 className="uppercase font-garamond w-full text-center max-w-[400px] md:max-w-[500px] mb-4 mt-8 text-red-800 text-3xl md:text-5xl">
          Hi I'm {user?.name}
        </h1>
        <p className="text-center text-xs font-caslon text-black line-clamp-2 mt-4">
          {user?.bio || 'Write a few words about yourself...'}
        </p>

        <div className="mt-20 flex flex-col gap-6 items-center font-caslon border-[1px] w-full m-4 py-8 border-gray-200 p-2">
          {user?.venueManager ? (
            <>
              <ProfileVenues />
              <button
                className="btn-l btn-primary"
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
            <>
              <ProfileBookings />
              <Link to="/bookings" className="btn-l btn-primary">
                Explore venues
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
