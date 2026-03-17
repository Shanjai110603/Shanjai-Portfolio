import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Spring physics for smooth cursor lag
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(-100, springConfig);
    const cursorY = useSpring(-100, springConfig);

    useEffect(() => {
        // Check if device supports hover (ignores phones/tablets)
        if (window.matchMedia("(hover: none)").matches) {
            setIsTouchDevice(true);
            return;
        }

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            // Check if hovering over clickable elements
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[data-cursor="pointer"]')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Do not render anything for touch devices (must wrap the return, no early return before hooks)
    if (isTouchDevice) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{
                x: cursorX,
                y: cursorY,
                backgroundColor: 'white',
            }}
            animate={{
                scale: isHovering ? 2 : 1,
                opacity: isHovering ? 0.8 : 1,
            }}
            transition={{
                scale: { type: 'spring', stiffness: 300, damping: 20 },
                opacity: { duration: 0.2 }
            }}
        />
    );
};

export default CustomCursor;
