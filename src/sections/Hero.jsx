
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import ProfileImage from '../assets/profile.png';

const Hero = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } }
    };

    const staggerContainer = {
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
            ></motion.div>
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
            ></motion.div>
            <motion.div
                animate={{
                    y: [0, -50, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"
            ></motion.div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="md:w-1/2 text-center md:text-left"
                    >
                        <motion.div variants={fadeInUp} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-sm tracking-wide">
                            Open to Work & Looking for Freelance Opportunities
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Shanjai S</span>
                        </motion.h1>

                        <div className="text-2xl md:text-3xl text-gray-300 font-light mb-8 h-[80px] md:h-auto">
                            <TypeAnimation
                                sequence={[
                                    'Building Scalable Software Solutions',
                                    1000,
                                    'Designing Intuitive User Experiences',
                                    1000,
                                    'Solving Complex Problems',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>

                        <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed mx-auto md:mx-0">
                            Computer Science Graduate (2024) with a passion for C++, Python, and Full-Stack Development.
                            Dedicated to solving real-world problems through clean code and innovative design.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a
                                href="#projects"
                                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
                            >
                                View Projects
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href="/Shanjai_S_Resume.pdf"
                                download
                                className="px-8 py-3.5 rounded-lg border border-gray-700 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-800 text-gray-300 font-medium transition-all flex items-center justify-center gap-2"
                            >
                                Download Resume
                                <Download size={18} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Profile Image Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInRight}
                        className="md:w-1/2 flex justify-center relative"
                    >
                        <Tilt
                            tiltMaxAngleX={10}
                            tiltMaxAngleY={10}
                            perspective={1000}
                            scale={1.05}
                            transitionSpeed={1000}
                            className="relative z-10"
                        >
                            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] rounded-3xl p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 shadow-2xl shadow-blue-500/20">
                                <div className="w-full h-full rounded-[20px] overflow-hidden border-4 border-gray-900 bg-gray-900">
                                    <img
                                        src={ProfileImage}
                                        alt="Shanjai S"
                                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </Tilt>

                        {/* Decorative background blur */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
