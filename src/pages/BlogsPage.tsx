import { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogsData, allTags } from '../data/blogs';

export default function BlogsPage() {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [showAllTags, setShowAllTags] = useState(false);

    const filteredBlogs = selectedTag 
        ? blogsData.filter(blog => blog.tags.includes(selectedTag))
        : blogsData;

    const visibleTags = showAllTags ? allTags : allTags.slice(0, 15);

    return (
        <main className="flex-grow pt-12 pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto w-full blueprint-bg">
            {/* Morphogenesis Style Header & Filters */}
            <section className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="h-px w-8 bg-primary"></span>
                            <span className="font-label uppercase tracking-[0.3em] text-[10px] text-primary font-bold">Media & Discourse</span>
                        </div>
                        <h1 className="font-headline text-5xl md:text-7xl font-light text-primary tracking-tight mb-4">Blog</h1>
                        <p className="font-body text-lg text-on-surface-variant leading-relaxed font-light">
                            Explore in-depth articles on architecture, interior design, and sustainability with expert insights, guides, and design trends.
                        </p>
                    </div>
                </div>

                {/* Tags Filter (Masonry / Cloud style like Morphogenesis) */}
                <div className="flex flex-wrap gap-2 md:gap-3 py-6 border-y border-outline-variant/60">
                    <button 
                        onClick={() => setSelectedTag(null)}
                        className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 transition-colors cursor-none border ${!selectedTag ? 'text-primary border-primary font-bold' : 'text-slate-500 border-transparent hover:text-primary hover:border-primary'}`}
                    >
                        All Posts
                    </button>
                    {visibleTags.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            className={`font-mono text-[9px] uppercase tracking-widest px-2 py-1 transition-colors cursor-none border ${tag === selectedTag ? 'text-primary border-primary font-bold' : 'text-slate-500 border-transparent hover:text-primary hover:border-primary'}`}
                        >
                            {tag}
                        </button>
                    ))}
                    {!showAllTags && (
                        <button 
                            onClick={() => setShowAllTags(true)}
                            className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold px-2 py-1 cursor-none hover:text-primary transition-colors"
                        >
                            + VIEW ALL TAGS
                        </button>
                    )}
                </div>
            </section>

            {/* List/Grid of Posts */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {filteredBlogs.map((blog) => (
                        <article key={blog.id} className="group flex flex-col cursor-none">
                            <Link to={`/blogs/${blog.id}`} className="block relative aspect-[4/3] overflow-hidden mb-6 bg-surface-container-highest cursor-none">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title}
                                    className="w-full h-full object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105" 
                                />
                            </Link>
                            <div className="flex flex-col flex-grow">
                                <h3 className="font-headline text-2xl text-primary font-medium mb-3 group-hover:text-secondary transition-colors duration-300 leading-tight">
                                    <Link to={`/blogs/${blog.id}`} className="cursor-none">
                                        {blog.title}
                                    </Link>
                                </h3>
                                <p className="font-body text-on-surface-variant text-sm leading-relaxed font-light mb-6 flex-grow line-clamp-3">
                                    {blog.excerpt}
                                </p>
                                <div className="mt-auto border-t border-outline-variant/60 pt-4 flex justify-between items-center">
                                    <Link to={`/blogs/${blog.id}`} className="text-secondary font-mono uppercase tracking-[0.2em] text-[10px] font-bold hover:text-primary transition-colors cursor-none">
                                        READ FULL POST »
                                    </Link>
                                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">{blog.date}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                    {filteredBlogs.length === 0 && (
                        <div className="col-span-full py-24 text-center">
                            <p className="font-headline text-2xl text-outline-variant">No posts found with the tag "{selectedTag}"</p>
                            <button 
                                onClick={() => setSelectedTag(null)}
                                className="mt-4 text-primary font-mono uppercase tracking-widest text-xs font-bold hover:underline cursor-none"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredBlogs.length > 6 && (
                    <div className="mt-16 flex justify-center items-center gap-2 font-mono text-xs">
                        <button className="w-8 h-8 flex items-center justify-center bg-primary text-white cursor-none">1</button>
                        <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors cursor-none">2</button>
                        <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors cursor-none">3</button>
                        <span className="text-slate-400">...</span>
                        <button className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors cursor-none">11</button>
                        <button className="px-3 h-8 flex items-center justify-center text-primary font-bold hover:bg-primary/5 transition-colors cursor-none">Next »</button>
                    </div>
                )}
            </section>
        </main>
    );
}
