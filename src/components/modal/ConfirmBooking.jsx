import { formatDate } from '../../utils/dataFormatter';
import Modal from './Modal';

function ConfirmBooking({
  isOpen,
  onClose,
  venue,
  selectedRange,
  guests,
  totalPrice,
  handleConfirmBooking,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center my-8 mx-4">
        <h1
          className="text-4xl uppercase font-chonburi
            w-full text-center break-word max-w-[400px] md:max-w-[450px] text-crimson"
        >
          Confirm booking
        </h1>
        <span className="mt-4 h-[1px] w-1/2 bg-brown-200"></span>
        <p className="text-brown-300 text-base font-garamond text-center md:w-[408px] font-normal py-2 ">
          By clicking 'Book Now' You will book the venue for the selected
          period. Please confirm the details below to reserve your booking.
        </p>
      </div>
      <div className="flex flex-row border-b-[1px] border-brown-100 justify-between w-full px-4 max-w-[500px]">
        <p className="text-brown-300 uppercase font-normal text-base">Venue:</p>
        <p className="pb-2 text-dark uppercase font-normal text-base">
          {venue.name}
        </p>
      </div>
      <div className="flex flex-row border-b-[1px] border-brown-100 justify-between w-full px-4 max-w-[500px]">
        <p className="text-brown-300 uppercase font-normal text-base">Date:</p>
        <p className="max-w-[200px] text-right pb-2 text-dark uppercase font-normal text-base">
          {' '}
          {formatDate(selectedRange?.from)} - {formatDate(selectedRange?.to)}
        </p>
      </div>
      <div className="flex flex-row border-b-[1px] border-brown-100 justify-between w-full px-4 max-w-[500px]">
        <p className="text-brown-300 uppercase font-normal text-base">
          Guests:
        </p>
        <p className="pb-2 text-dark uppercase font-normal text-base">
          {guests}
        </p>
      </div>
      <div className="flex items-end flex-row border-b-[1px] border-brown-100 justify-between w-full px-4 max-w-[500px]">
        <p className="text-brown-300 uppercase font-normal text-base">Total:</p>
        <div className="flex flex-row items-end gap-2">
          <p className="pb-2 text-marine uppercase font-chonburi md:text-6xl text-4xl">
            {totalPrice}
          </p>
          <span className="text-brown-300 uppercase font-normal text-base">
            Nok
          </span>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 mt-12">
        <button className="btn-l btn-secondary" onClick={onClose}>
          Go back
        </button>
        <button
          className="btn-l btn-primary"
          onClick={() => {
            handleConfirmBooking();
            onClose();
          }}
        >
          Book now
        </button>
      </div>
      <p className="text-brown-300 text-base font-garamond text-center md:w-[408px] font-normal py-2 italic">
        Your venue will be visible on your profile page, where you can
        permanently remove it from your bookings.
      </p>
    </Modal>
  );
}

export default ConfirmBooking;
