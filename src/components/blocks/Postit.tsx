import Pushpin from '../blocks/Pushpin'

interface PostitProps {
  className? : string | string[];
};

const Postit : React.FC<PostitProps> = ({className}) => {
  const additionalClasses = Array.isArray(className) ? className.join(' ') : className;
  return(
    <div className={`bg-white min-w-[1] flex flex-col gap-2 max-w-100 p-4 shadow-xl/50 relative max-h-30 items-center justify-center ${additionalClasses} lg:size-100 lg:max-h-70 lg:max-w-70`}>
        <Pushpin color='red' className={"absolute -top-1 left-[50%] size-3 -translate-x-1/2 z-10"}></Pushpin>
        <div className='text-sm px-4'>
            LAST SEEN ON  
        </div> 
        
        <span className='grayscale contrast-200 text-gray-500 grid gap-2 grid-cols-2 '>
          <a href="mailto:santiago.mgomez@urjc.es" className="fa fa-envelope text-2xl"></a>
          <a href="https://www.linkedin.com/in/santiago-meneses-g%C3%B3mez-97255b265/" className="fab fa-linkedin text-2xl"></a>
          <a href="https://github.com/popieyes" className="fab fa-github text-2xl"></a>
          <a href="https://popeyecsm.itch.io/" className="fab fa-itch-io text-2xl"></a>
        </span>

        <div className='bg-yellow-200 min-w-[1] flex items-center justify-center p-1 uppercase hover:border-3 transition-all hover:-translate-y-1 border-white text-md max-w-200  shadow-xl/30 rotate-0 absolute -bottom-4 -right-1'>
          <a href='#projects'>
            See More
          </a>
        </div>
    </div>
  );
};

export default Postit;