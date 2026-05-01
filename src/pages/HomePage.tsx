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
        <main className="bg-[#f8f9f9] text-[#191c1c] font-body antialiased">
            {/* Side Coordinates — fixed left edge strip */}
            <div className="fixed top-0 left-0 h-full w-6 z-30 hidden xl:flex pointer-events-none flex-col items-center justify-center overflow-hidden">
                <span className="font-mono text-[9px] text-[#737780]/50 uppercase tracking-[0.2em] whitespace-nowrap select-none"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    LAT: 40.7128° N // LNG: 74.0060° W
                </span>
            </div>
            {/* Side Coordinates — fixed right edge strip */}
            <div className="fixed top-0 right-0 h-full w-6 z-30 hidden xl:flex pointer-events-none flex-col items-center justify-center overflow-hidden">
                <span className="font-mono text-[9px] text-[#737780]/50 uppercase tracking-[0.2em] whitespace-nowrap select-none"
                    style={{ writingMode: 'vertical-rl' }}>
                    // SAGE_REF_0024
                </span>
            </div>

            {/* ─── HERO ─── */}
            <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col">
                {/* Full-bleed background image */}
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2400&auto=format&fit=crop"
                    alt="Modern sustainable architecture"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#001a36]/50"></div>

                {/* Hero content */}
                <div className="relative z-10 flex flex-col justify-end h-full px-10 md:px-16 pb-20 max-w-screen-2xl mx-auto w-full">
                    {/* Section ID tag */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-white/60"></div>
                        <span className="font-mono text-[10px] text-white/60 uppercase tracking-[0.3em]">
                            SECTION_ID: HERO_01 // PHASE: CONCEPTUALIZATION
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="font-headline text-white leading-[1.0] tracking-tight max-w-4xl">
                        <span className="block text-5xl md:text-6xl lg:text-7xl font-normal">Designing architecture</span>
                        <span className="block text-5xl md:text-6xl lg:text-7xl font-normal">that performs</span>
                        <span className="block text-5xl md:text-6xl lg:text-7xl italic text-[#a4c8ff]">responsibly today</span>
                        <span className="block text-3xl md:text-4xl lg:text-5xl font-normal uppercase tracking-widest text-white/80 mt-2">AND ENDURES MEANINGFULLY.</span>
                    </h1>

                    {/* CTA buttons row */}
                    <div className="flex flex-wrap items-center gap-4 mt-10">
                        <Link to="/projects" className="bg-[#002d56] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[#124376] transition-colors">
                            VIEW PROJECTS
                        </Link>
                        <Link to="/about" className="border border-white/40 text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                            PHILOSOPHY
                        </Link>
                        <div className="hidden md:flex items-center gap-6 ml-auto">
                            <div className="text-center border border-white/20 px-4 py-2">
                                <span className="block font-mono text-[9px] text-white/50 uppercase tracking-widest">DISCIPLINE OF</span>
                                <span className="block font-mono text-[10px] text-white uppercase tracking-widest">DESIGN</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-px h-8 bg-white/30"></div>
                                <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.3em] rotate-90 origin-center my-2">SCROLL</span>
                                <div className="w-px h-8 bg-white/30"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SAGE ETHOS ─── */}
            <section className="bg-[#f8f9f9] px-10 md:px-16 py-24 max-w-screen-2xl mx-auto reveal-on-scroll">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left column */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-px bg-[#002d56]"></div>
                            <span className="font-mono text-[10px] text-[#002d56] uppercase tracking-[0.3em] font-bold">THE SAGE ETHOS</span>
                        </div>
                        <h2 className="font-headline text-4xl md:text-5xl text-[#191c1c] leading-tight tracking-tight mb-10">
                            Resilient structures harmonized with organic environments.
                        </h2>
                        <div className="font-mono text-[10px] text-[#737780] uppercase tracking-widest space-y-1">
                            <div>REF_01: ENVIRONMENTAL INTEGRATION</div>
                            <div>REF_02: MATERIAL CIRCULARITY</div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col justify-center gap-8">
                        <p className="font-body text-lg text-[#42474f] leading-relaxed">
                            At SAGE Design Labs, we reject the notion that structural permanence must come at the expense of ecological vitality. Our practice is rooted in a rigorous analytical approach to site, climate, and material lifecycle.
                        </p>
                        <div className="border-l-2 border-[#002d56] pl-6 py-1">
                            <p className="font-body text-base text-[#42474f] leading-relaxed italic">
                                "We view every project as a localized intervention within a broader global system. By integrating advanced sustainable technologies with timeless spatial principles, we create environments that foster human well-being."
                            </p>
                        </div>
                        <div>
                            <Link to="/about" className="inline-flex items-center gap-2 font-mono text-[11px] text-[#002d56] uppercase tracking-widest border-b border-[#002d56] pb-px hover:opacity-70 transition-opacity">
                                READ FULL MANIFESTO
                                <span className="text-base">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SELECTED WORKS ─── */}
            <section className="bg-[#f0f1f1] px-10 md:px-16 py-20">
                {/* Header row */}
                <div className="flex items-end justify-between mb-10 max-w-screen-2xl mx-auto">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-[10px] text-[#002d56] uppercase tracking-widest font-bold">SELECTED WORKS</span>
                            <span className="font-mono text-[10px] text-[#737780]">[2021-2024]</span>
                        </div>
                        <h2 className="font-headline text-5xl md:text-6xl text-[#191c1c] uppercase tracking-tight">BUILT ENVIRONMENTS</h2>
                    </div>
                    <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] text-[#002d56] uppercase tracking-widest hover:opacity-70 transition-opacity">
                        VIEW ALL PROJECTS →
                    </Link>
                </div>

                {/* Projects grid — 2 columns: left large, right stacked */}
                <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 reveal-on-scroll">
                    {/* Left: Large Feature Card */}
                    <div className="group relative overflow-hidden bg-[#191c1c]" style={{ minHeight: '580px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2000&auto=format&fit=crop"
                            alt="The Canopy House"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#001a36]/95 to-transparent p-8">
                            <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block mb-2">RESIDENTIAL // 001</span>
                            <h3 className="font-headline text-3xl text-white mb-3">The Canopy House</h3>
                            <p className="font-body text-sm text-white/70 mb-5 max-w-sm leading-relaxed">
                                A zero-emission residential retreat utilizing passive solar design and structural timber to blend into its forested site.
                            </p>
                            <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] text-white/80 uppercase tracking-widest border-b border-white/30 pb-px hover:text-white transition-colors">
                                <span className="w-6 h-px bg-white/60"></span>
                                EXPLORE TECHNICAL SPECS
                            </Link>
                        </div>
                    </div>

                    {/* Right: 2 stacked cards */}
                    <div className="flex flex-col gap-6">
                        {/* Card 2 — dark with blueprint overlay */}
                        <div className="group relative overflow-hidden bg-[#001a36]" style={{ minHeight: '278px' }}>
                            <img
                                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1200&auto=format&fit=crop"
                                alt="Meridian Tower"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-30"
                            />
                            {/* Blueprint grid overlay */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, rgba(164,200,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(164,200,255,0.4) 1px, transparent 1px)',
                                    backgroundSize: '30px 30px'
                                }}
                            ></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="font-mono text-[9px] text-[#a4c8ff]/60 uppercase tracking-widest block mb-1">SPEC_ID: CRT_88 // GL_04</span>
                                <span className="font-mono text-[10px] text-[#a4c8ff] uppercase tracking-widest font-bold block mb-2">COMMERCIAL</span>
                                <h3 className="font-headline text-2xl text-white">Meridian Tower</h3>
                            </div>
                        </div>

                        {/* Card 3 — dark healthcare */}
                        <div className="group relative overflow-hidden bg-[#001a36]" style={{ minHeight: '278px' }}>
                            <img
                                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
                                alt="Oasis Wellness Pavilion"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-25"
                            />
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'linear-gradient(to right, rgba(164,200,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(164,200,255,0.4) 1px, transparent 1px)',
                                    backgroundSize: '30px 30px'
                                }}
                            ></div>
                            <div className="absolute top-2 right-3">
                                <span className="font-mono text-[9px] text-[#ff6b6b] uppercase tracking-widest">SAGE WORK</span>
                            </div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <span className="font-mono text-[9px] text-[#a4c8ff]/60 uppercase tracking-widest block mb-1">SPEC_ID: MED_02 // BIO_19</span>
                                <span className="font-mono text-[10px] text-[#a4c8ff] uppercase tracking-widest font-bold block mb-2">HEALTHCARE</span>
                                <h3 className="font-headline text-2xl text-white">Oasis Wellness Pavilion</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CTA SECTION ─── */}
            <section className="bg-[#f8f9f9] py-32 px-10 md:px-16 flex flex-col items-center text-center reveal-on-scroll">
                {/* Compass icon */}
                <div className="mb-4">
                    <span className="font-mono text-[9px] text-[#737780] uppercase tracking-widest block mb-3">REF: CTA_77</span>
                    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                        <circle cx="20" cy="14" r="8" stroke="#002d56" strokeWidth="1.5" fill="none"/>
                        <line x1="20" y1="22" x2="20" y2="48" stroke="#002d56" strokeWidth="1.5"/>
                        <line x1="8" y1="42" x2="20" y2="48" stroke="#002d56" strokeWidth="1.5"/>
                        <line x1="32" y1="42" x2="20" y2="48" stroke="#002d56" strokeWidth="1.5"/>
                    </svg>
                </div>

                <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[#002d56] tracking-tight max-w-3xl leading-tight mb-8">
                    READY TO <strong>BUILD</strong> THE FUTURE?
                </h2>
                <p className="font-body text-lg text-[#42474f] max-w-xl mb-10 leading-relaxed">
                    Collaborate with SAGE Design Labs to realize architectural visions that are sustainable, structurally profound, and meticulously crafted.
                </p>
                <Link to="/contact" className="bg-[#002d56] text-white px-12 py-5 font-mono text-xs uppercase tracking-widest hover:bg-[#124376] transition-colors mb-4">
                    INITIATE A CONSULTATION
                </Link>
                <span className="font-mono text-[10px] text-[#737780] uppercase tracking-widest">ESTIMATED TAT: 48 HOURS // GLOBAL OPS</span>
            </section>
        </main>
    );
}
