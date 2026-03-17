import { useEffect, useState, useRef } from 'react';

// Floating tech tags in the background
const TECH_TAGS = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
    'C++', 'HTML5', 'CSS3', 'MySQL', 'Git',
    'REST API', 'Vite', 'Tailwind', 'Redux', 'Express',
    'MongoDB', 'Docker', 'Linux', 'SQL', 'Figma',
];

// Loading messages for a Full-Stack Dev
const LOADING_STEPS = [
    { msg: 'Bundling React components...', icon: '⚛' },
    { msg: 'Compiling stylesheets...', icon: '🎨' },
    { msg: 'Connecting to database...', icon: '🗄' },
    { msg: 'Initializing REST APIs...', icon: '🔌' },
    { msg: 'Loading portfolio...', icon: '🚀' },
];

// Seeded random for deterministic float positions
const floatItems = TECH_TAGS.map((tag, i) => ({
    tag,
    x: (i * 37 + 11) % 90 + 5,         // 5–95%
    y: (i * 53 + 7) % 88 + 6,           // 6–94%
    size: i % 3 === 0 ? 'text-sm' : i % 3 === 1 ? 'text-xs' : 'text-[11px]',
    dur: 6 + (i % 5) * 2,               // 6–14s
    delay: -(i * 1.3),
    opacity: 0.06 + (i % 4) * 0.03,     // 0.06–0.15
}));

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [stepIdx, setStepIdx] = useState(0);
    const canvasRef = useRef(null);

    // Particle canvas (subtle floating dots, not matrix)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particles
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.4 + 0.1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 179, 237, ${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
        };

        const raf = { id: null };
        const loop = () => { draw(); raf.id = requestAnimationFrame(loop); };
        loop();

        return () => {
            cancelAnimationFrame(raf.id);
            window.removeEventListener('resize', resize);
        };
    }, []);

    // Progress bar
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 99) { clearInterval(interval); return 99; }
                return Math.min(p + Math.random() * 3.5 + 1, 99);
            });
        }, 55);
        return () => clearInterval(interval);
    }, []);

    // Loading step cycling
    useEffect(() => {
        const interval = setInterval(() => {
            setStepIdx(i => (i + 1) % LOADING_STEPS.length);
        }, 560);
        return () => clearInterval(interval);
    }, []);

    const displayProgress = Math.floor(progress);
    const step = LOADING_STEPS[stepIdx];

    return (
        <div
            className="fixed inset-0 flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a0f1e 100%)' }}
        >
            {/* Particle canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Floating tech tag blobs */}
            {floatItems.map(({ tag, x, y, size, dur, delay, opacity }) => (
                <span
                    key={tag}
                    className={`absolute font-mono font-medium ${size} select-none pointer-events-none`}
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        color: `rgba(99,179,237,${opacity})`,
                        animation: `float-tag ${dur}s ease-in-out ${delay}s infinite`,
                    }}
                >
                    {tag}
                </span>
            ))}

            {/* Gradient mesh blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(80px)', animation: 'blob-drift 12s ease-in-out infinite' }} />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', filter: 'blur(80px)', animation: 'blob-drift 16s ease-in-out 2s infinite reverse' }} />
            <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-8"
                style={{ background: 'radial-gradient(circle, #06b6d4, transparent)', filter: 'blur(60px)', animation: 'blob-drift 10s ease-in-out 4s infinite' }} />

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center">

                {/* Avatar / Logo */}
                <div className="relative">
                    {/* Spinning ring */}
                    <div className="absolute inset-0 rounded-full"
                        style={{
                            background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                            padding: '3px',
                            animation: 'spin-ring 3s linear infinite',
                            borderRadius: '9999px',
                        }}
                    />
                    <div
                        className="relative w-24 h-24 rounded-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%)',
                            border: '3px solid transparent',
                            backgroundClip: 'padding-box',
                            boxShadow: '0 0 40px rgba(59,130,246,0.3), inset 0 0 20px rgba(59,130,246,0.05)',
                        }}
                    >
                        {/* Initials */}
                        <span
                            className="text-3xl font-black tracking-tight"
                            style={{
                                background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #67e8f9)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            SS
                        </span>
                    </div>
                </div>

                {/* Name */}
                <div>
                    <h1
                        className="text-4xl md:text-5xl font-black tracking-tight mb-1"
                        style={{
                            background: 'linear-gradient(135deg, #93c5fd 0%, #c4b5fd 50%, #67e8f9 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        Shanjai S
                    </h1>
                    <p
                        className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase"
                        style={{ color: 'rgba(148,163,184,0.7)' }}
                    >
                        Full-Stack Developer
                    </p>
                </div>

                {/* Tech stack pills */}
                <div className="flex items-center gap-2 flex-wrap justify-center max-w-xs opacity-60">
                    {['React', 'Python', 'C++', 'MySQL'].map(t => (
                        <span
                            key={t}
                            className="px-2.5 py-1 rounded-full text-xs font-medium font-mono"
                            style={{
                                background: 'rgba(59,130,246,0.08)',
                                border: '1px solid rgba(59,130,246,0.2)',
                                color: '#93c5fd',
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="w-72 md:w-96 mt-2">
                    {/* Bar track */}
                    <div
                        className="h-[3px] w-full rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-100"
                            style={{
                                width: `${displayProgress}%`,
                                background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
                                boxShadow: '0 0 12px rgba(59,130,246,0.6)',
                            }}
                        />
                    </div>

                    {/* Status row */}
                    <div className="flex justify-between items-center mt-2.5">
                        <span
                            className="text-xs flex items-center gap-1.5"
                            style={{ color: 'rgba(148,163,184,0.6)' }}
                        >
                            <span>{step.icon}</span>
                            <span className="font-mono">{step.msg}</span>
                        </span>
                        <span
                            className="text-xs font-bold font-mono tabular-nums"
                            style={{ color: '#60a5fa' }}
                        >
                            {displayProgress}%
                        </span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float-tag {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-12px) translateX(6px); }
                    66% { transform: translateY(8px) translateX(-4px); }
                }
                @keyframes blob-drift {
                    0%, 100% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.2) translate(30px, -20px); }
                }
                @keyframes spin-ring {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
