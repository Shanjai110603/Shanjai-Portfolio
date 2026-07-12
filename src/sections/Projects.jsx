import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, X, Layers, Cpu, ShieldAlert } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { fetchPortfolioData } from '../lib/api';
import { STORAGE_KEYS } from '../lib/constants';

const defaultProjects = [
    {
        id: 1,
        title: 'Bug Hunter',
        description: 'Professional Chrome Extension for security researchers and bug bounty hunters. Automates vulnerability detection and provides OSINT/QA tools.',
        tech: ['TypeScript', 'Chrome Extension', 'Security'],
        github: 'https://github.com/Shanjai110603/Bug_Hunter',
        demo: '#',
        color: 'from-orange-500 to-pink-600',
        highlight: 'Cybersecurity',
        featured: true,
        overview: 'A robust Chrome Extension built for security researchers to audit web assets. Automatically flags header weaknesses, logs third-party APIs, and offers immediate OSINT queries.',
        architecture: 'Uses modular background scripts built in TypeScript. Utilizes Chrome Declarative Net Request APIs for low-overhead traffic inspection and isolates script injection using shadow DOM contexts.',
        challenges: 'Managing runtime CPU usage while passive scanning active sockets. Solved by writing strict debounce listeners and optimizing JSON regex matching routines.'
    },
    {
        id: 2,
        title: 'MapProfit Finder',
        description: 'Sophisticated Chrome extension to acquire clients through Google Maps scraping, intelligent lead scoring, and automated outreach management.',
        tech: ['JavaScript', 'Scraping', 'Automation'],
        github: 'https://github.com/Shanjai110603/MapProfit-Finder',
        demo: '#',
        color: 'from-cyan-500 to-blue-600',
        highlight: 'Lead Gen',
        featured: true,
        overview: 'A localized lead generator that extracts contact records directly from Google Maps maps. Includes built-in classification models to rank client value scores.',
        architecture: 'Uses vanilla JS DOM parsers in content scripts. Passes records to background scripts via port messages and interfaces with local storage caching for offline data CSV downloads.',
        challenges: 'Handling dynamic, lazy-loaded DOM trees in list containers. Overcome using MutationObservers combined with linear back-off retry algorithms.'
    },
    {
        id: 3,
        title: 'PrivacyLens',
        description: 'Lightweight, privacy-first Chrome Extension providing complete visibility into web tracking with modular, client-side digital forensic tools.',
        tech: ['JavaScript', 'Privacy', 'Extension'],
        github: 'https://github.com/Shanjai110603/Privacy_Lens',
        demo: '#',
        color: 'from-violet-500 to-purple-700',
        highlight: 'Open Source',
        featured: true,
        overview: 'A visual scanner highlighting tracking footprints on standard websites. Visualizes fingerprinters, ad networks, and cookie injections.',
        architecture: 'Intercepts network requests asynchronously. Categorizes target domains using open source blocker lists, and renders graphs using SVG charts.',
        challenges: 'Minimizing extension execution lag. Solved by pre-compiling rulesets into memory-efficient maps to ensure sub-millisecond lookups.'
    },
    {
        id: 4,
        title: 'SEO Job Hunter',
        description: 'Python automation tool to find entry-level remote jobs. Analyzes descriptions and generates tailored application materials.',
        tech: ['Python', 'Automation', 'Scraping'],
        github: 'https://github.com/Shanjai110603/SEO_Job_Hunter',
        demo: '#',
        color: 'from-emerald-500 to-teal-600',
        highlight: 'Scripting',
        featured: true,
        overview: 'A Python-powered automated job search crawler. Aggregates data across remote portals, checks keywords against templates, and formats reports.',
        architecture: 'Uses Python BeautifulSoup and Selenium scripts. Features multi-threaded loops for concurrency and saves records to SQLite databases.',
        challenges: 'Dealing with CAPTCHAs and security thresholds on portals. Resolved by rotating user agents and introducing human-like click delays.'
    }
];

export const PROJECTS_KEY = STORAGE_KEYS.projects;
export { defaultProjects };

const FILTER_TABS = ['All', 'Security', 'Python', 'Web', 'Automation'];

