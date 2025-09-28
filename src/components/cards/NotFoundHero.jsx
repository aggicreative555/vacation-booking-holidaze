import { Link } from 'react-router-dom';

const NotFoundHero = ({
  svgSrc = '/assets/not-found/not-found-img.svg',
  svgAlt = 'A graphic beach background',
  height = 'h-[800px]',
  content = true,
}) => {
  return (
    <div className="relative w-full h-fit md:border-[40px] border-[20px] border-light flex flex-col overflow-clip">
      {/* Corner circles */}
      <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -top-[3%] z-10" />
      <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -top-[3%] z-10" />
      <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -left-[2%] -bottom-[3%] z-10" />
      <div className="bg-light absolute rounded-full h-[10%] w-auto aspect-square -right-[2%] -bottom-[3%] z-10" />

      {/* SVG Container */}
      <div className={`w-full md:max-h-[800px] max-h-[600px] overflow-hidden ${height}`}>
        <div className="h-full w-full">
          <img
            src={svgSrc}
            alt={svgAlt}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
       <img
              src='/assets/not-found/buoy.svg'
              alt="Buoy ring"
              className="absolute top-2/3 md:top-1/2 -right-1/4 -translate-x-1/2 -translate-y-1/2 w-[40%] pointer-events-none animate-spin [animation-duration:15s]"
              style={{ zIndex: 1 }}
        />

      {/* Content */}
      {content && (
        <div className="z-10 w-full absolute pointer-events-auto bottom-1/9 right-1/2 translate-x-1/2 md:-translate-x-1/2 md:top-2/5 md:left-3/5 flex md:gap-6 gap-4 items-center md:items-start md:text-left text-center flex-col cursor-default">
          <h1 className="text-light md:text-8xl text-4xl w-full font-chonburi uppercase">
            Need a life buoy?
          </h1>
          <p className="font-imfell text-2xl text-light md:w-[500px] w-[300px]">
            Don't worry if you've been swimming along our webpage and didn't find what you're looking for. Take the buoy and go back to the home page. 
          </p>
          <Link
            to="/"
            className="btn-l btn-secondary md:w-[400px]"
          >
        Go to home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotFoundHero;