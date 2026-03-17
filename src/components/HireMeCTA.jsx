import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const HireMeCTA = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center group hidden md:flex">
            {/* Tooltip text that reveals on hover */}
            <motion.div
                initial={{ x: 60, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="relative"
            >
                <button
                    onClick={scrollToContact}
                    className="flex flex-col items-center gap-1.5 bg-gray-900/90 border border-white/10 backdrop-blur-xl rounded-l-2xl px-3 py-4 cursor-pointer hover:border-white/20 transition-all shadow-2xl"
                    aria-label="Hire Me / Contact"
                >
                    {/* Pulsing dot */}
                    <span className="relative flex h-2.5 w-2.5 mb-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: 'rgb(var(--theme-primary-400))' }} />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5"
                            style={{ background: 'rgb(var(--theme-primary-500))' }} />
                    </span>
                    <Mail size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white transition-colors writing-mode-vertical"
                        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                        Hire Me
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default HireMeCTA;
