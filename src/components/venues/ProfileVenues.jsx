import { MapPin, Pencil, Trash2 } from 'lucide-react';
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
        <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
        <p className='text-center font-imfell italic text-crimson text-xl'>You have not created any venues yet</p>
        <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100'>.</span>
        <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100'>.</span>
        <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100'>.</span>
      </div>
      </>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
        {userVenues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col bg-sand-100 text-brown-300 p-2 w-fit max-w-[800px] h-[500px] transition-all ease-in-out duration-300 group"
          >
              <Link
                to={`/booking/${venue?.id}`}
                className="cursor-pointer flex flex-col items-start w-[350px] justify-start h-full relative">
                <div className="flex justify-center items-center border-3 border-brown-300 w-[350px] h-[216px] p-2 overflow-hidden">
                  <img
                    className="object-cover h-full w-full border-2 border-marine"
                    src={venue?.media?.[0]?.url}
                    alt={venue?.media?.[0]?.alt || 'Venue image'}
                  />
                </div>
                <button
                  className="absolute btn-l aspect-square flex items-center right-0 top-0 justify-center p-3 rounded-full bg-light"
                  onClick={(e) => {
                    title='Edit venue'
                    e.preventDefault();
                    e.stopPropagation();
                    setEditingVenue(venue);
                  }}>
                  <Pencil size={16} />
                </button>
                <div className="pt-4 flex justify-start items-start flex-col relative w-full flex-1">
                  <div className="sm:min-w-[302px] w-full flex flex-col justify-center items-center flex-1 border-1 border-brown-400 px-6">
                    <h2 className="text-2xl text-center font-chonburi uppercase text-marine line-clamp-2 mb-2">
                      {venue?.name}
                    </h2>
                    <p className='flex flex-row text-xs uppercase font-garamond'>
                      <MapPin size={16}/>
                      {venue?.location?.country}
                    </p>
                    < div className='flex flex-col justify-center items-center p-2 mt-2 border-brown-200 border-1 w-full md:mb-4'>
                      <div className='flex flex-row justify-center items-center w-fit'>
                        <p className="text-2xl font-chonburi w-fit">
                          {venue?.price} NOK
                        </p>
                        <span className="text-xs uppercase font-garamond">
                          / night
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-row gap-6'>
                      <button
                      className='btn-s btn-primary'
                       onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedVenueId(venue.id);
                      }}>
                        View Bookings
                      </button>
                      <button
                        className="btn-l p-2 h-fit rounded-full"
                        title='Remove venue'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromVenues(venue.id);
                        }}>
                        <Trash2/>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
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
          <div className='flex flex-col justify-center items-center my-8 mx-4'>
            <div className='flex flex-row gap-2 justify-center items-center mb-8'>
              <p className='text-base text-brown-300 font-garamond tracking-wide uppercase '>Bookings for: {''}</p>
              <h1 className="text-4xl uppercase font-chonburi
                w-full text-center break-word max-w-[400px] md:max-w-[450px] text-crimson">
                {userVenues.find((v) => v.id === selectedVenueId)?.name}
              </h1>
            </div>
          </div>
          
          <BookingGuestList venueId={selectedVenueId} />
        </Modal>
      )}
      </div>
    </div>
  );
}

export default ProfileVenues;
