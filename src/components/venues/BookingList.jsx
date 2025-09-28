import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination';
import { MapPin } from 'lucide-react';

function BookingList({ bookings = [], itemsPerPage = 6 }) {
  const [searchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = bookings.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (!bookings.length)
    return (
      <div className="max-w-[500] flex items-center justify-center gap-2 my-80">
        <p className="text-center font-imfell italic text-crimson text-xl">
          No bookings found. Please refresh the page and try again
        </p>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-1">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-2">
          .
        </span>
        <span className="text-center font-imfell italic text-crimson text-xl dot dot-3">
          .
        </span>
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300 bg-light">
        {currentProducts.map((booking) => {
          return (
            <div
              className="flex flex-col bg-sand-100 text-brown-300 p-2 w-fit max-w-[800px] h-[500px] md:h-[776px] transition-all ease-in-out duration-300 group"
              key={booking.id}
            >
              <Link
                to={`/booking/${booking?.id}`}
                className="cursor-pointer flex flex-col items-start w-[350px] justify-start h-full"
              >
                <div className="flex justify-center items-center border-3 border-brown-300 w-[350px] h-[216px] md:h-[440px] p-2 overflow-hidden ">
                  <img
                    className="object-cover h-full w-full border-2 border-marine group-hover:scale-110 transition-all duration-300"
                    src={booking?.media?.[0]?.url}
                    alt={booking?.media?.[0]?.alt || 'Venue image'}
                  />
                </div>
                <div className="pt-4 flex justify-start items-start flex-col relative w-full flex-1">
                  <div className="sm:min-w-[302px] w-full flex flex-col justify-center items-center flex-1 border-1 border-brown-400 px-6 group-hover:border-2 transition-all duration-300 group-hover:tracking-wider">
                    <p className="text-xl italic text-center font-imfell">
                      Stay at
                    </p>
                    <h2 className="text-2xl text-center font-chonburi uppercase text-marine line-clamp-2 mb-2">
                      {booking?.name}
                    </h2>
                    <p className="flex flex-row text-xs uppercase font-garamond">
                      <MapPin size={16} />
                      {booking?.location?.country}
                    </p>
                    <div className="flex flex-col justify-center items-center p-2 mt-2 border-brown-200 border-1 w-full md:mb-4">
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col justify-between">
                          <p className=" text-base text-brown font-garamond max-w-[200px] line-clamp-2 h-[100px] overflow-hidden hidden md:block ">
                            {booking?.description}
                          </p>
                          <div className="flex flex-row justify-center items-center w-fit">
                            <p className="text-2xl font-chonburi w-fit">
                              {booking?.price} NOK
                            </p>
                            <span className="text-xs uppercase font-garamond">
                              / night
                            </span>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="gap-1 text-xs mt-2 flex flex-col px-4 ">
                            {Object.entries(booking.meta)
                              .filter(([__dirname, value]) => value)
                              .map(([key]) => (
                                <span
                                  key={key}
                                  className="text-right text-base font-garamond uppercase text-brown-400 border-b-[1px] border-brown-300 w-full"
                                >
                                  {key}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center mt-6 mb-12 md:mt-10 md:mb-18">
        <Pagination totalItems={bookings.length} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
}

export default BookingList;
