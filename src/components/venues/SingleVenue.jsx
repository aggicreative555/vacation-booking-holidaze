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
import { Minus, Plus } from 'lucide-react';
import CalendarPicker from '../calendar/CalendarPicker';

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

    const hasOverlap = singleVenue?.bookings?.some((b) =>
        selectedRange?.from <= new Date(b.dateTo) &&
        selectedRange?.to >= new Date(b.dateFrom)
    );

    const exceedsGuests = guests > singleVenue?.maxGuests;

    const canBook = selectedRange?.from && selectedRange?.to && !hasOverlap && !exceedsGuests;

    const alreadyBooked = userBookings?.some(
      (booking) => booking?.venue?.id === singleVenue?.id && booking?.customer?.name === user?.name
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

    if (isLoading) return <p>Loading Content...</p>;
    if (isError) return <p>Error loading venues, please refresh the page...</p>;
    if (!singleVenue) return <NotFound />;

  return (
    <>
      <div className="flex flex-col transition-all duration-500 ease-in-out">
        <div className="w-full h-auto group overflow-hidden max-h-80 flex md:max-h-96 justify-center items-center ">
          <img
            src={singleVenue.media?.[0]?.url}
            alt={singleVenue.media?.[0]?.alt}
            className="transition-transform duration-300 ease-in-out object-cover aspect-auto group-hover:scale-110 w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-10 container mx-auto px-8 lg:px-8 py-4 justify-center items-center relative">
          <div className="flex flex-col gap-1 h-ful items-center justify-center lg:justify-between lg:gap-4">
            <h1 className="text-3xl md:text-5xl text-center font-garamond uppercase tracking-tighter text-red-800 transition-all duration-300 ease-in-out">
              {singleVenue.name}
            </h1>
            <p className="text-center text-xs font-caslon text-black mt-4 lg:px-20 ">
              {singleVenue.description}
            </p>
            <p className="text-center text-xs font-caslon text-black mt-4 lg:px-20 ">
              {formatDate(singleVenue.created)}
            </p>
            <p className="text-center text-xs font-caslon text-black mt-4 lg:px-20 ">
              {formatDate(singleVenue.updated)}
            </p>
            <div className="flex flex-col py-5">
              <p className="text-lg font-button text-black">
                {singleVenue.price}
                <span className="text-xs">NOK</span>
              </p>
              <p className="text-lg font-button text-black">
                {singleVenue.maxGuests}
                <span className="text-xs">Max Guests</span>
              </p>
              <p className="text-lg font-button text-black">
                {singleVenue._count.bookings}
                <span className="text-xs">Bookings</span>
              </p>
              <p className="text-md font-button text-black">
                {singleVenue.location.city}
              </p>
              <p className="text-md font-button text-black">
                {singleVenue.location.address}
              </p>
              <p className="text-md font-button text-black">
                {singleVenue.location.country}
              </p>
            </div>
            {/* Venue manager (edit venue) */}
            {user?.venueManager && singleVenue?.owner?.name === user?.name && (
              <div className="flex gap-6 flex-row justify-between w-full">
                <button
                  className="btn-l btn-secondary w-full"
                  onClick={() => setEditIsOpen(true)}
                >
                  Edit Venue
                </button>
                <button
                  className="btn-l btn-primary w-full"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go back
                </button>
              </div>
            )}
            <Modal isOpen={editIsOpen} onClose={() => setEditIsOpen(false)}>
              <EditVenueForm
                venue={singleVenue}
                onClose={() => setEditIsOpen(false)}
              />
            </Modal>

            {user?.venueManager && singleVenue?.owner?.name !== user?.name && (
              <div>
                <button
                  className="btn-l btn-primary w-full"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Go back
                </button>
              </div>
            )}

            {/* CUSTOMER BOOKING FLOW */}
            {user && !user.venueManager && (
              <div className="flex gap-6 flex-col max-w-[500px] justify-between w-full">
                <CalendarPicker onSelectRange={setSelectedRange} />

                <div className="flex items-center gap-4 mt-6 w-[500px]">
                  <p className="font-lg font-caslon uppercase text-gray-400">
                    Guests
                  </p>
                  <button
                    onClick={decrementGuests}
                    disabled={guests <= 1}
                    className="px-3 py-1 border rounded-lg bg-gray-100 disabled:opacity-50"
                  >
                    <Minus />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="input-base border-b border-gray-300 focus:border-black transition-all text-xl text-center"
                  />
                  <button
                    onClick={incrementGuests}
                    disabled={guests >= singleVenue.maxGuests}
                    className="px-3 py-1 border rounded-lg bg-gray-100 disabled:opacity-50"
                  >
                    <Plus />
                  </button>
                </div>

                <div className="text-3xl md:text-5xl text-center font-garamond uppercase tracking-tighter text-red-800">
                  {calculatedPrice} NOK total
                </div>

                {!alreadyBooked && !hasOverlap ? (
                  <button
                    className="btn-l btn-primary w-full"
                    onClick={handleAddBooking}
                    disabled={!canBook}
                  >
                    Book now
                  </button>
                ) : (
                  <button
                    className="btn-l btn-secondary w-full"
                    onClick={handleCancelBooking}
                  >
                    Cancel booking
                  </button>
                )}

                <button
                  className="btn-l btn-secondary w-full"
                  onClick={() => navigate(-1)}
                >
                  Go back
                </button>
              </div>
            )}

            {/* NOT LOGGED IN */}
            {!user && (
              <div className="flex gap-6 flex-col max-w-[300px] justify-between w-full">
                <Link className="btn-l btn-primary w-full" to="/login">
                  Log in to book venue
                </Link>
                <button
                  className="btn-l btn-secondary w-full"
                  onClick={() => navigate(-1)}
                >
                  Go back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col text-lg items-center gap-2 lg:w-full border-[1px] pb-10 border-gray-200 cursor-default container mx-auto">
        <StarRating />
      </div>
      <div className="flex gap-2 items-end">
        <span className="text-4xl font-button text-bold">
          {singleVenue.rating}
        </span>
        <span className="text-gray-400 font-button">/ 5</span>
      </div>
    </>
  );
}

export default SingleVenue;
