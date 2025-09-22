import { MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVenueStore } from '../../stores/useVenueStore';
import Modal from '../modal/Modal';
import { useState } from 'react';
import EditVenueForm from '../forms/EditVenueForm';
import BookingGuestList from './BookingGuestList';

function ProfileVenues() {
  const { userVenues, removeFromVenues } = useVenueStore();
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [ editingVenue, setEditingVenue ] = useState(null);

  if (!userVenues || userVenues.length === 0) {
    return (
      <>
        <p className="text-gray-400 uppercase font-button text-2xl pb-2 mb-5 mt-5 transition-all duration-300 ease-in-out">
          {' '}
          You have not created any venues yet{' '}
        </p>
      </>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
        {userVenues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col text-lg items-center gap-2 lg:w-full border-[1px] pb-10 border-gray-200 cursor-default container mx-auto"
          >
            <div className="w-full">
              <Link to={`/booking/${venue.id}`} className="cursor-pointer w-80">
                <div className="h-64 overflow-clip w-full">
                  <img
                    className="h-64 w-full object-cover"
                    src={venue?.media?.[0]?.url}
                    alt={venue?.media?.[0]?.alt || 'Venue image'}
                  />
                </div>
                <div className="flex flex-col items-center gap-2 p-4">
                  <h2 className="text-3xl text-center font-garamond uppercase text-red-800 mb-2 line-clamp-1 h-fit w-full">
                    {venue?.name}
                  </h2>
                  <p className="text-center text-sm font-caslon text-black line-clamp-2 mt-4 flex justify-center items-center gap-1">
                    <MapPin size={16} />
                    {venue?.location?.city}, {venue?.location?.country}
                  </p>
                </div>
              </Link>
              <div className="flex flex-row mt-2 gap-4 items-center justify-center">
                <button
                  className="btn-l btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingVenue(venue);
                  }}
                >
                  Edit Venue
                </button>
                <button
                  className="btn-l btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVenueId(venue.id);
                  }}
                >
                  View Bookings
                </button>
                <button
                  className="btn-l btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromVenues(venue.id);
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
        {editingVenue && (
        <Modal
          key={editingVenue.id}
          isOpen={!!editingVenue}
          onClose={() => setEditingVenue(null)}
        >
          <EditVenueForm
            venue={editingVenue}
            onClose={() => setEditingVenue(null)}
          />
        </Modal>
      )}
      {selectedVenueId && (
        <Modal
          key={selectedVenueId}
          isOpen={!!selectedVenueId}
          onClose={() => setSelectedVenueId(null)}
        >
        <div className="flex flex-row gap-2 p-8 mb-4 justify-center items-center">
          <p className="text-xl font-garamond text-gray-500 uppercase ">
            Booking for:{' '}
          </p>
          <p className="text-3xl font-garamond text-red-800 uppercase ">
            {userVenues.find((v) => v.id === selectedVenueId)?.name}
          </p>
        </div>
          <BookingGuestList venueId={selectedVenueId} />
        </Modal>
      )}
      </div>
    </div>
  );
}

export default ProfileVenues;
