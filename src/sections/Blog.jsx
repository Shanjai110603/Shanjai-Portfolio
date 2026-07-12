import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';
import { STORAGE_KEYS } from '../lib/constants';
import { fetchPortfolioData } from '../lib/api';

export const BLOGS_KEY = STORAGE_KEYS.blogs;

export const defaultBlogs = [
    {
        id: 'blog-1',
        title: 'Machine Learning in Cybersecurity: Signature Verification',
        slug: 'ml-signature-verification',
        summary: 'How Convolutional Neural Networks (CNN) can verify handwritten signatures to detect genuine and forged patterns in offline signature files.',
        content: `Handwritten signatures remain one of the most widely accepted methods for identity verification, yet they are highly vulnerable to forgery. Offline signature verification systems aim to identify whether a signature is genuine or forged based purely on static scanned images.

### The Role of Convolutional Neural Networks (CNNs)
Convolutional Neural Networks excel at feature extraction from visual representations. In signature verification:
1. **Pre-processing**: Scanner images are resized, binarized to remove background noise, and centered to align stroke orientation.
2. **Feature Extraction**: CNN layers extract micro-features like stroke thickness, pressure curvature, and path direction.
3. **Contrastive Loss**: Using Siamese architectures, the network compares a candidate signature against a known genuine reference signature, computing a similarity score.

### Practical Implementations
Implementing CNN signature models in MATLAB or Python (using TensorFlow) involves training on standard datasets like CEDAR or GPDS. The Siamese model learns a distance metric rather than a direct classification, allowing it to adapt to new individuals without retraining the entire network.`,
        tags: ['Cybersecurity', 'AI/ML'],
        publishedAt: '2026-07-10T12:00:00.000Z',
        readTime: 6,
        published: true
    },
    {
        id: 'blog-2',
        title: 'Demystifying Cyber Defense: Blue Team Essentials',
        slug: 'blue-team-essentials',
        summary: 'An introductory guide to setting up secure network architecture, configuring firewalls, and monitoring threat intelligence logs.',
        content: `While Red Teaming focuses on penetration testing and offensive exploits, the Blue Team represents the active, continuous defense of organizational infrastructure. Strengthening your cyber defense requires a structured, multi-layered approach.

### 1. Hardening Network Perimeters
A secure network begins with strict access controls:
- **Zero Trust Architecture**: Never trust, always verify. Every user and device must be authenticated and authorized.
- **Firewall Policies**: Block all inbound ports by default. Allow only specified ports (like 80/443 for web) and route them through reverse proxies.

### 2. Log Collection and SIEM
You cannot defend what you cannot see. Establishing robust log collection (using tools like ELK stack or Splunk) gathers:
- System access logs
- DNS query history
- Firewall blockage logs
Analyzing these logs in real-time allows security analysts to flag anomaly spikes, brute-force patterns, or unauthorized lateral movement before breaches escalate.`,
        tags: ['Cybersecurity', 'Blue Team'],
        publishedAt: '2026-07-08T09:00:00.000Z',
        readTime: 5,
        published: true
    },
    {
        id: 'blog-3',
        title: 'Architecting Scalable React Dashboards with Glassmorphism',
        slug: 'scalable-react-dashboards',
        summary: 'Design secrets behind building responsive, performance-driven admin panels using CSS variable grids, unified theme tokens, and dynamic state binding.',
        content: `Modern web users expect interfaces that feel alive, responsive, and aesthetically premium. Building an admin dashboard with a glassmorphism style requires careful styling balance so that visual flair does not degrade overall performance.

### Premium Styling System
Using glassmorphism relies on layered translucency:
- **Backdrop Filters**: Applying \`backdrop-filter: blur(12px)\` creates a frosted glass effect on semi-transparent backgrounds.
- **Border Highlights**: A thin, high-contrast border (e.g. \`border-white/10\`) defines panel bounds on dark backgrounds.
- **Theme Variables**: Store RGB colors in CSS variables (\`--theme-primary\`, \`--theme-secondary\`) to enable real-time accent shifts without rebuilding or re-rendering components.

### Optimizing Performance
Translucent elements trigger page reflows during scroll:
- Keep the number of glass containers limited.
- Utilize CSS \`will-change: transform\` or GPU-accelerated transition properties to bypass rendering lag.
- Lazy-load tabs and section charts to prevent rendering invisible nodes.`,
        tags: ['Software', 'UI/UX'],
        publishedAt: '2026-07-05T14:30:00.000Z',
        readTime: 4,
        published: true
    }
];

