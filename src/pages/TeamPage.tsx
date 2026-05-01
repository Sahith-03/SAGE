export default function TeamPage() {
    return (
        <main className="pt-32 pb-48 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col items-center min-h-[60vh]">
            <h1 className="font-headline text-5xl text-[#002d56] tracking-tight mb-16 uppercase">Our Team</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl">
                <div className="flex flex-col gap-6">
                    <div className="aspect-[3/4] bg-surface-variant overflow-hidden">
                        <img alt="Founder" className="w-full h-full object-cover grayscale" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#002d56] font-bold">Principal Architect & Founder</span>
                    <h2 className="font-headline text-3xl md:text-4xl text-[#002d56] tracking-tight">John Doe</h2>
                    <p className="font-body text-base text-on-surface-variant leading-relaxed">
                        With over half a decade of experience in sustainable urban planning and material circularity, John leads the creative and technical vision at SAGE Design Labs.
                    </p>
                </div>
            </div>
        </main>
    );
}
