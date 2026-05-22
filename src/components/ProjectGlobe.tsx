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
        <div className="w-full h-[650px] bg-surface text-error p-8 flex flex-col items-center justify-center border border-error/20 rounded-xl">
          <span className="text-4xl mb-4 material-symbols-outlined">error</span>
          <h2 className="text-lg font-headline mb-3">Visualization Error</h2>
          <pre className="bg-error/5 p-4 rounded text-sm text-error/80 whitespace-pre-wrap max-w-lg text-center font-mono">
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
  const outerRef   = useRef<HTMLDivElement>(null);
  const mountRef   = useRef<HTMLDivElement>(null);
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

      await new Promise<void>(res => { rafId = requestAnimationFrame(() => setTimeout(res, 300)); });
      if (!mountRef.current || !outerRef.current) return;

      const W = outerRef.current.offsetWidth  || outerRef.current.getBoundingClientRect().width  || 800;
      const H = outerRef.current.offsetHeight || outerRef.current.getBoundingClientRect().height || 650;

      const mod = await import('globe.gl');
      const GlobeGL = (mod as any).default?.default
                   ?? (mod as any).default
                   ?? (mod as any);
      if (!mountRef.current) return;

      // Group projects by approximate location to spread them out logically
      const locationGroups: Record<string, Project[]> = {};
      projects.forEach(p => {
        const key = `${Math.round(p.lat)},${Math.round(p.lng)}`;
        if (!locationGroups[key]) locationGroups[key] = [];
        locationGroups[key].push(p);
      });

      const arcs: any[] = [];
      const gData = projects.map(p => {
        const key = `${Math.round(p.lat)},${Math.round(p.lng)}`;
        const group = locationGroups[key];
        const indexInGroup = group.indexOf(p);
        const totalInGroup = group.length;

        let latOffset = 0;
        let lngOffset = 0;
        let isOffset = false;

        // Spread clustered nodes significantly so they form a beautiful, complex web
        if (totalInGroup > 1 && indexInGroup > 0) {
          const radius = 3.5; // Large spread radius to create visual complexity
          const angle = ((indexInGroup - 1) / (totalInGroup - 1)) * Math.PI * 2;
          latOffset = Math.sin(angle) * radius;
          lngOffset = Math.cos(angle) * radius;
          isOffset = true;
        }

        const finalLat = p.lat + latOffset;
        const finalLng = p.lng + lngOffset;

        if (isOffset) {
          arcs.push({
            startLat: p.lat,
            startLng: p.lng,
            endLat: finalLat,
            endLng: finalLng
          });
        }

        return {
          lat: finalLat,
          lng: finalLng,
          project: p,
          isOffset,
          isRoot: !isOffset
        };
      });

      // Generate Graticules (Latitude/Longitude structural grid)
      // This makes the globe look extremely detailed and architectural even when empty
      const graticules = [];
      for (let lat = -80; lat <= 80; lat += 20) {
        const coords = [];
        for (let lng = -180; lng <= 180; lng += 5) coords.push([lng, lat]);
        graticules.push({ coords });
      }
      for (let lng = -180; lng <= 180; lng += 20) {
        const coords = [];
        for (let lat = -80; lat <= 80; lat += 5) coords.push([lng, lat]);
        graticules.push({ coords });
      }

      // Slightly darker base so white polygons and grids pop beautifully
      const globeImageSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23f3f4f4'/%3E%3C/svg%3E`;

      globe = GlobeGL()(mountRef.current)
        .width(W)
        .height(H)
        .showGlobe(true)
        .globeImageUrl(globeImageSvg)
        .backgroundColor('rgba(0,0,0,0)')
        
        // Atmosphere for depth
        .showAtmosphere(true)
        .atmosphereColor('#cbd5e1')
        .atmosphereAltitude(0.12)
        
        // Architectural Lat/Lng Grid
        .pathsData(graticules)
        .pathPoints('coords')
        .pathColor(() => 'rgba(115, 119, 128, 0.15)') // Light grey lines matching outline-variant
        .pathStroke(0.4)
        
        // Raised 3D Landmasses
        .polygonsData((worldData as any).features)
        .polygonCapColor(() => '#ffffff') // Pure white top
        .polygonSideColor(() => '#e1e3e3') // Extrusion shadow
        .polygonStrokeColor(() => 'rgba(0, 45, 86, 0.12)') // Crisp primary outlines
        .polygonAltitude(0.015) // Give land actual 3D elevation
        
        // Points
        .pointsData(gData)
        .pointLat((d: any) => d.lat)
        .pointLng((d: any) => d.lng)
        .pointColor((d: any) => d.isRoot ? '#002d56' : '#366094')
        .pointAltitude((d: any) => d.isRoot ? 0.025 : 0.015) // Hover above land slightly
        .pointRadius((d: any) => d.isRoot ? 0.6 : 0.4)
        .pointsMerge(false)
        .pointResolution(32)
        
        // Rippling Rings
        .ringsData(gData)
        .ringLat((d: any) => d.lat)
        .ringLng((d: any) => d.lng)
        .ringColor((d: any) => d.isRoot ? 'rgba(0, 45, 86, 0.6)' : 'rgba(54, 96, 148, 0.3)')
        .ringMaxRadius((d: any) => d.isRoot ? 2.5 : 1.5)
        .ringPropagationSpeed(0.6)
        .ringRepeatPeriod(1800)
        .ringAltitude(0.02)

        // Arcs (Data Lines from root to offsets)
        .arcsData(arcs)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcColor(() => '#366094')
        .arcDashLength(0.6)
        .arcDashGap(0.3)
        .arcDashInitialGap(() => Math.random())
        .arcDashAnimateTime(2000)
        .arcAltitude(0.08) // Distinctly elevated arcs
        .arcStroke(0.4)

        // Interactions
        .onPointClick((d: any) => clickRef.current?.(d.project))
        .onPointHover((d: any) => {
          if (outerRef.current) {
            outerRef.current.style.cursor = d ? 'pointer' : 'default';
          }
          if (globe) {
            const controls = globe.controls();
            if (controls) {
              controls.autoRotate = !d;
            }
          }
        })
        
        // Tooltip
        .pointLabel((d: any) => {
          return `
            <div style="background: #ffffff; border: 1px solid rgba(195, 198, 209, 0.5); padding: 12px 18px; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 160px; pointer-events: none;">
              <span style="font-size: 13px; font-family: 'Noto Serif', serif; font-weight: 600; color: #002d56; text-align: center; margin:0; line-height: 1.2;">${d.project.title}</span>
              <span style="font-size: 11px; font-family: 'Manrope', sans-serif; font-weight: 500; color: #737780; text-align: center; margin:0; line-height: 1.2;">${d.project.location}</span>
            </div>
          `;
        })
        // Back up slightly to see the entire detailed network
        .pointOfView({ lat: 20, lng: 78, altitude: 2.2 }, 0);

      const controls = globe.controls();
      controls.autoRotate      = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom      = true;
      controls.enableDamping   = true;
      controls.dampingFactor   = 0.08;

      globeRef.current = globe;

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = entry.isIntersecting;
          }
        },
        { threshold: 0.1 }
      );
      intersectionObserver.observe(outerRef.current);

      const canvas = outerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.addEventListener('webglcontextlost', () => {
          setContextLost(true);
        }, false);
      }

      resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        if (globe && width && height) {
          globe.width(Math.floor(width)).height(Math.floor(height));
        }
      });
      resizeObserver.observe(outerRef.current);
    };

    init();

    const currentMount = mountRef.current;
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (globeRef.current) {
        try { globeRef.current._destructor?.(); } catch { /* ignore */ }
        globeRef.current = null;
      }
      if (currentMount) currentMount.innerHTML = '';
    };
  }, [projects]);

  return (
    <div ref={outerRef} className="relative w-full h-[450px] md:h-[650px] bg-white overflow-hidden rounded-2xl border border-outline-variant/30 shadow-sm">
      
      {/* Remove globe.gl default tooltip background */}
      <style>{`
        .scene-tooltip {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
          color: inherit !important;
        }
      `}</style>

      {/* Subtle blueprint corner grid */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 45, 86, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 45, 86, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Canvas mount */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* WebGL context lost fallback */}
      {contextLost && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
          <div className="text-outline-variant text-5xl mb-4 material-symbols-outlined">refresh</div>
          <p className="text-sm font-body text-on-surface-variant">WebGL Context Lost</p>
          <p className="text-xs font-body text-outline mt-2">Please refresh the page to restore the visualization.</p>
        </div>
      )}

      {/* Minimalist Architectural Legend */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none flex flex-col gap-3 bg-white/80 backdrop-blur-md px-5 py-4 rounded-xl border border-outline-variant/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/20" />
          <span className="text-[10px] font-mono text-on-surface uppercase tracking-widest font-bold">Primary Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-surface-tint ring-1 ring-surface-tint/30" />
          <span className="text-[10px] font-mono text-outline uppercase tracking-widest font-bold">Project Node</span>
        </div>
        <div className="h-px w-full bg-outline-variant/30 my-1" />
        <span className="text-[8px] font-mono text-outline uppercase tracking-[0.2em] text-center">Global Distribution Mesh</span>
      </div>

    </div>
  );
}
