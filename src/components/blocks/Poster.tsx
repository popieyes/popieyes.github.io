import Pushpin from "./Pushpin";
import React from 'react';

interface PosterImageProps {
  src : string;
  alt : string;
};
const PosterImage : React.FC<PosterImageProps>= ({src, alt}) => (
  <img 
    src={src} 
    alt={alt} 
    className="w-full h-full object-cover grayscale" 
    loading="lazy" 
  />
);

const Poster = () => {
  return(
    <div className="relative flex flex-col w-full max-w-[90%] aspect-[1/1.41] p-2 pb-10 drop-shadow-xl/100 bg-[url(/images/pexels-dav-h-58867999-7953203.jpg)] bg-cover bg-no-repeat bg-paper  lg:flex-[1] lg:order-2 ">
      <Pushpin color='red' className={"absolute -top-2 -left-2 z-10 size-2 lg:size-10 lg:-top-3 lg:-left-3"}/>
      <Pushpin color='red' className={"absolute -top-2 -right-2 z-10 size-2 lg:size-10 lg:-top-3 lg:-right-3"}/>

      <div className="relative flex flex-col w-full max-w-full max-h-full mix-blend-hard-light">
      {/* (Top Row - 40%) */}
      <div className='flex flex-row gap-2 flex-[4] min-h-0 mb-2 '>
        <div className="flex-1 min-w-0 min-h-0">
          <PosterImage src="/images/_MG_2938.jpg" alt="Portrait left side" />
        </div>
    
        <div className="flex flex-col justify-center items-center flex-[2] min-w-0 min-h-0">
          <h1 className="text-4xl md:text-6xl origin-top scale-y-150 text-center" style={{fontFamily: 'Special Elite'}}>
            SANTIAGO
          </h1>
          <span className="text-xl md:text-2xl uppercase mt-8 text-center" style={{fontFamily: 'Chreed'}}>
            Graphics Programmer
          </span>
        </div>

        <div className="flex-1 min-w-0 min-h-0">
          <PosterImage src="/images/_MG_2935.jpg" alt="Portrait right side" />
        </div>
      </div>

      {/* Middle Row - 40% */}
      <div className="flex flex-row gap-2 flex-[4] min-h-0 mb-2">
        <div className="flex-1 min-w-0 min-h-0">
          <PosterImage src="/images/_MG_2933.jpg" alt="MSLab research presentation 1" />
        </div>
        <div className="flex-[2] min-w-0 min-h-0">
          <PosterImage src="/images/_MG_2935.jpg" alt="MSLab research presentation 2" />
        </div>
        <div className="flex items-center flex-1 min-w-0 min-h-0">
          <p className="text-sm md:text-lg uppercase font-chreed text-center leading-tight">
          Building real-time rendering engines, graphics tools, and immersive game experiences. Research at MSLab, Rey Juan Carlos University.
          </p>
        </div>
      </div>

      {/* Bottom Row - 20% */}
      <div className="flex flex-row gap-2 flex-[2] min-h-0 pb-6">
        <div className="flex-[2] min-w-0 min-h-0">
          <PosterImage src="/images/_MG_2935.jpg" alt="Detailed view 1" />
        </div>
        
        <div className="flex flex-col flex-1 min-w-0 min-h-0 font-chreed">
          <span className="text-lg md:text-xl font-bold">04.05.26</span>
          <div className="flex-1 min-h-0 my-1">
            <PosterImage src="/images/_MG_2933.jpg" alt="Date graphic element" />
          </div>
          <span className="text-xs md:text-sm truncate">Lorem ipsum dolor sit amet</span>
        </div>
        
        <div className="flex-1 min-w-0 min-h-0">
          <PosterImage src="/images/_MG_2935.jpg" alt="Detailed view 2" />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Poster;