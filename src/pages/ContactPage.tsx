export default function ContactPage() {
    return (
        <main className="flex-grow pt-8 blueprint-bg">
            <style>{`
                .scale-bar {
                    height: 2px;
                    background: currentColor;
                    position: relative;
                }
                .scale-bar::before, .scale-bar::after {
                    content: '';
                    position: absolute;
                    top: -4px;
                    width: 1px;
                    height: 10px;
                    background: currentColor;
                }
                .scale-bar::after { right: 0; }
            `}</style>
            {/* Hero Section with Architectural Notes */}
            <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto relative">
                {/* Scale Bar Detail */}
                <div className="absolute top-12 left-12 hidden lg:flex items-center space-x-4 text-slate-400">
                    <div className="scale-bar w-32"></div>
                    <span className="text-[10px] uppercase tracking-widest font-mono">Scale 1:100</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-4 block">Ref No: SDL-CQ-2024</span>
                        <h1 className="text-5xl md:text-7xl font-headline text-primary tracking-tight mb-6 leading-[0.9]">Project<br />Inquiry <span className="font-light italic text-slate-400">&amp;</span><br />Survey.</h1>
                        <p className="text-lg font-body text-slate-600 max-w-lg leading-relaxed border-l-2 border-primary/20 pl-6 py-2">
                            Submit your project parameters. Our studio evaluates inquiries based on site complexity, sustainability goals, and structural innovation potential.
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary/20 pointer-events-none"></div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary/20 pointer-events-none"></div>
                        <div className="h-64 lg:h-[500px] bg-slate-100 relative overflow-hidden border border-slate-200">
                            <img alt="Architectural drafting" className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-[2s]" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop" />
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 text-[10px] font-mono tracking-tighter border border-slate-200">A-101 // STUDIO VIEW</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Studio Inquiry Form */}
            <section className="py-12 px-6 md:px-12 bg-white/40 backdrop-blur-sm border-t border-b border-slate-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Form Card */}
                    <div className="md:col-span-8 bg-white p-8 md:p-16 border border-slate-200 relative">
                        {/* North Arrow Detail */}
                        <div className="absolute top-0 right-0 p-4 opacity-20 hidden md:block">
                            <div className="w-16 h-16 flex items-center justify-center border border-primary rounded-full relative">
                                <span className="material-symbols-outlined text-xl rotate-45">navigation</span>
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono">N</span>
                            </div>
                        </div>

                        <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-12">01 // Primary Information</h2>
                        
                        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 block" htmlFor="firstName">Principal Lead: First Name</label>
                                    <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-2 px-0 text-sm font-body transition-colors placeholder:text-slate-300 outline-none" id="firstName" placeholder="e.g. MARCUS" required type="text" />
                                </div>
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 block" htmlFor="lastName">Principal Lead: Last Name</label>
                                    <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-2 px-0 text-sm font-body transition-colors placeholder:text-slate-300 outline-none" id="lastName" placeholder="e.g. AURELIUS" required type="text" />
                                </div>
                                <div className="relative md:col-span-2">
                                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 block" htmlFor="email">Communication Channel: Email Address</label>
                                    <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-2 px-0 text-sm font-body transition-colors outline-none" id="email" placeholder="OFFICE@DOMAIN.COM" required type="email" />
                                </div>
                            </div>

                            <h2 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] pt-8 mb-12 border-t border-slate-200">02 // Site &amp; Scope</h2>
                            <div className="space-y-10">
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 block" htmlFor="subject">Project Designation / Type</label>
                                    <select className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-2 px-0 text-sm font-body transition-colors outline-none">
                                        <option>RESIDENTIAL ADAPTATION</option>
                                        <option>COMMERCIAL MASTERPLAN</option>
                                        <option>CULTURAL HUB</option>
                                        <option>EXPERIMENTAL STRUCTURE</option>
                                    </select>
                                </div>
                                <div className="relative">
                                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 block" htmlFor="message">Design Brief &amp; Site Parameters</label>
                                    <textarea className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-2 px-0 text-sm font-body resize-none transition-colors outline-none" id="message" placeholder="DESCRIBE SITE CONDITIONS, PROGRAMMATIC REQUIREMENTS, AND SUSTAINABILITY GOALS..." required rows={4}></textarea>
                                </div>
                            </div>

                            <button className="w-full md:w-auto bg-primary text-white px-12 py-5 rounded-none font-mono uppercase tracking-[0.2em] text-[10px] hover:bg-[#124376] transition-all inline-flex items-center justify-center space-x-4 border border-primary" type="submit">
                                <span>TRANSMIT PROPOSAL</span>
                                <span className="material-symbols-outlined text-sm">send</span>
                            </button>
                        </form>
                    </div>

                    {/* Side Info */}
                    <div className="md:col-span-4 flex flex-col gap-12">
                        <div className="bg-primary text-white p-10 relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 opacity-10">
                                <span className="material-symbols-outlined text-[160px]">architecture</span>
                            </div>
                            <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-8 border-b border-white/20 pb-4">Global Hub</h3>
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-2">Coordination Office</p>
                                    <p className="text-sm font-body leading-relaxed">100 Sustainable Way<br />Floor 04, Suite 400<br />Seattle, WA 98101</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-2">Direct Channel</p>
                                    <p className="text-sm font-body">+1 (206) 555-0123</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 border border-slate-200 bg-white/50">
                            <h3 className="text-xs font-mono uppercase tracking-[0.3em] mb-6">Review Timeline</h3>
                            <p className="text-xs font-body text-slate-600 leading-relaxed">
                                Inquiries are cataloged and reviewed every Tuesday by the principal partners. Expected response window is 3-5 business days.
                            </p>
                            <div className="mt-8 flex justify-between items-end border-t border-slate-200 pt-6">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">V-2.0.4</span>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-primary"></div>
                                    <div className="w-2 h-2 bg-slate-300"></div>
                                    <div className="w-2 h-2 bg-slate-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Site Survey Map */}
            <section className="h-[600px] w-full bg-slate-200 relative overflow-hidden border-t border-slate-200">
                <div className="absolute inset-0 z-0">
                    <img alt="Site Survey Map" className="w-full h-full object-cover grayscale brightness-110 contrast-125 mix-blend-multiply opacity-50" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop" />
                    <div className="absolute inset-0 blueprint-bg opacity-20"></div>
                </div>

                {/* Interactive Survey Interface Overlays */}
                <div className="absolute inset-0 z-10 pointer-events-none p-12">
                    {/* Corner Coordinates */}
                    <div className="absolute top-4 left-4 text-[9px] font-mono text-primary/40">LAT: 47.6062° N<br />LONG: 122.3321° W</div>
                    <div className="absolute bottom-4 right-4 text-[9px] font-mono text-primary/40 text-right">ELEV: 52FT<br />ZONE: C-3 SUSTAIN</div>

                    {/* Site Marker (Interactive Simulation) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="relative group cursor-crosshair">
                            <div className="w-32 h-32 border border-primary/40 rounded-full flex items-center justify-center animate-pulse">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                            </div>
                            <div className="absolute top-1/2 left-full ml-4 whitespace-nowrap bg-white/90 backdrop-blur border border-slate-200 p-4 translate-y-[-50%] opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-1">SAGE HQ SURVEY</div>
                                <div className="text-[9px] font-mono text-slate-500 leading-tight">PRECISION SITE MARKER<br />VERIFIED 2024.11.12</div>
                            </div>
                        </div>
                    </div>

                    {/* Viewfinder Brackets */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] border border-primary/5 pointer-events-none flex justify-between items-start">
                        <div className="w-8 h-8 border-t border-l border-primary/20"></div>
                        <div className="w-8 h-8 border-t border-r border-primary/20"></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] border-0 pointer-events-none flex justify-between items-end">
                        <div className="w-8 h-8 border-b border-l border-primary/20"></div>
                        <div className="w-8 h-8 border-b border-r border-primary/20"></div>
                    </div>
                </div>
            </section>
        </main>
    );
}
