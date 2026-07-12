import { useState, useEffect } from 'react';
import { Check, RotateCcw, Monitor, Settings2, LayoutTemplate, Palette } from 'lucide-react';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const SITEINFO_KEY = 'portfolio_siteinfo';

const defaultSiteInfo = {
    heroName: 'Shanjai S',
    heroGreeting: "Hi, I'm",
    heroBadgeText: 'Open to Work & Looking for Freelance Opportunities',
    heroBadgeVisible: true,
    heroImageVisible: true,
    heroBio: 'Computer Science Graduate (2024) with a passion for C++, Python, and Full-Stack Development. Dedicated to solving real-world problems through clean code and innovative design.',
    heroTypingLines: [
        'Building Scalable Software Solutions',
        'Designing Intuitive User Experiences',
        'Solving Complex Problems'
    ],
    aboutTitle: 'Driven by Logic, Built for Innovation',
    aboutBio1: 'I am a Computer Science Graduate (2024) with a relentless drive to turn complex logic into elegant software. My journey began with mastering the efficiency of C++ and Python, establishing a strong foundation in algorithmic problem-solving.',
    aboutBio2: "Today, I specialize in Full-Stack Development, creating robust applications that blend performance with intuitive design. I thrive on tackling real-world challenges, constantly pushing the boundaries of what's possible through code.",
    siteName: 'Shanjai S',
    siteTitle: 'Shanjai S | Full-Stack Developer',
    siteEmail: 'shanjaisenthilkumar03@gmail.com',
    siteLocation: 'Coimbatore, Tamil Nadu, India',
    siteGithub: 'https://github.com/Shanjai110603',
    siteLinkedin: 'https://www.linkedin.com/in/shanjaisenthilkumar/',
    githubUsername: 'Shanjai110603',
    globalSettings: {
        showStats: true,
        showAbout: true,
        showSkills: true,
        showProjects: true,
        showExperience: true,
        showEducation: true,
        showBlogs: true,
        showPlayground: true,
        showContact: true,
        enableAnimatedBackground: true,
        globalTheme: 'cyan'
    }
};

// We keep getSiteInfo as an async function now for the new API
const getSiteInfo = async () => {
    return await fetchPortfolioData(SITEINFO_KEY, defaultSiteInfo);
};

export { SITEINFO_KEY, defaultSiteInfo };

const Field = ({ label, children }) => (
    <div>
        <label className="block text-xs text-gray-400 font-medium mb-1.5">{label}</label>
        {children}
    </div>
);

const inputCls = "w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-600";

