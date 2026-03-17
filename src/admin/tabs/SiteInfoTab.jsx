import { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';

const SITEINFO_KEY = 'portfolio_siteinfo';

const defaultSiteInfo = {
    heroName: 'Shanjai S',
    heroGreeting: "Hi, I'm",
    heroBadgeText: 'Open to Work & Looking for Freelance Opportunities',
    heroBadgeVisible: true,
    heroBio: 'Computer Science Graduate (2024) with a passion for C++, Python, and Full-Stack Development. Dedicated to solving real-world problems through clean code and innovative design.',
    heroTypingLines: [
        'Building Scalable Software Solutions',
        'Designing Intuitive User Experiences',
        'Solving Complex Problems'
    ],
    aboutTitle: 'Driven by Logic, Built for Innovation',
    aboutBio1: 'I am a Computer Science Graduate (2024) with a relentless drive to turn complex logic into elegant software. My journey began with mastering the efficiency of C++ and Python, establishing a strong foundation in algorithmic problem-solving.',
    aboutBio2: "Today, I specialize in Full-Stack Development, creating robust applications that blend performance with intuitive design. I thrive on tackling real-world challenges, constantly pushing the boundaries of what's possible through code.",
    statProjects: 10,
    statYears: 3,
    statTech: 15,
    statCoffee: 500,
};

const getSiteInfo = () => {
    try {
        const stored = localStorage.getItem(SITEINFO_KEY);
        return stored ? { ...defaultSiteInfo, ...JSON.parse(stored) } : defaultSiteInfo;
    } catch { return defaultSiteInfo; }
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
    const [info, setInfo] = useState(getSiteInfo());
    const [saved, setSaved] = useState(false);

    const set = (key, val) => setInfo(f => ({ ...f, [key]: val }));

    const setTypingLine = (idx, val) => {
        const lines = [...info.heroTypingLines];
        lines[idx] = val;
        set('heroTypingLines', lines);
    };

    const handleSave = () => {
        localStorage.setItem(SITEINFO_KEY, JSON.stringify(info));
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const handleReset = () => {
        if (confirm('Reset all site info to defaults?')) {
            setInfo(defaultSiteInfo);
            localStorage.setItem(SITEINFO_KEY, JSON.stringify(defaultSiteInfo));
        }
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Site Info</h2>
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

            <div className="space-y-6">
                {/* Hero Section */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wide">Hero Section</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Field label="Greeting Text">
                            <input value={info.heroGreeting} onChange={e => set('heroGreeting', e.target.value)} className={inputCls} />
                        </Field>
                        <Field label="Your Name">
                            <input value={info.heroName} onChange={e => set('heroName', e.target.value)} className={inputCls} />
                        </Field>
                    </div>
                    <div className="mt-4 space-y-3">
                        <div>
                            <label className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-1.5 cursor-pointer">
                                <input type="checkbox" checked={info.heroBadgeVisible} onChange={e => set('heroBadgeVisible', e.target.checked)}
                                    className="w-4 h-4 accent-cyan-500 rounded" />
                                Show "Open to Work" Badge
                            </label>
                            {info.heroBadgeVisible && (
                                <input value={info.heroBadgeText} onChange={e => set('heroBadgeText', e.target.value)} className={inputCls} placeholder="Badge text" />
                            )}
                        </div>
                        <Field label="Bio Tagline">
                            <textarea value={info.heroBio} onChange={e => set('heroBio', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                        </Field>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs text-gray-400 font-medium mb-2">Typing Animation Lines</p>
                        <div className="space-y-2">
                            {info.heroTypingLines.map((line, i) => (
                                <input key={i} value={line} onChange={e => setTypingLine(i, e.target.value)} className={inputCls} placeholder={`Line ${i + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wide">About Section</h3>
                    <div className="space-y-4">
                        <Field label="Section Tagline">
                            <input value={info.aboutTitle} onChange={e => set('aboutTitle', e.target.value)} className={inputCls} />
                        </Field>
                        <Field label="Paragraph 1">
                            <textarea value={info.aboutBio1} onChange={e => set('aboutBio1', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                        </Field>
                        <Field label="Paragraph 2">
                            <textarea value={info.aboutBio2} onChange={e => set('aboutBio2', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                        </Field>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wide">Stats Counter</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { key: 'statProjects', label: 'Projects' },
                            { key: 'statYears', label: 'Years of Coding' },
                            { key: 'statTech', label: 'Technologies' },
                            { key: 'statCoffee', label: 'Coffees' },
                        ].map(({ key, label }) => (
                            <Field key={key} label={label}>
                                <input
                                    type="number"
                                    value={info[key]}
                                    onChange={e => set(key, Number(e.target.value))}
                                    className={`${inputCls} text-center font-mono`}
                                />
                            </Field>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-gray-600 text-xs mt-6 text-center">
                ⚠ Site info changes apply on next page reload. Some fields like hero name require code changes to fully reflect.
            </p>
        </div>
    );
};

export default SiteInfoTab;
