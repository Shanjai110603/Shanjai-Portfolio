import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { PROJECTS_KEY, defaultProjects } from '../sections/Projects';
import { useEffect } from 'react';

const getProjects = () => {
    try {
        const stored = localStorage.getItem(PROJECTS_KEY);
        return stored ? JSON.parse(stored) : defaultProjects;
    } catch { return defaultProjects; }
};

const AllProjects = () => {
    const projects = getProjects();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500 selection:text-white flex flex-col">
            <Navbar isInnerPage={true} />
            
            <main className="flex-1 pt-32 pb-24 relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] -z-10 opacity-10"
                    style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.3), transparent)', filter: 'blur(100px)' }} />

                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm mb-8 transition-colors group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                        
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                            All{' '}
                            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Projects
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            A complete archive of everything I've built, ranging from open-source tools to commercial applications and personal experiments.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <Tilt key={project.id ?? index} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group relative bg-gray-900/40 rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-400 flex flex-col h-full"
                                    style={{ backdropFilter: 'blur(12px)' }}
                                >
                                    <div className={`relative h-2 bg-gradient-to-r ${project.color || 'from-blue-500 to-purple-600'}`} />
                                    
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-white leading-snug">
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-2 shrink-0 ml-3">
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-white transition-colors">
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {project.demo && project.demo !== '#' && (
                                                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-white transition-colors">
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mt-auto">
                                            {project.tech?.map((t) => (
                                                <span key={t} className="px-2 py-1 rounded bg-black/30 border border-white/5 text-gray-400 text-xs font-medium">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/5 rounded-2xl pointer-events-none transition-colors duration-300" />
                                </motion.div>
                            </Tilt>
                        ))}
                    </div>
                </div>
            </main>
            
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default AllProjects;
