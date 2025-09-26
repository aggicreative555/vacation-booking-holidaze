import Glide from "@glidejs/glide";
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom";

const HeroCarousel = ({ bookings = [], height = 'h-[800px]', content = true}) => {
    const sliderRef = useRef(null);

    useEffect(() => {
        if (!sliderRef.current || bookings.length === 0) 
            return; 
        {
            const glide = new Glide(sliderRef.current, {
                type: 'carousel',
                autoplay: 10000,
                hoverpause: true,
                animationDuration: 1200 ,
                animationTimingFunc: 'ease-in-out',
                perView: 1,
            });

            glide.mount();
            return () => glide.destroy();
        }
    }, [bookings]);

    return (
        <div className="relative w-full h-fit md:border-[40px] border-[20px] border-light flex flex-col">
            <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -top-[3%] z-10 "/>
            <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -top-[3%] z-10 "/>
            <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -bottom-[3%] z-10 "/>
            <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -bottom-[3%] z-10 "/>
            <div className={`w-full md:max-h-[800px] max-h-[600px] overflow-hidden ${height}`}>
                <div className="glide" ref={sliderRef}>
                    <div className="glide__track" data-glide-el='track'>
                        <ul className="glide__slides">
                            {bookings.slice(0,3).map((booking) => {
                                const imageUrl = booking?.url;
                                const imageAlt = booking?.alt;
                                console.log(booking.url)
                                return (
                                    <li
                                    key={imageUrl}
                                    className="glide__slide relative">
                                        <div className="w-full h-full">
                                            <img
                                            src={imageUrl || '/assets/holidaze-logo-red.png'}
                                            alt={imageAlt || 'Image of a venue'}
                                            className="object-cover w-full h-full "/>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="glide__bullets flex gap-2 m-4"
                    data-glide-el='controls[nav]'>
                        {bookings.slice(0,3).map((_, index) => (
                            <button
                            key={index}
                            className="glide__bullet w-3 h-3 bg-brown-200 rounded-full hover:bg-brown-400"
                            data-glide-dir={`=${index}`}/>
                        ))}

                    </div>
                </div>
            </div>
            {content && (
                <div className="absolute pointer-events-auto top-2/5 left-[208px] flex gap-6 flex-col">
                    <h1 className="text-light md:text-8xl font-chonburi uppercase">Holiday haze</h1>
                    <p className="font-imfell text-2xl text-light max-w-[500px]">Stay dazed with our curated venue selection; charming boutique hotels, holidays inns, and cozy lodges.</p>
                    <Link to='/explore'
                    className="btn-l btn-primary text-light max-w-[300px]"> Explore
                    </Link> 
                </div>
            )}
        </div>
    )
}

export default HeroCarousel;