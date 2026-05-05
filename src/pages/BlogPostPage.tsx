import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogsData } from '../data/blogs';

export default function BlogPostPage() {
    const { id } = useParams<{ id: string }>();
    const blog = blogsData.find(b => b.id === id);

    if (!blog) {
        return (
            <main className="flex-grow pt-32 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto w-full blueprint-bg text-center">
                <h1 className="font-headline text-4xl text-primary mb-4">Article Not Found</h1>
                <Link to="/blogs" className="text-secondary hover:text-primary transition-colors underline uppercase tracking-widest font-mono text-sm">Return to Journal</Link>
            </main>
        );
    }

    return (
        <main className="flex-grow pt-12 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto w-full blueprint-bg">
            <article className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <span className="font-label uppercase tracking-[0.2em] text-[10px] text-secondary font-bold bg-secondary/5 px-2 py-1 border border-secondary/20">
                            {blog.category}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                            {blog.date}
                        </span>
                    </div>
                    <h1 className="font-headline text-4xl md:text-6xl text-primary font-medium tracking-tight mb-8 leading-tight">
                        {blog.title}
                    </h1>
                </header>

                {/* Hero Image */}
                <div className="relative aspect-[21/9] mb-16 overflow-hidden bg-surface-container-highest border border-outline-variant">
                    <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover grayscale brightness-110"
                    />
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl text-primary font-medium mb-12 border-l-4 border-secondary pl-6 font-headline italic leading-relaxed">
                        {blog.excerpt}
                    </p>

                    <div className="font-body font-light text-on-surface-variant text-lg leading-loose space-y-8
                                    [&>h2]:font-headline [&>h2]:text-3xl [&>h2]:text-primary [&>h2]:mb-6 [&>h2]:mt-12 [&>h2]:font-medium
                                    [&>h3]:font-headline [&>h3]:text-2xl [&>h3]:text-primary [&>h3]:mb-4 [&>h3]:mt-10
                                    [&>p]:mb-6
                                    [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>ul>li]:pl-2
                                    [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-4 [&>ol>li]:pl-2 [&>ol>li]:marker:font-mono [&>ol>li]:marker:text-secondary [&>ol>li]:marker:font-bold
                                    [&>blockquote]:border-l-4 [&>blockquote]:border-outline-variant [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:my-10 [&>blockquote]:text-slate-500
                                    [&>strong]:font-bold [&>strong]:text-primary
                                    ">
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                </div>

                {/* Footer Navigation */}
                <footer className="mt-24 pt-8 border-t border-outline-variant flex justify-between items-center max-w-3xl mx-auto">
                    <Link to="/blogs" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-secondary transition-colors cursor-none">
                        <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Back to All Posts
                    </Link>
                    
                    {/* Share buttons */}
                    <div className="flex gap-4">
                        <button className="text-slate-400 hover:text-primary transition-colors cursor-none">
                            <span className="material-symbols-outlined text-sm">share</span>
                        </button>
                    </div>
                </footer>
            </article>
        </main>
    );
}
