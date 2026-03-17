
import { motion } from 'framer-motion';

export const SKILLS_KEY = 'portfolio_skills';

export const defaultSkillsData = [
    {
        category: 'Programming',
        items: [
            { name: 'C++', level: 85 },
            { name: 'Python', level: 82 },
            { name: 'Java', level: 65 },
        ],
    },
    {
        category: 'Web Development',
        items: [
            { name: 'React / JSX', level: 80 },
            { name: 'HTML5 & CSS3', level: 88 },
            { name: 'JavaScript', level: 78 },
            { name: 'Node.js', level: 60 },
        ],
    },
    {
        category: 'Database & Concepts',
        items: [
            { name: 'MySQL', level: 75 },
            { name: 'Data Structures', level: 80 },
            { name: 'REST APIs', level: 72 },
        ],
    },
    {
        category: 'Tools & Soft Skills',
        items: [
            { name: 'Git / GitHub', level: 82 },
            { name: 'Problem Solving', level: 88 },
            { name: 'Team Collaboration', level: 85 },
        ],
    },
];

const getSkills = () => {
    try {
        const stored = localStorage.getItem(SKILLS_KEY);
        return stored ? JSON.parse(stored) : defaultSkillsData;
    } catch { return defaultSkillsData; }
};

const categoryIcon = {
    'Programming': '{ }',
    'Web Development': '</>',
    'Database & Concepts': '🗄',
    'Tools & Soft Skills': '⚙',
};

const categoryGradient = {
    'Programming': 'from-blue-500/10 to-transparent border-blue-500/15',
    'Web Development': 'from-purple-500/10 to-transparent border-purple-500/15',
    'Database & Concepts': 'from-cyan-500/10 to-transparent border-cyan-500/15',
    'Tools & Soft Skills': 'from-emerald-500/10 to-transparent border-emerald-500/15',
};

const barColor = {
    'Programming': 'from-blue-500 to-blue-400',
    'Web Development': 'from-purple-500 to-purple-400',
    'Database & Concepts': 'from-cyan-500 to-cyan-400',
    'Tools & Soft Skills': 'from-emerald-500 to-emerald-400',
};

const Skills = () => {
    const skillsData = getSkills();

    return (
        <section id="skills" className="py-28 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 -z-10 opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)', filter: 'blur(80px)' }} />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">What I Know</p>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Technical{' '}
                        <span style={{ background: 'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Skills
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)' }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillsData.map((category, catIndex) => {
                        const grad = categoryGradient[category.category] || 'from-gray-800/20 to-transparent border-gray-700/20';
                        const bar = barColor[category.category] || 'from-blue-500 to-cyan-500';
                        const icon = categoryIcon[category.category] || '◈';
                        return (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-6 rounded-2xl bg-gradient-to-br ${grad} border backdrop-blur-sm hover:scale-[1.01] transition-transform duration-300`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-white">
                                        {icon}
                                    </div>
                                    <h3 className="text-base font-bold text-white">{category.category}</h3>
                                </div>

                                <div className="space-y-5">
                                    {category.items.map((skill) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                                                <span className="text-gray-500 text-xs font-mono tabular-nums">{skill.level}%</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
                                                    viewport={{ once: true }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${bar} relative`}
                                                >
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-lg" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
};

export default Skills;
