import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const springValue = useSpring(0, { stiffness: 100, damping: 25, mass: 0.5 });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
            springValue.set(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [springValue]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9998] h-[3px] bg-transparent pointer-events-none">
            <motion.div
                className="h-full origin-left"
                style={{
                    scaleX: springValue.get() / 100,
                    background: 'linear-gradient(90deg, rgb(var(--theme-primary-500)), rgb(var(--theme-secondary-500)))',
                }}
                animate={{ scaleX: scrollProgress / 100 }}
                transition={{ type: 'spring', stiffness: 100, damping: 25 }}
            />
        </div>
    );
};

export default ScrollProgressBar;
