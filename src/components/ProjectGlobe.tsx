import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../data/projects';
import worldData from '../data/world.json';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ProjectGlobeProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

// ── Error Boundary ────────────────────────────────────────────────────────────
class GlobeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-[650px] bg-[#000d1a] text-red-400 p-8 flex flex-col items-center justify-center font-mono border border-red-900/40 rounded-sm">
          <span className="text-4xl mb-4">⚠</span>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-widest">Globe Render Error</h2>
          <pre className="bg-black/50 p-4 rounded text-xs whitespace-pre-wrap max-w-lg text-center">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Exported wrapper ──────────────────────────────────────────────────────────
export default function ProjectGlobeWrapper(props: ProjectGlobeProps) {
  return (
    <GlobeErrorBoundary>
      <ProjectGlobe {...props} />
    </GlobeErrorBoundary>
  );
}

// ── Inner Globe ───────────────────────────────────────────────────────────────
function ProjectGlobe({ projects, onProjectClick }: ProjectGlobeProps) {
  const outerRef   = useRef<HTMLDivElement>(null);   // outer visible container
  const mountRef   = useRef<HTMLDivElement>(null);   // canvas mount point (absolute)
  const globeRef   = useRef<any>(null);
  const clickRef   = useRef(onProjectClick);
  const [contextLost, setContextLost] = useState(false);
  useEffect(() => { clickRef.current = onProjectClick; }, [onProjectClick]);

  useEffect(() => {
    let globe: any = null;
    let rafId: number;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;

    const init = async () => {
      if (!mountRef.current || !outerRef.current) return;

      // Wait one rAF + 300ms so the browser has committed layout and initial animations have settled
      await new Promise<void>(res => { rafId = requestAnimationFrame(() => setTimeout(res, 300)); });
      if (!mountRef.current || !outerRef.current) return;

      // Read dimensions from the OUTER container (explicit h-[650px]) — always reliable
      // The inner mountRef is position:absolute so offsetWidth/Height can be 0 before paint
      const W = outerRef.current.offsetWidth  || outerRef.current.getBoundingClientRect().width  || 800;
      const H = outerRef.current.offsetHeight || outerRef.current.getBoundingClientRect().height || 650;

      const mod = await import('globe.gl');
      // UMD min bundle: may export as default, or as the function itself
      const GlobeGL = (mod as any).default?.default
                   ?? (mod as any).default
                   ?? (mod as any);
      if (!mountRef.current) return;

      const gData = projects.map(p => ({ lat: p.lat, lng: p.lng, project: p }));

      globe = GlobeGL()(mountRef.current)
        .width(W)
        .height(H)
        .showGlobe(true)
        .globeImageUrl("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23000814'/%3E%3C/svg%3E")
        .backgroundColor('rgba(0,0,0,0)')
        .showAtmosphere(true)
        .atmosphereColor('#1a6fb0')
        .atmosphereAltitude(0.15)
        .polygonsData((worldData as any).features)
        .polygonCapColor(() => 'rgba(164, 200, 255, 0.05)')
        .polygonSideColor(() => 'rgba(164, 200, 255, 0.02)')
        .polygonStrokeColor(() => 'rgba(164, 200, 255, 0.4)')
        .htmlElementsData(gData)
        .htmlElement((d: any) => buildPin(d.project, clickRef))
        .pointOfView({ lat: 20, lng: 0, altitude: 2.4 }, 0);

      const controls = globe.controls();
      controls.autoRotate      = true;
      controls.autoRotateSpeed = 0.55;
      controls.enableZoom      = true;
      controls.enableDamping   = true;
      controls.dampingFactor   = 0.08;

      globeRef.current = globe;

      // Pause auto-rotate when scrolled off-screen → saves GPU / WebGL context budget
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = entry.isIntersecting;
          }
        },
        { threshold: 0.1 }
      );
      intersectionObserver.observe(outerRef.current);

      // Handle WebGL context loss gracefully
      const canvas = outerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.addEventListener('webglcontextlost', () => {
          setContextLost(true);
        }, false);
      }

      // Responsive: resize when the outer container changes
      resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        if (globe && width && height) {
          globe.width(Math.floor(width)).height(Math.floor(height));
        }
      });
      resizeObserver.observe(outerRef.current);
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (globeRef.current) {
        try { globeRef.current._destructor?.(); } catch (_) {}
        globeRef.current = null;
      }
      // Clear any canvas left in mount node
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [projects]); // run when projects change

  return (
    <div ref={outerRef} className="relative w-full h-[450px] md:h-[650px] bg-[#000d1a] overflow-hidden rounded-sm border border-[#a4c8ff]/10 shadow-[0_0_80px_rgba(0,21,41,0.8)]">

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#a4c8ff 1px, transparent 1px), linear-gradient(90deg, #a4c8ff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Canvas mount */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* WebGL context lost fallback */}
      {contextLost && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#000d1a]/95 backdrop-blur-sm">
          <div className="text-[#a4c8ff]/40 text-5xl mb-4">◎</div>
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">WebGL_Context_Lost</p>
          <p className="text-[9px] font-mono text-white/25 uppercase tracking-widest mt-2">Refresh page to restore globe</p>
        </div>
      )}

      {/* ── HUD: top-left status ── */}
      <div className="absolute top-5 left-5 z-20 pointer-events-none">
        <div className="flex items-center gap-3 bg-[#001529]/80 backdrop-blur-sm px-3 py-2 border border-[#a4c8ff]/15">
          <div className="w-2 h-2 bg-[#a4c8ff] rounded-full animate-pulse shadow-[0_0_6px_#a4c8ff]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold font-mono">
            Global_Mesh_Active
          </span>
        </div>
      </div>

      {/* ── HUD: top-right metadata ── */}
      <div className="absolute top-5 right-5 z-20 pointer-events-none text-right hidden md:flex flex-col gap-1">
        <span className="text-[8px] font-mono text-[#a4c8ff]/40 uppercase tracking-widest">
          Nodes_Mapped: {projects.length}
        </span>
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
          Engine: globe.gl // WebGL
        </span>
      </div>

      {/* ── HUD: bottom-left legend ── */}
      <div className="absolute bottom-5 left-5 z-20 pointer-events-none space-y-2 bg-[#001529]/70 backdrop-blur-sm p-3 border border-[#a4c8ff]/10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#a4c8ff] shadow-[0_0_8px_rgba(164,200,255,0.8)] animate-pulse" />
          <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest">Project_Node_Active</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full border border-[#a4c8ff]/30 bg-[#a4c8ff]/10" />
          <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Pulse_Radius</span>
        </div>
      </div>

      {/* ── HUD: bottom-right controls ── */}
      <div className="absolute bottom-5 right-5 z-20 pointer-events-none text-right hidden md:flex flex-col gap-1">
        <span className="text-[8px] font-mono text-white/25 uppercase tracking-tighter">[ Click Node → Dossier ]</span>
        <span className="text-[8px] font-mono text-white/25 uppercase tracking-tighter">[ Drag → Rotate Globe ]</span>
        <span className="text-[8px] font-mono text-white/25 uppercase tracking-tighter">[ Scroll → Zoom ]</span>
      </div>

      {/* Styles for the HTML pin elements rendered inside the globe canvas */}
      <style>{PIN_STYLES}</style>
    </div>
  );
}

