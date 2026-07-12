import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { fetchPortfolioData } from '../lib/api';

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
    },
];

import { STORAGE_KEYS } from '../lib/constants';
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
                    <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">What I've Built</p>
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
                                className="group relative bg-gray-950 rounded-2xl border border-white/8 overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-colors duration-200 h-full"
                                style={{ backdropFilter: 'blur(12px)' }}
                            >
                                {/* Banner */}
                                <div className={`relative h-44 bg-gradient-to-br ${project.color || 'from-blue-500 to-purple-600'} overflow-hidden`}>
                                    {/* Grid texture */}
                                    <div className="absolute inset-0 opacity-20"
                                        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(255,255,255,.15) 24px,rgba(255,255,255,.15) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(255,255,255,.15) 24px,rgba(255,255,255,.15) 25px)' }}
                                    />
                                    <div className="absolute inset-0 bg-black/20" />

                                    {/* Badge */}
                                    {project.highlight && (
                                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold bg-black/30 text-white border border-white/20 backdrop-blur-sm">
                                            {project.highlight}
                                        </div>
                                    )}

                                    {/* Hover shine */}
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

                                    {/* Project number */}
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
                                        <div className="flex gap-3 shrink-0 ml-2">
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
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
};

export default Projects;