const Projects = () => {
    const [allProjects, setAllProjects] = useState(() => {
        try {
            const stored = localStorage.getItem(PROJECTS_KEY);
            return stored ? JSON.parse(stored) : defaultProjects;
        } catch {
            return defaultProjects;
        }
    });
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [activeModalTab, setActiveModalTab] = useState('overview'); // overview, architecture, challenges

    useEffect(() => {
        fetchPortfolioData(PROJECTS_KEY, defaultProjects).then(res => {
            if (res) {
                setAllProjects(res);
            }
        });
    }, []);

    const projectsList = Array.isArray(allProjects) ? allProjects : [];
    
    const filtered = (activeFilter === 'All'
        ? projectsList.filter(p => p?.featured)
        : projectsList.filter(p =>
            p?.featured && (
                p.tech?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
                (p.highlight && p.highlight.toLowerCase().includes(activeFilter.toLowerCase()))
            )
        )
    ).slice(0, 4);

    return (
        <section id="projects" className="py-28 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] -z-10 opacity-10"
                style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.4), transparent)', filter: 'blur(80px)' }} />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">What I\'ve Built</p>
                    <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">
                        Featured{' '}
                        <span className="bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto bg-gradient-to-r from-blue-500 to-cyan-400 mb-8" />

                    {/* Filter Tabs */}
                    <div className="flex overflow-x-auto pb-2 -mb-2 justify-start sm:justify-center gap-3 px-2 hide-scrollbar">
                        {FILTER_TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 flex-1 sm:flex-none ${
                                    activeFilter === tab ? 'text-white' : 'text-gray-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10'
                                }`}
                            >
                                {activeFilter === tab && (
                                    <motion.span
                                        layoutId="activeFilterPill"
                                        className="absolute inset-0 rounded-full"
                                        style={{ background: 'linear-gradient(135deg, rgb(var(--theme-primary-500)), rgb(var(--theme-secondary-500)))' }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto"
                    >
                        {filtered.map((project, index) => (
                            <Tilt key={project.id ?? index} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 40, rotateX: -15, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 20, stiffness: 100 }}
                                    viewport={{ once: true }}
                                    onClick={() => { setSelectedProject(project); setActiveModalTab('overview'); }}
                                    className="group relative bg-gray-950 rounded-2xl border border-white/8 overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-colors duration-200 h-full"
                                    style={{ backdropFilter: 'blur(12px)' }}
                                >
                                    {/* Banner */}
                                    <div className={`relative h-44 bg-gradient-to-br ${project.color || 'from-blue-500 to-purple-600'} overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-20"
                                            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(255,255,255,.15) 24px,rgba(255,255,255,.15) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(255,255,255,.15) 24px,rgba(255,255,255,.15) 25px)' }}
                                        />
                                        <div className="absolute inset-0 bg-black/20" />

                                        {project.highlight && (
                                            <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold bg-black/30 text-white border border-white/20 backdrop-blur-sm">
                                                {project.highlight}
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 right-4 font-black text-7xl opacity-10 text-white leading-none select-none">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-archivo font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 shrink-0 ml-2" onClick={e => e.stopPropagation()}>
                                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                   className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <Github size={18} />
                                                </a>
                                                {project.demo && project.demo !== '#' && (
                                                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                                       className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech.map((t) => (
                                                <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </Tilt>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* View more link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-blue-400 border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 hover:scale-105 transition-all"
                    >
                        View All Projects <ArrowRight size={15} />
                    </Link>
                </motion.div>
            </div>

            {/* Immersive Case Study Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                            className="bg-gray-950 border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header Banner */}
                            <div className={`h-40 bg-gradient-to-br ${selectedProject.color || 'from-cyan-500 to-blue-600'} p-8 relative flex items-end`}>
                                <div className="absolute inset-0 opacity-15"
                                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 20px,white 20px,white 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,white 20px,white 21px)' }}
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                                
                                <div className="relative z-10 text-left">
                                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-black/40 border border-white/15 text-white tracking-widest uppercase mb-2 inline-block">
                                        {selectedProject.highlight || 'Project Details'}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black text-white leading-none">
                                        {selectedProject.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Tab Bar Selector */}
                            <div className="flex bg-slate-900 border-b border-white/5 p-1 px-4">
                                {[
                                    { id: 'overview', label: 'Overview', icon: Layers },
                                    { id: 'architecture', label: 'Architecture', icon: Cpu },
                                    { id: 'challenges', label: 'Challenges', icon: ShieldAlert }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveModalTab(tab.id)}
                                        className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-all focus:outline-none ${
                                            activeModalTab === tab.id
                                                ? 'border-cyan-400 text-white'
                                                : 'border-transparent text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        <tab.icon size={13} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Modal Tab Content */}
                            <div className="p-8 md:p-10 text-left overflow-y-auto max-h-[50vh] min-h-[160px] text-gray-300 text-sm leading-relaxed space-y-4">
                                {activeModalTab === 'overview' && (
                                    <div>
                                        <h4 className="text-white font-bold mb-2">Project Brief</h4>
                                        <p>{selectedProject.overview || selectedProject.description}</p>
                                    </div>
                                )}
                                {activeModalTab === 'architecture' && (
                                    <div>
                                        <h4 className="text-white font-bold mb-2">System Schema</h4>
                                        <p>{selectedProject.architecture || 'Modular structure built using dynamic client side rendering APIs.'}</p>
                                    </div>
                                )}
                                {activeModalTab === 'challenges' && (
                                    <div>
                                        <h4 className="text-white font-bold mb-2">Technical Blockers & Solves</h4>
                                        <p>{selectedProject.challenges || 'Optimizing code delivery models for clean transitions.'}</p>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer Links */}
                            <div className="flex justify-between items-center bg-slate-900/60 p-5 px-8 border-t border-white/5">
                                <div className="flex flex-wrap gap-1">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-950 border border-white/5 text-gray-400">{t}</span>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-colors">
                                        <Github size={13} /> Source Code
                                    </a>
                                    {selectedProject.demo && selectedProject.demo !== '#' && (
                                        <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all">
                                            <ExternalLink size={13} /> Launch Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
};

export default Projects;
