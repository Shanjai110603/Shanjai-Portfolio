import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Wrench, RefreshCw, Copy, Check, Terminal, Play, ShieldAlert, Cpu } from 'lucide-react';

// --- MATRIX SNAKE GAME ---
const SnakeGame = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snake_highscore') || 0));
    const [gameState, setGameState] = useState('IDLE'); // IDLE, RUNNING, GAME_OVER
    const [isMoving, setIsMoving] = useState(false);
    
    // Game constants
    const GRID_SIZE = 20;
    const GAME_SPEED = 110; // ms (slightly slower base speed for better UX responsiveness)

    const snakeRef = useRef([[10, 10]]);
    const dirRef = useRef([0, 0]); // [dx, dy]
    const foodRef = useRef([5, 5]);
    const gridCountRef = useRef({ cols: 20, rows: 20 });

    // Handle keys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'RUNNING') {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    startGame();
                }
                return;
            }

            const currentDir = dirRef.current;
            let newDir = null;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (currentDir[1] === 0) newDir = [0, -1];
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    // Prevent immediate down-crash from initial stationary start
                    if (currentDir[1] === 0 && !(currentDir[0] === 0 && currentDir[1] === 0)) newDir = [0, 1];
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (currentDir[0] === 0) newDir = [-1, 0];
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (currentDir[0] === 0) newDir = [1, 0];
                    e.preventDefault();
                    break;
                default:
                    break;
            }

            if (newDir) {
                dirRef.current = newDir;
                setIsMoving(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    const startGame = () => {
        snakeRef.current = [
            [10, 10],
            [10, 11],
            [10, 12]
        ];
        dirRef.current = [0, 0]; // Wait for user key to start moving
        setScore(0);
        setIsMoving(false);
        setGameState('RUNNING');
        spawnFood();
        setTimeout(() => draw(), 50);
    };

    const spawnFood = () => {
        const cols = gridCountRef.current.cols;
        const rows = gridCountRef.current.rows;
        let newFood;
        let onSnake = true;
        while (onSnake) {
            newFood = [
                Math.floor(Math.random() * cols),
                Math.floor(Math.random() * rows)
            ];
            onSnake = snakeRef.current.some(segment => segment[0] === newFood[0] && segment[1] === newFood[1]);
        }
        foodRef.current = newFood;
    };

    // Game loop
    useEffect(() => {
        if (gameState !== 'RUNNING') return;

        const interval = setInterval(() => {
            if (dirRef.current[0] === 0 && dirRef.current[1] === 0) {
                draw();
                return;
            }

            const snake = [...snakeRef.current];
            const head = snake[0];
            const dir = dirRef.current;

            const nextHead = [head[0] + dir[0], head[1] + dir[1]];

            // Check collision with wall
            const cols = gridCountRef.current.cols;
            const rows = gridCountRef.current.rows;
            if (nextHead[0] < 0 || nextHead[0] >= cols || nextHead[1] < 0 || nextHead[1] >= rows) {
                endGame('wall_collision');
                return;
            }

            // Check collision with self
            if (snake.some(segment => segment[0] === nextHead[0] && segment[1] === nextHead[1])) {
                endGame('self_collision');
                return;
            }

            // Move head
            snake.unshift(nextHead);

            // Check collision with food
            if (nextHead[0] === foodRef.current[0] && nextHead[1] === foodRef.current[1]) {
                setScore(s => {
                    const newScore = s + 10;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem('snake_highscore', String(newScore));
                    }
                    return newScore;
                });
                spawnFood();
            } else {
                snake.pop();
            }

            snakeRef.current = snake;
            draw();
        }, GAME_SPEED);

        return () => clearInterval(interval);
    }, [gameState, highScore]);

    const endGame = (reason) => {
        setGameState('GAME_OVER');
    };

    // Matrix digital rain background & Game drawing
    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines subtly
        ctx.strokeStyle = 'rgba(255,255,255,0.015)';
        ctx.lineWidth = 1;
        const cols = gridCountRef.current.cols;
        const rows = gridCountRef.current.rows;
        const cellW = canvas.width / cols;
        const cellH = canvas.height / rows;

        for (let i = 0; i <= cols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellW, 0);
            ctx.lineTo(i * cellW, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i <= rows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * cellH);
            ctx.lineTo(canvas.width, i * cellH);
            ctx.stroke();
        }

        // Draw Food (Neon digital dot)
        const food = foodRef.current;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgb(var(--theme-secondary-500))';
        ctx.fillStyle = 'rgb(var(--theme-secondary-400))';
        ctx.beginPath();
        ctx.arc(food[0] * cellW + cellW/2, food[1] * cellH + cellH/2, cellW/2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Draw Snake
        const snake = snakeRef.current;
        snake.forEach((segment, index) => {
            const isHead = index === 0;
            ctx.fillStyle = isHead 
                ? 'rgb(var(--theme-primary-400))'
                : 'rgba(var(--theme-primary-500), ' + (0.9 - (index / snake.length) * 0.6) + ')';
            
            // Add slight rounded corners
            const x = segment[0] * cellW + 1;
            const y = segment[1] * cellH + 1;
            const w = cellW - 2;
            const h = cellH - 2;
            const r = isHead ? 4 : 2;

            ctx.beginPath();
            ctx.roundRect(x, y, w, h, r);
            ctx.fill();
        });
    };

    // Handle initial drawing
    useEffect(() => {
        draw();
    }, []);

    // Helper functions for on-screen buttons
    const triggerDir = (dx, dy) => {
        if (gameState !== 'RUNNING') return;
        const currentDir = dirRef.current;
        if (dx !== 0 && currentDir[0] === 0) {
            dirRef.current = [dx, 0];
            setIsMoving(true);
        }
        if (dy !== 0 && currentDir[1] === 0) {
            if (dy === 1 && currentDir[0] === 0 && currentDir[1] === 0) return;
            dirRef.current = [0, dy];
            setIsMoving(true);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-950 p-6 rounded-2xl border border-white/8">
            <div className="flex justify-between items-center w-full mb-4 px-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                    <Terminal size={12} /> SCORE: <span className="text-white font-bold">{score}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                    HI-SCORE: <span className="text-[rgb(var(--theme-primary-400))] font-bold">{highScore}</span>
                </div>
            </div>

            {/* Canvas wrapper */}
            <div ref={containerRef} className="relative aspect-square w-full max-w-[320px] bg-slate-950 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <canvas 
                    ref={canvasRef} 
                    width={320} 
                    height={320}
                    className="w-full h-full block"
                />

                {/* Overlays */}
                {gameState === 'RUNNING' && !isMoving && (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none z-25">
                        <div className="px-3 py-1.5 rounded bg-black/75 border border-white/10 text-[10px] text-cyan-400 animate-pulse font-mono tracking-wider">
                            PRESS ARROWS OR WASD TO START
                        </div>
                    </div>
                )}
                {gameState === 'IDLE' && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center">
                        <Gamepad2 size={40} className="text-[rgb(var(--theme-primary-400))] mb-4 animate-bounce" />
                        <h4 className="text-white font-bold text-base mb-1">Matrix Snake</h4>
                        <p className="text-gray-400 text-xs mb-5 max-w-[200px]">Use Arrow Keys or WASD to navigate. Don't crash into boundaries or your tail!</p>
                        <button onClick={startGame} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[rgb(var(--theme-primary-500))] to-[rgb(var(--theme-secondary-500))] text-white rounded-lg text-xs font-semibold hover:brightness-110 transition-all shadow-lg shadow-[rgba(var(--theme-primary-500),0.2)]">
                            <Play size={12} fill="white" /> Start Hacking
                        </button>
                    </div>
                )}

                {gameState === 'GAME_OVER' && (
                    <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center">
                        <ShieldAlert size={40} className="text-red-500 mb-3" />
                        <h4 className="text-red-500 font-bold text-base mb-1">SYSTEM FAILURE</h4>
                        <p className="text-gray-400 text-xs mb-2">Hacking connection severed.</p>
                        <p className="text-white text-sm font-mono font-bold mb-5">Score: {score}</p>
                        <button onClick={startGame} className="flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-xs font-semibold hover:bg-white/15 transition-all">
                            <RefreshCw size={12} /> Hack Again
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-[160px] mt-6">
                <div />
                <button onClick={() => triggerDir(0, -1)} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-[rgb(var(--theme-primary-500))] active:border-[rgb(var(--theme-primary-500))] transition-colors">▲</button>
                <div />
                <button onClick={() => triggerDir(-1, 0)} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-[rgb(var(--theme-primary-500))] active:border-[rgb(var(--theme-primary-500))] transition-colors">◀</button>
                <div />
                <button onClick={() => triggerDir(1, 0)} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-[rgb(var(--theme-primary-500))] active:border-[rgb(var(--theme-primary-500))] transition-colors">▶</button>
                <div />
                <button onClick={() => triggerDir(0, 1)} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white active:bg-[rgb(var(--theme-primary-500))] active:border-[rgb(var(--theme-primary-500))] transition-colors">▼</button>
                <div />
            </div>
        </div>
    );
};

// --- DEVELOPER UTILITIES ---
const DevTools = () => {
    const [activeTool, setActiveTool] = useState('b64'); // b64, passgen, json

    // Base64 State
    const [b64Input, setB64Input] = useState('');
    const [b64Mode, setB64Mode] = useState('encode'); // encode, decode
    const [b64Output, setB64Output] = useState('');

    // PassGen State
    const [passLen, setPassLen] = useState(16);
    const [passOpts, setPassOpts] = useState({ upper: true, lower: true, nums: true, syms: true });
    const [genPass, setGenPass] = useState('');

    // JSON Formatter State
    const [jsonInput, setJsonInput] = useState('');
    const [jsonOutput, setJsonOutput] = useState('');
    const [jsonError, setJsonError] = useState('');

    const [copied, setCopied] = useState(false);

    // Base64 Handler
    useEffect(() => {
        if (!b64Input.trim()) {
            setB64Output('');
            return;
        }
        try {
            if (b64Mode === 'encode') {
                setB64Output(btoa(b64Input));
            } else {
                setB64Output(atob(b64Input));
            }
        } catch {
            setB64Output('Invalid input/encoding sequence.');
        }
    }, [b64Input, b64Mode]);

    // Password Generator Handler
    const generatePassword = () => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const nums = '0123456789';
        const syms = '!@#$%^&*()_+~`|}{[]:;?><,./-=\\';
        
        let pool = '';
        if (passOpts.upper) pool += upper;
        if (passOpts.lower) pool += lower;
        if (passOpts.nums) pool += nums;
        if (passOpts.syms) pool += syms;

        if (!pool) {
            setGenPass('Select at least one character set.');
            return;
        }

        let result = '';
        for (let i = 0; i < passLen; i++) {
            result += pool[Math.floor(Math.random() * pool.length)];
        }
        setGenPass(result);
    };

    useEffect(() => {
        if (activeTool === 'passgen') generatePassword();
    }, [passLen, passOpts, activeTool]);

    // JSON Formatter Handler
    const formatJSON = (mode) => {
        if (!jsonInput.trim()) return;
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonError('');
            if (mode === 'minify') {
                setJsonOutput(JSON.stringify(parsed));
            } else {
                setJsonOutput(JSON.stringify(parsed, null, 4));
            }
        } catch (err) {
            setJsonError(err.message);
            setJsonOutput('');
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const inputCls = "w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[rgb(var(--theme-primary-500))] transition-colors font-mono placeholder-gray-700 resize-none";

    return (
        <div className="bg-gray-950 p-6 rounded-2xl border border-white/8 h-full flex flex-col">
            {/* Tool picker */}
            <div className="flex gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5 mb-6">
                {[
                    { id: 'b64', label: 'Base64' },
                    { id: 'passgen', label: 'Pass Gen' },
                    { id: 'json', label: 'JSON Formatter' }
                ].map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => { setActiveTool(tool.id); setCopied(false); }}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                            activeTool === tool.id
                                ? 'bg-white/10 text-white border border-white/10'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tool.label}
                    </button>
                ))}
            </div>

            {/* Tool Body */}
            <div className="flex-1">
                {activeTool === 'b64' && (
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <button onClick={() => setB64Mode('encode')} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${b64Mode === 'encode' ? 'bg-[rgb(var(--theme-primary-500))]/10 border-[rgb(var(--theme-primary-500))]/30 text-[rgb(var(--theme-primary-300))]' : 'bg-transparent border-gray-800 text-gray-500'}`}>Encode</button>
                            <button onClick={() => setB64Mode('decode')} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${b64Mode === 'decode' ? 'bg-[rgb(var(--theme-primary-500))]/10 border-[rgb(var(--theme-primary-500))]/30 text-[rgb(var(--theme-primary-300))]' : 'bg-transparent border-gray-800 text-gray-500'}`}>Decode</button>
                        </div>
                        <textarea 
                            value={b64Input} 
                            onChange={e => setB64Input(e.target.value)} 
                            placeholder={b64Mode === 'encode' ? 'Enter plain text...' : 'Enter base64 sequence...'} 
                            rows={3} 
                            className={inputCls}
                        />
                        {b64Output && (
                            <div className="relative">
                                <pre className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-xs font-mono text-gray-300 overflow-x-auto break-all max-h-36">
                                    {b64Output}
                                </pre>
                                <button onClick={() => copyToClipboard(b64Output)} className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-950 border border-white/10 text-gray-400 hover:text-white transition-colors">
                                    {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTool === 'passgen' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs font-mono text-gray-500 px-1">
                            <span>LENGTH: <span className="text-white font-bold">{passLen}</span></span>
                            <input type="range" min={6} max={32} value={passLen} onChange={e => setPassLen(Number(e.target.value))} className="w-2/3 accent-[rgb(var(--theme-primary-500))]" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { id: 'upper', label: 'A-Z' },
                                { id: 'lower', label: 'a-z' },
                                { id: 'nums', label: '0-9' },
                                { id: 'syms', label: '!@#' }
                            ].map(opt => (
                                <label key={opt.id} className="flex items-center gap-2 p-2.5 bg-slate-900 border border-white/5 rounded-xl cursor-pointer hover:border-gray-800 transition-colors">
                                    <input type="checkbox" checked={passOpts[opt.id]} onChange={e => setPassOpts(o => ({ ...o, [opt.id]: e.target.checked }))} className="w-4 h-4 rounded bg-slate-950 border-gray-800 accent-[rgb(var(--theme-primary-500))]" />
                                    <span className="text-xs text-gray-300">{opt.label}</span>
                                </label>
                            ))}
                        </div>
                        <div className="relative">
                            <input readOnly value={genPass} className="w-full bg-slate-900 border border-white/5 rounded-xl pl-4 pr-12 py-3.5 text-sm font-mono text-[rgb(var(--theme-primary-300))]" />
                            <button onClick={() => copyToClipboard(genPass)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-950 border border-white/10 text-gray-400 hover:text-white transition-colors">
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </div>
                    </div>
                )}

                {activeTool === 'json' && (
                    <div className="space-y-4">
                        <textarea 
                            value={jsonInput} 
                            onChange={e => setJsonInput(e.target.value)} 
                            placeholder='Enter raw JSON string (e.g. {"key": "val"})...' 
                            rows={3} 
                            className={inputCls}
                        />
                        <div className="flex gap-2">
                            <button onClick={() => formatJSON('pretty')} className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold border border-white/5 transition-colors">Pretty Format</button>
                            <button onClick={() => formatJSON('minify')} className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold border border-white/5 transition-colors">Minify</button>
                        </div>
                        {jsonError && (
                            <p className="text-xs text-red-400 font-mono bg-red-950/20 border border-red-500/20 p-3 rounded-xl">
                                Error: {jsonError}
                            </p>
                        )}
                        {jsonOutput && (
                            <div className="relative">
                                <pre className="w-full bg-slate-900 border border-white/5 rounded-xl p-4 text-xs font-mono text-gray-300 overflow-x-auto max-h-44">
                                    {jsonOutput}
                                </pre>
                                <button onClick={() => copyToClipboard(jsonOutput)} className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-950 border border-white/10 text-gray-400 hover:text-white transition-colors">
                                    {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- CORE PLAYGROUND SECTION ---
const Playground = () => {
    return (
        <section id="playground" className="py-28 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="absolute top-20 left-10 w-96 h-96 -z-10 opacity-10"
                style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent)', filter: 'blur(80px)' }} />

            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-[rgb(var(--theme-primary-400))] text-sm font-semibold uppercase tracking-widest mb-3">Interactive Sandbox</p>
                    <h2 className="text-4xl md:text-5xl font-archivo font-black text-white mb-4">
                        Developer{' '}
                        <span className="bg-gradient-to-br from-[rgb(var(--theme-primary-400))] to-[rgb(var(--theme-secondary-400))] bg-clip-text text-transparent">
                            Playground
                        </span>
                    </h2>
                    <div className="w-16 h-1 rounded-full mx-auto bg-gradient-to-r from-[rgb(var(--theme-primary-500))] to-[rgb(var(--theme-secondary-500))] mb-4" />
                    <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                        Test out a retro cybersecurity-themed snake game or access fast developer encoding and analysis utility tools!
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                    {/* Left: Matrix Snake */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Gamepad2 size={18} className="text-[rgb(var(--theme-primary-400))]" /> Sandbox Hacking Minigame
                        </h3>
                        <SnakeGame />
                    </motion.div>

                    {/* Right: Dev Tools */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Wrench size={18} className="text-[rgb(var(--theme-secondary-400))]" /> Quick Developer Utilities
                        </h3>
                        <DevTools />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Playground;
