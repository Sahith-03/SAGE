import { useEffect, useState } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectGlobe from '../components/ProjectGlobe';
import ProjectSidebar from '../components/ProjectSidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All' 
        ? projects 
        : projects.filter(p => p.type === filter);

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
    }, [filter]); // Re-observe when filter changes

    return (
        <main className="pb-48 bg-background text-on-background font-body antialiased blueprint-grid selection:bg-primary-container selection:text-on-primary-container min-h-screen">
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

            {/* Global Distribution Map */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-48 reveal-on-scroll">
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

            {/* Filter Legend */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-24 reveal-on-scroll">
                <div className="bg-white/40 backdrop-blur-md border border-outline-variant/30 p-8 rounded-sm">
                    <div className="flex flex-wrap gap-12 items-start">
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold block mb-6">Filter_By_Type</span>
                            <div className="flex flex-wrap gap-4">
                                {['All', 'Residential', 'Commercial', 'Healthcare', 'Research', 'Cultural'].map(t => (
                                    <button 
                                        key={t}
                                        onClick={() => setFilter(t)}
                                        className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${filter === t ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-transparent text-outline border-outline-variant/30 hover:border-primary hover:text-primary'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Gallery */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto space-y-48 md:space-y-72 pt-12">
                <AnimatePresence>
                    {filteredProjects.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`project-card grid grid-cols-1 md:grid-cols-12 gap-12 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className={`md:col-span-7 relative group ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                                <div className="absolute -top-6 left-0 flex items-center gap-4 text-[9px] font-mono text-outline-variant uppercase tracking-tighter">
                                    <span className="text-primary font-bold">REF_{project.ref}</span>
                                    <span className="opacity-40">||</span>
                                    <span>COORD: {project.lat.toFixed(4)}, {project.lng.toFixed(4)}</span>
                                </div>
                                
                                <div className="unfold-mask overflow-hidden bg-surface-container shadow-2xl relative">
                                    <img 
                                        alt={project.title} 
                                        className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100 cursor-pointer" 
                                        src={project.image}
                                        onClick={() => setSelectedProject(project)}
                                    />
                                    <div className="hover-blueprint absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
                                        <svg className="w-full h-full text-primary/30" fill="none" stroke="currentColor" strokeWidth="0.05" viewBox="0 0 100 100">
                                            <rect height="60" width="80" x="10" y="10"></rect>
                                            <path d="M10 40 L90 40 M40 10 L40 70" strokeDasharray="1 1"></path>
                                            <circle cx="50" cy="40" r="5"></circle>
                                        </svg>
                                        <div className="absolute bottom-12 left-12 bg-white/90 backdrop-blur p-4 text-[9px] font-mono leading-none border border-primary/10 shadow-xl">
                                            <span className="block mb-2 font-bold text-primary">SPEC_LOGIC_READOUT:</span>
                                            ID: {project.id}<br />
                                            TYPE: {project.type}<br />
                                            SCALE: {project.scale}<br />
                                            STATUS: VERIFIED
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`md:col-span-5 md:pt-24 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.5em] mb-4 block">Section . {project.id}</span>
                                <h2 className="font-headline text-5xl md:text-7xl text-primary mb-8 tracking-tighter leading-[0.9]">{project.title}</h2>
                                <p className="text-on-surface-variant max-w-sm mb-12 leading-relaxed text-sm">
                                    {project.description}
                                </p>
                                
                                <div className="space-y-6 mb-16">
                                    <div className="flex justify-between border-b border-outline-variant/20 pb-2 group/spec">
                                        <span className="text-[9px] uppercase text-outline tracking-widest font-mono">Territory</span>
                                        <span className="text-[10px] font-bold uppercase text-primary font-mono">{project.location}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-outline-variant/20 pb-2 group/spec">
                                        <span className="text-[9px] uppercase text-outline tracking-widest font-mono">Magnitude</span>
                                        <span className="text-[10px] font-bold uppercase text-primary font-mono">{project.scale}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-outline-variant/20 pb-2 group/spec">
                                        <span className="text-[9px] uppercase text-outline tracking-widest font-mono">Logic_Base</span>
                                        <span className="text-[10px] font-bold uppercase text-primary font-mono">{project.logic}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setSelectedProject(project)}
                                    className="group flex items-center gap-6"
                                >
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                                        <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">arrow_forward</span>
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-primary">Access Dossier</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>

            {/* Interior Highlights Section */}
            <section className="mt-48 py-48 bg-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ 
                       backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                       backgroundSize: '80px 80px' 
                     }}>
                </div>
                
                <div className="px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10">
                    <div className="flex items-baseline gap-8 mb-32 border-b border-white/10 pb-12">
                        <h2 className="font-headline text-6xl md:text-9xl tracking-tighter leading-none">The Inner <br />Workings.</h2>
                        <span className="text-[10px] font-mono uppercase opacity-40 tracking-widest">Series_B: Spatial_Harmony // ARCH_INT</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-end">
                        {[
                            { id: '402', title: 'Brutalist Warmth', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop' },
                            { id: '112', title: 'Monolith Foyer', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop', offset: true },
                            { id: '904', title: 'Eco-Lodge Retreat', img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2000&auto=format&fit=crop' }
                        ].map((item) => (
                            <div key={item.id} className={`space-y-8 group ${item.offset ? '-mb-32' : ''}`}>
                                <div className="relative overflow-hidden aspect-[3/4]">
                                    <img alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100 absolute inset-0 z-10" src={item.img} />
                                    <div className="absolute inset-0 bg-primary/20 z-20 pointer-events-none mix-blend-multiply"></div>
                                </div>
                                <div className="relative z-30">
                                    <span className="text-[10px] font-mono block mb-2 opacity-40">INT_NODE_{item.id}</span>
                                    <h4 className="text-2xl font-headline italic tracking-tight">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
