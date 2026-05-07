import React from 'react';
import Pushpin from '../blocks/Pushpin';

// 1. The Interactive Redaction Component
const Redaction = ({ children, classes }) => (
  <span className={`bg-neutral-900 text-neutral-900 select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px] ${classes}`} >
    {children}
  </span>
);

const Hero = () => {
  return (
    // Outer environment wrapper - Dark and atmospheric
    <section id="home" className="w-full min-h-screen flex justify-center items-start p-4 md:pt-12 font-sans relative overflow-hidden">
      
      {/* Optional CSS Vignette Overlay */}
      {/* bg-[#e8e6df] */}
      <div className="pointer-events-none absolute inset-0 z-10" />

      {/* Classified Folder */}
      <div className='absolute left-1/2 -translate-x-full -ml-150 p-10 z-30 '>
     
        <div className='bg-[url(/images/heather-green-IVdwfIuEmbY-unsplash.png)] bg-contain bg-no-repeat w-3xl rotate-10 aspect-[3/4] flex flex-col justify-end 
        items-center p-10 max-w-5xl gap-8 drop-shadow-xl/100'>
          <Pushpin color='red' className={"absolute top-2 left-1/2 -translate-x-1/2 z-10 size-2 lg:size-10 lg:top-3 "}/>
          <img className='w-48 mix-blend-multiply' src='/images/clker-free-vector-images-seal-42280.png'/>
          <div className='opacity-80 w-full flex justify-center'>
            <Redaction classes="w-[50%] flex justify-center">TOP SECRET INFORMATION</Redaction>
          </div>
          <div className='w-[30%] opacity-80'>
            <h4 className='uppercase font-black flex justify-center items-center p-4 tracking-widest text-2xl mb-10'>Confidential</h4>
            <p className='font-mono text-justify text-sm'>
             FILES HERE HAVE BEEN CURATED TO DISPLAY THE MOST RELEVANT INFORMATION ON THE SUBJECT. <br/>
             NEWLY DISCOVERED INFORMATION WILL BE ADDED TO THE CASE FILES IMMEDIATELY. <br/>
             YOU CAN CONTACT THE BUREAU FOR SPECIFIC INFORMATION.
            </p>
          </div>
        </div>

      </div>
      {/* Main Dossier Container */}
      <div className="relative w-full max-w-5xl  bg-[#e8e6df]  bg-contain text-neutral-900 p-6 md:p-10 shadow-2xl z-20 border border-neutral-300">

        <Pushpin color='red' className={"absolute top-2 left-1/2 -translate-x-1/2 z-10 size-2 lg:size-10 lg:top-3 "}/>
        {/* ROW 1: Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-400 pb-4 mb-4">
          <div className="text-xs tracking-widest uppercase font-mono text-neutral-600 mb-4 md:mb-0">
            G-045— 47 D—8 0 1—600 1—68 1966— -051287—
          </div>
          <div className="text-right text-sm md:text-base tracking-widest uppercase font-bold leading-tight">
            Research Team MSLab <br />
            Rey Juan Carlos University <br />
            Madrid, Spain
          </div>
        </div>

        {/* ROW 2: Subject ID Title */}
        <div className="border-b-2 border-neutral-800 pb-4 mb-6">
          <p className="text-xs tracking-widest uppercase font-bold mb-1">Subject ID</p>
          <div className="flex items-baseline gap-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">MENESES GÓMEZ</h1>
            <span className="text-xl md:text-2xl tracking-widest uppercase font-mono text-neutral-500">
              SOFTWARE ENGINEER
            </span>
          </div>
        </div>

        {/* ROW 3: The Visual Grid (12 Columns) */}
        <div className="grid grid-cols-12 gap-6 mb-8 border-b border-neutral-400 pb-8">
          
          {/* Column 1: Small Profile & Stats (Spans 3 cols on desktop) */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <img 
              src="/images/MG_2938.jpg" 
              alt="Profile side" 
              className="w-full aspect-[3/4] object-cover grayscale contrast-125 mix-blend-multiply" 
            />
            <div className="font-mono text-xs uppercase flex flex-col gap-1 border-t border-neutral-300 pt-2">
              <div className="flex justify-between"><span>Name:</span> <strong>Santiago</strong></div>
              <div className="flex justify-between"><span>Role:</span> <strong>Graphics Prg.</strong></div>
              <div className="flex justify-between"><span>Clearance:</span> <strong>Level 4</strong></div>
            </div>
            {/* Hardcoded redaction block for visuals */}
            <div className="w-full h-4 bg-neutral-900 mt-2"></div>
            <div className="w-3/4 h-4 bg-neutral-900"></div>
          </div>

          {/* Column 2: Main Portrait (Spans 5 cols on desktop) */}
          <div className="col-span-12 md:col-span-5 relative">
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-neutral-300 mix-blend-multiply border-l border-neutral-400 flex items-center justify-center writing-vertical">
               <span className="rotate-90 tracking-widest text-xs font-mono text-neutral-600 uppercase whitespace-nowrap">Classified Material</span>
            </div>
            <img 
              src="/images/MG_2935.jpg" 
              alt="Main Subject" 
              className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply" 
            />
          </div>

          {/* Column 3: Fingerprints / Data (Spans 4 cols on desktop) */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
             <div className="font-mono text-xs uppercase p-3 bg-neutral-200 border border-neutral-300">
                <p className="font-bold mb-2 border-b border-neutral-400 pb-1">Known Competencies</p>
                <p>C++ / C# / OpenGL / Vulkan</p>
                <p>UNITY</p>
                <p>Real-time Rendering</p>
                <p>Engine Architecture</p>
             </div>
             
             {/* Simulating the fingerprint area with your abstract image */}
             <div className="flex-1 border border-neutral-300 p-2 relative">
               <p className="text-[10px] uppercase font-mono absolute top-2 right-2 ">Print Record 04.05.26</p>
               <img 
                src="/images/thedigitalartist-biometrics-4503187.png" 
                alt="Data record" 
                className="w-full h-full object-cover grayscale min-h-0 mix-blend-multiply opacity-80" 
               />
             </div>
          </div>
        </div>

        {/* ROW 4: The Body / Lore */}
        <div className="grid grid-cols-12 gap-6 font-mono text-sm leading-relaxed">
          <div className="col-span-12 md:col-span-8 ">
            <p className="text-xs tracking-widest uppercase font-sans font-bold mb-2">1. Overview</p>
            <p className="mb-4">
              Subject is heavily involved in building <Redaction>highly classified</Redaction> real-time rendering engines. 
              Current surveillance indicates ongoing research at MSLab. The subject's utilization of graphics tools has resulted in <Redaction>unprecedented performance metrics</Redaction> that our analysts are still attempting to deconstruct.
            </p>

            <p className="text-xs tracking-widest uppercase font-sans font-bold mb-2 mt-6">2. Background</p>
            <p>
              Initial contact with the industry was made in the <Redaction>Degree in Game Design and Development</Redaction>. <br/>
              Since then, the subject has developed several videogames developed in game jams, utilizing <Redaction>Unity</Redaction> and presenting demos at game event Gamescom. Do not approach without direct authorization from the Director of Research.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 relative flex items-end justify-end">
            {/* Placeholder for a messy signature or stamp */}
            <div className="text-4xl font-['Brush_Script_MT',cursive] rotate-[-15deg] opacity-50 border-b border-red-800 text-red-800 pb-2 inline-block">
              Approved
            </div>
          </div>
        </div>

      </div>


    </section>
  );
};

export default Hero;