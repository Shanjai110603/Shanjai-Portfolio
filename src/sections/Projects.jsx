
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const projectsData = [
    {
        title: "Social Media Application",
        description: "A real-time Twitter-like platform with user interaction logic, data validation, and scalable backend processing.",
        tech: ["HTML", "CSS", "JavaScript", "MySQL"],
        github: "https://github.com/Shanjai110603", // Placeholder link if specific repo not provided
        demo: "#", // Placeholder
        featured: true
    },
    {
        title: "PriceIQ",
        description: "Freelancer pricing intelligence platform analyzing global rates to help users facilitate smart pricing comparisons.",
        tech: ["TypeScript", "React", "Data Analysis"],
        github: "https://github.com/Shanjai110603",
        demo: "#",
    },
    {
        title: "Secure Browser MVP",
        description: "Privacy-focused browser prototype built in C++ featuring sandboxing and Tor-based privacy integration.",
        tech: ["C++", "Privacy Engineering", "Sandboxing"],
        github: "https://github.com/Shanjai110603",
        demo: "#",
    },
    {
        title: "All-in-One SEO Suite Extension",
        description: "Chrome extension performing client-side SEO analysis without external servers, ensuring user privacy.",
        tech: ["TypeScript", "Chrome API", "SEO"],
        github: "https://github.com/Shanjai110603",
        demo: "#",
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 relative">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projectsData.map((project, index) => (
                        <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group h-full"
                            >
                                {/* Project Banner Placeholder - In real app, would be an image */}
                                <div className="h-48 bg-gray-800/50 relative overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 opacity-80"></div>
                                    <Code size={48} className="text-gray-700 group-hover:text-cyan-500 transition-colors duration-500" />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                        <div className="flex gap-3">
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors z-10" title="View Code">
                                                <Github size={20} />
                                            </a>
                                            {project.demo !== "#" && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors z-10" title="Live Demo">
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-gray-800 text-cyan-400 text-xs font-medium rounded-full border border-gray-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
