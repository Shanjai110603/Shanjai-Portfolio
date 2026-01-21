import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Active section detection
            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (currentSection) {
                setActiveSection(currentSection);
            }
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
        { name: 'Contact', id: 'contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800 shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 py-6 flex justify-between items-center">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none"
                >
                    Shanjai S
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className={`text-base font-medium transition-all duration-300 px-5 py-2.5 rounded-full focus:outline-none ${activeSection === link.id
                                ? 'bg-blue-600/20 text-blue-400'
                                : 'text-gray-300 hover:text-cyan-400'
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <a
                        href="https://github.com/Shanjai110603"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/shanjaisenthilkumar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                        <Linkedin size={20} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 p-6 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top-5">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className={`text-lg font-medium py-2 border-b border-gray-800/50 block w-full text-left focus:outline-none ${activeSection === link.id
                                ? 'text-cyan-400'
                                : 'text-gray-300 hover:text-cyan-400'
                                }`}
                        >
                            {link.name}
                        </button>
                    ))}
                    <div className="flex space-x-6 pt-4">
                        <a
                            href="https://github.com/Shanjai110603"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <Github size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shanjaisenthilkumar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-400"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
