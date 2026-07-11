import { motion } from 'framer-motion';
import { Github, Activity } from 'lucide-react';

const GitHubStats = ({ siteInfo }) => {
    const GITHUB_USERNAME = siteInfo?.githubUsername || 'Shanjai110603';
    const theme = 'transparent'; // free github-readme-stats theming

    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=dark&hide_border=true&bg_color=0d1117&title_color=22d3ee&icon_color=3b82f6&text_color=94a3b8&count_private=true`;
    const streakUrl = `https://github-readme-streak-stats.herokuapp.com?user=${GITHUB_USERNAME}&theme=dark&hide_border=true&background=0d1117&stroke=0d1117&ring=22d3ee&fire=3b82f6&currStreakNum=ffffff&sideNums=94a3b8&currStreakLabel=22d3ee&sideLabels=94a3b8&dates=64748b`;
    const langUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=dark&hide_border=true&bg_color=0d1117&title_color=22d3ee&text_color=94a3b8`;

    return (
        <section id="github" className="py-20 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-400 mb-4">
                        <Activity size={12} className="text-green-400" />
                        GitHub Activity
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                        Code{' '}
                        <span className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(135deg, rgb(var(--theme-primary-400)), rgb(var(--theme-secondary-400)))' }}>
                            Contributions
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm">Live stats from my GitHub profile</p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 mb-4">
                    {/* General stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8"
                    >
                        <img
                            src={statsUrl}
                            alt="GitHub Stats"
                            className="w-full h-auto"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </motion.div>

                    {/* Top Languages */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8"
                    >
                        <img
                            src={langUrl}
                            alt="Top Languages"
                            className="w-full h-auto"
                            loading="lazy"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </motion.div>
                </div>

                {/* Streak */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-[#0d1117] rounded-2xl overflow-hidden border border-white/8"
                >
                    <img
                        src={streakUrl}
                        alt="GitHub Streak"
                        className="w-full h-auto"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                </motion.div>

                {/* Profile link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-6"
                >
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-400 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                    >
                        <Github size={15} />
                        View Full Profile
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubStats;
