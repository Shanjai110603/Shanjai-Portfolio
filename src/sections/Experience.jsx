
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-900/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-8 top-0 h-full w-0.5 bg-gray-800"></div>

                    {/* IoT Internship */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative pl-8 md:pl-16 pb-12"
                    >
                        {/* Dot */}
                        <div className="absolute left-[-5px] md:left-[27px] top-0 w-3 h-3 bg-cyan-500 rounded-full border-2 border-gray-900 z-10"></div>

                        <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Briefcase size={18} className="text-cyan-400" />
                                    Internet of Things (IoT) Intern
                                </h3>
                                <span className="text-sm text-gray-400 flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full w-fit">
                                    <Calendar size={14} /> Dec 2022
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4 font-medium">Internship</p>
                            <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm leading-relaxed marker:text-cyan-500">
                                <li>Worked on device connectivity, monitoring systems, and system diagnostics.</li>
                                <li>Gained hands-on experience in infrastructure troubleshooting.</li>
                                <li>Learned real-world system integration and effective problem resolution.</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
