import { useMemo } from 'react';
import { motion } from 'framer-motion';

export const SKILLS_KEY = 'portfolio_skills';

export const defaultSkillsData = [
    {
        id: 'cat-1',
        category: 'Programming',
        icon: '{ }',
        colorTheme: 'blue',
        items: [
            { id: 'sk-1-1', name: 'C++', level: 85 },
            { id: 'sk-1-2', name: 'Python', level: 82 },
            { id: 'sk-1-3', name: 'Java', level: 65 },
        ],
    },
    {
        id: 'cat-2',
        category: 'Web Development',
        icon: '</>',
        colorTheme: 'purple',
        items: [
            { id: 'sk-2-1', name: 'React / JSX', level: 80 },
            { id: 'sk-2-2', name: 'HTML5 & CSS3', level: 88 },
            { id: 'sk-2-3', name: 'JavaScript', level: 78 },
            { id: 'sk-2-4', name: 'Node.js', level: 60 },
        ],
    },
    {
        id: 'cat-3',
        category: 'Database & Concepts',
        icon: '🗄',
        colorTheme: 'cyan',
        items: [
            { id: 'sk-3-1', name: 'MySQL', level: 75 },
            { id: 'sk-3-2', name: 'Data Structures', level: 80 },
            { id: 'sk-3-3', name: 'REST APIs', level: 72 },
        ],
    },
    {
        id: 'cat-4',
        category: 'Tools & Soft Skills',
        icon: '⚙',
        colorTheme: 'emerald',
        items: [
            { id: 'sk-4-1', name: 'Git / GitHub', level: 82 },
            { id: 'sk-4-2', name: 'Problem Solving', level: 88 },
            { id: 'sk-4-3', name: 'Team Collaboration', level: 85 },
        ],
    },
];

const getSkills = () => {
    try {
        const stored = localStorage.getItem(SKILLS_KEY);
        return stored ? JSON.parse(stored) : defaultSkillsData;
    } catch { return defaultSkillsData; }
};

export const THEME_MAP = {
    blue: {
        grad: 'from-blue-500/10 to-transparent border-blue-500/15',
        bar: 'from-blue-500 to-blue-400'
    },
    purple: {
        grad: 'from-purple-500/10 to-transparent border-purple-500/15',
        bar: 'from-purple-500 to-purple-400'
    },
    cyan: {
        grad: 'from-cyan-500/10 to-transparent border-cyan-500/15',
        bar: 'from-cyan-500 to-cyan-400'
    },
    emerald: {
        grad: 'from-emerald-500/10 to-transparent border-emerald-500/15',
        bar: 'from-emerald-500 to-emerald-400'
    },
    rose: {
        grad: 'from-rose-500/10 to-transparent border-rose-500/15',
        bar: 'from-rose-500 to-rose-400'
    },
    amber: {
        grad: 'from-amber-500/10 to-transparent border-amber-500/15',
        bar: 'from-amber-500 to-amber-400'
    }
};

const FloatingSkills = ({ data }) => {
    const allSkills = useMemo(() => {
        const skills = data.flatMap(cat => cat.items.map(item => item.name));
        // Only use a small subset (max 12) of skills to avoid cluttering the background
        const expanded = [...skills].sort(() => 0.5 - Math.random()).slice(0, 12);
        
        return expanded.map((skill, i) => ({
            id: i,
            name: skill,
            x: 5 + Math.random() * 90, // Keep slightly away from extreme edges
            y: 5 + Math.random() * 90,
            duration: 40 + Math.random() * 60, // Very slow, ambient animation (40-100s)
            delay: -(Math.random() * 50),
            scale: 0.8 + Math.random() * 1.2, // Smaller max scale
        }));
    }, [data]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            {allSkills.map((el) => (
                <motion.div
                    key={el.id}
                    className="absolute font-black whitespace-nowrap text-white/[0.015]"
                    style={{ left: `${el.x}%`, top: `${el.y}%`, fontSize: `${el.scale * 3}rem` }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 60, -60, 0],
                        rotate: [0, 3, -3, 0]
                    }}
                    transition={{ duration: el.duration, delay: el.delay, repeat: Infinity, ease: "linear" }}
                >
                    {el.name}
                </motion.div>
            ))}
        </div>
    );
};

const Skills = () => {
    const skillsData = getSkills();

    return (
        <section id="skills" className="py-28 relative overflow-hidden">
            <FloatingSkills data={skillsData} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />

            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 -z-10 opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)', filter: 'blur(80px)' }} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">What I Know</p>
                    <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">
                        Technical{' '}
                        <span style={{ background: 'linear-gradient(135deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Skills
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)' }} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {skillsData.map((category, catIndex) => {
                        const theme = THEME_MAP[category.colorTheme] || THEME_MAP.blue;
                        
                        return (
                            <motion.div
                                key={category.id || category.category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                viewport={{ once: true }}
                                className={`p-6 rounded-2xl bg-gray-950 bg-gradient-to-br border backdrop-blur-sm cursor-pointer hover:brightness-110 transition-all duration-200 ${theme.grad}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-white">
                                        {category.icon || '◈'}
                                    </div>
                                    <h3 className="text-base font-bold text-white">{category.category}</h3>
                                </div>

                                <div className="space-y-5">
                                    {category.items.map((skill, idx) => (
                                        <div key={skill.id || idx}>
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
                                                    className={`h-full rounded-full bg-gradient-to-r ${theme.bar} relative`}
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
