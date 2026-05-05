import React, { useState, useEffect, useRef } from 'react';
import ReactGlobeComponent from 'react-globe.gl';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

// Handle CommonJS/ESM default export mismatch that happens in Vite with some packages
const Globe = (ReactGlobeComponent as any).default || ReactGlobeComponent;

class GlobeErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[600px] bg-red-950 text-red-400 p-8 flex flex-col items-center justify-center font-mono">
            <h2 className="text-xl font-bold mb-4">Globe Component Failed to Render</h2>
            <p className="mb-4">Error details:</p>
            <pre className="bg-black/50 p-4 rounded text-xs whitespace-pre-wrap">{this.state.error?.message}</pre>
            <pre className="bg-black/50 p-4 rounded text-[10px] mt-2 max-h-48 overflow-auto">{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

interface ProjectGlobeProps {
  onProjectClick: (project: Project) => void;
}

export default function ProjectGlobeErrorBoundaryWrapper(props: ProjectGlobeProps) {
  return (
    <GlobeErrorBoundary>
      <ProjectGlobe {...props} />
    </GlobeErrorBoundary>
  );
}

function ProjectGlobe({ onProjectClick }: ProjectGlobeProps) {
  const globeRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = true;
      
      // Setup initial camera position
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }
  }, [isMounted]);

  const gData = projects.map(p => ({
    lat: p.lat,
    lng: p.lng,
    project: p
  }));

  return (
    <div 
        ref={containerRef} 
        className="relative w-full h-[600px] bg-[#001529] overflow-hidden rounded-sm border border-outline-variant/20 shadow-2xl group select-none flex items-center justify-center"
    >
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Decorative UI elements */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <div className="flex items-center gap-3 bg-primary/40 backdrop-blur-sm p-2 border border-white/10">
            <div className="w-2 h-2 bg-[#a4c8ff] rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold font-mono">Global_Mesh_Active</span>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-3 bg-primary/40 backdrop-blur-sm p-4 border border-white/10">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#a4c8ff] border border-white shadow-[0_0_10px_rgba(164,200,255,0.5)] animate-pulse"></div>
            <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest font-bold">Project_Node</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 text-white/30 font-mono text-[9px] uppercase flex flex-col items-end gap-1 tracking-tighter pointer-events-none">
        <span>[ Click_Node_for_Specs ]</span>
        <span>[ Drag_to_Rotate_Globe ]</span>
        <span>[ Scroll_to_Zoom ]</span>
      </div>

      {isMounted && (
        <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="https://unpkg.com/three-globe/example/img/earth-dark.jpg"
            bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            htmlElementsData={gData}
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              el.innerHTML = `
                <div class="relative flex items-center justify-center group cursor-pointer" style="width: 40px; height: 40px; transform: translate(-50%, -50%);">
                  <div class="absolute w-8 h-8 rounded-full bg-[#a4c8ff] opacity-30 animate-ping"></div>
                  <div class="relative w-3 h-3 rounded-full bg-[#a4c8ff] border border-white shadow-[0_0_15px_rgba(164,200,255,1)]"></div>
                  
                  <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 flex flex-col items-center">
                      <div class="w-0.5 h-4 bg-[#a4c8ff]/50 mb-1"></div>
                      <div class="bg-[#001529]/90 border border-[#a4c8ff]/30 p-3 backdrop-blur-md shadow-2xl min-w-[150px] text-center">
                          <span class="block text-[8px] font-mono text-white/50 mb-1 border-b border-white/10 pb-1">REF_${d.project.ref}</span>
                          <span class="font-bold block text-[#a4c8ff] text-[11px] mb-1 uppercase tracking-wider">${d.project.title}</span>
                          <span class="font-mono text-[9px] text-white/70 uppercase tracking-widest">${d.project.location}</span>
                      </div>
                  </div>
                </div>
              `;
              el.style.pointerEvents = 'auto';
              el.onclick = () => onProjectClick(d.project);
              return el;
            }}
        />
      )}
    </div>
  );
}
