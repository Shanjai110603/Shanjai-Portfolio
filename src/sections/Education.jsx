
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const Education = () => {
    const educationData = [
        {
            degree: "B.Sc Computer Science (Cognitive Systems)",
            institution: "Karpagam Academy of Higher Education, Coimbatore",
            year: "2024",
            grade: "CGPA: 8.49",
            icon: GraduationCap
        },
        {
            degree: "HSC (State Board)",
            institution: "Sree Adharsh Matriculation HSS",
            year: "2021",
            grade: "87.4%",
            icon: BookOpen
        },
        {
            degree: "SSLC (State Board)",
            institution: "Sree Adharsh Matriculation HSS",
            year: "2019",
            grade: "77.2%",
            icon: BookOpen
        }
    ];

    const certifications = [
        "Python – Skillrack",
        "C – Skillrack",
        "Python – NPTEL"
    ];

    return (
        <section id="education" className="py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 gap-16 max-w-4xl mx-auto">
                    {/* Education Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <GraduationCap className="text-cyan-400" />
                            Education History
                        </h3>
                        <div className="space-y-8">
                            {educationData.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative pl-8 border-l-2 border-gray-800"
                                >
                                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-gray-950"></div>
                                    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                                            <span className="text-sm text-cyan-400 font-medium whitespace-nowrap bg-cyan-500/10 px-2 py-1 rounded">{edu.year}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">{edu.institution}</p>
                                        <p className="text-gray-300 font-medium">{edu.grade}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <Award className="text-cyan-400" />
                            Certifications
                        </h3>
                        <div className="grid gap-4">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-800 hover:border-cyan-500/30 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                        <Award className="text-cyan-400" size={24} />
                                    </div>
                                    <span className="text-lg font-medium text-gray-200">{cert}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
