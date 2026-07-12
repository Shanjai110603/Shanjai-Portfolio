import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Tilt from 'react-parallax-tilt';
import ProfileImage from '../assets/profile.png';
import InteractiveCanvas3D from '../components/InteractiveCanvas3D';

const defaultHeroData = {
    statusBadge: "Open to Work · Freelance Ready",
    greeting: "Hey there, I'm",
    nameFirst: "Shanjai",
    nameLast: "Senthilkumar",
    roles: ["Full-Stack Developer", "React & Python Engineer", "Problem Solver", "Clean Code Advocate"],
    bioText: "CS Graduate (2024) building scalable, beautiful web apps with React, Python & C++. Passionate about turning complex problems into elegant solutions.",
    showImage: true,
    cvUrl: "/Shanjai_S_Resume.pdf",
    githubUrl: "https://github.com/Shanjai110603",
    linkedinUrl: "https://www.linkedin.com/in/shanjaisenthilkumar/",
    emailAddr: "shanjaisenthilkumar03@gmail.com",
    badgeTopRight: "🚀 CS Graduate 2024",
    badgeBottomLeft: "⚡ Full-Stack Dev"
};

import { STORAGE_KEYS } from '../lib/constants';
import { fetchPortfolioData } from '../lib/api';

export const HERO_KEY = STORAGE_KEYS.hero;
const MEDIA_KEY = STORAGE_KEYS.media;

// Strip any HTML tags from old stored data
const stripHtml = (str = '') => str.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim();

const getMergedMedia = (heroData) => {
    try {
        const mediaStored = localStorage.getItem(MEDIA_KEY);
        if (mediaStored) {
            const media = JSON.parse(mediaStored);
            if (media.images?.length > 0) {
                const idx = media.activeImageIndex ?? 0;
                heroData._activeImageUrl = media.images[idx]?.url || null;
            }
            if (media.resumes?.length > 0) {
                const idx = media.activeResumeIndex ?? 0;
                heroData._activeCvUrl = media.resumes[idx]?.url || null;
            }
        }
    } catch {}
    return heroData;
};

export { defaultHeroData };

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const childVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { type: 'spring', damping: 12, stiffness: 200 } 
    }
};