const SiteInfoTab = () => {
    const [info, setInfo] = useState(defaultSiteInfo);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSiteInfo().then(data => {
            setInfo({ ...defaultSiteInfo, ...data, globalSettings: { ...defaultSiteInfo.globalSettings, ...(data.globalSettings || {}) }});
            setLoading(false);
        });
    }, []);

    const set = (key, val) => setInfo(f => ({ ...f, [key]: val }));
    const setGlobal = (key, val) => setInfo(f => ({ ...f, globalSettings: { ...f.globalSettings, [key]: val } }));

    const setTypingLine = (idx, val) => {
        const lines = [...info.heroTypingLines];
        lines[idx] = val;
        set('heroTypingLines', lines);
    };

    const handleSave = async () => {
        const success = await savePortfolioData(SITEINFO_KEY, info);
        if (success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        }
    };

    const handleReset = async () => {
        if (confirm('Reset all site info to defaults?')) {
            setInfo(defaultSiteInfo);
            await savePortfolioData(SITEINFO_KEY, defaultSiteInfo);
        }
    };

    if (loading) return <div className="text-gray-500 animate-pulse">Loading settings...</div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-1">Global Site Settings</h2>
                    <p className="text-xs text-gray-500">Configure core website features, layout, and meta information.</p>
                </div>
                <div className="flex items-center gap-3">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved!</span>}
                    <button onClick={handleReset} className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 bg-gray-800 rounded-lg transition-colors">
                        <RotateCcw size={12} /> Reset
                    </button>
                    <button onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                        <Check size={15} /> Save Changes
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Left Column: Layout & Global Settings */}
                <div className="space-y-6">
                    <div className="bg-gray-900/60 border border-green-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-sm font-semibold text-green-400 mb-4 flex items-center gap-2"><Settings2 size={16}/> Features & Effects</h3>
                        
                        <div className="p-4 bg-gray-950/50 rounded-lg border border-gray-800/50 space-y-3">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Interactive Animated Background</span>
                                <input type="checkbox" checked={info.globalSettings?.enableAnimatedBackground} onChange={e => setGlobal('enableAnimatedBackground', e.target.checked)} className="w-4 h-4 accent-green-500 rounded bg-gray-900 border-gray-700" />
                            </label>
                            <p className="text-xs text-gray-500 mt-1 pl-1">Toggles the global mouse aura and trailing dot matrix background effect.</p>
                        </div>
                    </div>

                    {/* Global Theme Picker */}
                    <div className="bg-gray-900/60 border border-pink-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-sm font-semibold text-pink-400 mb-4 flex items-center gap-2"><Palette size={16}/> Global Color Theme</h3>
                        
                        <div className="flex gap-3">
                            {[
                                { id: 'cyan', color: 'bg-cyan-500', label: 'Cyan' },
                                { id: 'emerald', color: 'bg-emerald-500', label: 'Emerald' },
                                { id: 'rose', color: 'bg-rose-500', label: 'Rose' },
                                { id: 'purple', color: 'bg-purple-500', label: 'Purple' },
                                { id: 'amber', color: 'bg-amber-500', label: 'Amber' },
                            ].map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => setGlobal('globalTheme', theme.id)}
                                    title={theme.label}
                                    className={`w-8 h-8 rounded-full ${theme.color} transition-all ${info.globalSettings?.globalTheme === theme.id ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-950 scale-110' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-3">Select the primary accent color for the entire portfolio.</p>
                    </div>

                    <div className="bg-gray-900/60 border border-indigo-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-sm font-semibold text-indigo-400 mb-4 flex items-center gap-2"><LayoutTemplate size={16}/> Section Visibility</h3>
                        <p className="text-xs text-gray-400 mb-4">Toggle which sections appear on the live portfolio.</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { k: 'showStats', label: 'Stats Banner' },
                                { k: 'showAbout', label: 'About Section' },
                                { k: 'showSkills', label: 'Skills Section' },
                                { k: 'showProjects', label: 'Projects Grid' },
                                { k: 'showExperience', label: 'Experience Timeline' },
                                { k: 'showEducation', label: 'Education & Certs' },
                                { k: 'showBlogs', label: 'Blogs Feed' },
                                { k: 'showPlayground', label: 'Playground Sandbox' },
                                { k: 'showContact', label: 'Contact Form' },
                            ].map(sec => (
                                <label key={sec.k} className="flex items-center gap-3 p-3 bg-gray-950/50 rounded-lg border border-gray-800/50 cursor-pointer hover:border-gray-700 transition-colors">
                                    <input type="checkbox" checked={info.globalSettings?.[sec.k]} onChange={e => setGlobal(sec.k, e.target.checked)} className="w-4 h-4 accent-indigo-500 rounded bg-gray-900 border-gray-700" />
                                    <span className="text-sm text-gray-300">{sec.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Hero / Basic Info */}
                <div className="space-y-6">
                    <div className="bg-gray-900/60 border border-cyan-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-sm font-semibold text-cyan-400 mb-4 flex items-center gap-2"><Monitor size={16}/> Hero Identity</h3>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Greeting Text">
                                    <input value={info.heroGreeting} onChange={e => set('heroGreeting', e.target.value)} className={inputCls} />
                                </Field>
                                <Field label="Your Name">
                                    <input value={info.heroName} onChange={e => set('heroName', e.target.value)} className={inputCls} />
                                </Field>
                            </div>
                            
                            <div className="p-3 bg-gray-950/50 rounded-lg border border-gray-800/50 space-y-3">
                                <label className="flex items-center gap-2 text-sm text-gray-300 font-medium cursor-pointer">
                                    <input type="checkbox" checked={info.heroBadgeVisible} onChange={e => set('heroBadgeVisible', e.target.checked)} className="w-4 h-4 accent-cyan-500 rounded bg-gray-900 border-gray-700" />
                                    Show "Availability" Status Badge
                                </label>
                                {info.heroBadgeVisible && (
                                    <input value={info.heroBadgeText} onChange={e => set('heroBadgeText', e.target.value)} className={inputCls} placeholder="Badge text" />
                                )}
                                <div className="h-px w-full bg-gray-800/50 my-2" />
                                <label className="flex items-center gap-2 text-sm text-gray-300 font-medium cursor-pointer">
                                    <input type="checkbox" checked={info.heroImageVisible} onChange={e => set('heroImageVisible', e.target.checked)} className="w-4 h-4 accent-cyan-500 rounded bg-gray-900 border-gray-700" />
                                    Show Profile Image
                                </label>
                            </div>

                            <Field label="Bio Tagline">
                                <textarea value={info.heroBio} onChange={e => set('heroBio', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                            </Field>

                            <div>
                                <p className="text-xs text-gray-400 font-medium mb-2">Typing Animation Lines</p>
                                <div className="space-y-2">
                                    {info.heroTypingLines.map((line, i) => (
                                        <input key={i} value={line} onChange={e => setTypingLine(i, e.target.value)} className={inputCls} placeholder={`Line ${i + 1}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Brand & Social Info */}
                    <div className="bg-gray-900/60 border border-purple-500/20 rounded-xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                        <h3 className="text-sm font-semibold text-purple-400 mb-4 flex items-center gap-2"><Palette size={16}/> Brand & Social Identity</h3>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Brand Name (Navbar/Footer)">
                                    <input value={info.siteName || ''} onChange={e => set('siteName', e.target.value)} className={inputCls} />
                                </Field>
                                <Field label="Site Title Meta">
                                    <input value={info.siteTitle || ''} onChange={e => set('siteTitle', e.target.value)} className={inputCls} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="Contact Email">
                                    <input value={info.siteEmail || ''} onChange={e => set('siteEmail', e.target.value)} className={inputCls} />
                                </Field>
                                <Field label="Location Text">
                                    <input value={info.siteLocation || ''} onChange={e => set('siteLocation', e.target.value)} className={inputCls} />
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Field label="GitHub URL">
                                    <input value={info.siteGithub || ''} onChange={e => set('siteGithub', e.target.value)} className={inputCls} />
                                </Field>
                                <Field label="LinkedIn URL">
                                    <input value={info.siteLinkedin || ''} onChange={e => set('siteLinkedin', e.target.value)} className={inputCls} />
                                </Field>
                            </div>
                            <Field label="GitHub Username (for API Stats)">
                                <input value={info.githubUsername || ''} onChange={e => set('githubUsername', e.target.value)} className={inputCls} />
                            </Field>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-gray-500 text-xs mt-6 text-center italic bg-gray-900/30 py-3 rounded-lg border border-gray-800/50">
                Data is saved instantly inside the admin panel but you may need to reload the public portfolio to see all structural changes.
            </p>
        </div>
    );
};

export default SiteInfoTab;
