import React from 'react';

// Reusable Redaction component
const Redaction = ({ children }) => (
  <span className="bg-neutral-900 text-neutral-900 select-none hover:text-white transition-colors duration-300 cursor-help px-1 inline-block my-[2px]">
    {children}
  </span>
);

const ServiceRecord = () => {
  // Mock data for the work history
  const deployments = [
    {
      id: "DEP-004",
      date: "02.2025 - PRESENT",
      status: "ACTIVE",
      role: "Lead Graphics Researcher",
      facility: "MSLab - Rey Juan Carlos University",
      notes: "Directing research on heuristic lighting models. The pipeline requires daily maintenance to prevent <Redaction>unhandled vertex explosions</Redaction>. Subject has full clearance for engine modifications."
    },
    {
      id: "DEP-003",
      date: "09.2023 - 03.2025",
      status: "ARCHIVED",
      role: "Engine Programmer",
      facility: "Super Ninja Studio",
      notes: "Maintained the proprietary multiplayer combat framework. Rewrote the network interpolation logic after the <Redaction>desync incident</Redaction> of '24. Codebase has since been quarantined."
    },
    {
      id: "DEP-002",
      date: "01.2022 - 08.2023",
      status: "ARCHIVED",
      role: "Graphics / Tools Intern",
      facility: "Unknown Sector (NDA)",
      notes: "Developed internal C++ debugging tools for artists. Automated the texture compression pipeline, resulting in a 40% reduction in memory overhead. Records from this period are largely <Redaction>expunged</Redaction>."
    },
    {
      id: "DEP-001",
      date: "09.2018 - 05.2022",
      status: "CONCLUDED",
      role: "Computer Science Candidate",
      facility: "Rey Juan Carlos University",
      notes: "Foundational training. Subject demonstrated early anomalies in low-level memory management and shader compilation."
    }
  ];

  return (
    <section className="w-full flex justify-center items-start p-4 md:p-12 font-sans relative">
      
      {/* Dossier Container */}
      <div className="relative w-full max-w-5xl bg-[#e8e6df] text-neutral-900 shadow-2xl z-20 border border-neutral-300">
        
        <div className="p-6 md:p-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-neutral-900 pb-2 mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase font-mono text-neutral-600 mb-1">Addendum 02</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Service Record</h2>
            </div>
            {/* Fake Barcode / Identifier */}
            <div className="hidden md:flex flex-col items-end">
              <div className="h-6 w-32 flex gap-[2px] opacity-70">
                {/* Generating a fake barcode with random border widths */}
                {[...Array(15)].map((_, i) => (
                  <div key={i} className={`bg-neutral-900 h-full ${i % 3 === 0 ? 'w-2' : i % 2 === 0 ? 'w-[1px]' : 'w-1'}`}></div>
                ))}
              </div>
              <span className="font-mono text-[8px] tracking-widest mt-1">SYS.LOG.4491</span>
            </div>
          </div>

          {/* 
            THE LEDGER
            Instead of a timeline line, we use a grid with borders.
          */}
          <div className="border-t border-l border-neutral-400 bg-neutral-200/30">
            {deployments.map((item, index) => (
              <div 
                key={item.id} 
                className="grid grid-cols-1 md:grid-cols-12 group transition-all duration-300 hover:bg-[#e8e6df]"
              >
                
                {/* Left Column: Timestamp & Metadata */}
                <div className="md:col-span-3 border-r border-b border-neutral-400 p-4 font-mono flex flex-col justify-between group-hover:bg-neutral-900 group-hover:text-[#e8e6df] transition-colors duration-300">
                  <div>
                    <div className="text-xs tracking-widest mb-4 opacity-60">REF: {item.id}</div>
                    <div className="font-bold text-sm">{item.date}</div>
                  </div>
                  
                  <div className="mt-6">
                    <span className={`text-[10px] uppercase tracking-widest px-1 py-[2px] border ${item.status === 'ACTIVE' ? 'border-red-600 text-red-600 group-hover:border-red-400 group-hover:text-red-400' : 'border-current opacity-60'}`}>
                      [{item.status}]
                    </span>
                  </div>
                </div>

                {/* Right Column: Deployment Data */}
                <div className="md:col-span-9 border-r border-b border-neutral-400 p-4 md:p-6 md:pl-8 relative">
                  
                  {/* The actual "Timeline" visual connector for mobile (hidden on desktop) */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neutral-900 md:hidden block"></div>

                  <h3 className="font-sans text-2xl font-black uppercase tracking-tight leading-none mb-2">
                    {item.role}
                  </h3>
                  
                  <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-600 mb-4 pb-2 border-b border-neutral-300 flex items-center gap-2">
                    <span className="w-2 h-2 bg-neutral-900 inline-block"></span>
                    Facility: <span className="font-bold text-neutral-900">{item.facility}</span>
                  </div>
                  
                  <div className="font-mono text-sm leading-relaxed max-w-3xl">
                    <p dangerouslySetInnerHTML={{ __html: item.notes }}></p>
                  </div>

                </div>

              </div>
            ))}
          </div>
          
          {/* Footer Ledger Line */}
          <div className="w-full border-b border-neutral-400 mt-1 pb-1 flex justify-between font-mono text-[10px] uppercase text-neutral-500">
            <span>End of record</span>
            <span>Auth: Director</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceRecord;