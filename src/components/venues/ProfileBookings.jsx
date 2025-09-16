import { MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import useBookingStore from "../../stores/useBookingStore";

function ProfileBookings() {
    const { bookings, clearBookings, removeFromBookings } = useBookingStore();

    if (!bookings || bookings.length === 0) {
        return <p className="text-gray-400 uppercase font-button text-2xl pb-2 mb-5 mt-5 transition-all duration-300 ease-in-out"> You have not booked any venues yet </p>
    }

    return (
        <div>
            <button 
            className="btn-l btn-secondary"
            onClick={() => clearBookings()}>
            Clear all bookings
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
                {bookings.map((booking) => (
                    <div key={booking.id}
                    className="flex flex-col text-lg items-center gap-2 max-w-90 lg:w-fit border-[1px] pb-10 border-gray-200 cursor-default container mx-auto">
                        <Link to={`/booking/${booking?.venue?.id}`} className="cursor-pointer">
                            <div className="flex justify-center items-center h-64 w-fill overflow-clip">
                                <img
                                    className="h-fill w-fill object-cover"
                                    src={booking?.venue.media?.[0]?.url}
                                    alt={booking.venue?.media?.[0]?.alt || "Venue image"}
                                />
                            </div>
                            <div className="flex justify-center items-center flex-col gap-4 m-6">
                                <h2 className="text-3xl text-center font-garamond uppercase text-red-800 mb-2 line-clamp-1 h-fit w-40">
                                    {booking.venue?.name || 'Bay Hotel'}
                                </h2>
                                <div className="flex flex-row gap-2">
                                    <MapPin
                                    size={16}
                                    />
                                    <p className="text-sm font-caslon text-black">
                                        {booking.venue?.location?.city || 'Bergen'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <button className="btn-l btn-primary"
                         onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromBookings(booking.id)
                                }}>
                            Cancel booking
                        </button>
                    </div>
                ))}
                
            </div>
        </div>
    )
}

export default ProfileBookings;