import React, {useState} from 'react';
import Pushpin from '../blocks/Pushpin';
import { useAppContext } from '../../AppContext';
import ProjectDetails from './ProjectDetails';
// Reuse the Redaction component from the Hero
const Redaction = ({ children }) => (
  <span className="bg-neutral-900 text-neutral-900 select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px]">
    {children}
  </span>
);

const ProjectsDossier = () => {
  const {projectPageVisible, setProjectPageVisibility} = useAppContext();
  const [currentProjectDetails, setProjectDetails] = useState({});
  // Data array to keep the JSX clean and manageable
  const caseFiles = [
    {
      id: "AWE-01",
      title: "Subject Zero",
      type: "2D Survival Horror",
      status: "CONTAINED",
      tech: "C# / Unity ",
      description: "Explore the depths of an abandoned lab, trapped among mutants and grotesque monsters shoot your way out.",
      src: "/images/projects-szero.png",
      imgAlt: "Subject Zero gameplay capture",
      details: {
        id: "PRJ-01",
        src: ["/images/szero/zero2-mainmenu.png","/images/szero/zero2-options.png","/images/szero/zero2-skills.png","/images/szero/zero2-game.png",
          "/images/szero/zero2-game2.png","/images/szero/zero2-game3.png"],
        title: "Subject Zero",
        classification: "CONTAINED",
        date: "01.01.1990",
        role: "Programmer",
        techStack: "Unity, C#",
        overview: `You are an adventurer exploring the depths of an abandoned lab where all sorts of mutant creatures escaped and are roaming each floor. In the darkest room of the lab, Subject Zero has awaken and it is on an unstoppable path to eliminate you, yours is the decision to whether try to take him on or navigate the lab,
        obtain more equipment, level up until you are strong enough to defeat him in this roguelike survival horror game.`,
      }
    },
    {
      id: "INC-44",
      title: "Super Ninja Deathmatch",
      type: "Multiplayer Combat",
      status: "ACTIVE",
      tech: "C# / Unity/ Netcode",
      description: "Party game for up to 4 players. Local and online multiplayer using Netcode for GameObjects. Physics calculations were handled via <Redaction>non-standard</Redaction> proprietary pipelines.",
      src: "/images/projects-ninja.png",
      imgAlt: "Super Ninja Deathmatch gameplay",
      details: {
        id: "PRJ-02",
        src: ["/images/ninja/ninja-home.png","/images/ninja/ninja-select.png","/images/ninja/ninja-tut.png","/images/ninja/ninja-tut-2.png","/images/ninja/ninja-itch-1.png","/images/ninja/ninja-itch-2.png"],
        title: "Super Ninja Deathmatch",
        classification: "CONTAINED",
        date: "01.01.1990",
        role: "Gameplay Programmer",
        techStack: "Unity, C#, Netcode",
        overview: `Small little casual party game for up to 4 players, supporting both local and online multiplayer connecting through Unity services. You play as a ninja in a frenetic gameplay where you can throw shurikens, dash to kill enemies and clash in epic sword fights against bots or your friends.`
      }
    },
    {
      id: "TECH-A",
      title: "OpenGl Game Engine",
      type: "Engine",
      status: "IN DEVELOPMENT",
      tech: "C++ / OpenGL",
      description: "Custom game engine. Capable of processing high-poly geometry and heuristic lighting without <Redaction>system degradation</Redaction>.",
      src: "/images/gl/gl-5.png",
      imgAlt: "OpenGL Engine showcase",
      details: {
        id: "PRJ-03",
        src: ["/images/opengl.png", "/images/gl/gl-3.png", "/images/gl/gl-4.png","/images/gl/gl-5.png"],
        title: "OpenGL Game Engine",
        classification: "DEVELOPMENT",
        date: "28.02.2026",
        role: "Programmer",
        techStack: "C++, OpenGL, GLSL",
        repoLink: "https://github.com/popieyes/GL_Engine",
        overview: `At university, I worked on several projects based on OpenGL, however, I never felt at the end that I had a complete grasp on the theory and usage of OpenGL, so I decided to start one from scratch.
                  Building it myself from the ground was the best decision, since I finally understood the decision behind every line and the layout of the code. Most importantly, it was mine to explore and create.`,
        technicalDetails: "The design is meant to be decoupled, separating the actual engine from the editor, so in the future I can change and explore other options, such as Vulkan or DirectX and implement them directly by just swapping them.",
        anomalies: "This project is meant to be an open one where I constantly iterate it, making games on it while improving the engine to make more quality projects."
      }
    },
    {
      id: "TECH-B",
      title: "Water Toon Shader",
      type: "Material Research",
      status: "CLASSIFIED",
      tech: "HLSL / Unity",
      description: "Shader tessellation and vertex manipulation. Creates heuristic <Redaction></Redaction> water displacement, foam and waves.",
      src: "/images/projects-waterShader.gif",
      imgAlt: "Water flow shader visual",
      details: {
        id: "PRJ-04",
        src: ["/images/projects-waterShader.gif"],
        title: "Water Toon Shader",
        classification: "CLASSIFIED",
        date: "Unknown",
        role: "Shaders Programmer",
        techStack: "Unity, HLSL",
        overview: `Simple water shader with a toon look made following a tutorial from Roystan. Implemented thoroughly all features to give the most polished look to the scene as possible, creating the foam, wave movement and floating objects on the water.`
      }
    },
    {
      id: "TECH-C",
      title: "Nori Render Engine",
      type: "Physically Based Rendering",
      status: "CLASSIFIED",
      tech: "C++ / Vulkan",
      description: "Path tracer using Nori engine. Implemented PDFs and accurate light bouncing and material properties. Tests on reflective and metallic surfaces yielding <Redaction>great results</Redaction>.",
      src: "/images/projects-nori.jpeg",
      imgAlt: "PBR Engine spheres",
      details: {
        id: "PRJ-05",
        title: "Nori Render Engine",
        src: ["/images/projects-nori.jpeg"] ,
        classification: "CONTAINED",
        date: "10.24.2025",
        role: "Programmer",
        techStack: "C++, Nori",
        repoLink: "",
        overview: "Worked on a path tracer engine, implementing the path tracing from the ground up, building the PDFs and ray interactions with materials, finally being able to render realistic scenes with different type of simulated materials.",
        technicalDetails: "",
        anomalies: ""
        
        
      }
    }
  ];

  const handleProjectOpen = (project) => {
    setProjectPageVisibility(true);
    setProjectDetails(project);
  };
  return (
    // Outer environment (matches the Hero section)
    <section id="projects" className="w-full flex justify-center items-start p-4 md:p-12 font-sans relative">
      
      {/* Main Dossier Container */}
      <div className="relative w-full max-w-5xl bg-[#e8e6df] text-neutral-900 p-6 md:p-10 shadow-2xl z-20 border border-neutral-300">
      <Pushpin color='red' className={"absolute top-2 left-1/2 -translate-x-1/2 z-10 size-2 lg:size-10 lg:top-3 "}/>
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-neutral-900 pb-2 mb-8 mt-4">
          <div>
            <p className="text-xs tracking-widest uppercase font-mono text-neutral-600 mb-1">Appendix C</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Incident Log</h2>
          </div>
          <div className="text-right text-xs tracking-widest uppercase font-mono mt-4 md:mt-0 bg-neutral-200 p-2 border border-neutral-400">
            Clearance Level: Red <br />
            Eyes Only
          </div>
        </div>

        {/* THE BUREAUCRATIC GRID */}
        {/* 1 col on mobile, 2 on tablets, 3 on desktop. Thin borders create the table. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-400">
          
          {caseFiles.map((item) => (
            <div key={item.id} onClick={() => handleProjectOpen(item.details)}  className="border-r border-b border-neutral-400 p-4 flex flex-col group hover:bg-neutral-200 transition-colors duration-300 cursor-pointer">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                <span>{item.id}</span>
                <span className={`px-1 border ${item.status === 'CLASSIFIED' ? 'border-red-800 text-red-800' : 'border-neutral-500'}`}>
                  {item.status}
                </span>
              </div>

              {/* Title & Type */}
              <h3 className="text-xl font-bold uppercase tracking-tight leading-none mb-1">{item.title}</h3>
              <p className="text-xs uppercase font-mono text-neutral-600 mb-4 pb-2 border-b border-neutral-300">
                Type: {item.type}
              </p>

              {/* The "Evidence" Image */}
              <div className="w-full aspect-video bg-neutral-300 mb-4 relative overflow-hidden border border-neutral-400 p-1">
                {/* Simulated photo corner mounts */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-800 z-10"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-800 z-10"></div>
                
                {/* 
                  Replace the src with your actual project image paths. 
                  The mix-blend-multiply ensures it looks printed onto the paper.
                */}
                <img 
                  src={item.src} 
                  alt={item.imgAlt}
                  className="w-full h-full object-cover contrast-125 mix-blend-multiply opacity-90 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Data & Lore */}
              <div className="flex-grow font-mono text-xs leading-relaxed mb-4">
                <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>

              {/* Footer / Tech Stack */}
              <div className="mt-auto pt-3 border-t border-neutral-400 border-dashed font-mono text-[10px] uppercase flex justify-between items-center">
                <span className="font-bold text-neutral-500">Methodology:</span>
                <span className="bg-neutral-800 text-[#e8e6df] px-2 py-1">{item.tech}</span>
              </div>

            </div>
          ))}

          {/* Empty Grid Cell Filler (to make the form look continuous if items are uneven) */}
          <div className="border-r border-b border-neutral-400 p-4 hidden lg:flex flex-col items-center justify-center text-neutral-400 font-mono text-xs uppercase opacity-50">
            [ END OF FILE ]
          </div>

        </div>
        
      </div>
       {projectPageVisible && (<ProjectDetails projectData={currentProjectDetails}/>)}
    </section>
  );
};

export default ProjectsDossier;