const Blog = () => {
    const [blogs, setBlogs] = useState(() => {
        try {
            const stored = localStorage.getItem(BLOGS_KEY);
            return stored ? JSON.parse(stored) : defaultBlogs;
        } catch {
            return defaultBlogs;
        }
    });
    const [activeTag, setActiveTag] = useState('All');
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetchPortfolioData(BLOGS_KEY, defaultBlogs).then(res => {
            if (res) {
                setBlogs(res);
            }
        });
    }, []);

    const publishedBlogs = (Array.isArray(blogs) ? blogs : []).filter(b => b.published);
    
    const tags = ['All', ...new Set(publishedBlogs.flatMap(b => b.tags || []))];

    const filteredBlogs = activeTag === 'All' 
        ? publishedBlogs 
        : publishedBlogs.filter(b => b.tags?.includes(activeTag));

    const formatDate = (dateStr) => {
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <section id="blog" className="py-28 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute bottom-1/3 right-10 w-96 h-96 -z-10 opacity-10"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)', filter: 'blur(80px)' }} />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-[rgb(var(--theme-primary-400))] text-sm font-semibold uppercase tracking-widest mb-3">Insights & Writeups</p>
                    <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">
                        My{' '}
                        <span className="bg-gradient-to-br from-[rgb(var(--theme-primary-400))] to-[rgb(var(--theme-secondary-400))] bg-clip-text text-transparent">
                            Blog
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto bg-gradient-to-r from-[rgb(var(--theme-primary-500))] to-[rgb(var(--theme-secondary-500))] mb-8" />

                    {/* Filter Tabs */}
                    <div className="flex justify-center gap-2 flex-wrap max-w-lg mx-auto">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                    activeTag === tag
                                        ? 'bg-[rgb(var(--theme-primary-500))] border-[rgb(var(--theme-primary-500))] text-white shadow-lg shadow-[rgba(var(--theme-primary-500),0.25)]'
                                        : 'bg-white/3 border-white/8 text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredBlogs.map((blog, idx) => (
                        <motion.div
                            key={blog.id || idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedBlog(blog)}
                            className="group flex flex-col h-full bg-gray-950/40 border border-white/8 rounded-2xl p-6 hover:border-[rgba(var(--theme-primary-500),0.3)] hover:bg-gray-950/80 transition-all cursor-pointer relative overflow-hidden"
                            style={{ backdropFilter: 'blur(8px)' }}
                        >
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[rgb(var(--theme-primary-500))]/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-mono">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(blog.publishedAt)}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime} min read</span>
                            </div>

                            <h3 className="text-lg font-bold text-white group-hover:text-[rgb(var(--theme-primary-300))] transition-colors mb-3 leading-snug">
                                {blog.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                                {blog.summary}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex gap-1.5">
                                    {(blog.tags || []).slice(0, 2).map(tag => (
                                        <span key={tag} className="px-2.5 py-0.5 rounded text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xs font-semibold text-[rgb(var(--theme-primary-400))] group-hover:text-white flex items-center gap-1 transition-colors">
                                    Read Post <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                    {filteredBlogs.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500">
                            No articles found in this category.
                        </div>
                    )}
                </div>
            </div>

            {/* Read Modal Overlay */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedBlog(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            className="bg-gray-950 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto flex flex-col shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>

                            {/* Header Gradient */}
                            <div className="h-32 bg-gradient-to-r from-[rgb(var(--theme-primary-600))]/20 to-[rgb(var(--theme-secondary-600))]/20 border-b border-white/5 relative shrink-0">
                                <div className="absolute inset-0 flex items-center justify-start px-8">
                                    <div className="flex items-center gap-2 text-xs font-mono text-[rgb(var(--theme-primary-300))] bg-black/40 border border-[rgba(var(--theme-primary-500),0.2)] rounded-lg px-3 py-1.5">
                                        <BookOpen size={13} /> TECHNICAL WRITEUP
                                    </div>
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="p-8 md:p-10 overflow-y-auto">
                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 font-mono">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(selectedBlog.publishedAt)}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {selectedBlog.readTime} min read</span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                                    {selectedBlog.title}
                                </h2>

                                <div className="flex gap-2 mb-8">
                                    {(selectedBlog.tags || []).map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded text-xs font-medium bg-white/5 border border-white/8 text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Content block */}
                                <div className="prose prose-invert max-w-none text-gray-300 text-base leading-relaxed space-y-5 whitespace-pre-line font-sans">
                                    {selectedBlog.content}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Blog;
