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
                <div className="glide h-full" ref={sliderRef}>
                    <div className="glide__track h-full " data-glide-el='track'>
                        <ul className="glide__slides h-full">
                            {bookings.slice(0,3).map((booking) => {
                                const imageUrl = booking?.url;
                                const imageAlt = booking?.alt;
                                return (
                                    <li
                                    key={imageUrl}
                                    className="glide__slide">
                                        <div className="h-full w-full">
                                            <img
                                            src={imageUrl || '/assets/holidaze-logo-red.png'}
                                            alt={imageAlt || 'Image of a venue'}
                                            className="object-cover w-full h-full"/>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="glide__bullets flex items-center justify-center gap-2"
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
                <div className="w-full absolute pointer-events-auto bottom-1/9 right-1/2 translate-x-1/2 md:-translate-x-1/2 md:top-2/5 md:left-3/5 flex md:gap-6 gap-4 items-center md:items-start md:text-left text-center flex-col">
                    <h1 className="text-light md:text-8xl text-4xl w-full font-chonburi uppercase">Holiday daze</h1>
                    <p className="font-imfell text-2xl text-light md:w-[500px] w-[300px]">Stay dazed with our curated venue selection; charming boutique hotels, holidays inns, and cozy lodges.</p>
                    <Link to='/bookings'
                    className="btn-l btn-primary text-light w-[300px]"> Explore
                    </Link> 
                </div>
            )}
        </div>
    )
}

export default HeroCarousel;