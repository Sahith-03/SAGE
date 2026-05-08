import { useEffect, useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectGlobe from '../components/ProjectGlobe';
import ProjectSidebar from '../components/ProjectSidebar';


export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="pb-24 bg-background text-on-background font-body antialiased blueprint-grid selection:bg-primary-container selection:text-on-primary-container min-h-screen">
            <style>{`
                .blueprint-grid {
                    background-image: radial-gradient(#cbd5e1 0.5px, transparent 0.5px);
                    background-size: 32px 32px;
                }
                .unfold-mask {
                    clip-path: inset(100% 0 0 0);
                    transition: clip-path 1.4s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .is-visible .unfold-mask {
                    clip-path: inset(0 0 0 0);
                }
                .hover-blueprint {
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    background-image: 
                        linear-gradient(rgba(0,45,86,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,45,86,0.1) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .group:hover .hover-blueprint {
                    opacity: 1;
                }
            `}</style>
            
            <ProjectSidebar project={selectedProject} onClose={() => setSelectedProject(null)} />

            {/* Header Section */}
            <header className="px-6 md:px-12 max-w-screen-2xl mx-auto pt-12 pb-24 border-b border-outline-variant/20 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-12 bg-primary"></div>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold font-mono">SYSTEM.REGISTRY // V2.04</span>
                        </div>
                        <h1 className="font-headline text-6xl md:text-8xl lg:text-[10rem] text-primary tracking-tighter leading-[0.85] mb-4">
                            Future <br /><span className="italic text-outline">Structures.</span>
                        </h1>
                        <div className="flex gap-4 mt-8 opacity-40">
                             <span className="text-[8px] font-mono uppercase tracking-tighter">Lat_Range: [-90, 90]</span>
                             <span className="text-[8px] font-mono uppercase tracking-tighter">Lng_Range: [-180, 180]</span>
                             <span className="text-[8px] font-mono uppercase tracking-tighter">Status: Authenticated</span>
                        </div>
                    </div>
                    <div className="max-w-md pb-4 text-right">
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
                            A systematic archival of spatial interventions and material endurance. Our global portfolio serves as a technical legend for sustainable architectural evolution.
                        </p>
                        <div className="flex justify-end gap-6">
                            <div className="text-right">
                                <span className="block text-2xl font-headline text-primary leading-none">{projects.length}</span>
                                <span className="text-[8px] uppercase text-outline font-bold tracking-widest font-mono">Nodes_Mapped</span>
                            </div>
                            <div className="w-[1px] h-8 bg-outline-variant/30 self-center"></div>
                            <div className="text-right">
                                <span className="block text-2xl font-headline text-primary leading-none">05</span>
                                <span className="text-[8px] uppercase text-outline font-bold tracking-widest font-mono">Categories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Global Distribution Globe */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12 border-l-4 border-primary pl-8">
                    <div>
                        <h2 className="font-headline text-4xl md:text-5xl text-primary tracking-tight mb-2">Global Distribution.</h2>
                        <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.2em]">Territorial_Logic_Mapping</span>
                    </div>
                    <p className="text-[10px] font-mono text-outline uppercase tracking-widest max-w-xs md:text-right">
                        Archiving structural specifications across terrestrial coordinates. Select an active node to access technical dossier.
                    </p>
                </div>
                
                <ProjectGlobe onProjectClick={setSelectedProject} />
            </section>

        </main>
    );
}
