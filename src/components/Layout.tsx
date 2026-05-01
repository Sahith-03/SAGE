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
            <div className="fixed top-0 left-0 h-[3px] bg-[#e1e3e3] w-full z-[100]">
                <div
                    className="h-full bg-[#002d56] transition-none"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* TopNavBar — matches Stitch exactly */}
            <nav className="fixed top-[3px] w-full z-50 bg-[#f8f9f9]/90 backdrop-blur-sm border-b border-[#e1e3e3]">
                <div className="flex justify-between items-center px-10 md:px-16 h-[72px] w-full max-w-screen-2xl mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 border border-[#002d56]/20 flex items-center justify-center">
                            <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                                <path d="M15 85 L15 65 L45 35 L55 35 L55 85 L40 85 L40 50 L25 65 L25 85 Z" fill="#b5ccb8" opacity="0.5"/>
                                <path d="M10 80 L10 60 L40 30 L50 30 L50 80 L35 80 L35 45 L20 60 L20 80 Z" fill="#002d56"/>
                            </svg>
                        </div>
                        <span className="font-headline text-base font-bold text-[#002d56] tracking-widest uppercase">SAGE DESIGN LABS</span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden lg:flex items-center gap-10 font-mono text-[11px] text-[#42474f] uppercase tracking-widest">
                        <Link to="/" className="text-[#002d56] border-b-2 border-[#002d56] pb-0.5 hover:opacity-70 transition-opacity">HOME</Link>
                        <Link to="/about" className="hover:text-[#002d56] transition-colors">ABOUT</Link>
                        <Link to="/projects" className="hover:text-[#002d56] transition-colors">PROJECTS</Link>
                        <Link to="/team" className="hover:text-[#002d56] transition-colors">TEAM</Link>
                        <Link to="/contact" className="hover:text-[#002d56] transition-colors">CONTACT</Link>
                    </div>

                    {/* CTA button */}
                    <Link to="/contact" className="hidden md:block bg-[#002d56] text-white px-6 py-3 font-mono text-[11px] uppercase tracking-widest hover:bg-[#124376] transition-colors">
                        START A PROJECT
                    </Link>
                    <div className="lg:hidden text-[#002d56]">
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </div>
                </div>
            </nav>

            {/* Page top offset for fixed nav */}
            <div className="pt-[75px] flex-grow">
                <Outlet />
            </div>

            {/* Footer — matches Stitch */}
            <footer className="bg-[#d9dada] border-t border-[#c3c6d1]">
                <div className="max-w-screen-2xl mx-auto px-10 md:px-16 py-10 flex flex-col md:flex-row items-start justify-between gap-8">
                    {/* Left */}
                    <div>
                        <div className="font-headline text-2xl text-[#002d56] uppercase tracking-widest font-bold mb-3">SAGE</div>
                        <p className="font-mono text-[10px] text-[#42474f] uppercase tracking-widest leading-relaxed max-w-xs">
                            © 2024 SAGE DESIGN LABS.<br />
                            RESILIENT STRUCTURES HARMONIZED WITH<br />
                            ORGANIC ENVIRONMENTS.
                        </p>
                        <p className="font-mono text-[10px] text-[#737780] uppercase tracking-widest mt-3">V.2.4.0_STABLE // BUILD_ARCHITERRA</p>
                    </div>
                    {/* Right links */}
                    <div className="flex flex-wrap gap-x-10 gap-y-2 font-mono text-[10px] text-[#42474f] uppercase tracking-widest">
                        <Link to="#" className="hover:text-[#002d56] transition-colors">SUSTAINABILITY_REPORT.PDF</Link>
                        <Link to="#" className="hover:text-[#002d56] transition-colors">PRIVACY_POLICY</Link>
                        <Link to="#" className="hover:text-[#002d56] transition-colors">PRESS_KIT</Link>
                        <Link to="#" className="hover:text-[#002d56] transition-colors">CAREERS.EXE</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
