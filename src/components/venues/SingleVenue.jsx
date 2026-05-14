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
import { ArrowLeft, Check, Minus, Plus, Trash2, X } from 'lucide-react';
import CalendarPicker from '../calendar/CalendarPicker';
import ConfirmBooking from '../modal/ConfirmBooking';

function SingleVenue() {
  const { id } = useParams();
  const { singleVenue, isLoading, isError, fetchVenueById } = useVenueStore();
  const {
    addToBookings,
    userBookings,
    removeFromBookings,
    fetchBookingsByUser,
  } = useBookingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [guests, setGuests] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const hasOverlap = singleVenue?.bookings?.some(
    (b) =>
      selectedRange?.from <= new Date(b.dateTo) &&
      selectedRange?.to >= new Date(b.dateFrom)
  );

  const exceedsGuests = guests > singleVenue?.maxGuests;

  const canBook =
    selectedRange?.from && selectedRange?.to && !hasOverlap && !exceedsGuests;

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
    if (id) {
      fetchVenueById(id);
    }
  }, [id, fetchVenueById]);

  if (isLoading) {
    return (
      <div className="max-w-[500] flex items-center justify-center gap-2 my-80">
        <p className="text-center font-imfell italic text-crimson text-xl">
          Loading all venues. Please wait
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
  }

  if (isError)
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

  if (!singleVenue) return <NotFound />;

  return (
    <>
      <div className="flex items-start flex-col max-w-[1550px] transition-all duration-500 ease-in-out bg-sand-100 h-fit">
        <div className="relative w-full max-h-[600px] md:border-[40px] border-[20px] border-sand-100 flex flex-col">
          <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -top-[3%] z-10 " />
          <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -top-[3%] z-10 " />
          <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -bottom-[3%] z-10 " />
          <div className="bg-sand-100 absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -bottom-[3%] z-10 " />
          <div className="w-full md:max-h-[800px] max-h-[600px] overflow-hidden flex justify-center items-end">
            <img
              src={singleVenue.media?.[0]?.url}
              alt={singleVenue.media?.[0]?.alt}
              className="object-cover aspect-auto h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 container mx-auto px-8 lg:px-8 py-4 justify-center items-center relative">
          <div className="flex flex-col gap-1 h-full items-center justify-center lg:gap-4">
            <div className="relative flex flex-col md:flex-row items-center justify-start h-full w-full">
              <button
                className="p-2 w-fit text-xl font-imfell flex gap-2 hover:-translate-x-2 cursor-pointer transition-all duration-300"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowLeft className="cursor-pointer text-brown-300 hover:-translate-x-2 transition-all duration-300" />
                Go Back
              </button>
              <p className="md:absolute md:left-[46%] text-xl italic text-center font-imfell w-fit">
                Stay at
              </p>
            </div>
            <StarRating />
            <div className="flex flex-col gap-2 mb-4 jusitfy-center items-center w-[344px] md:w-[700px]">
              <div className="flex flex-row justify-between flex-wrap ">
                <h1 className="md:text-6xl text-4xl w-[320px] md:w-[700px] text-center font-chonburi uppercase text-marine line-clamp-3 mb-2 hover:trakcing-wider">
                  {singleVenue?.name}
                </h1>
              </div>
              <p className="text-center text-3xl font-garamond text-brown-400 mt-4 w-full md-w-[500px] p-4">
                {singleVenue.description}
              </p>
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-between items-between w-full h-fit md:max-w-[1250px]">
              <div className="flex flex-col w-full justify-between mt-5 mb-10 lg:items-stretch items-center">
                <div className="flex flex-col py-5 w-full">
                  <p className="text-2xl uppercase text-brown-400 font-bold font-garamond tracking-wide pt-4 pb-2">
                    Location
                  </p>
                  <div className="border-2 outline-1 outline-offset-1 border-brown-200 px-6 py-8 w-full gap-1 text-xs mt-2 flex flex-col">
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
                </div>
                <div className="flex flex-col py-5 flex-1 min-w-0 h-fit">
                  <p className="text-2xl uppercase text-brown-400 font-bold font-garamond tracking-wide pt-4 pb-2">
                    Amenities
                  </p>
                  <div className="border-2 outline-1 outline-offset-1 border-brown-200 px-6 py-8 w-full gap-1 text-xs mt-2 flex flex-col">
                    {Object.entries(singleVenue.meta).map(([key, value]) => (
                      <div>
                        <span
                          key={key}
                          className={`text-base font-garamond uppercase border-b-[1px] border-brown-300 w-full flex-row flex mt-2 ${value ? 'text-brown-400' : 'text-brown-200'}`}
                        >
                          {value ? (
                            <span className="mr-2 text-emerald-700">
                              <Check />
                            </span>
                          ) : (
                            <span className="mr-2 text-buoy">
                              <X />
                            </span>
                          )}
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center pt-5 px-4 md:w-full border-b-[1px] md:border-0 md:pl-10">
                <div className="flex flex-row md:gap-4 justify-center md:justify-start w-full">
                  <div className="flex flex-col gap-2 py-2 justify-center items-center">
                    <p className="font-garamond text-xl uppercase text-brown-300 font-bold">
                      Guests
                    </p>
                    <div className="w-[90px] flex items-center justify-center border-2 outline-1 mt-2 outline-offset-1 aspect-square pointer-events-none border-brown-300 font-garamond uppercase text-xl font-semibold transition-all duration-100 ease-in-out ">
                      Max {singleVenue.maxGuests}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:py-9 justify-center items-center">
                    <p className="font-garamond text-xl uppercase text-brown-300 font-bold">
                      bookings
                    </p>
                    <div className="w-[90px] flex items-center justify-center border-2 outline-1 mt-2 outline-offset-1 aspect-square pointer-events-none border-brown-300 font-garamond uppercase text-xl font-semibold transition-all duration-100 ease-in-out ">
                      {singleVenue._count.bookings}
                    </div>
                  </div>
                </div>
                <div className="w-[344px] flex flex-row md:w-fit justify-start items-center gap-2 border-b-[1px] border-brown-300 mt-10 md:mt-0">
                  {/* NOT LOGGED IN */}
                </div>
                {!user && (
                  <>
                    <p className="text-4xl pt-5 text-center md:text-left md:w-full cursor-default uppercase font-chonburi text-marine">
                      {singleVenue.price} nok
                    </p>
                    <p className="text-base md:w-full text-brown-400 uppercase font-garamond">
                      / night
                    </p>
                    <div className="flex justify-center items-center mt-8 flex-col w-full">
                      <Link
                        className="max-w-[300px] mb-10 btn-l btn-primary w-full"
                        to="/login"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Log in to book
                      </Link>
                    </div>
                  </>
                )}

                {/* CUSTOMER BOOKING FLOW */}
                {user && !user.venueManager && (
                  <div className="flex gap-6 flex-col max-w-[500px] justify-between w-full mb-20">
                    <div className="my-4 gap-6 flex items-center justify-center flex-col ">
                      <p className="font-garamond text-xl uppercase text-brown-300">
                        Schedule a date
                      </p>
                      <CalendarPicker onSelectRange={setSelectedRange} />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="font-garamond text-xl uppercase text-brown-300">
                        Guests
                      </p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={decrementGuests}
                          disabled={guests <= 1}
                          className="btn-l p-2 h-fit rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={16} />
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
                          disabled={
                            guests >= singleVenue.maxGuests ||
                            !selectedRange?.from ||
                            !selectedRange?.to
                          }
                          className="btn-l p-2 h-fit rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      {(!selectedRange?.from || !selectedRange?.to) && (
                        <p className="font-garamond italic text-crimson text-sm">
                          {' '}
                          Please select a date before adding guests.
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-base text-brown-400 uppercase font-garamond">
                        Total
                      </span>
                      <p className="text-4xl pt-5 text-center md:text-left w-full cursor-default uppercase font-chonburi text-marine">
                        {calculatedPrice} NOK
                      </p>
                      <div className="flex flex-row gap-1">
                        <div className="text-base text-brown-400 uppercase font-garamond">
                          {singleVenue.price} NOK
                        </div>
                        <p className="text-base w-full text-center md:text-left text-brown-400 uppercase font-garamond">
                          / night
                        </p>
                        <p className="text-base text-brown-400 lowercase font-garamond">
                          x {guests} {guests === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                      <button
                        className={`btn-l w-full mt-8 mb-10 ${
                          !canBook || alreadyBooked
                            ? 'bg-brown-100 text-brown-200 border-brown-300 cursor-not-allowed'
                            : 'btn-primary'
                        }`}
                        disabled={!canBook || alreadyBooked}
                        onClick={() => {
                          if (alreadyBooked) {
                            showToast.error(
                              'You already booked this venue. Cancel the booking in your profile first.'
                            );
                            return;
                          }
                          if (!selectedRange?.from || !selectedRange?.to) {
                            showToast.error(
                              'Please select a date for your booking.'
                            );
                            return;
                          }
                          setIsBookingModalOpen(true);
                        }}
                      >
                        {alreadyBooked ? 'Already Booked' : 'Book venue'}
                      </button>
                    </div>
                    <ConfirmBooking
                      isOpen={isBookingModalOpen}
                      onClose={() => setIsBookingModalOpen(false)}
                      venue={singleVenue}
                      selectedRange={selectedRange}
                      guests={guests}
                      totalPrice={calculatedPrice}
                      handleConfirmBooking={handleAddBooking}
                    />
                  </div>
                )}
                {/* Venue manager (edit venue) */}
                {user?.venueManager &&
                  singleVenue?.owner?.name === user?.name && (
                    <div className="flex flex-col items-start justify-start">
                      <p className="text-4xl pt-5 w-full text-center md:text-left cursor-default uppercase font-chonburi text-marine">
                        {singleVenue.price} nok
                      </p>
                      <p className="text-base w-full text-center md:text-left text-brown-400 uppercase font-garamond">
                        / night
                      </p>
                      <div className="flex justify-center items-center mt-4 flex-col w-full">
                        <div className="flex gap-6 flex-row justify-between items-center *:w-full">
                          <button
                            className="btn-l btn-primary w-full text-nowrap"
                            onClick={() => setEditIsOpen(true)}
                          >
                            Edit Venue
                          </button>
                          <button
                            className="btn-l p-2 h-fit rounded-full mb-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromBookings(booking.id, booking.name);
                            }}
                          >
                            <Trash2 />
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
        <div className="w-full flex md:flex-row flex-col justify-center items-center md:gap-6 gap-2 py-4">
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
