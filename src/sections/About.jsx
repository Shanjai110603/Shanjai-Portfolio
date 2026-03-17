
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket, MapPin, Mail, ExternalLink, Zap, Star, Shield, Database, Layout } from 'lucide-react';

export const ICON_MAP = { Code2, Cpu, Globe, Rocket, MapPin, Mail, ExternalLink, Zap, Star, Shield, Database, Layout };

const defaultAboutData = {
    location: 'Coimbatore, India',
    email: 'shanjaisenthilkumar03@gmail.com',
    bioP1: "I'm a Computer Science Graduate (2024) who loves turning complex logic into clean, scalable software. My journey started with C++ and Python — and grew into full-stack development.",
    bioP2: "Today I build end-to-end applications that balance performance with great UX. I thrive on real-world challenges and ship projects that make a difference.",
    techTags: ['C++', 'Python', 'React', 'JavaScript', 'MySQL', 'Git', 'Problem Solving'],
    githubUrl: 'https://github.com/Shanjai110603',
    highlights: [
        { icon: 'Code2', title: 'Full-Stack Dev', desc: 'End-to-end solutions', color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20' },
        { icon: 'Cpu', title: 'Problem Solver', desc: 'DSA & Optimization', color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/20' },
        { icon: 'Rocket', title: 'Fast Learner', desc: 'Adapting to new tech', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-600/5', border: 'border-cyan-500/20' },
        { icon: 'Globe', title: 'Scalable Apps', desc: 'Performance-focused', color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20' },
    ]
};

export const ABOUT_KEY = 'portfolio_about';

const stripHtml = (str = '') => str.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();

const getAboutData = () => {
    try {
        const stored = localStorage.getItem(ABOUT_KEY);
        if (!stored) return defaultAboutData;
        const parsed = JSON.parse(stored);
        // Strip any old HTML from bios
        if (parsed.bioP1) parsed.bioP1 = stripHtml(parsed.bioP1);
        if (parsed.bioP2) parsed.bioP2 = stripHtml(parsed.bioP2);
        return { ...defaultAboutData, ...parsed };
    } catch { return defaultAboutData; }
};

export { defaultAboutData };

const About = () => {
    const data = getAboutData();
    return (
        <section id="about" className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Background */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full -z-10 opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.2), transparent)', filter: 'blur(60px)' }} />

        <div className="container mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Who I Am</p>
                <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">About <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Me</span></h2>
                <div className="w-16 h-1 rounded-full mx-auto" style={{ background: 'linear-gradient(90deg,#3b82f6,#8b5cf6)' }} />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                {/* Left — bio */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    {/* Quick info pills */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { icon: MapPin, text: data.location },
                            { icon: Mail, text: data.email },
                        ].map(({ icon: Icon, text }) => (
                            <span key={text} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm">
                                <Icon size={13} className="text-blue-400" />{text}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-4 text-gray-300 text-base leading-relaxed">
                        <p dangerouslySetInnerHTML={{ __html: data.bioP1 }} />
                        <p dangerouslySetInnerHTML={{ __html: data.bioP2 }} />
                    </div>

                    {/* Key  traits */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {data.techTags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/8 border border-blue-500/20 text-blue-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-2 flex gap-3 flex-wrap">
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-colors duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}
                        >
                            Let's Connect
                        </button>
                        <a
                            href={data.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-gray-400 transition-colors duration-200"
                        >
                            <ExternalLink size={14} /> GitHub Profile
                        </a>
                    </div>
                </motion.div>

                {/* Right — highlight cards */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-4"
                >
                    {data.highlights.map(({ icon: iconName, title, desc, color, bg, border }, i) => {
                        const Icon = ICON_MAP[iconName] || Code2;
                        return (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                viewport={{ once: true }}
                                className={`p-5 rounded-2xl bg-gradient-to-br border backdrop-blur-sm cursor-pointer hover:border-blue-400/30 transition-colors duration-200 ${bg} ${border}`}
                            >
                                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${color}`}>
                                    <Icon size={20} />
                                </div>
                                <h4 className="text-white font-bold text-base mb-1">{title}</h4>
                                <p className="text-gray-400 text-sm leading-snug">{desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
    );
};

export default About;
