import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

// Import local data to prevent any network or CORS issues
import geoData from '../data/world.json';

interface ProjectMapProps {
  onProjectClick: (project: Project) => void;
}

export default function ProjectMap({ onProjectClick }: ProjectMapProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-primary overflow-hidden rounded-sm border border-outline-variant/20 shadow-2xl group select-none">
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="absolute top-6 left-6 z-20">
        <div className="flex items-center gap-3 bg-primary/40 backdrop-blur-sm p-2 border border-white/10">
            <div className="w-2 h-2 bg-[#a4c8ff] rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold font-mono">Territorial_Node_Registry</span>
        </div>
      </div>

      <ComposableMap
        projectionConfig={{ scale: 160, center: [0, 20] }}
        style={{ width: "100%", height: "100%" }}
      >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#124376" 
                  stroke="#19487b" 
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#19487b", outline: "none" },
                    pressed: { fill: "#002d56", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {projects.map((project) => (
            <Marker 
                key={project.id} 
                coordinates={[project.lng, project.lat]}
            >
              <g 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onProjectClick(project)}
              >
                <circle r={10} fill="#ffffff" opacity={0.15} className="animate-ping" />
                <circle r={5} fill="#a4c8ff" stroke="#ffffff" strokeWidth={1.5} />
                <circle r={20} fill="transparent" /> {/* Interaction area */}
              </g>
            </Marker>
          ))}
      </ComposableMap>

      {/* Tooltip */}
      {hoveredProject && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur p-4 border border-primary/20 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
          <div className="flex items-center gap-4 mb-3 border-b border-primary/10 pb-2">
            <span className="text-[9px] font-mono bg-primary text-white px-2 py-0.5">#{hoveredProject.ref}</span>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-black">{hoveredProject.type}</span>
          </div>
          <h4 className="text-sm font-headline text-primary font-bold uppercase mb-2">{hoveredProject.title}</h4>
          <div className="flex items-center gap-2 text-[10px] text-outline font-mono">
             <span className="opacity-40">LOC //</span> {hoveredProject.location}
          </div>
        </div>
      )}

      {/* Interaction Legend */}
      <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3 bg-primary/40 backdrop-blur-sm p-4 border border-white/10">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#124376] border border-white/20"></div>
            <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest font-bold">Structural_Territory</span>
        </div>
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#a4c8ff] border border-white shadow-[0_0_10px_rgba(164,200,255,0.5)]"></div>
            <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest font-bold">Project_Node_Active</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 text-white/30 font-mono text-[9px] uppercase flex flex-col items-end gap-1 tracking-tighter">
        <span>[ Click_Node_for_Specs ]</span>
        <span>[ Drag_to_Navigate_Mesh ]</span>
      </div>
    </div>
  );
}
