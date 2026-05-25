import React from 'react';
import Pushpin from '../blocks/Pushpin';
import Skill from '../blocks/Skill';
import ServiceRecord from './ServiceRecord';
import CompressedWorkHistory from '../blocks/WorkHistory';
// Reusing the Redaction component
const Redaction = ({ children }) => (
  <span className="bg-neutral-900 text-neutral-900 select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px]">
    {children}
  </span>
);

const AboutAndContact = () => {
  return (
    <section id="about" className="w-full p-4 md:p-12 font-sans relative bg-[url(/images/folderText.webp)] bg-cover bg-repeat-x overflow-hidden">
      {/* Paper texture background */}
      <div className='w-full flex justify-center items-start p-4 md:p-12 bg-[url(/images/heather-green-1GuZ9y1qAT8-unsplash.webp)] bg-cover bg-no-repeat'>
      {/* Main Dossier Container */}
        <div className="absolute invisible 2xl:visible w-full max-w-5xl left-1/2 -translate-x-full -ml-200 bg-[#e8e6df] text-neutral-900 shadow-2xl z-20 border border-neutral-300 blur-[4px]">
        <Pushpin color='red' className={"absolute top-2 left-1/2 -translate-x-1/2 z-10 size-2 lg:size-10 lg:top-3 "}/>
          {/* =========================================
              ABOUT ME: FIELD EVALUATION
              ========================================= */}
          <div className="p-6 md:p-10">
            <div className="border-b-4 border-neutral-900 pb-2 mb-8 mt-4">
              <p className="text-xs tracking-widest uppercase font-mono text-neutral-600 mb-1">Addendum 01</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Field Evaluation</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-l-4 border-neutral-800 pl-4 md:pl-8">
              
              {/* Left Column: The Transcript */}
              <div className="font-mono text-sm leading-relaxed flex flex-col gap-6">
                <p className="text-xs tracking-widest uppercase font-sans font-bold border-b border-neutral-300 pb-1">Audio Transcript: Entry Session</p>
                
                <div>
                  <span className="font-bold font-sans tracking-wider text-xs">DIRECTOR:</span>
                  <p className="mt-1 pl-4 border-l border-neutral-400">State your primary directives and background for the record.</p>
                </div>

                <div>
                  <span className="font-bold font-sans tracking-wider text-xs">SUBJECT (SANTIAGO):</span>
                  <p className="mt-1 pl-4 border-l border-neutral-400">
                    I operate as a Graphics Programmer. My primary focus is bridging the gap between raw mathematical systems and visual output. I build rendering engines, optimize real-time pipelines, and research <Redaction>non-euclidean geometry</Redaction> at MSLab.
                  </p>
                </div>

                <div>
                  <span className="font-bold font-sans tracking-wider text-xs">DIRECTOR:</span>
                  <p className="mt-1 pl-4 border-l border-neutral-400">And your previous deployment?</p>
                </div>

                <div>
                  <span className="font-bold font-sans tracking-wider text-xs">SUBJECT (SANTIAGO):</span>
                  <p className="mt-1 pl-4 border-l border-neutral-400">
                    Extensive work in Unity and custom C++ engines. The goal is always to push hardware limits without triggering a <Redaction>critical system cascade</Redaction>.
                  </p>
                </div>
              </div>

              {/* Right Column: Anomalous Traits (Skills/Hobbies) */}
              <div>
                <p className="text-xs tracking-widest uppercase font-sans font-bold border-b border-neutral-300 pb-1 mb-6"><Redaction>Observed Anomalies (Capabilities)</Redaction></p>
                
                <ul className="space-y-4 font-mono text-xs">
                  <li className="flex gap-4 items-start">
                    <span className="text-neutral-500">[01]</span>
                    <div>
                      <Redaction><strong className="uppercase block text-neutral-800">Advanced Toolmaking</strong></Redaction>
                      <Redaction><span className="text-neutral-900">Subject creates custom editors and debugging suites to manipulate environment variables on the fly.</span></Redaction>
                      
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-neutral-500">[02]</span>
                    <div>
                      <strong className="uppercase block text-neutral-800">Shader Manipulation</strong>
                      <span className="text-neutral-600">Demonstrates high proficiency with HLSL/GLSL. Capable of bending light and matter via <Redaction>mathematical intrusion</Redaction>.</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-neutral-500">[03]</span>
                    <div>
                      <strong className="uppercase block text-neutral-800">Low-Level Optimization</strong>
                      <span className="text-neutral-600">Memory management and multithreading behavior noted. Subject eliminates bottlenecks with extreme prejudice.</span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* =========================================
              CONTACT: SECURE COMMS LINK (Tear-off slip)
              ========================================= */}
          <div className="absolute mt-8 border-t-2 border-dashed border-neutral-400 bg-neutral-200 p-6 md:p-10 relative">
            
            {/* Scissors Icon / Tear-off indicator */}
            <div className="absolute top-[-12px] left-[10%] text-neutral-500 bg-neutral-900 px-2 rotate-180" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>
              </svg>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-center font-sans font-black uppercase tracking-widest text-xl mb-2">Internal Requisition Form</h3>
              <p className="text-center font-mono text-xs text-neutral-500 mb-10 uppercase tracking-widest">
                Direct Transmission to Subject: Santiago <br/>
                Network: Secure
              </p>

              <form 
                className="space-y-8 flex flex-col"
                onSubmit={(e) => { e.preventDefault(); console.log('Transmitting...'); }}
              >
                {/* Row: Name and Org */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label htmlFor="auth_name" className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                      Authorizing Agent (Name)
                    </label>
                    <input 
                      type="text" 
                      id="auth_name"
                      required
                      className="w-full bg-transparent border-0 border-b border-neutral-400 py-2 font-mono text-sm focus:ring-0 focus:border-neutral-900 outline-none transition-colors"
                    />
                  </div>

                  <div className="relative group">
                    <label htmlFor="auth_org" className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                      Department / Agency
                    </label>
                    <input 
                      type="text" 
                      id="auth_org"
                      className="w-full bg-transparent border-0 border-b border-neutral-400 py-2 font-mono text-sm focus:ring-0 focus:border-neutral-900 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Block */}
                <div className="relative group pt-4">
                  <label htmlFor="transmission_body" className="absolute -top-1 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                    Transmission Details
                  </label>
                  {/* 
                    Using a repeating linear gradient to create lines that look like 
                    ruled paper specifically for the textarea. 
                  */}
                  <textarea 
                    id="transmission_body"
                    rows="4"
                    required
                    style={{
                      lineHeight: '2rem',
                      backgroundImage: 'linear-gradient(transparent, transparent calc(2rem - 1px), #a3a3a3 0px)',
                      backgroundSize: '100% 2rem'
                    }}
                    className="w-full bg-transparent border-0 py-1 font-mono text-sm focus:ring-0 outline-none resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="flex justify-between items-end mt-8 border-t border-neutral-400 pt-6">
                  <div className="font-mono text-[10px] text-neutral-500 uppercase">
                    Warning: Falsifying directives is <br/> punishable under section 4.A
                  </div>
                 {/*  <button 
                    type="submit" 
                    className="bg-neutral-900 text-[#e8e6df] px-8 py-3 font-sans font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 hover:text-white transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-red-600 animate-pulse rounded-full"></span>
                    Transmit Data
                  </button> */}
                </div>
              </form>

            </div>
          </div>

        </div>
      {/* Main Information Container */}
        <div className='flex flex-col gap-8 items-center justify-start w-5xl max-w-5xl aspect-1/1.41'>
          {/* Logo and About Me Header */}
          <div className='flex flex-row items-center justify-start w-full gap-4'>
            <img className="mix-blend-multiply opacity-70 min-w-0 w-32 max-w-lg " src='/images/clker-free-vector-images-seal-42280.png'/>
            <div className='flex flex-col'>
              <span className='text-5xl md:text-7xl font-black uppercase opacity-60 mix-blend-multiply tracking-tighter'>About Me</span>
              <div className='bg-neutral-900 text-neutral-900 opacity-70 uppercase font-mono select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px]'>
                Classified files
              </div>
            </div>
          </div>
          
          {/* Information */}
          <div className='w-[90%] flex flex-col justify-center items-center border-l-2 border-r-2'>
            {/* 1st Banner with picture and information */}
            <div className='flex flex-row gap-8 w-full p-16 pt-2 pb-4'>
               <img className='min-w-0 max-w-l w-64 h-80 object-cover opacity-90' src='/images/MG_2933.webp'/>
               <div className='flex flex-col h-full justify-center items-start p-8 pt-0 gap-4'>
                  <h4 className='font-black uppercase pb-4 border-b-2 text-4xl opacity-70'>Confidential</h4>
                  <p className='border-b uppercase w-full'><span className='font-bold opacity-70 uppercase'>Name:</span> <span className='font-mono'>Santiago Meneses Gómez</span></p>
                  <p className='border-b uppercase w-full'><span className='font-bold opacity-70 uppercase'>Age:</span>  <span className='font-mono'>23</span></p>
                  <p className='border-b uppercase w-full'><span className='font-bold opacity-70 uppercase'>Nationality:</span> <span className='font-mono'>Spanish</span></p>
                  <p className='border-b uppercase w-full'><span className='font-bold opacity-70 uppercase'>Occupation:</span> <span className='font-mono'>Graphics Programmer</span></p>
               </div>
            </div>
            <div className='w-md py-2 m-16 bg-neutral-900 text-neutral-900 uppercase font-mono select-none hover:text-white transition-colors duration-300 opacity-70 cursor-help px-1 inline-block my-[2px]'>
                  Classified files
            </div>
            {/* Border */}
            <div className=' flex flex-[1] w-[80%]  border-t-1 m-2 '/>
            {/* Grid with information (Work History, Report, Tech Stack, Likes and dislikes) */}
            <div className='grid grid-cols-2 w-full justify-center items-start gap-4 p-4 opacity-80'>
              <div className='flex flex-col items-center justify-center gap-2'>
                  <h4 className='text-4xl font-black uppercase opacity-70'>DEPLOYMENT LOG</h4>
                  <CompressedWorkHistory/>
                </div>
              <div className='flex flex-col items-center justify-center p-2 gap-2'>
                  <h4 className='text-4xl font-black uppercase opacity-70'>Report</h4>
                  <p className='font-mono border-1 p-4 text-justify'>
                  Graphics Programmer currently working in the research team MSLab in Rey Juan Carlos University. <br/>

                  I enjoy myself working on gameplay architecture that enhance both users' and designers' experience in video games. Additionally, I have a strong passion for computer graphics and real-time rendering techniques.
                  <br/>
                  In my work as a research assistant, I focus on integrating a full pipeline for the generation, assembly and simulation of garment patterns.
                  </p>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <h4 className='text-4xl font-black uppercase opacity-70'>Tech Stack</h4>
                <div className='grid grid-cols-3 p-4 gap-8'>
                  <Skill src='images/tech-cpp.png' alt='C++' techName='C++' small='Engine-level programming'/>
                  <Skill src='images/tech-csharp.png' alt='C#' techName='C#' small='Gameplay scripting and tools'/>
                  <Skill src='images/tech-python.png' alt='Python' techName='Python' small='Simulation pipelines'/>
                  <Skill src='images/tech-unity.png' alt='Unity' techName='Unity' small='Engine experience & gameplay systems'/>
                  <Skill src='images/tech-opengl.png' alt='Graphics' techName='Graphics APIs' small='OpenGL / Vulkan'/>
                  <Skill src='images/tech-ts.png' alt='TypeScript' techName='TypeScript' small='Front End Development (React) & tools'/>
                </div>
              </div>
              <div className='flex flex-col justify-center items-center gap-2'>
                <h4 className='text-4xl font-black uppercase opacity-70'>Likes</h4>
                <p className='font-mono p-4'>Game Jams, videogames, gym, photography, drawing, songwriting, travelling...</p>
                <h4 className='text-4xl font-black uppercase opacity-70'>Dislikes</h4>
                <p className='font-mono p-4'>Can't think of anything right now...</p>
              </div>
            </div>
          </div>
        </div>
      {/* Additional Papers Container */}
      <div className='absolute right-1/2 translate-x-full -mr-200 w-full max-w-5xl  blur-[4px]'>
        <div className='relative invisible 2xl:visible '>
          <div className="relative w-full max-w-5xl bg-[#e8e6df] text-neutral-900 shadow-lg/100 z-20 border border-neutral-300">
            <Pushpin color='red' className={"absolute top-2 left-1/2 -translate-x-1/2 z-10 size-2 lg:size-10 lg:top-3 "}/>
              {/* =========================================
                  ABOUT ME: FIELD EVALUATION
                  ========================================= */}
              <div className="p-6 md:p-10">
                <div className="border-b-4 border-neutral-900 pb-2 mb-8 mt-4">
                  <p className="text-xs tracking-widest uppercase font-mono text-neutral-600 mb-1">Addendum 01</p>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Field Evaluation</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-l-4 border-neutral-800 pl-4 md:pl-8">
                  
                  {/* Left Column: The Transcript */}
                  <div className="font-mono text-sm leading-relaxed flex flex-col gap-6">
                    <p className="text-xs tracking-widest uppercase font-sans font-bold border-b border-neutral-300 pb-1">Audio Transcript: Entry Session</p>
                    
                    <div>
                      <span className="font-bold font-sans tracking-wider text-xs">DIRECTOR:</span>
                      <p className="mt-1 pl-4 border-l border-neutral-400">State your primary directives and background for the record.</p>
                    </div>

                    <div>
                      <span className="font-bold font-sans tracking-wider text-xs">SUBJECT (SANTIAGO):</span>
                      <p className="mt-1 pl-4 border-l border-neutral-400">
                        I operate as a Graphics Programmer. My primary focus is bridging the gap between raw mathematical systems and visual output. I build rendering engines, optimize real-time pipelines, and research <Redaction>non-euclidean geometry</Redaction> at MSLab.
                      </p>
                    </div>

                    <div>
                      <span className="font-bold font-sans tracking-wider text-xs">DIRECTOR:</span>
                      <p className="mt-1 pl-4 border-l border-neutral-400">And your previous deployment?</p>
                    </div>

                    <div>
                      <span className="font-bold font-sans tracking-wider text-xs">SUBJECT (SANTIAGO):</span>
                      <p className="mt-1 pl-4 border-l border-neutral-400">
                        Extensive work in Unity and custom C++ engines. The goal is always to push hardware limits without triggering a <Redaction>critical system cascade</Redaction>.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Anomalous Traits (Skills/Hobbies) */}
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans font-bold border-b border-neutral-300 pb-1 mb-6">Observed Anomalies (Capabilities)</p>
                    
                    <ul className="space-y-4 font-mono text-xs">
                      <li className="flex gap-4 items-start">
                        <span className="text-neutral-500">[01]</span>
                        <div>
                          <strong className="uppercase block text-neutral-800">Advanced Toolmaking</strong>
                          <span className="text-neutral-600">Subject creates custom editors and debugging suites to manipulate environment variables on the fly.</span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-neutral-500">[02]</span>
                        <div>
                          <strong className="uppercase block text-neutral-800">Shader Manipulation</strong>
                          <span className="text-neutral-600">Demonstrates high proficiency with HLSL/GLSL. Capable of bending light and matter via <Redaction>mathematical intrusion</Redaction>.</span>
                        </div>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-neutral-500">[03]</span>
                        <div>
                          <strong className="uppercase block text-neutral-800">Low-Level Optimization</strong>
                          <span className="text-neutral-600">Memory management and multithreading behavior noted. Subject eliminates bottlenecks with extreme prejudice.</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* =========================================
                  CONTACT: SECURE COMMS LINK (Tear-off slip)
                  ========================================= */}
              <div className="mt-8 border-t-2 border-dashed border-neutral-400 bg-neutral-200 p-6 md:p-10 relative">
                
                {/* Scissors Icon / Tear-off indicator */}
                <div className="absolute top-[-12px] left-[10%] text-neutral-500 bg-neutral-900 px-2 rotate-180" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                  </svg>
                </div>

                <div className="max-w-2xl mx-auto">
                  <h3 className="text-center font-sans font-black uppercase tracking-widest text-xl mb-2">Internal Requisition Form</h3>
                  <p className="text-center font-mono text-xs text-neutral-500 mb-10 uppercase tracking-widest">
                    Direct Transmission to Subject: Santiago <br/>
                    Network: Secure
                  </p>

                  <form 
                    className="space-y-8 flex flex-col"
                    onSubmit={(e) => { e.preventDefault(); console.log('Transmitting...'); }}
                  >
                    {/* Row: Name and Org */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative group">
                        <label htmlFor="auth_name" className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                          Authorizing Agent (Name)
                        </label>
                        <input 
                          type="text" 
                          id="auth_name"
                          required
                          className="w-full bg-transparent border-0 border-b border-neutral-400 py-2 font-mono text-sm focus:ring-0 focus:border-neutral-900 outline-none transition-colors"
                        />
                      </div>

                      <div className="relative group">
                        <label htmlFor="auth_org" className="absolute -top-4 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                          Department / Agency
                        </label>
                        <input 
                          type="text" 
                          id="auth_org"
                          className="w-full bg-transparent border-0 border-b border-neutral-400 py-2 font-mono text-sm focus:ring-0 focus:border-neutral-900 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message Block */}
                    <div className="relative group pt-4">
                      <label htmlFor="transmission_body" className="absolute -top-1 left-0 text-[10px] font-bold uppercase tracking-widest text-neutral-600 group-focus-within:text-neutral-900 transition-colors">
                        Transmission Details
                      </label>
                      {/* 
                        Using a repeating linear gradient to create lines that look like 
                        ruled paper specifically for the textarea. 
                      */}
                      <textarea 
                        id="transmission_body"
                        rows="4"
                        required
                        style={{
                          lineHeight: '2rem',
                          backgroundImage: 'linear-gradient(transparent, transparent calc(2rem - 1px), #a3a3a3 0px)',
                          backgroundSize: '100% 2rem'
                        }}
                        className="w-full bg-transparent border-0 py-1 font-mono text-sm focus:ring-0 outline-none resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Action */}
                    <div className="flex justify-between items-end mt-8 border-t border-neutral-400 pt-6">
                      <div className="font-mono text-[10px] text-neutral-500 uppercase">
                        Warning: Falsifying directives is <br/> punishable under section 4.A
                      </div>
                      <button 
                        type="submit" 
                        className="bg-neutral-900 text-[#e8e6df] px-8 py-3 font-sans font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 hover:text-white transition-all active:scale-95 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-red-600 animate-pulse rounded-full"></span>
                        Transmit Data
                      </button>
                    </div>
                  </form>

                </div>
              </div>

            </div>
            {/* Decorative Back Paper */}
            {/* Inset-0 to match size */}
          <div className="absolute inset-0 w-full h-full max-w-5xl -translate-x-10 translate-y-8 rotate-1 bg-[#e8e6df] text-neutral-900 shadow-md/100  border border-neutral-300"/>
        </div>
      </div>
      
      
        
        
     
      </div>
      
    </section>
  );
};

export default AboutAndContact;