import { useState, useEffect } from 'react';

export default function CareersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Prevent background scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <main className="flex-grow pt-12 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto w-full blueprint-bg relative">
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
                .modal-overlay {
                    backdrop-filter: blur(8px);
                    background-color: rgba(0, 45, 86, 0.4);
                }
            `}</style>
            
            {/* Hero Section */}
            <section className="mb-20 max-w-4xl">
                <div className="inline-flex items-center gap-2 mb-6">
                    <span className="h-px w-12 bg-primary"></span>
                    <span className="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">Join Our Team</span>
                </div>
                <h1 className="font-headline text-5xl md:text-8xl font-light text-primary tracking-tight mb-8">
                    Build The <span className="italic">Future</span>
                </h1>
                <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed font-light max-w-3xl border-l-2 border-primary-container pl-8">
                    Join an experienced team of adaptable, quietly confident designers who serve without ego, own outcomes, and invest in each other.
                </p>
            </section>

            {/* Core Values Section */}
            <section className="mb-24">
                <h2 className="font-headline text-3xl text-primary mb-12">Core Principles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-surface p-8 border border-outline-variant hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6 block">groups</span>
                        <h3 className="font-label text-sm uppercase tracking-widest text-primary font-bold mb-4">A-Players</h3>
                        <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed">
                            We are a collective of professionals who can rise to any architectural challenge and accomplish any objective together.
                        </p>
                    </div>
                    <div className="bg-surface p-8 border border-outline-variant hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6 block">school</span>
                        <h3 className="font-label text-sm uppercase tracking-widest text-primary font-bold mb-4">Invest in Each Other</h3>
                        <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed">
                            We share knowledge, mentor, and actively encourage each other to perform at a higher level of architectural precision.
                        </p>
                    </div>
                    <div className="bg-surface p-8 border border-outline-variant hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6 block">self_improvement</span>
                        <h3 className="font-label text-sm uppercase tracking-widest text-primary font-bold mb-4">Stay Humble</h3>
                        <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed">
                            We are quietly confident professionals who serve without ego. We remain open-minded and ready to learn from the environment.
                        </p>
                    </div>
                    <div className="bg-surface p-8 border border-outline-variant hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-4xl text-secondary mb-6 block">psychology_alt</span>
                        <h3 className="font-label text-sm uppercase tracking-widest text-primary font-bold mb-4">Eager for Challenge</h3>
                        <p className="font-body text-sm text-on-surface-variant font-light leading-relaxed">
                            We approach complex tectonic obstacles with a "bring it on" attitude. Our team thrives in ambiguous design situations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="mb-24 relative bg-surface-container-highest p-12 border border-outline-variant">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="relative">
                        <span className="text-6xl text-primary/20 absolute -top-6 -left-4 font-serif">"</span>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed font-light mb-6 relative z-10 italic">
                            SAGE is committed to individual growth; offering mentorship and private design coaching. These resources have helped me immensely to develop my parametric skills and advance my career.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">AW</div>
                            <div>
                                <span className="block font-label text-xs font-bold text-primary">Ashley Wallace</span>
                                <span className="block text-[10px] uppercase tracking-widest text-slate-500">Associate | Project Architect</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="text-6xl text-primary/20 absolute -top-6 -left-4 font-serif">"</span>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed font-light mb-6 relative z-10 italic">
                            You're not siloed at SAGE — you have opportunities to be involved, learn, and contribute in a meaningful way. The team encourages you to take initiative and shape your own path.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">AS</div>
                            <div>
                                <span className="block font-label text-xs font-bold text-primary">Alec Solow</span>
                                <span className="block text-[10px] uppercase tracking-widest text-slate-500">Project Manager I</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <span className="text-6xl text-primary/20 absolute -top-6 -left-4 font-serif">"</span>
                        <p className="font-body text-sm text-on-surface-variant leading-relaxed font-light mb-6 relative z-10 italic">
                            If your goal is to become a well-rounded architect, capable of directing a sustainable project from beginning to end, this is a great place to grow and learn.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">BE</div>
                            <div>
                                <span className="block font-label text-xs font-bold text-primary">Blake Evans</span>
                                <span className="block text-[10px] uppercase tracking-widest text-slate-500">Associate | Project Manager II</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="mb-16">
                <h2 className="font-headline text-3xl text-primary mb-12 flex items-center gap-4">
                    <span>Open Positions</span>
                    <span className="h-px bg-outline-variant flex-grow"></span>
                </h2>
                
                <div className="space-y-8">
                    {/* Job 1 */}
                    <div className="group border border-outline-variant bg-surface hover:border-primary transition-all p-8 relative">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                            <div>
                                <h3 className="font-headline text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">Senior Project Architect</h3>
                                <div className="flex flex-wrap gap-4 font-label text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> 15 Years +</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Full Time – Permanent</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary text-white px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest hover:bg-[#124376] transition-colors flex items-center gap-2"
                            >
                                Apply Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>

                        <div className="space-y-6 font-body text-sm text-on-surface-variant font-light leading-relaxed">
                            <p>
                                We are seeking an affable, dedicated, hardworking Senior Project Architect with outstanding communication and interpersonal skills experienced in commercial interiors and sustainable projects to be a competent, capable and supportive project leader.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-outline-variant">
                                <div>
                                    <h4 className="font-label text-[10px] uppercase tracking-widest font-bold text-primary mb-3">Requirements</h4>
                                    <ul className="list-disc pl-4 space-y-2 text-xs">
                                        <li>Bachelor's or master's degree from an NAAB accredited school</li>
                                        <li>15 years of relevant experience in architecture</li>
                                        <li>Natural leader, clear and proactive communicator</li>
                                        <li>Proficiency with Revit and Rhino software</li>
                                        <li>An intrinsic desire to derive meaning and satisfaction from your work</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-label text-[10px] uppercase tracking-widest font-bold text-primary mb-3">Responsibilities</h4>
                                    <ul className="list-disc pl-4 space-y-2 text-xs">
                                        <li>Autonomously leading the management and design vision of high-end projects</li>
                                        <li>Creating raving fans of our clients</li>
                                        <li>Helping mentor and guide the architectural staff</li>
                                        <li>Overseeing quality control of design and production documents</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Job 2 */}
                    <div className="group border border-outline-variant bg-surface hover:border-primary transition-all p-8 relative">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                            <div>
                                <h3 className="font-headline text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">BIM Coordinator</h3>
                                <div className="flex flex-wrap gap-4 font-label text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">work</span> 5-8 Years</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> Full Time – Permanent</span>
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> Hybrid / San Francisco, CA</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary text-white px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest hover:bg-[#124376] transition-colors flex items-center gap-2"
                            >
                                Apply Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>

                        <div className="space-y-6 font-body text-sm text-on-surface-variant font-light leading-relaxed">
                            <p>
                                SAGE is looking for a BIM Coordinator to advance our firm standards and procedures, focusing on Level 3 BIM integration and managing complex parametric models for environmental simulations.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 modal-overlay overflow-y-auto">
                    <div className="bg-white w-full max-w-[600px] relative shadow-2xl rounded-[2.5rem] my-auto">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-8 right-8 text-primary hover:text-secondary transition-colors z-10"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        
                        <div className="p-10 md:p-14">
                            <div className="flex items-center gap-3 mb-8 text-secondary">
                                <div className="w-8 h-px bg-secondary"></div>
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Application Form</span>
                            </div>
                            <h2 className="font-headline text-4xl text-primary mb-10 tracking-tight">Join <span className="italic">SAGE</span> Team</h2>
                            
                            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                                <div className="space-y-8">
                                    <div className="relative">
                                        <label className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2 block font-bold" htmlFor="applicantName">Full Name</label>
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-3 px-0 text-base font-body transition-colors outline-none font-medium" id="applicantName" placeholder="e.g. MARCUS AURELIUS" required type="text" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2 block font-bold" htmlFor="applicantPhone">Contact Number</label>
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-3 px-0 text-base font-body transition-colors outline-none font-medium" id="applicantPhone" placeholder="+91 XXXXX XXXXX" required type="tel" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2 block font-bold" htmlFor="applicantEmail">Email Address</label>
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-3 px-0 text-base font-body transition-colors outline-none font-medium" id="applicantEmail" placeholder="OFFICE@DOMAIN.COM" required type="email" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2 block font-bold" htmlFor="resume">Resume / Portfolio (PDF)</label>
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 text-slate-800 focus:ring-0 focus:border-primary py-3 px-0 text-sm font-body transition-colors outline-none font-medium file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-[10px] file:font-mono file:uppercase file:tracking-widest file:bg-primary file:text-white hover:file:bg-[#124376]" id="resume" required type="file" accept=".pdf" />
                                    </div>
                                </div>
                                
                                <button className="w-full bg-primary text-white px-12 py-5 rounded-none font-mono uppercase tracking-[0.2em] text-xs hover:bg-[#124376] transition-all inline-flex items-center justify-center space-x-4 border border-primary font-bold mt-4" type="submit">
                                    <span>SUBMIT APPLICATION</span>
                                    <span className="material-symbols-outlined text-base">send</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}
