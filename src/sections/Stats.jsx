
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Coffee, Layers, Clock } from 'lucide-react';

const SITE_INFO_KEY = 'portfolio_siteinfo';

const defaultStats = [
    { icon: Layers, label: 'Projects Built', value: 10, suffix: '+', color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/15' },
    { icon: Clock, label: 'Years Coding', value: 3, suffix: '+', color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/15' },
    { icon: Code2, label: 'Technologies', value: 15, suffix: '+', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-600/5', border: 'border-cyan-500/15' },
    { icon: Coffee, label: 'Cups of Coffee', value: 500, suffix: '+', color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/15' },
];

const useCountUp = (target, duration = 1800, inView = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration / 20);
        const interval = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(interval); }
            else setCount(Math.floor(start));
        }, 20);
        return () => clearInterval(interval);
    }, [target, inView, duration]);
    return count;
};

const StatCard = ({ icon: Icon, label, value, suffix, color, bg, border, delay }) => {
    const [inView, setInView] = useState(false);
    const ref = useRef();
    const count = useCountUp(value, 1800, inView);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.4 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${bg} border ${border} backdrop-blur-sm overflow-hidden group cursor-default`}
        >
            {/* Background number */}
            <div className={`absolute -right-2 -bottom-3 text-7xl font-black opacity-5 select-none ${color}`}>
                {value}
            </div>

            <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4 ${color}`}>
                <Icon size={20} />
            </div>

            <div className={`text-4xl font-black tabular-nums mb-1 ${color}`}>
                {count}{suffix}
            </div>
            <p className="text-gray-400 text-sm font-medium">{label}</p>
        </motion.div>
    );
};

const Stats = () => {
    let stats = defaultStats;
    try {
        const si = localStorage.getItem(SITE_INFO_KEY);
        if (si) {
            const parsed = JSON.parse(si);
            if (parsed.stats) {
                stats = defaultStats.map((s, i) => ({ ...s, value: parsed.stats[i] ?? s.value }));
            }
        }
    } catch { /* ignore */ }

    return (
        <section className="py-20 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} {...stat} delay={i * 0.1} />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
};

export default Stats;
