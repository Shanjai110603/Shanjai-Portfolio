import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const AnimatedBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Use framer-motion springs for a smooth trailing effect
    const springConfig = { damping: 25, stiffness: 100, mass: 1 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate percentage from center for parallax effects
            const px = (e.clientX / window.innerWidth) * 100;
            const py = (e.clientY / window.innerHeight) * 100;
            
            setMousePosition({ x: px, y: py });
            
            // Adjust the mouse position by -300px to perfectly center the 600px glowing aura
            mouseX.set(e.clientX - 300);
            mouseY.set(e.clientY - 300);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            
            {/* Base gradient dark background */}
            <div className="absolute inset-0 bg-gray-950" />
            
            {/* Subtle dot matrix pattern */}
            <div 
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    // Slight parallax shift opposite to mouse movement
                    transform: `translate(${-mousePosition.x * 0.2}px, ${-mousePosition.y * 0.2}px)`,
                    transition: 'transform 0.2s ease-out'
                }}
            />

            {/* Glowing Mouse Aura */}
            <motion.div
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.15]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(139,92,246,0.4) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* Static accent glows in the corners to prevent absolute void */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
        </div>
    );
};

export default AnimatedBackground;
