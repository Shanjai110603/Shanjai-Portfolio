import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Linkedin, Github, X } from 'lucide-react';
import { SITE } from '../lib/constants';

const FloatingContact = ({ siteInfo }) => {
    const email = siteInfo?.siteEmail || SITE.email;
    const linkedin = siteInfo?.siteLinkedin || SITE.linkedin;
    const github = siteInfo?.siteGithub || SITE.github;

    const menuItems = [
        { icon: Mail, href: `mailto:${email}`, label: 'Email', color: 'bg-red-500' },
        { icon: Linkedin, href: linkedin, label: 'LinkedIn', color: 'bg-blue-600' },
        { icon: Github, href: github, label: 'GitHub', color: 'bg-gray-800' },
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-3 items-end"
                    >
                        {menuItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className={`flex items-center gap-3 pl-4 pr-3 py-2 rounded-full shadow-lg ${item.color} text-white hover:scale-110 transition-transform origin-right`}
                                aria-label={item.label}
                            >
                                <span className="text-sm font-medium">{item.label}</span>
                                <item.icon size={20} />
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(o => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors focus:outline-none ${
                    isOpen ? 'bg-gray-700 text-white' : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30'
                }`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {isOpen ? (
                        <motion.div key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="message"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingContact;
