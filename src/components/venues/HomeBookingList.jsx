import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

function HomeBookingList({ bookings = [] }) {

  if (!bookings.length) return (
    <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
      <p className='text-center font-imfell italic text-crimson text-xl'>No bookings found. Please refresh the page and try again</p>
      <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100 .dot-1'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100 dot-2'>.</span>
      <span className='text-center font-imfell italic text-crimson text-xl animate-bounce duration-100 dot-3'>.</span>
    </div>
    
  );
  const visibleBookings = bookings.slice(0, 6);

  return (
    <>
      <div className="flex flex-col md:flex-row md:overflow-x-auto
          scrollbar-hide gap-8 md:gap-6 items-center justify-center
          scrollbar-hide transition-all ease-in-out duration-300 my-80">
        {visibleBookings.map((booking) => {

          return (
            <div
              className="flex flex-col md:flex-row bg-sand-100 text-brown-300 p-2 w-fit md:min-w-[658px] max-w-[800px] md:h-fit transition-all ease-in-out duration-300 group"
              key={booking.id}
            >
              <Link to={`/booking/${booking?.id}`} className="cursor-pointer flex flex-col md:flex-row gap-4 sm:w-[350px] md:w-[638px] items-center justify-center">
                <div className="flex justify-center items-center border-3 border-brown-300 w-[350px] p-2 md:w-[334px] md:h-fit overflow-hidden">
                  <img
                    className="object-cover h-[200px] w-full border-2 border-marine"
                    src={booking?.media?.[0]?.url}
                    alt={booking?.media?.[0]?.alt || 'Venue image'}
                  />
                </div>
                <div className="sm:min-w-[302px] w-full flex flex-col justify-center items-center flex-1 border-1 border-brown-400 md:h-fit md:px-4 px-6 py-4 md:py-4">
                  <p className="text-xl italic text-center font-imfell">
                    Stay at
                  </p>
                  <h2 className="text-2xl md:text-4xl text-center font-chonburi uppercase text-marine line-clamp-2 mb-2">
                    {booking?.name}
                  </h2>
                  <p className='flex flex-row text-xs uppercase font-garamond'>
                    <MapPin size={16}/>
                    {booking?.location?.country}
                  </p>
                  <div className='flex flex-row justify-center items-center p-2 mt-2 border-brown-200 border-1'>
                    <p className="text-xl font-chonburi">
                      {booking?.price} NOK
                    </p>
                    <span className="text-xs uppercase font-garamond">
                      / night
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomeBookingList;
