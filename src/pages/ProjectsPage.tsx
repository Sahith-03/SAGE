import { useEffect } from 'react';

export default function ProjectsPage() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
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
        <main className="pt-32 pb-48 bg-background text-on-background font-body antialiased blueprint-grid selection:bg-primary-container selection:text-on-primary-container">
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
            
            {/* Hero Section */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 mb-32">
                <div className="flex flex-col md:flex-row items-end gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-12 bg-primary"></div>
                            <span className="text-xs uppercase tracking-[0.4em] text-secondary font-bold">Archives v2.04</span>
                        </div>
                        <h1 className="font-headline text-6xl md:text-8xl lg:text-[10rem] text-primary tracking-tighter leading-[0.9] mb-12">
                            Future <br /><span className="italic text-outline">Structures.</span>
                        </h1>
                    </div>
                    <div className="max-w-sm pb-8">
                        <p className="font-body text-base text-on-surface-variant leading-relaxed mb-6 border-l border-primary/20 pl-6">
                            Documentation of spatial logic and material endurance. Our portfolio serves as a technical legend for sustainable living.
                        </p>
                        <div className="flex gap-4">
                            <span className="text-[10px] font-mono text-outline-variant">COORD: 34.0522° N</span>
                            <span className="text-[10px] font-mono text-outline-variant">SYSTEM: RE-BIOPHILIC</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Filter (Legend) */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-24">
                <div className="border border-outline-variant/40 bg-white/40 backdrop-blur-sm p-4 md:p-8 rounded-sm">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div className="space-y-4">
                            <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-4">Legend.Filter</span>
                            <button className="flex items-center gap-3 w-full group text-primary">
                                <div className="w-3 h-3 border border-primary bg-primary"></div>
                                <span className="text-xs uppercase tracking-wider font-medium">All Projects</span>
                            </button>
                        </div>
                        <div className="space-y-4 pt-8 md:pt-0">
                            <span className="text-[10px] uppercase tracking-widest text-secondary block mb-4 opacity-50">S_TYPE</span>
                            <button className="flex items-center gap-3 w-full group hover:text-primary transition-colors">
                                <div className="w-3 h-3 border border-outline-variant group-hover:border-primary"></div>
                                <span className="text-xs uppercase tracking-wider">Residential</span>
                            </button>
                            <button className="flex items-center gap-3 w-full group hover:text-primary transition-colors">
                                <div className="w-3 h-3 border border-outline-variant group-hover:border-primary"></div>
                                <span className="text-xs uppercase tracking-wider">Commercial</span>
                            </button>
                        </div>
                        <div className="space-y-4 pt-8 md:pt-0">
                            <span className="text-[10px] uppercase tracking-widest text-secondary block mb-4 opacity-50">M_BASE</span>
                            <button className="flex items-center gap-3 w-full group hover:text-primary transition-colors">
                                <div className="w-3 h-3 border border-outline-variant group-hover:border-primary"></div>
                                <span className="text-xs uppercase tracking-wider">Monolith Concrete</span>
                            </button>
                            <button className="flex items-center gap-3 w-full group hover:text-primary transition-colors">
                                <div className="w-3 h-3 border border-outline-variant group-hover:border-primary"></div>
                                <span className="text-xs uppercase tracking-wider">Biophilic Timber</span>
                            </button>
                        </div>
                        <div className="hidden md:block col-span-2 text-right">
                            <div className="inline-block text-left">
                                <span className="text-[10px] uppercase tracking-widest text-secondary block mb-4 opacity-50">STATUS</span>
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <span className="block text-xl font-headline text-primary">24</span>
                                        <span className="text-[8px] uppercase text-outline">Realized</span>
                                    </div>
                                    <div className="w-[1px] h-8 bg-outline-variant/30"></div>
                                    <div className="text-center">
                                        <span className="block text-xl font-headline text-primary">12</span>
                                        <span className="text-[8px] uppercase text-outline">In Planning</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Asymmetrical Interactive Gallery */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto space-y-48 md:space-y-72">
                {/* Project 01 */}
                <div className="project-card reveal-on-scroll grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-7 relative group">
                        <div className="absolute -top-6 left-0 text-[10px] font-mono text-outline-variant uppercase">Width: 24.5m // Axis_A</div>
                        <div className="absolute -left-6 top-1/2 -rotate-90 text-[10px] font-mono text-outline-variant uppercase origin-left">Elev: +12.4m</div>
                        <div className="unfold-mask overflow-hidden bg-surface-container shadow-2xl relative">
                            <img alt="Modern monolithic concrete residential home" className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" />
                            <div className="hover-blueprint absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
                                <svg className="w-full h-full text-primary/40" fill="none" stroke="currentColor" strokeWidth="0.1" viewBox="0 0 100 100">
                                    <rect height="60" width="80" x="10" y="10"></rect>
                                    <path d="M10 40 L90 40 M40 10 L40 70" strokeDasharray="2 2"></path>
                                    <circle cx="50" cy="40" r="5"></circle>
                                </svg>
                                <div className="absolute bottom-12 left-12 bg-white/80 backdrop-blur p-4 text-[10px] font-mono leading-none border border-primary/20">
                                    SECTION_01: RESIDENCE_WING<br />
                                    MAT: POURED_CONCRETE_70%<br />
                                    MAT: LOW_E_GLASS_30%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-5 md:pt-24">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.4em] mb-4 block">Residential . 01</span>
                        <h2 className="font-headline text-4xl md:text-6xl text-primary mb-8 tracking-tight">The Glass <br />Pavilion</h2>
                        <p className="text-on-surface-variant max-w-sm mb-12 leading-relaxed">
                            A structural dialogue between density and transparency. Deep-poured concrete forms provide thermal mass, while expansive glass apertures invite the forest into the domestic sphere.
                        </p>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                                <span className="text-[10px] uppercase text-outline">Location</span>
                                <span className="text-[10px] font-bold uppercase text-primary">Pacific Northwest</span>
                            </div>
                            <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                                <span className="text-[10px] uppercase text-outline">Scale</span>
                                <span className="text-[10px] font-bold uppercase text-primary">3,200 SQ FT</span>
                            </div>
                            <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                                <span className="text-[10px] uppercase text-outline">Logic</span>
                                <span className="text-[10px] font-bold uppercase text-primary">Monolithic / Fluid</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project 02 */}
                <div className="project-card reveal-on-scroll grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 order-2 md:order-1">
                        <div className="bg-primary/5 p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <span className="material-symbols-outlined text-6xl">architecture</span>
                            </div>
                            <span className="text-[10px] font-mono text-primary/50 block mb-2">REF: COMM_778</span>
                            <h3 className="font-headline text-3xl text-primary mb-6">Vertical <br />Metabolism</h3>
                            <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                                A skyscraper that functions as a living organism. Vertical gardens act as air filtration lungs for the urban core.
                            </p>
                            <a className="text-[10px] uppercase font-bold tracking-widest text-primary border-b-2 border-primary pb-1 inline-block hover:bg-primary hover:text-white transition-all px-2" href="#">View Data Sheet</a>
                        </div>
                    </div>
                    <div className="md:col-span-8 order-1 md:order-2 relative group">
                        <div className="unfold-mask overflow-hidden bg-surface-container-high shadow-2xl">
                            <img alt="Futuristic sustainable office building" className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-1000" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" />
                        </div>
                        <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full border border-primary bg-white flex items-center justify-center animate-ping"></div>
                            <div className="h-12 w-[1px] bg-primary"></div>
                            <div className="bg-white/90 backdrop-blur p-3 border border-primary/20 text-[8px] uppercase tracking-tighter">
                                Active Biowall: Hydroponic System
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project 03 */}
                <div className="project-card reveal-on-scroll space-y-12">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/10 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                        <div className="unfold-mask overflow-hidden bg-surface-container aspect-[21/9]">
                            <img alt="Healthcare facility biophilic design" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=2000&auto=format&fit=crop" />
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                            <div className="bg-white/80 backdrop-blur-xl p-10 max-w-lg pointer-events-auto shadow-xl">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-4 block">Healthcare . 03</span>
                                <h2 className="font-headline text-5xl text-primary mb-4 tracking-tight">Zenith <br />Wellness Center</h2>
                                <p className="text-sm text-on-surface-variant leading-relaxed">Architecture as a therapeutic instrument. We utilized local cedar laths and rhythmic courtyard spacing to lower patient cortisol levels through visual harmony.</p>
                            </div>
                            <div className="hidden md:block pointer-events-auto">
                                <button className="w-24 h-24 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all group/btn">
                                    <span className="material-symbols-outlined transition-transform group-hover/btn:rotate-45">arrow_outward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interior Highlights Section */}
            <section className="mt-48 py-48 bg-primary text-white">
                <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
                    <div className="flex items-baseline gap-8 mb-32">
                        <h2 className="font-headline text-5xl md:text-8xl tracking-tight">The Inner <br />Workings.</h2>
                        <span className="text-[10px] font-mono uppercase opacity-40">Series_B: Spatial Harmony</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-end">
                        <div className="space-y-8 group">
                            <div className="relative overflow-hidden aspect-[3/4]">
                                <img alt="Brutalist Interior" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 absolute inset-0 z-10" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono block mb-2 opacity-50">RES_INT_402</span>
                                <h4 className="text-xl font-headline italic">Brutalist Warmth</h4>
                            </div>
                        </div>
                        <div className="space-y-8 group -mb-32">
                            <div className="relative overflow-hidden aspect-[4/5]">
                                <img alt="Corporate Lobby" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono block mb-2 opacity-50">COMM_INT_112</span>
                                <h4 className="text-xl font-headline italic">Monolith Foyer</h4>
                            </div>
                        </div>
                        <div className="space-y-8 group">
                            <div className="relative overflow-hidden aspect-square">
                                <img alt="Eco-Lodge Interior" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=2000&auto=format&fit=crop" />
                            </div>
                            <div>
                                <span className="text-[10px] font-mono block mb-2 opacity-50">HOSP_INT_904</span>
                                <h4 className="text-xl font-headline italic">Eco-Lodge Retreat</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
