import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "../rating/StarRating";
import { useVenueStore } from "../../stores/useVenueStore";
import { NotFound } from "../../pages";
import { formatDate } from "../../utils/dataFormatter";
import useBookingStore from "../../stores/useBookingStore";
import { useAuthStore } from "../../stores/useAuthStore";
import Modal from "../modal/Modal";
import EditVenueForm from "../forms/EditVenueForm";

function SingleVenue() {
    const { id } = useParams();
    const { singleVenue, isLoading, isError, fetchVenueById } = useVenueStore();
    const { addToBookings } = useBookingStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [editIsOpen, setEditIsOpen] = useState(false);


    const handleAddBooking = () => {
        addToBookings(
            singleVenue,
            {
                dateFrom: new Date().toISOString(),
                dateTo: new Date(Date.now() + 86400000).toISOString(),
                guests: 1,
            },
            user?.name
        );
    };
  
    useEffect(() => {
      if (!singleVenue || singleVenue.id !== id) {
          fetchVenueById(id);
        }
    }, [id, singleVenue, fetchVenueById]);


    if (isLoading) return <p>Loading Content...</p>;
    if (isError) return <p>Error loading venues, please refresh the page...</p>;
    if (!singleVenue) return <NotFound/>;


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
                            <span className="text-xs">Guests</span>
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
                    {user?.venueManager && singleVenue?.owner?.name === user?.name && (
                        <div className="flex gap-6 flex-row justify-between w-full"> 
                            <button className="btn-l btn-secondary w-full"
                                onClick={() => setEditIsOpen(true)}>
                                    Edit Venue
                            </button>
                            <button
                                    className="btn-l btn-primary w-full"
                                    onClick={() => {navigate(-1)}}
                                    >
                                    Go back
                            </button>
                        </div>

                    )}
                    <Modal
                        isOpen={editIsOpen}
                        onClose={() => setEditIsOpen(false)}>
                            <EditVenueForm venue={singleVenue} onClose={() => setEditIsOpen(false)}/>
                    </Modal>

                    {user.venueManager && singleVenue?.owner?.name !== user?.name && (
                        <div>
                            <button
                                className="btn-l btn-primary w-full"
                                onClick={() => {navigate(-1)}}
                                >
                                Go back
                            </button>
                        </div>
                    )}

                    {!user?.venueManager && (
                        <div className="flex gap-6 flex-row justify-between w-full"> 
                            <button
                                className="btn-l btn-primary w-full"
                                onClick={() => {
                                    handleAddBooking();
                                }}
                                >
                                Book Now
                            </button>
                            <button
                                    className="btn-l btn-secondary w-full"
                                    onClick={() => {navigate(-1)}}
                                    >
                                    Go back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
            <div className="mt-10 flex flex-col text-lg items-center gap-2 lg:w-full border-[1px] pb-10 border-gray-200 cursor-default container mx-auto">
                <StarRating/>
            </div>
            <div className="flex gap-2 items-end">
                <span className="text-4xl font-button text-bold">{singleVenue.rating}</span>
                <span className="text-gray-400 font-button">/ 5</span>
            </div>
        </>
    );
}

export default SingleVenue;
