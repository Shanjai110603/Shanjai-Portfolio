
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';

export const defaultExperiences = [
    {
        id: 1,
        role: 'Internet of Things (IoT) Intern',
        company: 'Industrial Training',
        type: 'Internship',
        date: 'Dec 2022',
        location: 'Coimbatore',
        color: 'blue',
        points: [
            'Worked on device connectivity, monitoring systems, and system diagnostics.',
            'Gained hands-on experience in infrastructure troubleshooting and diagnostics.',
            'Learned real-world system integration and effective problem resolution.',
        ],
    },
];

export const EXP_KEY = 'portfolio_experience';

const getExperienceData = () => {
    try {
        const stored = localStorage.getItem(EXP_KEY);
        return stored ? JSON.parse(stored) : defaultExperiences;
    } catch { return defaultExperiences; }
};

const colorMap = {
    blue: {
        dot: 'bg-blue-500 shadow-blue-500/50',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        border: 'border-blue-500/20',
        glow: 'from-blue-500/8',
        icon: 'text-blue-400',
    },
    purple: {
        dot: 'bg-purple-500 shadow-purple-500/50',
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        border: 'border-purple-500/20',
        glow: 'from-purple-500/8',
        icon: 'text-purple-400',
    },
    cyan: {
        dot: 'bg-cyan-500 shadow-cyan-500/50',
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        border: 'border-cyan-500/20',
        glow: 'from-cyan-500/8',
        icon: 'text-cyan-400',
    },
    emerald: {
        dot: 'bg-emerald-500 shadow-emerald-500/50',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        border: 'border-emerald-500/20',
        glow: 'from-emerald-500/8',
        icon: 'text-emerald-400',
    },
};

const Experience = () => {
    const experiences = getExperienceData();
    
    return (
    <section id="experience" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Career</p>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Work{' '}
                    <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        Experience
                    </span>
                </h2>
                <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
            </motion.div>

            <div className="max-w-3xl mx-auto">
                {/* Timeline line */}
                <div className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent" />

                    {experiences.map((exp, i) => {
                        const c = colorMap[exp.color] || colorMap.blue;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="relative pl-14 pb-10 last:pb-0"
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-3.5 top-1.5 w-3 h-3 rounded-full ${c.dot} shadow-lg z-10 ring-4 ring-gray-950`} />

                                {/* Card */}
                                <div className={`bg-gradient-to-br ${c.glow} to-transparent border ${c.border} rounded-2xl p-6 backdrop-blur-sm hover:border-opacity-50 transition-all group`}>
                                    {/* Header */}
                                    <div className="flex flex-wrap gap-3 justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <Briefcase size={16} className={c.icon} />
                                                {exp.role}
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1 font-medium">{exp.company}</p>
                                        </div>
                                        <div className="flex flex-col gap-1.5 items-end shrink-0">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.badge}`}>
                                                <Calendar size={11} />{exp.date}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                                                <MapPin size={11} />{exp.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Type tag */}
                                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-medium bg-white/5 text-gray-400 border border-white/8 mb-4">
                                        {exp.type}
                                    </span>

                                    {/* Points */}
                                    <ul className="space-y-2.5">
                                        {exp.points.map((pt, idx) => (
                                            <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                                                <ChevronRight size={14} className={`${c.icon} mt-0.5 shrink-0`} />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
    );
};

export default Experience;
