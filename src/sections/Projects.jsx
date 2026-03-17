
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

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
    },
];

export const PROJECTS_KEY = 'portfolio_projects';

const getProjects = () => {
    try {
        const stored = localStorage.getItem(PROJECTS_KEY);
        return stored ? JSON.parse(stored) : defaultProjects;
    } catch { return defaultProjects; }
};

export { defaultProjects };

const Projects = () => {
    const projects = getProjects();

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
                    className="text-center mb-20"
                >
                    <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">What I've Built</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Featured{' '}
                        <span style={{ background: 'linear-gradient(135deg,#60a5fa,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Projects
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg,#3b82f6,#34d399)' }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-7 max-w-5xl mx-auto">
                    {projects.map((project, index) => (
                        <Tilt key={project.id ?? index} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-gray-900/50 rounded-2xl border border-white/8 overflow-hidden hover:border-white/15 hover:shadow-2xl transition-all duration-400 h-full"
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
                                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-2 shrink-0 ml-2">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                               className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                <Github size={14} />
                                            </a>
                                            {project.demo && project.demo !== '#' && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                                   className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <ExternalLink size={14} />
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
                </div>

                {/* View more link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://github.com/Shanjai110603"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-blue-400 border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/40 hover:scale-105 transition-all"
                    >
                        View All on GitHub <ArrowRight size={15} />
                    </a>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
};

export default Projects;
