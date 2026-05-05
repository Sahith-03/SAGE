import { Outlet, Link, NavLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function Layout() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const ringPos = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll) * 100);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            // Dot tracks instantly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
            // Detect hover
            const target = e.target as HTMLElement;
            const hovering = !!(target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button'));
            setIsHovering(hovering);
        };

        // Lerp ring loop
        const LERP = 0.12;
        let rafId: number;
        const animateRing = () => {
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP;
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
            }
            rafId = requestAnimationFrame(animateRing);
        };
        rafId = requestAnimationFrame(animateRing);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Active style helper for NavLinks
    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        `transition-all duration-300 pb-0.5 ${isActive ? 'text-[#002d56] border-b-2 border-[#002d56]' : 'text-[#42474f] hover:text-[#002d56]'}`;

    return (
        <div className="flex flex-col min-h-screen font-body text-on-background bg-background cursor-none">
            {/* Cursor Dot — instant tracker */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            >
                <div
                    className="-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150"
                    style={{
                        width: isHovering ? '6px' : '5px',
                        height: isHovering ? '6px' : '5px',
                        backgroundColor: isHovering ? '#ffffff' : '#002d56',
                    }}
                />
            </div>

            {/* Cursor Ring — lagging lerp follower */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            >
                <div
                    className="-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out"
                    style={{
                        width: isHovering ? '44px' : '28px',
                        height: isHovering ? '44px' : '28px',
                        borderColor: '#002d56',
                        backgroundColor: isHovering ? '#002d56' : 'transparent',
                        mixBlendMode: 'normal',
                    }}
                />
            </div>

            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 h-[3px] bg-[#e1e3e3] w-full z-[100]">
                <div
                    className="h-full bg-[#002d56] transition-none"
                    style={{ width: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* TopNavBar — matches Stitch exactly */}
            <nav className="fixed top-[3px] w-full z-50 bg-[#f8f9f9]/95 backdrop-blur-sm border-b border-[#e1e3e3]">
                <div className="flex justify-between items-center px-10 md:px-16 h-[60px] w-full max-w-screen-2xl mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group h-full">
                        <img 
                            src={`${import.meta.env.BASE_URL}images/logo-remove-bg.png`} 
                            alt="SAGE Design Labs Logo" 
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    {/* Nav links */}
                    <div className="hidden lg:flex items-center gap-10 font-mono text-[11px] uppercase tracking-widest">
                        <NavLink to="/" end className={getNavLinkClass}>HOME</NavLink>
                        <NavLink to="/about" className={getNavLinkClass}>ABOUT</NavLink>
                        <NavLink to="/projects" className={getNavLinkClass}>PROJECTS</NavLink>
                        <NavLink to="/team" className={getNavLinkClass}>TEAM</NavLink>
                        <NavLink to="/blogs" className={getNavLinkClass}>BLOGS</NavLink>
                        <NavLink to="/careers" className={getNavLinkClass}>CAREERS</NavLink>
                        <NavLink to="/contact" className={getNavLinkClass}>CONTACT</NavLink>
                    </div>

                    {/* CTA button */}
                    <Link to="/contact" className="hidden md:block bg-[#002d56] text-white px-6 py-2.5 font-mono text-[11px] uppercase tracking-widest hover:bg-[#124376] transition-colors">
                        START A PROJECT
                    </Link>
                    <div className="lg:hidden text-[#002d56]">
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </div>
                </div>
            </nav>

            {/* Page top offset for fixed nav */}
            <div className="pt-[59px] flex-grow">
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
                        <Link to="/careers" className="hover:text-[#002d56] transition-colors">CAREERS.EXE</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
