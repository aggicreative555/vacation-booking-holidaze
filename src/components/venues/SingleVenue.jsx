import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StarRating from '../rating/StarRating';
import { useVenueStore } from '../../stores/useVenueStore';
import { NotFound } from '../../pages';
import { formatDate } from '../../utils/dataFormatter';
import useBookingStore from '../../stores/useBookingStore';
import { useAuthStore } from '../../stores/useAuthStore';
import Modal from '../modal/Modal';
import EditVenueForm from '../forms/EditVenueForm';
import { showToast } from '../../utils/toast';
import { ArrowLeft, Check, Minus, Plus, Trash2 } from 'lucide-react';
import CalendarPicker from '../calendar/CalendarPicker';
import ConfirmBooking from '../modal/ConfirmBooking';

function SingleVenue() {
  const { id } = useParams();
  const { singleVenue, isLoading, isError, fetchVenueById } = useVenueStore();
  const { addToBookings, userBookings, removeFromBookings, fetchBookingsByUser } = useBookingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [guests, setGuests] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    const hasOverlap = singleVenue?.bookings?.some((b) =>
        selectedRange?.from <= new Date(b.dateTo) &&
        selectedRange?.to >= new Date(b.dateFrom)
    );

    const exceedsGuests = guests > singleVenue?.maxGuests;

    const canBook = selectedRange?.from && selectedRange?.to && !hasOverlap && !exceedsGuests;

    const [bookingisLoaded, setBookingsLoaded] = useState(false);

    useEffect(() => {
      if (user) {
        fetchBookingsByUser(user.name).then(() => setBookingsLoaded(true));
      }
    }, [user, fetchBookingsByUser]);

    const alreadyBooked = userBookings?.some(
      (booking) => booking.venue.id === singleVenue.id
    );


    const handleAddBooking = () => {
    if (!selectedRange?.from || !selectedRange.to) {
        return showToast.error('Please select a date for your vacation');
    }

    addToBookings(
        singleVenue,
        {
        dateFrom: selectedRange.from,
        dateTo: selectedRange.to,
        guests: guests,
        },
        user?.name
    );
    };

    const handleCancelBooking = () => {
    if (!hasOverlap) return;
    removeFromBookings(userBookings.id);
    };


    useEffect(() => {
    if (selectedRange?.from && selectedRange?.to) {
        const nights =
        (selectedRange?.to - selectedRange?.from) / (1000 * 60 * 60 * 24);
        setCalculatedPrice(singleVenue?.price * nights);
    }
    }, [selectedRange, singleVenue?.price]);

    const incrementGuests = () => {
    if (guests < singleVenue.maxGuests) {
        setGuests((prev) => prev + 1);
    }
    };

    const decrementGuests = () => {
    if (guests > 1) {
        setGuests((prev) => prev - 1);
    }
    };

    useEffect(() => {
    if (!singleVenue || singleVenue.id !== id) {
        fetchVenueById(id);
    }
    }, [id, singleVenue, fetchVenueById]);

    useEffect(() => {
    if (user) {
        fetchBookingsByUser(user.name);
    }
    }, [user, fetchBookingsByUser]);

    if (isLoading) { 
      return (
      <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
        <p className='text-center font-imfell italic text-crimson text-xl'>Loading all venues. Please wait</p>
        <span className='text-center font-imfell italic text-crimson text-xl dot dot-1'>.</span>
        <span className='text-center font-imfell italic text-crimson text-xl dot dot-2'>.</span>
        <span className='text-center font-imfell italic text-crimson text-xl dot dot-3'>.</span>
      </div>
      );
    }

    if (isError) return (
      <div className='max-w-[500] flex items-center justify-center gap-2 my-80'>
        <p className='text-center font-imfell italic text-crimson text-xl'>No bookings found. Please refresh the page and try again</p>
        <span className='text-center font-imfell italic text-crimson text-xl dot dot-1'>.</span>
        <span className='text-center font-imfell italic text-crimson text-xl dot dot-2'>.</span>
        <span className='text-center font-imfell italic text-crimson text-xl dot dot-3'>.</span>
      </div>
    );

    if (!singleVenue) return <NotFound />;

  return (
    <>
      <div className="flex items-start flex-col max-w-[1550px] transition-all duration-500 ease-in-out bg-sand-100 h-fit">
            <div className="relative w-full h-fit md:border-[40px] border-[20px] border-sand-100 flex flex-col">
              <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -top-[3%] z-10 "/>
              <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -top-[3%] z-10 "/>
              <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -bottom-[3%] z-10 "/>
              <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -bottom-[3%] z-10 "/>
              <div className='w-full md:max-h-[800px] max-h-[600px] overflow-hidden flex justify-center items-end'>
                <img
                  src={singleVenue.media?.[0]?.url}
                  alt={singleVenue.media?.[0]?.alt}
                  className="object-cover aspect-auto h-full w-full"
                />
              </div>
            </div>
        <div className="flex flex-col md:flex-row gap-10 container mx-auto px-8 lg:px-8 py-4 justify-center items-center relative">
          <div className="flex flex-col gap-1 h-ful items-center justify-center lg:justify-between lg:gap-4">
            <p className="text-xl italic text-center font-imfell">
                    Stay at
            </p>
            <div className='flex flex-col gap-2 mb-4 jusitfy-center items-center'>
              <div className='flex flex-row flex-wrap '>
                <button
                      className="p-2"
                      onClick={() => {
                        navigate(-1);
                      }}
                  >
                    <ArrowLeft className=' cursor-pointer text-brown-300 hover:-translate-x-2 transition-all duration-300'/>
                </button>
                <h1 className="text-6xl text-center font-chonburi uppercase text-marine line-clamp-2 mb-2 hover:trakcing-wider">
                  {singleVenue?.name}
                </h1>
            </div>
              <StarRating/>
              <p className="text-center text-lg font-garamond italic text-brown-400 mt-4">
                {singleVenue.description}
              </p>
            </div>
            <div className='flex flex-row w-full justify-between items-between md:w-[1250px]'>
              <div className="flex flex-col py-5 md:w-[520px] w-fit">
                <p className='text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2'>Location</p>
                <div className='border-1 border-brown-200 px-6 py-8 w-full'>
                  <p className="tracking-wide text-base font-garamond uppercase text-brown-400 border-b-[1px] border-brown-300 w-full mt-2">
                    {singleVenue.location?.city || 'Bergen'}
                  </p>
                  <p className="tracking-wide text-base font-garamond uppercase text-brown-400 border-b-[1px] border-brown-300 w-full mt-2">
                    {singleVenue.location?.address || 'Streetname 123'}
                  </p>
                  <p className="tracking-wide text-base font-garamond uppercase text-brown-400 border-b-[1px] border-brown-300 w-full mt-2">
                    {singleVenue.location?.continent || 'Europe'}
                  </p>
                  <p className="tracking-wide text-base font-garamond uppercase text-brown-400 border-b-[1px] border-brown-300 w-full mt-2">
                    {singleVenue.location?.country || 'Norway'}
                  </p>
                </div>
                <p className='text-2xl uppercase text-brown-400 font-garamond tracking-wide pt-4 pb-2'>Amenities</p>
                <div className="border-1 border-brown-200 px-6 py-8 w-full gap-1 text-xs mt-2 flex flex-col">
                  {Object.entries(singleVenue.meta)
                    .map(([key, value]) => (
                      <div>
                      <span
                        key={key}
                        className={`text-base font-garamond uppercase border-b-[1px] border-brown-300 w-full flex-row flex mt-2 ${value ? "text-brown-400" : "text-brown-200"}`}
                      >
                        {key}
                        {value && <span className='ml-2 text-buoy'><Check/></span>}
                      </span>
                      
                      </div>
                    ))}
                </div>
              </div>
              
              <div className='flex flex-col items-center justify-between py-5 px-4 w-fit h-auto pb-12'>
                <div className='flex flex-row gap-4'>
                  <div className='flex flex-col gap-2 px-6 py-4 justify-center items-center'>
                    <p className='font-garamond text-xl uppercase text-brown-300'>Guests</p>
                    <div className="btn-l pointer-events-none rounded-full border-brown-300 text-lg font-button text-brown-300">
                      Max {singleVenue.maxGuests}
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 px-6 py-4 justify-center items-center'>
                    <p className='font-garamond text-xl uppercase text-brown-300'>bookings</p>
                    <div className="btn-l pointer-events-none rounded-full border-brown-300 text-lg font-button text-brown-300">
                      {singleVenue._count.bookings}
                    </div>
                  </div>
                </div>
                <div className='flex flex-row w-fit justify-center items-center gap-2 border-b-[1px] border-brown-300 mt-12'>
                  {/* NOT LOGGED IN */}
                </div>
                  {!user && (
                    <>
                      <p className="text-4xl cursor-default uppercase font-chonburi text-marine">
                        {singleVenue.price} nok
                      </p>
                      <p className="text-base text-brown-400 uppercase font-garamond">/ night</p>
                      <div className="flex justify-center items-center mt-8 flex-col w-full">
                        <Link className="max-w-[300px] btn-l btn-primary w-full" to="/login">
                          Log in to book
                        </Link>
                      </div>
                    </>
                  )}

                  {/* CUSTOMER BOOKING FLOW */}
                  {user && !user.venueManager && (
                    <div className="flex gap-6 flex-col max-w-[500px] justify-between w-full">
                      <CalendarPicker onSelectRange={setSelectedRange} />

                      <div className='flex flex-col items-center justify-center gap-2'>
                        <p className="font-garamond text-xl uppercase text-brown-300">
                          Guests
                        </p>
                        <div className="flex items-center gap-4">
                          
                          <button
                            onClick={decrementGuests}
                            disabled={guests <= 1}
                            className="btn-l p-2 h-fit rounded-full"
                          >
                            <Minus size={16}/>
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="flex pl-2 text-center text-xl uppercase font-semibold text-brown-400 font-garamond w-[48px] border-b-[1px] border-brown-300 pointer-events-none"
                          />
                          <button
                            onClick={incrementGuests}
                            disabled={guests >= singleVenue.maxGuests}
                            className="btn-l p-2 h-fit rounded-full"
                          >
                            <Plus size={16}/>
                          </button>
                        </div>
                      </div>
                      <div className='flex flex-col items-center justify-center'>
                        <span className='text-base text-brown-400 uppercase font-garamond'>Total</span>
                        <p className="text-4xl cursor-default uppercase font-chonburi text-marine">
                          {calculatedPrice} NOK
                        </p>
                        <div className='flex flex-row gap-1'>
                          
                          <div className="text-base text-brown-400 uppercase font-garamond">
                            {singleVenue.price} NOK
                          </div>
                          <p className="text-base text-brown-400 uppercase font-garamond">/ night</p>
                          <p className="text-base text-brown-400 lowercase font-garamond">x {guests} {guests === 1 ? "guest" : "guests"}</p>
                        </div>
                        <button
                          className={`btn-l w-full ${
                            !canBook || alreadyBooked ? 'bg-brown-100 text-brown-200 border-brown-300 cursor-not-allowed' : 'btn-primary'
                          }`}
                          disabled={!canBook || alreadyBooked}
                          onClick={() => {
                            if (alreadyBooked) {
                              showToast.error(
                                "You already booked this venue. Cancel the booking in your profile first."
                              );
                              return;
                            }
                            if (!selectedRange?.from || !selectedRange?.to) {
                              showToast.error("Please select a date for your booking.");
                              return;
                            }
                            setIsBookingModalOpen(true);
                          }}
                        >
                          {alreadyBooked ? "Already Booked" : "Book venue"}
                        </button>
                      </div>
                      <ConfirmBooking
                        isOpen={isBookingModalOpen}
                        onClose={() => setIsBookingModalOpen(false)}
                        venue={singleVenue}
                        selectedRange={selectedRange}
                        guests={guests}
                        totalPrice={calculatedPrice}
                        handleConfirmBooking={handleAddBooking}/>
                    </div>
                  )}
                {/* Venue manager (edit venue) */}
                {user?.venueManager && singleVenue?.owner?.name === user?.name && (
                  <div className='flex flex-col items-center justify-center'>
                    <p className="text-4xl cursor-default uppercase font-chonburi text-marine">
                      {singleVenue.price} nok
                    </p>
                    <p className="text-base text-brown-400 uppercase font-garamond">/ night</p>
                    <div className="flex justify-center items-center mt-8 flex-col w-full">
                      <div className="flex gap-6 flex-row justify-between  items-center *:w-full">
                        <button
                          className="btn-l btn-primary w-full min-w-[250px]"
                          onClick={() => setEditIsOpen(true)}
                        >
                          Edit Venue
                        </button>
                            <button
                          className="btn-l p-2 h-fit rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromBookings(booking.id, booking.name);
                          }}>
                          <Trash2/>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <Modal isOpen={editIsOpen} onClose={() => setEditIsOpen(false)}>
                  <EditVenueForm
                    venue={singleVenue}
                    onClose={() => setEditIsOpen(false)}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-row justify-center items-center gap-6 py-4'>
          <p className="text-center text-xs uppercase font-caslon text-brown-400">
            Created: {formatDate(singleVenue.created)}
          </p>
          <p className="text-center text-xs uppercase font-caslon text-brown-400 ">
            Updated: {formatDate(singleVenue.updated)}
          </p>
        </div>
      </div>
    </>
  );
}

export default SingleVenue;
