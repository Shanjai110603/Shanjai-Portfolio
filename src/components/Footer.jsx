
import { Github, Linkedin, Mail, ArrowUp, MapPin, Code2 } from 'lucide-react';
import { SITE } from '../lib/constants';

const Footer = ({ siteInfo }) => {
    const brandName = siteInfo?.siteName || SITE.name;
    const siteEmail = siteInfo?.siteEmail || SITE.email;
    const siteLocation = siteInfo?.siteLocation || SITE.location;
    const githubLink = siteInfo?.siteGithub || SITE.github;
    const linkedinLink = siteInfo?.siteLinkedin || SITE.linkedin;
    const githubUser = siteInfo?.githubUsername || SITE.githubUsername;
    const linkedinUser = linkedinLink.split('/').filter(Boolean).pop() || 'linkedin';
    const emailUser = siteEmail.split('@')[0] || 'email';
    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Experience', id: 'experience' },
        { name: 'Contact', id: 'contact' },
    ];

    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <footer className="relative overflow-hidden border-t border-white/5">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-gray-950/80 -z-10" />

            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--theme-secondary-500), 0.4), transparent)' }} />

            <div className="container mx-auto px-6 pt-16 pb-8">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Code2 size={20} className="text-[rgb(var(--theme-primary-400))]" />
                            <span className="text-lg font-black bg-gradient-to-br from-[rgb(var(--theme-primary-400))] to-[rgb(var(--theme-secondary-400))] bg-clip-text text-transparent">
                                {brandName}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                            Full-Stack Developer crafting scalable web experiences with modern technologies.
                        </p>
                        <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                            <MapPin size={11} className="text-[rgb(var(--theme-primary-400))]" />
                            {siteLocation}
                        </div>
                    </div>

                    {/* Nav */}
                    <div>
                        <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigation</p>
                        <ul className="space-y-2.5">
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <button onClick={() => scrollTo(link.id)}
                                        className="text-gray-500 text-sm hover:text-blue-400 transition-colors focus:outline-none">
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Connect</p>
                        <div className="space-y-3">
                            {[
                                { icon: Github, href: githubLink, label: 'GitHub', user: githubUser },
                                { icon: Linkedin, href: linkedinLink, label: 'LinkedIn', user: linkedinUser },
                                { icon: Mail, href: `mailto:${siteEmail}`, label: 'Email', user: emailUser },
                            ].map(({ icon: Icon, href, label, user }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 group py-1">
                                    <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-500 group-hover:text-[rgb(var(--theme-primary-400))] group-hover:border-[rgba(var(--theme-primary-500),0.3)] transition-all">
                                        <Icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 leading-none mb-0.5">{label}</p>
                                        <p className="text-gray-400 text-sm group-hover:text-[rgb(var(--theme-primary-400))] transition-colors">@{user}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} {brandName}.  All rights reserved.
                    </p>
                    <p className="text-gray-700 text-xs">
                        Built with <span className="text-[rgb(var(--theme-primary-500))]">React</span> · <span className="text-[rgb(var(--theme-secondary-500))]">Tailwind CSS</span> · <span className="text-[rgb(var(--theme-primary-400))]">Framer Motion</span>
                    </p>

                    {/* Back to top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 hover:scale-110 transition-all"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
