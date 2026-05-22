import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Project } from '../data/projects';
import { sanityClient } from '../lib/sanity';
import ProjectGlobe from '../components/ProjectGlobe';
import ProjectSidebar from '../components/ProjectSidebar';
import PageLoader from '../components/PageLoader';

export default function ProjectsPage() {
    const location = useLocation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;
    const categories = Array.from(new Set(projects.map(p => p.type || 'Uncategorized'))).sort();
    
    useEffect(() => {
        if (!activeCategory && categories.length > 0) {
            setActiveCategory(categories[0]);
        }
    }, [categories, activeCategory]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch projects from Sanity
                const query = `*[_type == "project"] | order(year desc) {
                    "id": _id,
                    title,
                    "type": category,
                    tags,
                    location,
                    lat,
                    lng,
                    description,
                    "image": mainImage.asset->url,
                    "gallery": gallery[].asset->url,
                    scale,
                    logic,
                    ref
                }`;
                const data = await sanityClient.fetch(query);
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        // Only run observer when loader is gone and projects are loaded
        if (showLoader || projects.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Small delay to ensure DOM is updated
        const timeoutId = setTimeout(() => {
            document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [projects, showLoader]);

    useEffect(() => {
        if (projects.length > 0 && location.state?.projectId) {
            const projectToOpen = projects.find((p) => p.id === location.state.projectId);
            if (projectToOpen) {
                setSelectedProject(projectToOpen);
                if (projectToOpen.type) {
                    setActiveCategory(projectToOpen.type);
                } else {
                    setActiveCategory('Uncategorized');
                }
            }
        }
    }, [projects, location.state]);

    if (showLoader) {
        return (
            <main className="pb-24 bg-background text-on-background min-h-screen flex items-center justify-center blueprint-grid">
                <PageLoader isLoading={loading} overlay={false} onComplete={() => setShowLoader(false)} />
            </main>
        );
    }

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
            <header className="px-5 md:px-8 lg:px-12 max-w-screen-2xl mx-auto pt-10 pb-8 md:pb-12 border-b border-outline-variant/20 mb-12">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-[1px] w-12 bg-primary"></div>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold font-mono">SYSTEM.REGISTRY // V2.04</span>
                        </div>
                        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary tracking-tighter leading-[0.85] mb-2">
                            Project <span className="italic text-outline">Registry.</span>
                        </h1>
                    </div>
                    <div className="md:max-w-md pb-4 md:text-right">
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                            A systematic archival of spatial interventions and material endurance. Our global portfolio serves as a technical legend for sustainable architectural evolution.
                        </p>
                    </div>
                </div>
            </header>

            {/* Categorized Projects */}
            <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-12 pb-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar: Categories */}
                    <div className="w-full lg:w-1/4">
                        <div className="sticky top-24">
                            <h3 className="font-headline text-xl text-primary mb-6 border-b border-outline-variant/20 pb-4">Categories</h3>
                            <ul className="space-y-2">
                                {categories.map(category => {
                                    const count = projects.filter(p => (p.type || 'Uncategorized') === category).length;
                                    const isActive = activeCategory === category;
                                    return (
                                        <li key={category}>
                                            <button 
                                                onClick={() => setActiveCategory(category)}
                                                className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors flex justify-between items-center ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'}`}
                                            >
                                                <span>{category}</span>
                                                <span className="opacity-60">[{count}]</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Right Side: Projects Grid */}
                    <div className="w-full lg:w-3/4">
                        {activeCategory && (() => {
                            const filteredProjects = projects.filter(p => (p.type || 'Uncategorized') === activeCategory);
                            const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
                            const currentProjects = filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);
                            
                            return (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-500 reveal-on-scroll">
                                        {currentProjects.map(project => (
                                            <div 
                                                key={project.id} 
                                                className="group cursor-pointer flex flex-col"
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <div className="relative aspect-[4/3] bg-[#001a36] overflow-hidden mb-4 rounded-xl border border-outline-variant/10">
                                                    {project.image ? (
                                                        <img 
                                                            src={project.image} 
                                                            alt={project.title} 
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#001a36]">
                                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(164,200,255,0.2)" strokeWidth="1" className="mb-3">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                            </svg>
                                                            <span className="font-mono text-[10px] text-[#a4c8ff]/30 uppercase tracking-widest">NO IMAGE</span>
                                                        </div>
                                                    )}
                                                    {/* Blueprint grid overlay */}
                                                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                                                        style={{
                                                            backgroundImage: 'linear-gradient(to right, rgba(164,200,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(164,200,255,0.4) 1px, transparent 1px)',
                                                            backgroundSize: '20px 20px'
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                                                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">{project.ref || 'REF_PENDING'}</span>
                                                </div>
                                                <h3 className="font-headline text-xl text-primary mb-2 group-hover:text-[#366094] transition-colors">{project.title}</h3>
                                                <p className="font-body text-sm text-on-surface-variant line-clamp-2 mb-3">{project.description}</p>
                                                <div className="mt-auto">
                                                    <span className="inline-flex items-center gap-2 font-mono text-[9px] text-outline uppercase tracking-widest border-b border-outline/30 pb-px group-hover:text-primary transition-colors">
                                                        VIEW <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-outline-variant/20">
                                            <button 
                                                onClick={() => {
                                                    setCurrentPage(p => Math.max(1, p - 1));
                                                    window.scrollTo({ top: 300, behavior: 'smooth' });
                                                }}
                                                disabled={currentPage === 1}
                                                className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary disabled:opacity-30 disabled:hover:border-outline-variant disabled:hover:text-on-surface-variant transition-colors group"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <div className="font-mono text-xs text-outline tracking-widest">
                                                <span className="text-primary font-bold">{currentPage}</span> <span className="opacity-50">/</span> {totalPages}
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    setCurrentPage(p => Math.min(totalPages, p + 1));
                                                    window.scrollTo({ top: 300, behavior: 'smooth' });
                                                }}
                                                disabled={currentPage === totalPages}
                                                className="w-10 h-10 flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary disabled:opacity-30 disabled:hover:border-outline-variant disabled:hover:text-on-surface-variant transition-colors group"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1 transition-transform">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>

            {/* Global Distribution Globe */}
            <section className="px-5 md:px-8 lg:px-12 max-w-screen-2xl mx-auto mb-16 pt-16 border-t border-outline-variant/20">
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-8 border-l-4 border-primary pl-8">
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl text-primary tracking-tight mb-2">Global Distribution.</h2>
                        <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.2em]">Territorial_Logic_Mapping</span>
                    </div>
                    <p className="text-[10px] font-mono text-outline uppercase tracking-widest max-w-xs md:text-right">
                        Archiving structural specifications across terrestrial coordinates. Select an active node to access technical dossier.
                    </p>
                </div>
                
                <ProjectGlobe projects={projects} onProjectClick={setSelectedProject} />
            </section>
        </main>
    );
}