// ── Pin builder (runs inside globe.gl's htmlElement callback) ─────────────────
function buildPin(project: Project, clickRef: React.RefObject<((p: Project) => void) | null>): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'gpin';
  wrapper.style.cssText =
    'width:40px;height:40px;position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;transform:translate(-50%,-50%);pointer-events:auto;';

  const pulse   = document.createElement('div'); pulse.className   = 'gpin-pulse';
  const dot     = document.createElement('div'); dot.className     = 'gpin-dot';
  const tooltip = document.createElement('div'); tooltip.className = 'gpin-tt';

  tooltip.innerHTML = `
    <div class="gpin-tt-inner">
      <span class="gpin-ref">REF_${project.ref}</span>
      <span class="gpin-title">${project.title}</span>
      <span class="gpin-loc">${project.location}</span>
    </div>
    <div class="gpin-stem"></div>
  `;

  wrapper.appendChild(pulse);
  wrapper.appendChild(dot);
  wrapper.appendChild(tooltip);

  // JS-driven hover (avoids CSS :has() unreliability inside WebGL canvas)
  wrapper.addEventListener('mouseenter', () => {
    tooltip.classList.add('gpin-tt--visible');
    dot.classList.add('gpin-dot--hover');
  });
  wrapper.addEventListener('mouseleave', () => {
    tooltip.classList.remove('gpin-tt--visible');
    dot.classList.remove('gpin-dot--hover');
  });

  wrapper.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    clickRef.current?.(project);
  });

  return wrapper;
}

// ── Injected CSS for pins ─────────────────────────────────────────────────────
const PIN_STYLES = `
  .gpin { z-index: 1; }

  .gpin-pulse {
    position: absolute;
    width: 30px; height: 30px;
    border-radius: 50%;
    background: rgba(164, 200, 255, 0.22);
    animation: gpin-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    pointer-events: none;
  }
  .gpin-dot {
    position: relative;
    width: 11px; height: 11px;
    border-radius: 50%;
    background: #a4c8ff;
    border: 1.5px solid #ffffff;
    box-shadow: 0 0 12px 2px rgba(164,200,255,0.7);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    z-index: 2;
  }
  .gpin-dot--hover {
    transform: scale(1.55);
    box-shadow: 0 0 22px 4px rgba(164,200,255,1);
  }

  .gpin-tt {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.22s ease, transform 0.22s ease;
    transform-origin: bottom center;
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    z-index: 50;
  }
  .gpin-tt--visible {
    opacity: 1;
    pointer-events: auto;
  }
  .gpin-tt-inner {
    background: rgba(0, 18, 38, 0.92);
    border: 1px solid rgba(164,200,255,0.25);
    padding: 8px 14px;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(164,200,255,0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 155px;
  }
  .gpin-stem {
    width: 1px; height: 12px;
    background: linear-gradient(to bottom, rgba(164,200,255,0.5), transparent);
    margin-top: 2px;
  }
  .gpin-ref {
    font-size: 8px;
    font-family: monospace;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    width: 100%;
    text-align: center;
    padding-bottom: 4px;
    margin-bottom: 2px;
  }
  .gpin-title {
    font-size: 11px;
    font-weight: 700;
    color: #a4c8ff;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    text-align: center;
  }
  .gpin-loc {
    font-size: 8.5px;
    font-family: monospace;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
  }

  @keyframes gpin-ping {
    0%   { transform: scale(0.7); opacity: 0.6; }
    70%  { transform: scale(2.4); opacity: 0; }
    100% { transform: scale(2.4); opacity: 0; }
  }
`;
