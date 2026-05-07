import React from 'react';

// Reusable Redaction component
const Redaction = ({ children }) => (
  <span className="bg-neutral-900 text-neutral-900 select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px]">
    {children}
  </span>
);

const CompressedWorkHistory = () => {
  // Mock data (condensed notes for tighter fit)
  const deployments = [
    {
      id: "DEP-004",
      date: "04.25 - PRES",
      status: "ACTIVE",
      role: "Assistant Research Engineer",
      facility: "MSLab - Rey Juan Carlos University",
      notes: "Directing research on heuristic lighting models. Constant maintenance required to prevent <Redaction>vertex explosions</Redaction>."
    },
    {
      id: "DEP-003",
      date: "07.25 - 02.26",
      status: "ARCHIVED",
      role: "Assistant Research Engineer",
      facility: "MSLab - Rey Juan Carlos University",
      notes: "Rewrote network interpolation logic post-<Redaction>desync incident</Redaction>. Codebase quarantined."
    },
    {
      id: "DEP-002",
      date: "09.24 - 05.25",
      status: "ARCHIVED",
      role: "Master in Computer Graphics, Virtual Reality & Games",
      facility: "Rey Juan Carlos University",
      notes: "Rendering projects using Vulkan and OpenGL, implementing advanced effects such as SSAO and Raytracing."
    },
    {
      id: "DEP-001",
      date: "06.23 - 08.23",
      status: "ARCHIVED",
      role: "Gameplay Programmer (Internship)",
      facility: "Kumiho Esports S.L",
      notes: "Led the programming efort for a casual trivia videogame, delivering a fully functional demo presented at Gamescom 2024."
    }
  ];

  return (
    // This wrapper is designed to sit inside a larger grid column
    <div className="w-full flex flex-col font-sans">
      
      {/* Small Section Header */}
      {/* <div className="flex justify-between items-end border-b-2 border-neutral-900 pb-2 mb-4">
        <h3 className="font-sans font-black text-xl uppercase tracking-tighter">Deployment Log</h3>
        <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">Summary View</span>
      </div> */}

      {/* The Timeline Stack */}
      <div className="relative border-l-2 border-neutral-900 ml-2 space-y-6 pb-2">
        
        {deployments.map((item, index) => (
          <div key={item.id} className="relative pl-6 group">
            
            {/* The Timeline Node / Bullet */}
            <div className={`absolute -left-[5px] top-1 w-2 h-2 ${item.status === 'ACTIVE' ? 'bg-red-700 animate-pulse' : 'bg-neutral-900'} border border-[#e8e6df] shadow-[0_0_0_2px_#e8e6df]`}></div>
            
            {/* Hover Connector Line (Decorative) */}
            <div className="absolute left-0 top-2 h-0 w-4 border-t border-neutral-400 group-hover:border-neutral-900 transition-colors"></div>

            {/* Content Container */}
            <div className="flex flex-col">
              
              {/* Metadata Row */}
              <div className="flex justify-between items-start mb-1 font-mono text-[10px] uppercase tracking-widest">
                <span className={`font-bold ${item.status === 'ACTIVE' ? 'text-red-700' : 'text-neutral-900'}`}>
                  {item.date}
                </span>
                <span className="text-neutral-500 bg-neutral-200 px-1 border border-neutral-300">
                  {item.id}
                </span>
              </div>

              {/* Role & Facility */}
              <h4 className="font-sans font-black uppercase text-base leading-tight">
                {item.role}
              </h4>
              <span className="font-mono text-[10px] uppercase text-neutral-600 mb-2 border-b border-neutral-300 inline-block w-fit pb-1">
                @ {item.facility}
              </span>

              {/* Condensed Lore */}
              <p className="font-mono text-xs leading-relaxed text-neutral-800" dangerouslySetInnerHTML={{ __html: item.notes }}></p>
              
            </div>
          </div>
        ))}

        {/* End of Line Marker */}
        <div className="absolute -bottom-2 -left-[5px] w-2 h-2 bg-transparent border-2 border-neutral-900"></div>

      </div>

    </div>
  );
};

export default CompressedWorkHistory;