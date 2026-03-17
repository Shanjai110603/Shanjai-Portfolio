import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Fixed ScrollProgressBar:
 * - Removed redundant useState (the progress value was being tracked twice)
 * - Now uses pure useMotionValue + useSpring — no extra re-renders
 */
const ScrollProgressBar = () => {
    const rawProgress = useMotionValue(0);
    const springProgress = useSpring(rawProgress, { stiffness: 120, damping: 28, mass: 0.4 });
    const scaleX = useTransform(springProgress, [0, 100], [0, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            rawProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [rawProgress]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none">
            <motion.div
                className="h-full origin-left"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, rgb(var(--theme-primary-500)), rgb(var(--theme-secondary-500)))',
                }}
            />
        </div>
    );
};

export default ScrollProgressBar;