const Hero = () => {
    const [data, setData] = useState(() => {
        try {
            const stored = localStorage.getItem(HERO_KEY);
            const parsed = stored ? JSON.parse(stored) : {};
            if (parsed.bioHtml && !parsed.bioText) {
                parsed.bioText = stripHtml(parsed.bioHtml);
            }
            return getMergedMedia({ ...defaultHeroData, ...parsed });
        } catch {
            return defaultHeroData;
        }
    });

    useEffect(() => {
        fetchPortfolioData(HERO_KEY, defaultHeroData).then(res => {
            if (res) {
                if (res.bioHtml && !res.bioText) {
                    res.bioText = stripHtml(res.bioHtml);
                }
                setData(getMergedMedia({ ...defaultHeroData, ...res }));
            }
        });
    }, []);


    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

            {/* ── Background Layer ── */}
            {/* Deep gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#0d1b35] to-gray-950 -z-20" />

            {/* Animated gradient orbs */}
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15], x: [0, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full -z-10"
                style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-500), 0.25), transparent 70%)', filter: 'blur(40px)' }}
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1], x: [0, -20, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full -z-10"
                style={{ background: 'radial-gradient(circle, rgba(var(--theme-secondary-500), 0.2), transparent 70%)', filter: 'blur(50px)' }}
            />
            <motion.div
                animate={{ y: [0, -40, 0], opacity: [0.08, 0.18, 0.08] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full -z-10"
                style={{ background: 'radial-gradient(circle, rgba(var(--theme-primary-500), 0.15), transparent 70%)', filter: 'blur(40px)' }}
            />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-14 pb-20 lg:pb-0">

                    {/* ── Left: Text Content ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`${data.heroImageVisible !== false ? 'lg:w-1/2' : 'lg:w-full lg:max-w-3xl lg:mx-auto'} text-center lg:text-left`}
                    >
                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-emerald-400 text-sm font-medium">{data.statusBadge}</span>
                        </motion.div>

                        {/* Name & Greeting */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.p variants={childVariants} className="text-gray-400 text-lg font-medium mb-2 tracking-wide">{data.greeting}</motion.p>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-archivo font-black mb-3 sm:mb-4 leading-[1.05] tracking-tight flex flex-wrap gap-x-2 sm:gap-x-3">
                                <span className="flex">
                                    {(data.nameFirst || '').split('').map((char, i) => (
                                        <motion.span key={i} variants={childVariants} className="text-white inline-block">
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                                <span className="flex">
                                    {(data.nameLast || '').split('').map((char, i) => (
                                        <motion.span key={`last-${i}`} variants={childVariants} className="bg-gradient-to-br from-[rgb(var(--theme-primary-400))] via-[rgb(var(--theme-secondary-400))] to-[rgb(var(--theme-primary-400))] bg-clip-text text-transparent inline-block">
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </span>
                            </h1>
                        </motion.div>

                        {/* Typing role */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl md:text-2xl text-gray-400 font-light mb-6 h-10"
                        >
                            <span className="text-[rgb(var(--theme-primary-400))] font-medium">{'< '}</span>
                            <TypeAnimation
                                sequence={data.roles.flatMap(role => [role, 1800])}
                                wrapper="span"
                                speed={55}
                                repeat={Infinity}
                                className="text-white font-semibold"
                            />
                            <span className="text-[rgb(var(--theme-primary-400))] font-medium">{' />'}</span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                            {data.bioText || (data.bioHtml ? data.bioHtml.replace(/<[^>]*>/g, '') : '')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
                        >
                            <button
                                onClick={() => scrollTo('projects')}
                                className="group relative cursor-pointer inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-colors duration-200 hover:shadow-[0_0_20px_rgba(var(--theme-primary-500),0.4)] bg-gradient-to-br from-[rgb(var(--theme-primary-500))] to-[rgb(var(--theme-secondary-600))]"
                            >
                                <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-200" />
                                View My Work
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                            </button>

                            <a
                                href={data._activeCvUrl || data.cvUrl}
                                download
                                className="inline-flex cursor-pointer items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-gray-300 border border-gray-700/60 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Download CV
                                <Download size={16} />
                            </a>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex items-center gap-4 justify-center lg:justify-start"
                        >
                            <span className="text-gray-600 text-xs uppercase tracking-widest">Find me on</span>
                            <div className="flex gap-3">
                                {[
                                    { icon: Github, href: data.githubUrl, label: 'GitHub' },
                                    { icon: Linkedin, href: data.linkedinUrl, label: 'LinkedIn' },
                                    { icon: Mail, href: `mailto:${data.emailAddr}`, label: 'Email' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={label}
                                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right: Profile Image ── */}
                    {data.showImage !== false && (
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="lg:w-1/2 flex justify-center relative mt-10 lg:mt-0 mb-12 lg:mb-0"
                        >
                            {/* 3D Particle Sphere */}
                            {data.globalSettings?.enable3DSphere !== false && <InteractiveCanvas3D />}

                            {/* Glow behind image */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-40 blur-3xl scale-75 pointer-events-none"
                                style={{ background: 'linear-gradient(135deg, rgb(var(--theme-secondary-500)), rgb(var(--theme-primary-500)))' }}
                            />

                            <Tilt
                                tiltMaxAngleX={8}
                                tiltMaxAngleY={8}
                                perspective={1200}
                                scale={1.03}
                                transitionSpeed={800}
                                className="relative z-10"
                            >
                                {/* Outer ring */}
                                <div
                                    className="p-[3px] rounded-3xl"
                                    style={{ backgroundImage: 'linear-gradient(135deg, rgb(var(--theme-secondary-500)), rgb(var(--theme-primary-600)), rgb(var(--theme-primary-500)), rgb(var(--theme-secondary-500)))', backgroundSize: '300% 300%', animation: 'gradient-shift 4s ease infinite' }}
                                >
                                    <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[22px] overflow-hidden bg-gray-950">
                                        <img
                                            src={data._activeImageUrl || ProfileImage}
                                            alt="Shanjai S"
                                            loading="eager"
                                            fetchpriority="high"
                                            className="w-full h-full object-cover object-[50%_15%] scale-105 hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Overlay gradient at bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950/80 to-transparent" />
                                    </div>
                                </div>

                                {/* Floating badge — top right */}
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-sm"
                                    style={{ background: 'rgba(var(--theme-primary-500), 0.15)', borderColor: 'rgba(var(--theme-primary-500), 0.4)', color: 'rgb(var(--theme-primary-300))' }}
                                >
                                    {data.badgeTopRight}
                                </motion.div>

                                {/* Floating badge — bottom left */}
                                <motion.div
                                    animate={{ y: [5, -5, 5] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                    className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-sm"
                                    style={{ background: 'rgba(var(--theme-secondary-500), 0.15)', borderColor: 'rgba(var(--theme-secondary-500), 0.4)', color: 'rgb(var(--theme-secondary-300))' }}
                                >
                                    {data.badgeBottomLeft}
                                </motion.div>
                            </Tilt>
                        </motion.div>
                    )}

                </div>

                {/* ── Scroll nudge ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center p-1"
                    >
                        <div className="w-1 h-2 bg-gradient-to-b from-[rgb(var(--theme-primary-400))] to-[rgb(var(--theme-secondary-500))] rounded-full" />
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
