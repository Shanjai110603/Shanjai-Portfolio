import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Shield, CheckCircle2, Star, Cpu, Globe, BookOpen } from 'lucide-react';

const CERT_KEY = 'portfolio_certifications';

const CATEGORY_COLOR = {
    'Cloud': { bg: 'from-blue-500/10 to-cyan-500/5', border: 'border-blue-500/20', text: 'text-blue-400', dot: 'bg-blue-400' },
    'Development': { bg: 'from-purple-500/10 to-indigo-500/5', border: 'border-purple-500/20', text: 'text-purple-400', dot: 'bg-purple-400' },
    'Data': { bg: 'from-emerald-500/10 to-green-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    'Security': { bg: 'from-red-500/10 to-orange-500/5', border: 'border-red-500/20', text: 'text-red-400', dot: 'bg-red-400' },
    'Other': { bg: 'from-gray-500/10 to-gray-600/5', border: 'border-gray-500/20', text: 'text-gray-400', dot: 'bg-gray-400' },
};

const defaultCerts = [
    { id: 1, name: 'Google Cloud Fundamentals', issuer: 'Google', year: '2024', category: 'Cloud', url: '' },
    { id: 2, name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2023', category: 'Development', url: '' },
    { id: 3, name: 'Python for Data Science', issuer: 'IBM', year: '2023', category: 'Data', url: '' },
    { id: 4, name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', year: '2024', category: 'Development', url: '' },
    { id: 5, name: 'SQL & Databases', issuer: 'HackerRank', year: '2023', category: 'Data', url: '' },
    { id: 6, name: 'Problem Solving (Basic)', issuer: 'HackerRank', year: '2023', category: 'Development', url: '' },
];

export const CERT_KEY_EXPORT = CERT_KEY;

const getCerts = () => {
    try {
        const stored = localStorage.getItem(CERT_KEY);
        return stored ? JSON.parse(stored) : defaultCerts;
    } catch { return defaultCerts; }
};

const IconMap = { Award, Shield, CheckCircle2, Star, Cpu, Globe, BookOpen };

const Certifications = () => {
    const certs = getCerts();
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...new Set(certs.map(c => c.category))];
    const filtered = filter === 'All' ? certs : certs.filter(c => c.category === filter);

    if (!certs.length) return null;

    return (
        <section id="certifications" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Background glow */}
            <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full -z-10 opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)' }} />

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
                        <Award size={13} />
                        Credentials & Achievements
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Certifications &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Badges
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">
                        Continuous learning through verified courses, platforms, and industry certifications.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                                filter === cat
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                                    : 'bg-gray-900/50 text-gray-500 border border-gray-700/50 hover:text-gray-300 hover:border-gray-600'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Certs grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((cert, i) => {
                        const style = CATEGORY_COLOR[cert.category] || CATEGORY_COLOR['Other'];
                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                                className={`group relative p-5 rounded-xl border bg-gradient-to-br ${style.bg} ${style.border} hover:scale-[1.02] transition-all`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${style.dot}`} />
                                        <div>
                                            <h3 className="text-sm font-semibold text-white leading-snug">{cert.name}</h3>
                                            <p className={`text-xs mt-0.5 ${style.text}`}>{cert.issuer}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-[11px] text-gray-500">{cert.year}</span>
                                        {cert.url && (
                                            <a href={cert.url} target="_blank" rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-cyan-400 transition-colors">
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <span className={`mt-3 inline-block text-[10px] px-2 py-0.5 rounded-full bg-gray-900/40 ${style.text} border ${style.border}`}>
                                    {cert.category}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
