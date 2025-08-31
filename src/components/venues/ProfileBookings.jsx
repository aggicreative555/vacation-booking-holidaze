import { MapPin } from "lucide-react"
import { Link } from "react-router-dom"

function ProfileBookings({ bookings }) {
    if (!bookings || bookings.length === 0) {
        return <p className="text-gray-400 uppercase font-button text-2xl pb-2 mb-5 mt-5 transition-all duration-300 ease-in-out"> You have not booked any venues yet </p>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
            {boookings.map((booking) => (
                <div key={booking.id}
                className="flex flex-col text-lg items-center gap-2 lg:w-full border-[1px] pb-10 border-gray-200 cursor-default container mx-auto">
                    <Link to={`/booking/${booking.id}`} className="cursor-pointer">
                        <div className="h-64 w-fit overflow-clip">
                        <img
                            className="h-64 w-full object-cover"
                            src={media?.[0]?.url}
                            alt={media?.[0]?.alt || "booking image"}
                        />
                        </div>
                        <h2 className="text-3xl text-center font-garamond uppercase text-red-800 mb-2 line-clamp-1 h-fit w-40">
                            {booking.name}
                        </h2>
                        <p className="text-center text-sm font-caslon text-black line-clamp-2 mt-4 flex justify-center items-center gap-1">
                            <MapPin
                            size={16}
                            />
                            {booking.location.city}
                        </p>
                    </Link>
                </div>
            ))}
            
        </div>
    )
}

export default ProfileBookings;