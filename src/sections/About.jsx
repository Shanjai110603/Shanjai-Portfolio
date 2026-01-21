import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket } from 'lucide-react';

const About = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "backOut"
            }
        },
        hover: {
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const highlights = [
        {
            icon: <Code2 className="w-8 h-8 text-cyan-400" />,
            title: "Full-Stack Dev",
            description: "Building end-to-end solutions"
        },
        {
            icon: <Cpu className="w-8 h-8 text-blue-400" />,
            title: "Problem Solver",
            description: "DSA & Logic Optimization"
        },
        {
            icon: <Rocket className="w-8 h-8 text-purple-400" />,
            title: "Fast Learner",
            description: "Adapting to new tech"
        },
        {
            icon: <Globe className="w-8 h-8 text-green-400" />,
            title: "Scalable Web",
            description: "Performance-focused apps"
        }
    ];

    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] -z-10"></div>

            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                            About Me
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Driven by <span className="text-cyan-400">Logic</span>, Built for <span className="text-blue-500">Innovation</span>
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                I am a <strong className="text-white">Computer Science Graduate (2024)</strong> with a relentless drive to turn complex logic into elegant software. My journey began with mastering the efficiency of <strong className="text-white">C++ and Python</strong>, establishing a strong foundation in algorithmic problem-solving.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Today, I specialize in <strong className="text-white">Full-Stack Development</strong>, creating robust applications that blend performance with intuitive design. I thrive on tackling real-world challenges, constantly pushing the boundaries of what's possible through code.
                            </p>
                            <div className="pt-4">
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="inline-block px-8 py-3 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors font-medium cursor-pointer"
                                >
                                    Let's Connect
                                </button>
                            </div>
                        </motion.div>

                        {/* Highlight Cards */}
                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 gap-4 sm:gap-6"
                        >
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800 transition-all shadow-lg hover:shadow-cyan-500/10 group"
                                >
                                    <div className="mb-4 p-3 rounded-full bg-gray-900/50 w-fit group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
