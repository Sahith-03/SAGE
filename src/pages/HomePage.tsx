import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, []);

    return (
        <main className="pt-32 pb-48 bg-background text-on-background font-body antialiased selection:bg-primary-container selection:text-on-primary-container relative">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#002d56_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0"></div>

            {/* Side Coordinates */}
            <div className="fixed top-1/2 left-4 z-40 hidden xl:block pointer-events-none -translate-y-1/2">
                <div className="font-mono text-[9px] text-outline-variant rotate-90 origin-left uppercase tracking-[0.2em] whitespace-nowrap">
                    Lat: 40.7128° N // Lng: 74.0060° W
                </div>
            </div>
            <div className="fixed top-1/2 right-4 z-40 hidden xl:block pointer-events-none -translate-y-1/2">
                <div className="font-mono text-[9px] text-outline-variant -rotate-90 origin-right uppercase tracking-[0.2em] whitespace-nowrap">
                    Scale: 1:500 @ A3 // SAGE_REF_0024
                </div>
            </div>

            {/* Hero Section */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 relative z-10 min-h-[60vh] flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-5 flex flex-col justify-start reveal-on-scroll">
                        <h1 className="font-headline text-5xl md:text-6xl text-on-background tracking-tight leading-[1.1] mb-12">
                            harmonized with <br/>organic environments.
                        </h1>
                        <div className="font-mono text-[10px] text-outline uppercase tracking-widest space-y-1 opacity-70">
                            <div>Ref_01: Environmental Integration</div>
                            <div>Ref_02: Material Circularity</div>
                        </div>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-12 lg:pt-2 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                        <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light pb-12 opacity-80">
                            ...come at the expense of ecological vitality. Our practice is rooted in a rigorous analytical approach to site, climate, and material lifecycle.
                        </p>
                        <div className="relative pl-8 py-2 border-l border-outline-variant/30">
                            <span className="absolute -left-[3.5px] top-4 w-[8px] h-[8px] bg-[#002d56]"></span>
                            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed italic opacity-80">
                                "We view every project as a localized intervention within a broader global system. By integrating advanced sustainable technologies with timeless spatial principles, we create environments that foster human well-being."
                            </p>
                        </div>
                        <div className="mt-8">
                            <Link to="/about" className="inline-flex items-center gap-2 text-[#002d56] font-body text-xs font-bold uppercase tracking-[0.2em] hover:text-primary-container transition-all group">
                                Read Full Manifesto
                                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-2">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Works Section */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto py-32 relative z-10 mt-12 bg-gradient-to-b from-transparent to-surface-container-lowest/50">
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 reveal-on-scroll">
                        <div>
                            <div className="flex items-center gap-3 mb-4 opacity-70">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-[#002d56] font-bold">Selected Works</span>
                                <span className="font-mono text-[10px] text-outline-variant">[2021-2024]</span>
                            </div>
                            <h2 className="font-headline text-4xl md:text-5xl text-[#002d56] tracking-tight uppercase">Built Environments</h2>
                        </div>
                        <Link to="/projects" className="inline-flex items-center gap-2 text-[#002d56] font-body text-xs font-bold uppercase tracking-[0.2em] hover:text-primary-container transition-colors">
                            View All Projects <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
                        {/* Project 1 - Large */}
                        <div className="lg:col-span-8 group cursor-pointer reveal-on-scroll">
                            <div className="relative aspect-[16/10] overflow-hidden bg-surface-variant mb-6">
                                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" alt="Eco-friendly modern building" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-headline text-2xl text-[#002d56] mb-2 group-hover:text-primary-container transition-colors">The Seattle Pavilion</h3>
                                    <p className="font-body text-sm text-on-surface-variant opacity-80">Sustainable Urban Extension, WA</p>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-outline-variant">2024</span>
                            </div>
                        </div>

                        {/* Project 2 - Small */}
                        <div className="lg:col-span-4 group cursor-pointer reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
                            <div className="relative aspect-[3/4] overflow-hidden bg-surface-variant mb-6">
                                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" alt="Natural materials interior" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-headline text-xl text-[#002d56] mb-2 group-hover:text-primary-container transition-colors">Zenith Wellness</h3>
                                    <p className="font-body text-sm text-on-surface-variant opacity-80">Biophilic Interior, NY</p>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-outline-variant">2023</span>
                            </div>
                        </div>

                        {/* Project 3 - Medium */}
                        <div className="lg:col-span-5 group cursor-pointer reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                            <div className="relative aspect-[4/3] overflow-hidden bg-surface-variant mb-6">
                                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop" alt="Geometric structural studies" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-headline text-xl text-[#002d56] mb-2 group-hover:text-primary-container transition-colors">Oceanic Institute</h3>
                                    <p className="font-body text-sm text-on-surface-variant opacity-80">Coastal Research Center, CA</p>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-outline-variant">2022</span>
                            </div>
                        </div>

                        {/* Project 4 - Medium */}
                        <div className="lg:col-span-7 group cursor-pointer reveal-on-scroll" style={{ transitionDelay: '250ms' }}>
                            <div className="relative aspect-[16/9] overflow-hidden bg-surface-variant mb-6">
                                <img src="https://images.unsplash.com/photo-1613490908578-8fc525d8869c?q=80&w=2000&auto=format&fit=crop" alt="Eco residential architecture" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-headline text-xl text-[#002d56] mb-2 group-hover:text-primary-container transition-colors">Timber Residences</h3>
                                    <p className="font-body text-sm text-on-surface-variant opacity-80">Mass Timber Housing, OR</p>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-outline-variant">2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Projects Map */}
            <section className="px-6 md:px-12 max-w-screen-2xl mx-auto py-24 relative z-10 border-t border-outline-variant/20">
                <div className="flex flex-col items-center gap-12 reveal-on-scroll">
                    <div className="text-center">
                        <h3 className="font-headline text-3xl md:text-4xl text-[#002d56] tracking-tight mb-4">Global Operations</h3>
                        <p className="font-body text-on-surface-variant max-w-xl mx-auto opacity-80">Explore our localized interventions across the world map. Click on active coordinates to view project details.</p>
                    </div>

                    <div className="relative w-full max-w-4xl aspect-[2/1] bg-surface-variant/30 border border-outline-variant/30 overflow-hidden flex items-center justify-center p-8 group">
                        {/* Map Grid Background */}
                        <div className="absolute inset-0 blueprint-grid-fine opacity-20"></div>

                        {/* Abstract World Map SVG */}
                        <svg className="w-full h-full text-[#002d56]/10" viewBox="0 0 800 400" fill="currentColor">
                            <path d="M100 150 Q120 120 150 140 T200 120 T250 160 T300 130 T350 170 T400 120 T450 140 T500 100 T550 130 T600 120 T650 160 T700 140 L700 250 Q650 220 600 240 T550 280 T500 250 T450 290 T400 240 T350 260 T300 220 T250 250 T200 240 T150 280 T100 260 Z" />
                        </svg>

                        {/* Interactive Project Dots */}
                        {/* Project 1 */}
                        <div className="absolute top-[35%] left-[25%] group/dot cursor-pointer">
                            <div className="w-4 h-4 bg-[#002d56] rounded-full animate-pulse opacity-50 absolute -inset-1"></div>
                            <div className="w-2 h-2 bg-[#002d56] rounded-full relative"></div>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-[#002d56]/20 p-2 text-center opacity-0 group-hover/dot:opacity-100 transition-opacity w-32 pointer-events-none">
                                <span className="block text-[8px] font-mono text-[#002d56] uppercase">Active</span>
                                <span className="block text-xs font-headline font-bold text-[#002d56]">Seattle Pavilion</span>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="absolute top-[45%] left-[60%] group/dot cursor-pointer">
                            <div className="w-4 h-4 bg-[#002d56] rounded-full animate-pulse opacity-50 absolute -inset-1"></div>
                            <div className="w-2 h-2 bg-[#002d56] rounded-full relative"></div>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-[#002d56]/20 p-2 text-center opacity-0 group-hover/dot:opacity-100 transition-opacity w-32 pointer-events-none">
                                <span className="block text-[8px] font-mono text-[#002d56] uppercase">Completed</span>
                                <span className="block text-xs font-headline font-bold text-[#002d56]">Zenith Wellness</span>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="absolute top-[65%] left-[75%] group/dot cursor-pointer">
                            <div className="w-4 h-4 bg-[#002d56] rounded-full animate-pulse opacity-50 absolute -inset-1"></div>
                            <div className="w-2 h-2 bg-[#002d56] rounded-full relative"></div>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur border border-[#002d56]/20 p-2 text-center opacity-0 group-hover/dot:opacity-100 transition-opacity w-32 pointer-events-none">
                                <span className="block text-[8px] font-mono text-[#002d56] uppercase">In Planning</span>
                                <span className="block text-xs font-headline font-bold text-[#002d56]">Oceanic Institute</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
