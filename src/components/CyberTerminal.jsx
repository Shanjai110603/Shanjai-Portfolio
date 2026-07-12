import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Send, Cpu, Shield, Globe } from 'lucide-react';
import { fetchPortfolioData } from '../lib/api';
import { STORAGE_KEYS } from '../lib/constants';

const CyberTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { type: 'system', text: 'HACKER SHELL v1.4.0 - CYBERSECURITY SANDBOX CORE' },
        { type: 'system', text: 'Type "help" for a list of available diagnostic tools.' },
    ]);
    const [inputVal, setInputVal] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showTerminal, setShowTerminal] = useState(true);

    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    // 1. Fetch visibility toggle configuration
    useEffect(() => {
        fetchPortfolioData(STORAGE_KEYS.siteInfo).then(info => {
            if (info && info.globalSettings) {
                setShowTerminal(info.globalSettings.enableTerminalHUD !== false);
            }
        });
    }, []);

    // 2. Keyboard shortcut Ctrl + `
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && (e.key === '`' || e.code === 'Backquote')) {
                e.preventDefault();
                setIsOpen(open => !open);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // 3. Scroll to bottom on updates
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // 4. Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen]);

    if (!showTerminal) return null;

    const addHistory = (type, text) => {
        setHistory(prev => [...prev, { type, text }]);
    };

    const processCommand = (cmd) => {
        const query = cmd.toLowerCase().trim();
        addHistory('user', `shanjai-shell:~# ${cmd}`);

        if (!query) return;

        setIsProcessing(true);

        setTimeout(() => {
            switch (query) {
                case 'help':
                    addHistory('output', 'Available commands:');
                    addHistory('output', '  help       - Display available diagnostic tools.');
                    addHistory('output', '  portscan   - Run simulated network port audit on technical skills.');
                    addHistory('output', '  decrypt    - Execute decryption algorithms on test binaries.');
                    addHistory('output', '  systeminfo - Load client core specifications & metrics.');
                    addHistory('output', '  clear      - Clear buffer streams.');
                    break;
                case 'clear':
                    setHistory([]);
                    break;
                case 'systeminfo':
                    addHistory('output', '=== SHANJAI WORKSTATION DIAGNOSTICS ===');
                    addHistory('output', `OS Architecture : Node Webkit Engine`);
                    addHistory('output', `Core Framework  : React 19 / Tailwind CSS`);
                    addHistory('output', `Active Port     : 5173 (Dev Host)`);
                    addHistory('output', `Memory Load     : Status Nominal`);
                    addHistory('output', `Uptime          : Continuous`);
                    break;
                case 'decrypt':
                    addHistory('output', 'CRACKING LOG BUFFER: [SHA-256 IDENTIFIED]');
                    addHistory('output', 'RUNNING ALGORITHM: BRUTE-FORCE SHIFTING...');
                    setTimeout(() => {
                        addHistory('output', 'PROGRESS: [||||||||||||||||||||] 100%');
                        addHistory('output', 'DECRYPTION COMPLETE: "Clean code is the signature of a master craftsman."');
                    }, 500);
                    break;
                case 'portscan':
                    addHistory('output', 'INITIATING SKILLS PORT SCAN...');
                    setTimeout(() => {
                        addHistory('output', 'PORT 80   - REACT FRONTEND [OPEN]');
                        addHistory('output', 'PORT 443  - NODE & BACKEND  [OPEN]');
                        addHistory('output', 'PORT 3306 - DATABASE LAYERS [OPEN]');
                        addHistory('output', 'PORT 22   - SYSTEM PROGRAMMING C++ [OPEN]');
                        addHistory('output', 'PORT 8080 - SECURITY OPERATIONS [OPEN]');
                        addHistory('output', 'SCAN COMPLETE: All operational interfaces online.');
                    }, 600);
                    break;
                default:
                    addHistory('output', `Command "${cmd}" not recognized. Type "help" for assistance.`);
                    break;
            }
            setIsProcessing(false);
        }, 300);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isProcessing) return;
        processCommand(inputVal);
        setInputVal('');
    };

    return (
        <>
            {/* Global floating HUD toggle button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-24 z-40 w-12 h-12 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:scale-105 active:scale-95 shadow-xl transition-all"
                title="Press Ctrl + ` to open shell"
            >
                <TerminalIcon size={20} />
            </button>

            {/* Dialog Drawer Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                        {/* Background dismiss */}
                        <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative w-full max-w-2xl h-[70vh] md:h-[450px] bg-slate-950 border border-cyan-500/20 rounded-2xl flex flex-col shadow-2xl overflow-hidden font-mono text-cyan-400"
                        >
                            {/* Terminal Topbar */}
                            <div className="flex items-center justify-between px-5 py-3.5 bg-gray-950 border-b border-white/5 select-none">
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                                    <Cpu size={14} className="text-cyan-400 animate-pulse" /> Diagnostic Sandbox Shell
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Terminal Monitor Log area */}
                            <div
                                ref={scrollRef}
                                className="flex-1 p-6 overflow-y-auto space-y-2.5 text-sm select-text selection:bg-cyan-500/30 selection:text-cyan-50"
                            >
                                {history.map((log, i) => (
                                    <div
                                        key={i}
                                        className={
                                            log.type === 'user' 
                                                ? 'text-white font-semibold' 
                                                : log.type === 'system'
                                                    ? 'text-cyan-600'
                                                    : 'text-cyan-300 pl-4 whitespace-pre-wrap'
                                        }
                                    >
                                        {log.text}
                                    </div>
                                ))}
                                {isProcessing && (
                                    <div className="text-cyan-500 animate-pulse pl-4">Running process stream...</div>
                                )}
                            </div>

                            {/* Terminal Input Form */}
                            <form
                                onSubmit={handleFormSubmit}
                                className="flex items-center gap-3 px-5 py-3.5 bg-gray-950 border-t border-white/5"
                            >
                                <span className="text-white font-bold select-none">&gt;</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputVal}
                                    onChange={e => setInputVal(e.target.value)}
                                    placeholder="Type a command (help, portscan, decrypt)..."
                                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-cyan-900/60 font-mono caret-cyan-400"
                                    disabled={isProcessing}
                                />
                                <button
                                    type="submit"
                                    className="p-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/20 text-cyan-400 hover:text-white transition-all disabled:opacity-50"
                                    disabled={isProcessing || !inputVal.trim()}
                                >
                                    <Send size={14} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CyberTerminal;
