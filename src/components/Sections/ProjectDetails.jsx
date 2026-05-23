import React, { useState } from 'react';
import { useAppContext } from '../../AppContext';

// Reusable Redaction component
const Redaction = ({ children }) => (
  <span className="bg-neutral-900 text-neutral-900 select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px]">
    {children}
  </span>
);

// In a real app, 'projectData' would come from your Router/State based on the clicked project.
// We are using default mock data here so you can see the layout immediately.
const ProjectDetails = ({ 
  projectData = {
    id: "AWE-01",
    title: "Subject Zero",
    src: ["/images/projects-szero.png"],
    classification: "CONTAINED",
    date: "10.24.2025",
    role: "Lead Graphics Engineer",
    techStack: "Unity, C#, HLSL",
    repoLink: "https://github.com/yourusername/subject-zero",
    overview: "Subject Zero was an isolated experiment to test heuristic lighting calculations in a confined 2D environment. The primary objective was to push Unity's default rendering pipeline beyond standard operational limits.",
    technicalDetails: "Implementation required writing custom HLSL shaders to handle light occlusion dynamically. Memory leaks were detected early in development but were traced back to <Redaction>recursive shadow casting</Redaction> rather than the core engine loop. Performance stabilized after implementing a strict object-pooling protocol.",
    anomalies: "During stress testing, the lighting engine began exhibiting non-deterministic behavior. Shadows appeared to <Redaction>persist for 3 frames</Redaction> after the light source was terminated. This was left in the final build as an 'unplanned feature'."
  } 
}) => {
  const {projectPageVisibility, setProjectPageVisibility} = useAppContext();
  const [currentPic, setCurrentPicture] = useState(0);

  const handlePictureChange = (value) => 
  {
    let pictureIndex = Math.max(Math.min(currentPic + value, projectData.src.length), 0);
    console.log(`Current picture index is: ${pictureIndex}, sources are: ${projectData.src} and current source would be: ${projectData.src[pictureIndex]}` )
    setCurrentPicture(pictureIndex);
  };

  return (
    <div className="fixed top-0 left-0 bg-neutral-900/80  w-full min-h-screen flex  overflow-y-auto justify-center items-start p-4 md:p-12 font-sans z-30">
      
      {/* Dossier Container */}
      <div className="relative w-full max-w-4xl bg-[#e8e6df] mt-20 text-neutral-900 shadow-2xl z-20 border border-neutral-300 pb-12">
      
        {/* Navigation Bar / Top Header */}
        <div className="flex justify-between items-center  border-b border-neutral-400 p-4 bg-neutral-200">
          <button onClick={() => setProjectPageVisibility(false)} className="font-mono text-xs uppercase tracking-widest font-bold hover:text-red-700 transition-colors flex items-center gap-2">
            <span>[</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Return to Archive
            <span>]</span>
          </button>
          <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
            Page 1 of 1
          </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Document Header */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-neutral-900 pb-4 mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase font-mono text-neutral-600 mb-1">Expanded Incident Report</p>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{projectData.title}</h1>
            </div>
            
            {/* Classification Stamp */}
            <div className={`mt-4 md:mt-0 p-2 border-2 border-dashed rotate-2 ${projectData.classification === 'CONTAINED' ? 'border-green-800 text-green-800' : 'border-red-800 text-red-800'}`}>
              <span className="font-sans font-black text-xl uppercase tracking-widest block transform -rotate-2">
                {projectData.classification}
              </span>
            </div>
          </div>

          {/* Top Visual & Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 border-b border-neutral-400 pb-10">
            
            {/* Left: Main Evidence Image (Spans 8 cols) */}
            <div className="md:col-span-8 relative">
               {/* Photo Mounts */}
               <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-neutral-800 z-10"></div>
               <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-neutral-800 z-10"></div>
               <div className="bg-neutral-300 p-1 border border-neutral-400">
                 <img 
                   src={projectData.src[currentPic]}
                   alt="Incident Evidence" 
                   className="w-full aspect-video object-cover  contrast-125 mix-blend-multiply" 
                 />
               </div>
               <div className='absolute top-1/2 w-full '>
                {currentPic > 0 && (<button className='absolute left-0 rounded-full bg-neutral-700 text-white size-4 flex items-center p-3 justify-center hover:bg-neutral-400 ml-2' onClick={() => handlePictureChange(-1)}>
                  <i className='fa fa-arrow-left'></i>
                </button>)}
                {currentPic < (projectData.src.length - 1) && (<button className='absolute right-0 rounded-full bg-neutral-700 text-white size-4 flex items-center justify-center p-3 hover:bg-neutral-400 mr-2' onClick={() => handlePictureChange(1)}>
                  <i className='fa fa-arrow-right'></i>
                </button>)}
               </div>
               <p className="text-[10px] font-mono uppercase text-neutral-500 mt-2 text-right">Fig 1. Captured visual output.</p>
            </div>

            {/* Right: Technical Metadata (Spans 4 cols) */}
            <div className="md:col-span-4 flex flex-col font-mono text-xs uppercase tracking-wide border-t md:border-t-0 md:border-l border-neutral-400 md:pl-6 pt-6 md:pt-0">
              
              <div className="mb-4">
                <span className="block font-sans font-bold text-[10px] text-neutral-500 mb-1 border-b border-neutral-300">File Reference</span>
                <span>{projectData.id}</span>
              </div>

              <div className="mb-4">
                <span className="block font-sans font-bold text-[10px] text-neutral-500 mb-1 border-b border-neutral-300">Date of Record</span>
                <span>{projectData.date}</span>
              </div>

              <div className="mb-4">
                <span className="block font-sans font-bold text-[10px] text-neutral-500 mb-1 border-b border-neutral-300">Agent Role</span>
                <span>{projectData.role}</span>
              </div>

              <div className="mb-4 flex-grow">
                <span className="block font-sans font-bold text-[10px] text-neutral-500 mb-1 border-b border-neutral-300">Methodology / Stack</span>
                <span className="bg-neutral-800 text-[#e8e6df] px-2 py-1 mt-2 inline-block">
                  {projectData.techStack}
                </span>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-4">
                <a 
                  href={projectData.repoLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full text-center border-2 border-neutral-900 py-2 hover:bg-neutral-900 hover:text-[#e8e6df] transition-colors"
                >
                  Access Source [External]
                </a>
              </div>

            </div>
          </div>

          {/* Report Body / Lore */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-sm leading-relaxed">
            
            {/* Left Col (empty on desktop to create a strict margin layout) */}
            <div className="hidden lg:block lg:col-span-2 border-r border-neutral-300">
               <span className="writing-vertical rotate-180 text-[10px] uppercase tracking-widest text-neutral-400 w-full text-center pt-8">
                 Transcribed by: Auto-Dictation
               </span>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-10 space-y-8">
              
              <section>
                <h3 className="text-xs tracking-widest uppercase font-sans font-bold mb-2 text-neutral-500">Overview</h3>
                <p>{projectData.overview}</p>
              </section>

              {projectData.technicalDetails && (<section>
                <h3 className="text-xs tracking-widest uppercase font-sans font-bold mb-2 text-neutral-500">Technical Execution</h3>
                <p dangerouslySetInnerHTML={{ __html: projectData.technicalDetails }}></p>
              </section>)}

              {projectData.anomalies && (<section className="bg-neutral-200 p-4 border border-neutral-400 border-l-4 border-l-red-800">
                <h3 className="text-xs tracking-widest uppercase font-sans font-bold mb-2 text-red-900"> Observations</h3>
                <p dangerouslySetInnerHTML={{ __html: projectData.anomalies }}></p>
              </section>)}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;