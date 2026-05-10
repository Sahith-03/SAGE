export default function TeamPage() {
    return (
        <main className="flex-grow pt-8 md:pt-12 pb-16 px-5 md:px-8 lg:px-12 max-w-screen-2xl mx-auto w-full blueprint-bg">
            <style>{`
                .phi-popover {
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    pointer-events: none;
                }
                .phi-trigger:hover + .phi-popover, .phi-popover:hover {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }
            `}</style>
            {/* Hero Section */}
            <section className="mb-16 max-w-4xl">
                <div className="inline-flex items-center gap-2 mb-6">
                    <span className="h-px w-12 bg-primary"></span>
                    <span className="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">Collaborative Intelligence</span>
                </div>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-8xl font-light text-primary tracking-tight mb-8">The Minds at <span className="italic">SAGE</span></h1>
                <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light max-w-2xl border-l-2 border-primary-container pl-8">
                    A collective of visionary architects and designers dedicated to harmonizing resilient structures with organic environments.
                </p>
            </section>

            {/* Founder Section (Interactive) */}
            <section className="mb-24 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Portrait & Technical Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="relative group aspect-[4/5] overflow-hidden bg-surface-container-highest">
                            <img alt="Ar. Nerella Manoj Vamsi" className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" src={`${import.meta.env.BASE_URL}images/Vamsi.png`} />
                            {/* Technical Overlay */}
                            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-outline-variant">
                            <div className="bg-surface p-6 border-r border-outline-variant">
                                <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">Education</span>
                                <span className="font-label text-sm font-bold text-primary">NIT Calicut<br />B.Arch</span>
                            </div>
                            <div className="bg-surface p-6">
                                <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">Design Focus</span>
                                <span className="font-label text-sm font-bold text-primary">Sustainable Performance</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Bio & Interactive Popover */}
                    <div className="lg:col-span-7 pt-12">
                        <div className="max-w-xl">
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-secondary font-black block mb-4">Founder &amp; Principal Architect</span>
                            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary font-medium mb-10 tracking-tight leading-none">Ar. Nerella Manoj Vamsi</h2>
                            <div className="space-y-8 font-body text-on-surface-variant text-lg leading-relaxed font-light">
                                <p>
                                    An alumnus of NIT Calicut, the founder of SAGE Design Labs is an award-winning architect and educator with a strong foundation in design and research. With experience across diverse building typologies and scales, his work reflects a balance of technical precision and design thinking.
                                </p>
                                <p>
                                    He brings global exposure and a multidisciplinary approach to practice integrating architecture, urban systems, and sustainability into cohesive design solutions. Alongside practice, he continues to mentor and shape future designers, bridging academia and industry.
                                </p>
                                <div className="relative inline-block group">
                                    <button className="phi-trigger flex items-center gap-4 text-primary font-bold uppercase tracking-widest text-xs border-b border-primary pb-2 hover:text-secondary transition-colors group">
                                        <span>Design Philosophy</span>
                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">add</span>
                                    </button>
                                    {/* Philosophy Pop-over */}
                                    <div className="phi-popover absolute left-0 top-full mt-4 w-80 bg-slate-800 text-white p-8 shadow-2xl z-20">
                                        <h4 className="font-headline text-lg italic mb-4">"Beyond Form-Making"</h4>
                                        <p className="text-xs leading-relaxed font-light opacity-80 mb-6">
                                            Architecture must serve as a structured response to climate, culture, function, and long-term impact. Every design decision at SAGE is tested against environmental performance, contextual integrity, and the lives of those who inhabit the space.
                                        </p>
                                        <div className="flex gap-2">
                                            <span className="h-1 w-8 bg-secondary"></span>
                                            <span className="h-1 w-2 bg-secondary/40"></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 md:mt-16 pt-16 border-t border-outline-variant grid grid-cols-3 gap-4 md:gap-8">
                                    <div>
                                        <span className="block font-headline text-4xl text-primary mb-1">5+</span>
                                        <span className="font-body text-xs uppercase tracking-widest text-slate-500 font-black">Yrs Experience</span>
                                    </div>
                                    <div>
                                        <span className="block font-headline text-4xl text-primary mb-1">Multi</span>
                                        <span className="font-body text-xs uppercase tracking-widest text-slate-500 font-black">Typologies</span>
                                    </div>
                                    <div>
                                        <span className="block font-headline text-4xl text-primary mb-1">NIT</span>
                                        <span className="font-body text-xs uppercase tracking-widest text-slate-500 font-black">Calicut Alumni</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Associate Architect (Inverted Layout) */}
            <section className="mb-16 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left: Bio & Map */}
                    <div className="lg:col-span-7 order-2 lg:order-1 lg:pt-12">
                        <div className="max-w-xl lg:ml-auto lg:text-right">
                            <span className="font-label uppercase tracking-[0.4em] text-[10px] text-secondary font-black block mb-4">Associate Architect</span>
                            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-primary font-medium mb-10 tracking-tight leading-none">Pragada Lakshmi Priya</h2>
                            <div className="space-y-8 font-body text-on-surface-variant text-lg leading-relaxed font-light">
                                <p>
                                    Believing that strong design creates meaningful impact and leaves a lasting legacy, her work at SAGE Design Labs spans disciplines and scales, crafting spaces that are bold in expression, meticulous in detail, and rooted in a sensitive understanding of context, materiality, and human experience.
                                </p>
                                {/* Influence Map Trigger */}
                                <div className="flex justify-end relative">
                                    <button className="phi-trigger flex items-center gap-4 text-primary font-bold uppercase tracking-widest text-xs border-b border-primary pb-2 hover:text-secondary transition-colors group">
                                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">explore</span>
                                        <span>Influence Map</span>
                                    </button>
                                    {/* Influence Pop-over */}
                                    <div className="phi-popover absolute right-0 top-full mt-4 w-80 bg-white text-primary p-8 shadow-2xl z-20 border border-primary/10 text-left">
                                        <h4 className="font-label text-[10px] uppercase tracking-widest font-black mb-6">Tectonic Influences</h4>
                                        <ul className="space-y-4 text-xs">
                                            <li className="flex justify-between border-b border-outline-variant pb-2">
                                                <span>Scandinavian Minimalism</span>
                                                <span className="text-secondary">40%</span>
                                            </li>
                                            <li className="flex justify-between border-b border-outline-variant pb-2">
                                                <span>Brutalist Textures</span>
                                                <span className="text-secondary">35%</span>
                                            </li>
                                            <li className="flex justify-between border-b border-outline-variant pb-2">
                                                <span>Vernacular Craft</span>
                                                <span className="text-secondary">25%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-base text-slate-500 italic">
                                    Driving the studio's research into adaptive reuse and circular economy materials.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Portrait & Technical Info */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
                        <div className="relative group aspect-[4/5] overflow-hidden bg-surface-container-highest">
                            <img alt="Pragada Lakshmi Priya" className="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" src={`${import.meta.env.BASE_URL}images/Priya.png`} />
                            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-px bg-outline-variant">
                            <div className="bg-surface p-6 flex justify-between items-center">
                                <div>
                                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Portfolio Status</span>
                                    <span className="font-label text-xs font-bold text-primary italic">Active Case Studies</span>
                                </div>
                                <span className="material-symbols-outlined text-primary text-xl">arrow_outward</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Technical Specs (Bottom Highlight) */}
            <section className="mt-16 py-16 border-t border-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <h3 className="font-headline text-4xl text-primary mb-6">The SAGE Standard</h3>
                        <p className="font-body text-xl text-on-surface-variant font-light leading-relaxed">
                            Our team operates as a single organism, utilizing advanced BIM integration and parametric modeling to ensure every design choice is backed by environmental data and structural integrity.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
