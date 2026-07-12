import { useEffect, useRef, useState } from 'react';

const InteractiveCanvas3D = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const angleRef = useRef({ x: 0.005, y: 0.005 }); // rotation velocities

    // 1. Mobile & Resize handling
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 2. Intersection Observer to pause when scrolled away
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.05 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // 3. Canvas render loop
    useEffect(() => {
        if (isMobile || !isVisible) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        const width = 450;
        const height = 450;
        canvas.width = width;
        canvas.height = height;

        // Set high density display scaling
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        // Generate 3D sphere points (using Fibonacci sphere grid algorithm)
        const numPoints = 140;
        const points = [];
        const radius = 160;

        for (let i = 0; i < numPoints; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

            points.push({
                x: radius * Math.sin(phi) * Math.cos(theta),
                y: radius * Math.sin(phi) * Math.sin(theta),
                z: radius * Math.cos(phi)
            });
        }

        // Track mouse
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            
            // Set rotation speeds based on mouse relative to center
            mouseRef.current.targetX = relX * 0.00004;
            mouseRef.current.targetY = -relY * 0.00004;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const project = (x, y, z) => {
            const d = 350; // Camera distance
            const scale = d / (d + z);
            return {
                x: x * scale + width / 2,
                y: y * scale + height / 2,
                opacity: scale * 0.95
            };
        };

        const rotateX = (point, angle) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const y1 = point.y * cos - point.z * sin;
            const z1 = point.y * sin + point.z * cos;
            point.y = y1;
            point.z = z1;
        };

        const rotateY = (point, angle) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const x1 = point.x * cos + point.z * sin;
            const z1 = -point.x * sin + point.z * cos;
            point.x = x1;
            point.z = z1;
        };

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Damp mouse speed transition
            const mouse = mouseRef.current;
            angleRef.current.x += (mouse.targetX - angleRef.current.x) * 0.08;
            angleRef.current.y += (mouse.targetY - angleRef.current.y) * 0.08;

            // Apply passive rotation base
            const rx = angleRef.current.y + 0.0015;
            const ry = angleRef.current.x + 0.0015;

            points.forEach(p => {
                rotateX(p, rx);
                rotateY(p, ry);
            });

            // Project points
            const projected = points.map(p => ({
                original: p,
                projected: project(p.x, p.y, p.z)
            }));

            // Draw connecting lines for net wireframe
            ctx.strokeStyle = 'rgba(6,182,212,0.06)'; // fallback theme color cyan
            ctx.lineWidth = 0.5;
            
            // Query theme dynamic style class (optional override)
            const style = getComputedStyle(document.documentElement);
            const primaryRGB = style.getPropertyValue('--theme-primary-500') || '6,182,212';
            ctx.strokeStyle = `rgba(${primaryRGB.trim()}, 0.065)`;

            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const p1 = projected[i].original;
                    const p2 = projected[j].original;

                    // Calculate 3D distance
                    const dist = Math.sqrt(
                        (p1.x - p2.x) ** 2 +
                        (p1.y - p2.y) ** 2 +
                        (p1.z - p2.z) ** 2
                    );

                    // Connect close nodes
                    if (dist < 62) {
                        const proj1 = projected[i].projected;
                        const proj2 = projected[j].projected;

                        // Fade connections based on depth
                        const alpha = (1 - dist / 62) * 0.16 * ((p1.z + p2.z + 320) / 640);
                        ctx.strokeStyle = `rgba(${primaryRGB.trim()}, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(proj1.x, proj1.y);
                        ctx.lineTo(proj2.x, proj2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            projected.forEach(item => {
                const { x, y, opacity } = item.projected;
                const size = (item.original.z + 160) / 320 * 2.2 + 0.8;
                
                // Color fade based on depth
                ctx.fillStyle = `rgba(${primaryRGB.trim()}, ${opacity * 0.85})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isMobile, isVisible]);

    // Render lightweight static glow under 768px (efficient for mobile viewports)
    if (isMobile) {
        return (
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none opacity-40">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[rgb(var(--theme-primary-500))]/20 to-transparent blur-3xl" />
            </div>
        );
    }

    return (
        <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
            <canvas ref={canvasRef} className="w-[450px] h-[450px]" />
        </div>
    );
};

export default InteractiveCanvas3D;
