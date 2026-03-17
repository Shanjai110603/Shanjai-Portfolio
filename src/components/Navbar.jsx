
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Settings, Code2 } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
            const current = sections.find(sec => {
                const el = document.getElementById(sec);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    return rect.top <= 120 && rect.bottom >= 120;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Experience', id: 'experience' },
        { name: 'Education', id: 'education' },
        { name: 'Contact', id: 'contact' },
    ];

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${
            isScrolled
                ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-2 group focus:outline-none"
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Code2 size={14} className="text-white" />
                    </div>
                    <span className="text-xl font-black bg-gradient-to-br from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Shanjai S
                    </span>
                </button>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none ${
                                activeSection === link.id
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {link.name}
                            {activeSection === link.id && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Right icons */}
                <div className="hidden md:flex items-center gap-2">
                    <a href="https://github.com/Shanjai110603" target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/15 transition-all">
                        <Github size={15} />
                    </a>
                    <a href="https://www.linkedin.com/in/shanjaisenthilkumar/" target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-white/10 hover:border-white/15 transition-all">
                        <Linkedin size={15} />
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-300 hover:text-white focus:outline-none transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile drawer */}
            {isOpen && (
                <div className="md:hidden bg-gray-950/95 backdrop-blur-2xl border-b border-white/5 px-6 pb-6 pt-2 flex flex-col gap-1">
                    {navLinks.map(link => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium focus:outline-none transition-colors ${
                                activeSection === link.id
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-2">
                        <a href="https://github.com/Shanjai110603" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400">
                            <Github size={16} />
                        </a>
                        <a href="https://www.linkedin.com/in/shanjaisenthilkumar/" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400">
                            <Linkedin size={16} />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
