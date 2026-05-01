import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function Layout() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll) * 100);
        };

        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                // Cancel previous requestAnimationFrame
                if (rafId) cancelAnimationFrame(rafId);
                // Update position smoothly
                rafId = requestAnimationFrame(() => {
                    if (cursorRef.current) {
                        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                    }
                });
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-body text-on-background bg-background cursor-none">
            {/* Dynamic Cursor */}
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            >
                <div className={`rounded-full border border-[#002d56] transition-all duration-300 ease-out flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${isHovering ? 'w-12 h-12 bg-[#002d56]/10 backdrop-blur-sm' : 'w-6 h-6'}`}>
                    <div className={`w-1 h-1 bg-[#002d56] rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}></div>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-1 bg-outline-variant/30 w-full z-[100]">
                <div 
                    className="h-full bg-[#002d56]" 
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/20 mt-1">
                <div className="flex justify-between items-center px-6 md:px-12 h-24 w-full max-w-[1920px] mx-auto">
                    <Link to="/" className="flex items-center gap-4 group">
                        {/* Custom SAGE Logo Graphic */}
                        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-105 transition-transform">
                            {/* Drop shadow shape */}
                            <path d="M15 85 L15 65 L45 35 L55 35 L55 85 L40 85 L40 50 L25 65 L25 85 Z" fill="#b5ccb8" opacity="0.6"/>
                            {/* Main blue shape */}
                            <path d="M10 80 L10 60 L40 30 L50 30 L50 80 L35 80 L35 45 L20 60 L20 80 Z" fill="#002d56"/>
                        </svg>
                        <div className="flex flex-col">
                            <span className="text-2xl font-headline font-normal text-[#002d56] tracking-widest leading-none">SAGE</span>
                            <span className="text-[10px] font-sans text-[#002d56] tracking-[0.3em] font-light leading-none mt-1">Design labs</span>
                        </div>
                    </Link>
                    <div className="hidden lg:flex space-x-8 font-sans uppercase tracking-[0.1em] text-xs font-bold text-outline">
                        <Link to="/" className="text-[#002d56] border-b-2 border-[#002d56] pb-1 hover:text-[#002d56] transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-[#002d56] transition-colors">About</Link>
                        <Link to="/projects" className="hover:text-[#002d56] transition-colors">Projects</Link>
                        <Link to="/team" className="hover:text-[#002d56] transition-colors">Team</Link>
                        <Link to="/contact" className="hover:text-[#002d56] transition-colors">Contact</Link>
                    </div>
                    <button className="hidden md:block bg-[#002d56] text-white px-6 py-3 font-sans uppercase tracking-widest text-xs font-bold hover:bg-[#124376] transition-all duration-300 rounded-sm shadow-md">
                        Start a Project
                    </button>
                    <div className="lg:hidden text-[#002d56]">
                        <span className="material-symbols-outlined text-3xl">menu</span>
                    </div>
                </div>
            </nav>

            <div className="flex-grow">
                <Outlet />
            </div>

            {/* Footer */}
            <footer className="w-full py-16 bg-[#edeeee] dark:bg-slate-950 border-t border-outline-variant relative">
                <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-primary"></div>
                            <div className="font-serif text-lg italic text-[#002d56] dark:text-white">SAGE Design Labs</div>
                        </div>
                        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#4e6353] dark:text-[#d1e9d4] leading-loose max-w-sm">
                            © 2024 SAGE Design Labs. Spec document 88-v2. Resilient structures harmonized with organic environments.
                        </p>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-12">
                        <div className="flex flex-col space-y-4 font-sans text-[10px] tracking-[0.2em] uppercase">
                            <Link to="#" className="text-slate-500 hover:text-[#002d56] transition-colors">Sustainability Report</Link>
                            <Link to="#" className="text-slate-500 hover:text-[#002d56] transition-colors">Privacy</Link>
                        </div>
                        <div className="flex flex-col space-y-4 font-sans text-[10px] tracking-[0.2em] uppercase">
                            <Link to="#" className="text-slate-500 hover:text-[#002d56] transition-colors">Press Kit</Link>
                            <Link to="#" className="text-slate-500 hover:text-[#002d56] transition-colors">Careers</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
