import { useEffect, useState, useRef } from 'react';

interface PageLoaderProps {
    onComplete?: () => void;
    isLoading?: boolean;
    overlay?: boolean;
}

export default function PageLoader({ onComplete, isLoading = false, overlay = true }: PageLoaderProps) {
    const [fillProgress, setFillProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    
    const isLoadingRef = useRef(isLoading);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        isLoadingRef.current = isLoading;
        onCompleteRef.current = onComplete;
    }, [isLoading, onComplete]);

    useEffect(() => {
        let start: number | null = null;
        const duration = 1600;
        let isCompleted = false;

        const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            
            let progress = (elapsed / duration) * 100;
            const currentIsLoading = isLoadingRef.current;
            
            // If we are tied to an external loading state, hold at 90%
            if (currentIsLoading) {
                progress = Math.min(progress, 90);
            } else {
                progress = Math.min(progress, 100);
            }

            setFillProgress(progress);

            if (progress < 100 || currentIsLoading) {
                requestAnimationFrame(animate);
            } else if (!isCompleted) {
                isCompleted = true;
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(() => onCompleteRef.current?.(), 500);
                }, 200);
            }
        };

        const raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, []);

    const content = (
        <div className="relative flex flex-col items-center gap-8">
            <div className="relative w-48 h-28" style={{ filter: 'drop-shadow(0 0 24px rgba(0,45,86,0.12))' }}>
                <img
                    src={`${import.meta.env.BASE_URL}images/logo-remove-bg.png`}
                    alt="SAGE logo outline"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ opacity: 0.12 }}
                />
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

            <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#002d56]/40">
                    {overlay ? "SAGE Design Labs" : "Loading Data"}
                </p>

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
    );

    if (!overlay) {
        return (
            <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                {content}
            </div>
        );
    }

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8f9f9] transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, rgba(0,45,86,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,45,86,0.04) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />
            {content}
        </div>
    );
}
