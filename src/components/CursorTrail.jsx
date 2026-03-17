import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const TRAIL_COUNT = 6;

const CursorTrail = () => {
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return null;

    return (
        <>
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <TrailDot key={i} delay={i * 0.04} size={Math.max(4, 10 - i * 1.2)} opacity={1 - i * 0.15} />
            ))}
        </>
    );
};

const TrailDot = ({ delay, size, opacity }) => {
    const dotRef = useRef(null);
    const x = useSpring(-100, { stiffness: 120 - delay * 300, damping: 20 + delay * 40, mass: 0.5 });
    const y = useSpring(-100, { stiffness: 120 - delay * 300, damping: 20 + delay * 40, mass: 0.5 });

    useEffect(() => {
        let timeout;
        const handleMouseMove = (e) => {
            timeout = setTimeout(() => {
                x.set(e.clientX - size / 2);
                y.set(e.clientY - size / 2);
            }, delay * 1000);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, [x, y, delay, size]);

    return (
        <motion.div
            ref={dotRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9990] hidden md:block"
            style={{
                x,
                y,
                width: size,
                height: size,
                opacity,
                background: 'white',
                mixBlendMode: 'difference',
            }}
        />
    );
};

export default CursorTrail;
