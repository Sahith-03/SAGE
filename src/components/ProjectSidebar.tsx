import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectSidebarProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectSidebar({ project, onClose }: ProjectSidebarProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setActiveImageIndex(0);
    }
  }, [project]);

  const images = project ? Array.from(new Set([project.image, ...(project.gallery || [])].filter(Boolean))) : [];

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] md:w-[600px] bg-white z-[101] shadow-2xl overflow-y-auto"
          >
            {/* Header / Close */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 flex justify-between items-center p-8 border-b border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-primary"></div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">Project_Dossier // {project.ref}</span>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">close</span>
              </button>
            </div>

            <div className="p-8 md:p-12">
              {/* Cover Image & Gallery */}
              {images.length > 0 && (
                <div className="mb-12">
                  <div className="relative overflow-hidden bg-surface-container aspect-video border border-outline-variant/20 mb-4 group">
                    <img 
                      src={images[activeImageIndex]} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[8px] font-mono px-2 py-1 uppercase tracking-tighter">
                      Visual_Capture: Active
                    </div>
                    {images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-mono px-3 py-1.5 uppercase tracking-widest flex gap-2">
                        <span>{String(activeImageIndex + 1).padStart(2, '0')}</span>
                        <span className="text-white/50">/</span>
                        <span className="text-white/50">{String(images.length).padStart(2, '0')}</span>
                      </div>
                    )}
                  </div>
                  
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-hide">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative flex-shrink-0 w-20 aspect-video border overflow-hidden snap-start transition-all ${
                            idx === activeImageIndex 
                              ? 'border-primary opacity-100 scale-100' 
                              : 'border-outline-variant/30 opacity-60 hover:opacity-100 scale-95 hover:scale-100'
                          }`}
                        >
                          <img src={img} alt={`${project.title} - view ${idx + 1}`} className="w-full h-full object-cover grayscale" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Title & Metadata */}
              <div className="mb-16">
                <span className="text-xs font-bold text-secondary uppercase tracking-[0.4em] mb-4 block">{project.type}</span>
                <h2 className="font-headline text-5xl text-primary tracking-tighter leading-none mb-8">{project.title}</h2>
                <p className="text-on-surface-variant leading-relaxed text-sm border-l-2 border-primary/20 pl-6">
                  {project.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] mb-6 border-b border-primary/10 pb-2">Technical_Specs</h4>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-outline font-mono block">Location</span>
                      <span className="text-xs font-bold uppercase text-primary">{project.location}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-outline font-mono block">Coordinates</span>
                      <span className="text-xs font-bold uppercase text-primary">{(project.lat ?? 0).toFixed(4)}° N, {(project.lng ?? 0).toFixed(4)}° E</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-outline font-mono block">Scale_Magnitude</span>
                      <span className="text-xs font-bold uppercase text-primary">{project.scale || 'N/A'}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase text-outline font-mono block">Logic_System</span>
                      <span className="text-xs font-bold uppercase text-primary">{project.logic || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] mb-6 border-b border-primary/10 pb-2">Material_Profile</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Self-Healing Concrete', 'Bio-Cedar', 'Dynamic Glass', 'Structural Steel'].map(m => (
                        <span key={m} className="px-3 py-1 bg-primary/5 border border-primary/10 text-[9px] uppercase tracking-widest text-primary font-bold">
                            {m}
                        </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-12 border-t border-outline-variant/20 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button className="text-[9px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors">Export_PDF</button>
                    <button className="text-[9px] font-bold uppercase tracking-widest text-outline hover:text-primary transition-colors">Print_Specs</button>
                  </div>
                  <span className="text-[8px] font-mono text-outline-variant uppercase">Registry_Entry: #{project.id.substring(0, 6)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
