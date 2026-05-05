import { useEffect } from 'react';

export default function AboutPage() {
    useEffect(() => {
        const cards = document.querySelectorAll('.interactive-card');
        const handleMouseMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const card = mouseEvent.currentTarget as HTMLElement;
            const rect = card.getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        };

        const handleMouseLeave = (e: Event) => {
            const card = e.currentTarget as HTMLElement;
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center bg-background text-on-background font-body antialiased selection:bg-secondary-container selection:text-on-secondary-container architect-grid">
            <style>{`
                .architect-grid {
                    background-size: 40px 40px;
                    background-image: radial-gradient(circle, #c3c6d1 1px, transparent 1px);
                }
                .spec-border {
                    border: 1px solid #c3c6d1;
                }
                .technical-marker::before {
                    content: '';
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border: 1px solid #737780;
                    background: white;
                    z-index: 20;
                }
                .marker-tl::before { top: -4px; left: -4px; }
                .marker-tr::before { top: -4px; right: -4px; }
                .marker-bl::before { bottom: -4px; left: -4px; }
                .marker-br::before { bottom: -4px; right: -4px; }
                .interactive-card {
                    transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1), box-shadow 0.2s ease;
                }
                .interactive-card:hover {
                    transform: translateY(-8px) scale(1.01);
                    box-shadow: 0 30px 60px rgba(0, 45, 86, 0.15);
                }
            `}</style>
            
            {/* Header/Hero: Spec Sheet Style */}
            <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 pt-8">
                <div className="relative spec-border p-1 lg:p-12 bg-white/50 backdrop-blur-sm">
                    <div className="technical-marker marker-tl"></div>
                    <div className="technical-marker marker-tr"></div>
                    <div className="technical-marker marker-bl"></div>
                    <div className="technical-marker marker-br"></div>
                    
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full lg:w-1/2 space-y-8 relative">
                            <div className="flex justify-between items-end border-b border-outline-variant pb-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-sans uppercase tracking-widest text-outline">Ref: AB-2024-01</span>
                                    <h2 className="font-headline text-sm uppercase tracking-[0.3em] text-secondary font-bold">Studio Overview</h2>
                                </div>
                                <div className="text-[10px] font-sans text-right text-outline">
                                    COORD: 40.7128° N, 74.0060° W<br />
                                    DATE: OCT 2024
                                </div>
                            </div>
                            <h1 className="font-headline text-6xl lg:text-8xl text-primary leading-[0.9] tracking-tighter">
                                Built for <br />
                                <span className="italic text-secondary">Tomorrow</span>
                            </h1>
                            <div className="p-8 border-l-4 border-primary bg-surface-container-low/50">
                                <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                                    We are architects of resilience, crafting spaces where structural integrity meets organic vitality.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-12">
                                <div className="border border-outline-variant/30 p-4">
                                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-2">Primary Objective</span>
                                    <span className="text-xs font-bold text-primary">Environmental Symbiosis</span>
                                </div>
                                <div className="border border-outline-variant/30 p-4">
                                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-2">Core Philosophy</span>
                                    <span className="text-xs font-bold text-primary">Structural Organicism</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute -inset-4 border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-primary"></div>
                                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-primary"></div>
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <img alt="SAGE Sustainable Architecture" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop" />
                                    <div className="absolute bottom-0 left-0 bg-primary text-white p-6 w-full lg:w-auto">
                                        <span className="material-symbols-outlined text-secondary-fixed mb-2">architecture</span>
                                        <p className="text-sm font-headline italic">Precision in every detail, harmony in every space.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy */}
            <section className="w-full py-32 border-y border-outline-variant/30 bg-white/30">
                <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
                    <div className="inline-block px-4 py-1 border border-secondary text-secondary text-[10px] uppercase tracking-[0.4em] font-bold">The Manifesto</div>
                    <h2 className="font-headline text-3xl lg:text-5xl text-primary leading-tight tracking-tight">
                        SAGE (Sustainable Architecture and Green Environment) Design Labs is a collaborative design practice.
                    </h2>
                    <div className="w-full flex items-center justify-center gap-4">
                        <span className="h-[1px] flex-1 bg-outline-variant/50"></span>
                        <span className="material-symbols-outlined text-outline text-xl">eco</span>
                        <span className="h-[1px] flex-1 bg-outline-variant/50"></span>
                    </div>
                    <p className="font-body text-xl lg:text-2xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto font-light">
                        Our approach bridges the gap between the built environment and the natural world. Our methodology integrates architecture with the surrounding landscape, designing structures as a deliberate and harmonious extension of their context.
                    </p>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="w-full py-32 px-6 lg:px-12 bg-surface-container-lowest/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="interactive-card spec-border p-12 bg-primary text-on-primary flex flex-col justify-between min-h-[500px] relative overflow-hidden">
                            <div className="technical-marker marker-tl"></div>
                            <div className="technical-marker marker-br"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 border-r border-t border-white"></div>
                            <div className="absolute top-12 right-12 w-16 h-16 opacity-10 border-r border-t border-white"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-[10px] font-sans uppercase tracking-widest text-secondary-fixed">Module: 01A</span>
                                    <span className="h-[1px] w-12 bg-secondary-fixed opacity-30"></span>
                                </div>
                                <div className="inline-flex items-center space-x-3 mb-6">
                                    <span className="material-symbols-outlined text-secondary-fixed text-sm">visibility</span>
                                    <h3 className="font-body uppercase tracking-[0.2em] text-secondary-fixed text-xs font-bold">Our Vision</h3>
                                </div>
                                <p className="font-headline text-4xl lg:text-5xl leading-tight tracking-tight">
                                    To redefine the urban horizon as a thriving ecosystem.
                                </p>
                            </div>
                            <div className="relative z-10 font-body text-primary-fixed-dim text-lg leading-relaxed max-w-sm mt-8">
                                We envision a future where monolithic structures are indistinguishable from natural topography. A world where design anticipates the needs of the next century.
                            </div>
                        </div>

                        <div className="interactive-card spec-border p-12 bg-white text-on-surface flex flex-col justify-between min-h-[500px] relative">
                            <div className="technical-marker marker-tr"></div>
                            <div className="technical-marker marker-bl"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-[10px] font-sans uppercase tracking-widest text-outline">Module: 01B</span>
                                    <span className="h-[1px] w-12 bg-outline-variant opacity-30"></span>
                                </div>
                                <div className="inline-flex items-center space-x-3 mb-6">
                                    <span className="material-symbols-outlined text-secondary text-sm">flag</span>
                                    <h3 className="font-body uppercase tracking-[0.2em] text-secondary text-xs font-bold">Our Mission</h3>
                                </div>
                                <p className="font-headline text-4xl text-primary leading-tight tracking-tight">
                                    Engineering spaces that breathe, endure, and inspire.
                                </p>
                            </div>
                            <div className="space-y-6 font-body text-on-surface-variant text-base leading-relaxed mt-8">
                                <p>We are committed to delivering architectural solutions that are rigorous in technical execution and profound in aesthetic impact.</p>
                                <p className="text-xs uppercase tracking-widest font-bold text-primary flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                                    Transforming constraints into opportunities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Section */}
            <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 spec-border bg-white">
                    <div className="p-12 border-b lg:border-b-0 lg:border-r border-outline-variant flex flex-col gap-6">
                        <span className="text-3xl font-headline text-secondary">01.</span>
                        <h4 className="font-bold text-sm uppercase tracking-widest">Resilience Analysis</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Advanced structural simulations to ensure longevity against changing environmental pressures.</p>
                    </div>
                    <div className="p-12 border-b lg:border-b-0 lg:border-r border-outline-variant flex flex-col gap-6 bg-surface-container-low/30">
                        <span className="text-3xl font-headline text-secondary">02.</span>
                        <h4 className="font-bold text-sm uppercase tracking-widest">Organic Integration</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Developing proprietary methods for embedding living biological systems into masonry and glass.</p>
                    </div>
                    <div className="p-12 flex flex-col gap-6">
                        <span className="text-3xl font-headline text-secondary">03.</span>
                        <h4 className="font-bold text-sm uppercase tracking-widest">Material Ethics</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Hyper-local sourcing and cradle-to-cradle material cycles for zero-waste construction.</p>
                    </div>
                </div>
            </section>

            {/* Final Architectural Detail */}
            <section className="w-full h-[400px] relative overflow-hidden bg-primary/5 border-t border-outline-variant/30">
                <div className="absolute inset-0 z-0">
                    <img alt="Architectural Details" className="w-full h-full object-cover grayscale opacity-20" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop" />
                </div>
                


                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
                    <h5 className="text-primary font-headline text-3xl md:text-5xl italic tracking-tight mb-4">
                        The harmony of structure and soul.
                    </h5>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-[1px] bg-secondary"></div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary font-bold">Sage Philosophy</span>
                        <div className="w-8 h-[1px] bg-secondary"></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
