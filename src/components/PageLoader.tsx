import { useEffect, useState } from 'react';

interface PageLoaderProps {
    onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
    const [fillProgress, setFillProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Animate fill from 0 → 100% over ~1.6s
        let start: number | null = null;
        const duration = 1600;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min((elapsed / duration) * 100, 100);
            setFillProgress(progress);

            if (progress < 100) {
                requestAnimationFrame(animate);
            } else {
                // Brief pause then fade out
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(onComplete, 500);
                }, 200);
            }
        };

        const raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f9f9] transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* Blueprint grid background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(0,45,86,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,45,86,0.04) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Logo fill container */}
            <div className="relative flex flex-col items-center gap-8">
                {/* Logo with clip-path fill from bottom */}
                <div className="relative w-48 h-28" style={{ filter: 'drop-shadow(0 0 24px rgba(0,45,86,0.12))' }}>
                    {/* Ghost / outline layer */}
                    <img
                        src={`${import.meta.env.BASE_URL}images/logo-remove-bg.png`}
                        alt="SAGE logo outline"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ opacity: 0.12 }}
                    />
                    {/* Filled layer — clipped from bottom up */}
                    <img
                        src={`${import.meta.env.BASE_URL}images/logo-remove-bg.png`}
                        alt="SAGE logo fill"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{
                            clipPath: `inset(${100 - fillProgress}% 0 0 0)`,
                            transition: 'clip-path 0.05s linear',
                        }}
                    />
                </div>

                {/* Label */}
                <div className="flex flex-col items-center gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#002d56]/40">
                        SAGE Design Labs
                    </p>

                    {/* Thin progress track */}
                    <div className="w-48 h-[1px] bg-[#002d56]/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#002d56] rounded-full"
                            style={{
                                width: `${fillProgress}%`,
                                transition: 'width 0.05s linear',
                            }}
                        />
                    </div>

                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#002d56]/30">
                        {Math.round(fillProgress)}%
                    </p>
                </div>
            </div>
        </div>
    );
}
