import { MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { useVenueStore } from "../../stores/useVenueStore"

function ProfileVenues() {
    const { venue, removeFromVenues } = useVenueStore;
    if (!venue || venue.length === 0) {
        return (
            <>
                <p className="text-gray-400 uppercase font-button text-2xl pb-2 mb-5 mt-5 transition-all duration-300 ease-in-out"> You have not created any venues yet </p>
            </>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative place-items-center w-full transition-all ease-in-out duration-300">
                {venue.map((venue) => (
                    <div key={venue.id}
                    className="flex flex-col text-lg items-center gap-2 lg:w-full border-[1px] pb-10 border-gray-200 cursor-default container mx-auto">
                        <Link to={`/booking/${venue.id}`} className="cursor-pointer">
                            <div className="h-64 w-fit overflow-clip">
                            <img
                                className="h-64 w-full object-cover"
                                src={venue?.media?.[0]?.url}
                                alt={venue?.media?.[0]?.alt || "Venue image"}
                            />
                            </div>
                            <h2 className="text-3xl text-center font-garamond uppercase text-red-800 mb-2 line-clamp-1 h-fit w-40">
                                {venue.name}
                            </h2>
                            <p className="text-center text-sm font-caslon text-black line-clamp-2 mt-4 flex justify-center items-center gap-1">
                                <MapPin
                                size={16}
                                />
                                {venue.location.city}
                            </p>
                            <button className="btn-l btn-primary"
                                onClick={() => removeFromVenues(venue.id)}>
                                Remove venue
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileVenues


