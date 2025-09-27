import { MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useBookingStore from '../../stores/useBookingStore';

function ProfileBookings() {
  const { userBookings, removeFromBookings } = useBookingStore();

  if (!userBookings || userBookings.length === 0) {
    return (
    <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
      <p className='text-center font-imfell italic text-crimson text-xl'>You have not booked any venues yet</p>
      <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100'>.</span>
    </div>
    );
  }

  return (
    <div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
        {userBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col bg-sand-100 text-brown-300 p-2 w-fit max-w-[800px] h-[500px] transition-all ease-in-out duration-300 group"
          >
            <Link
              to={`/booking/${booking?.venue?.id}`}
              className="cursor-pointer flex flex-col items-start w-[350px] justify-start h-full">
              <div className="flex justify-center items-center border-3 border-brown-300 w-[350px] h-[216px] p-2 overflow-hidden">
                <img
                  className="object-cover h-full w-full border-2 border-marine"
                  src={booking?.venue?.media?.[0]?.url}
                  alt={booking.venue?.media?.[0]?.alt || 'Venue image'}
                />
              </div>
              <div className="pt-4 flex justify-start items-start flex-col relative w-full flex-1">
                <div className="sm:min-w-[302px] w-full flex flex-col justify-center items-center flex-1 border-1 border-brown-400 px-6">
                  <h2 className="text-2xl text-center font-chonburi uppercase text-marine line-clamp-2 mb-2">
                    {booking?.venue?.name}
                  </h2>
                  <p className='flex flex-row text-xs uppercase font-garamond'>
                    <MapPin size={16}/>
                    {booking?.venue?.location?.country}
                  </p>
                  < div className='flex flex-col justify-center items-center p-2 mt-2 border-brown-200 border-1 w-full md:mb-4'>
                    <div className='flex flex-row justify-center items-center w-fit'>
                      <p className="text-2xl font-chonburi w-fit">
                        {booking?.venue?.price} NOK
                      </p>
                      <span className="text-xs uppercase font-garamond">
                        / night
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-row gap-6'>
                    <Link to={`/booking/${booking?.venue?.id}`}
                    className='btn-s btn-primary'>
                      View Booking
                    </Link>
                    <button
                      className="btn-l p-2 h-fit rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFromBookings(booking.id, booking.name);
                      }}>
                      <Trash2/>
                    </button>

                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileBookings;
