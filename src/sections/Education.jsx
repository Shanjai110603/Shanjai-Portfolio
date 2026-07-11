import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink } from 'lucide-react';

export const defaultEducation = {
    education: [
        {
            id: 1,
            degree: 'B.Sc Computer Science (Cognitive Systems)',
            institution: 'Karpagam Academy of Higher Education, Coimbatore',
            year: '2024',
            grade: 'CGPA: 8.49',
            highlight: true,
        },
        {
            id: 2,
            degree: 'HSC — State Board',
            institution: 'Sree Adharsh Matriculation HSS',
            year: '2021',
            grade: '87.4%',
            highlight: false,
        },
        {
            id: 3,
            degree: 'SSLC — State Board',
            institution: 'Sree Adharsh Matriculation HSS',
            year: '2019',
            grade: '77.2%',
            highlight: false,
        },
    ],
    certifications: [
        { id: 101, name: 'Python Programming', provider: 'Skillrack', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
        { id: 102, name: 'C Programming', provider: 'Skillrack', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
        { id: 103, name: 'Python (Elite)', provider: 'NPTEL', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    ],
    quote: "Continuously learning and expanding my stack — always pursuing mastery."
};

import { STORAGE_KEYS } from '../lib/constants';
import { fetchPortfolioData } from '../lib/api';
export const EDU_KEY = STORAGE_KEYS.education;

const Education = () => {
    const [data, setData] = useState(() => {
        try {
            const stored = localStorage.getItem(EDU_KEY);
            return stored ? JSON.parse(stored) : defaultEducation;
        } catch {
            return defaultEducation;
        }
    });

    useEffect(() => {
        fetchPortfolioData(EDU_KEY, defaultEducation).then(res => {
            if (res) {
                setData(res);
            }
        });
    }, []);

    const { education = [], certifications = [], quote = "" } = data || {};
    const educationList = Array.isArray(education) ? education : [];
    const certificationsList = Array.isArray(certifications) ? certifications : [];
    
    return (
    <section id="education" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-20 left-0 w-72 h-72 -z-10 opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent)', filter: 'blur(60px)' }} />

        <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Academic Background</p>
                <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">
                    Education &{' '}
                    <span className="bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Background
                    </span>
                </h2>
                <div className="w-16 h-1 rounded-full mx-auto bg-gradient-to-r from-blue-500 to-cyan-500" />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Education timeline */}
                <div>
                    <h3 className="flex items-center gap-2 text-white font-bold text-lg mb-8">
                        <GraduationCap size={20} className="text-indigo-400" /> Education History
                    </h3>
                    <div className="relative">
                        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/40 to-transparent" />
                        <div className="space-y-6">
                            {educationList.map((edu, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="relative pl-14"
                                >
                                    {/* Dot */}
                                    <div className={`absolute left-3.5 top-3 w-3 h-3 rounded-full z-10 ring-4 ring-gray-950 ${edu.highlight ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' : 'bg-gray-600'}`} />

                                    <div className={`rounded-2xl p-5 border transition-all hover:border-indigo-500/30 ${edu.highlight ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-white/3 border-white/8'}`}>
                                        <div className="flex items-start justify-between gap-3 mb-1">
                                            <h4 className="text-white font-bold text-base leading-snug">{edu.degree}</h4>
                                            <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-mono font-bold ${edu.highlight ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/8 text-gray-400'}`}>
                                                {edu.year}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">{edu.institution}</p>
                                        <p className="text-sm font-semibold text-gray-300">{edu.grade}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <h3 className="flex items-center gap-2 text-white font-bold text-lg mb-8">
                        <Award size={20} className="text-emerald-400" /> Certifications
                    </h3>
                    <div className="space-y-4">
                        {certificationsList.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex cursor-pointer items-center gap-4 p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors duration-200"
                            >
                                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${cert.color}`}>
                                    <Award size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold text-sm">{cert.name}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">Provider: {cert.provider}</p>
                                </div>
                                <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400 transition-colors duration-200" />
                            </motion.div>
                        ))}

                        {/* Mini quote card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            viewport={{ once: true }}
                            className="mt-6 p-5 rounded-2xl border border-dashed border-white/10 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5"
                        >
                            <BookOpen size={16} className="text-gray-500 mb-2" />
                            <p className="text-gray-500 text-sm leading-relaxed italic">
                                "{quote}"
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
    );
};

export default Education;
