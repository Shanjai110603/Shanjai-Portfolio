import { useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TRAIL_COUNT = 6;

/**
 * Optimized CursorTrail:
 * - ONE shared mousemove event listener (not 6!)
 * - Each dot gets its own motion values, updated from the single listener
 * - No setTimeout, no useRef, no hook violations
 * - Renders nothing on touch devices
 */

// Single shared position source that all dots read from
let globalMouseX = -100;
let globalMouseY = -100;
const subscribers = new Set();

const startGlobalListener = () => {
    const onMove = (e) => {
        globalMouseX = e.clientX;
        globalMouseY = e.clientY;
        subscribers.forEach(fn => fn(e.clientX, e.clientY));
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
};

let cleanup = null;

const TrailDot = ({ index }) => {
    const size = Math.max(3, 10 - index * 1.1);
    const opacity = Math.max(0.08, 1 - index * 0.16);
    const stiffness = Math.max(15, 200 - index * 28);
    const damping = 22 + index * 5;

    const rawX = useMotionValue(globalMouseX - size / 2);
    const rawY = useMotionValue(globalMouseY - size / 2);
    const x = useSpring(rawX, { stiffness, damping, mass: 0.4 });
    const y = useSpring(rawY, { stiffness, damping, mass: 0.4 });

    const update = useCallback((mx, my) => {
        rawX.set(mx - size / 2);
        rawY.set(my - size / 2);
    }, [rawX, rawY, size]);

    useEffect(() => {
        subscribers.add(update);
        if (subscribers.size === 1) {
            cleanup = startGlobalListener();
        }
        return () => {
            subscribers.delete(update);
            if (subscribers.size === 0 && cleanup) {
                cleanup();
                cleanup = null;
            }
        };
    }, [update]);

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9990] hidden md:block"
            style={{
                x, y,
                width: size,
                height: size,
                opacity,
                background: 'white',
                mixBlendMode: 'difference',
                willChange: 'transform',
            }}
        />
    );
};

const CursorTrail = () => {
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return null;

    return (
        <>
            {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
                <TrailDot key={i} index={i} />
            ))}
        </>
    );
};

export default CursorTrail;
