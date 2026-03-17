import { useState, useEffect } from 'react';
import { Check, Palette, Monitor } from 'lucide-react';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';
import { SITEINFO_KEY, defaultSiteInfo } from './SiteInfoTab';

const THEMES = [
    { id: 'cyan',    label: 'Ocean Blue',    colors: ['#06b6d4', '#3b82f6'], desc: 'Default · Cyan + Blue' },
    { id: 'emerald', label: 'Forest Green',  colors: ['#10b981', '#22c55e'], desc: 'Emerald + Green' },
    { id: 'purple',  label: 'Deep Purple',   colors: ['#a855f7', '#8b5cf6'], desc: 'Purple + Violet' },
    { id: 'rose',    label: 'Crimson Rose',  colors: ['#f43f5e', '#ec4899'], desc: 'Rose + Pink' },
    { id: 'amber',   label: 'Solar Amber',   colors: ['#f59e0b', '#eab308'], desc: 'Amber + Yellow' },
];

const ThemeTab = () => {
    const [info, setInfo] = useState(defaultSiteInfo);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolioData(SITEINFO_KEY, defaultSiteInfo).then(data => {
            setInfo({ ...defaultSiteInfo, ...data, globalSettings: { ...defaultSiteInfo.globalSettings, ...(data.globalSettings || {}) } });
            setLoading(false);
        });
    }, []);

    const activeTheme = info.globalSettings?.globalTheme || 'cyan';

    const setTheme = (id) => {
        setInfo(f => ({ ...f, globalSettings: { ...f.globalSettings, globalTheme: id } }));
    };

    const handleSave = async () => {
        const success = await savePortfolioData(SITEINFO_KEY, info);
        if (success) {
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                window.location.reload(); // Reload to apply theme globally instantly
            }, 500);
        }
    };

    if (loading) return <div className="text-gray-500 animate-pulse py-8 text-center">Loading theme settings...</div>;

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2"><Palette size={20} className="text-cyan-400" /> Theme Customization</h2>
                    <p className="text-xs text-gray-500 mt-1">Changes apply instantly when saved. Select a preset color scheme.</p>
                </div>
                <div className="flex items-center gap-3">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved!</span>}
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                        <Check size={15} /> Save Theme
                    </button>
                </div>
            </div>

            {/* Color Presets */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-1">Color Theme</h3>
                <p className="text-xs text-gray-500 mb-5">Select a preset color scheme for your portfolio.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {THEMES.map(theme => {
                        const isActive = activeTheme === theme.id;
                        return (
                            <button
                                key={theme.id}
                                onClick={() => setTheme(theme.id)}
                                className={`relative p-4 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                                    isActive
                                        ? 'border-white/40 bg-gray-800/80 shadow-lg'
                                        : 'border-gray-700/50 bg-gray-900/40 hover:border-gray-600'
                                }`}
                            >
                                {isActive && (
                                    <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                                        · Active
                                    </span>
                                )}
                                {/* Color dots */}
                                <div className="flex gap-1.5 mb-3">
                                    {theme.colors.map((c, i) => (
                                        <span key={i} className="w-5 h-5 rounded-full border-2 border-white/10" style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-white">{theme.label}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">{theme.desc}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Live Preview */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2"><Monitor size={15} /> Live Preview</h3>
                <p className="text-xs text-gray-500 mb-4">This card shows how your portfolio looks with the current theme.</p>
                <div className="bg-gray-950 rounded-xl p-5 border border-gray-800/50">
                    {/* Mini navbar */}
                    <div className="flex items-center gap-4 mb-5 pb-3 border-b border-gray-800/50">
                        <span className="text-xs font-mono text-cyan-400 font-bold">SJ/&gt;</span>
                        {['Home', 'Skills', 'Projects', 'Blog'].map(n => (
                            <span key={n} className="text-[11px] text-gray-500">{n}</span>
                        ))}
                    </div>
                    {/* Mini hero card */}
                    <p className="text-[10px] text-gray-500 mb-1">// Portfolio Preview</p>
                    <p className="text-lg font-bold text-white">Shanjai S</p>
                    <p className="text-sm font-semibold mt-0.5" style={{
                        background: `linear-gradient(135deg, ${THEMES.find(t=>t.id===activeTheme)?.colors[0]}, ${THEMES.find(t=>t.id===activeTheme)?.colors[1]})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Full-Stack Developer
                    </p>
                    <div className="flex gap-2 mt-3">
                        <span className="text-[11px] px-3 py-1 rounded-lg text-white font-medium"
                            style={{ background: `linear-gradient(135deg, ${THEMES.find(t=>t.id===activeTheme)?.colors[0]}, ${THEMES.find(t=>t.id===activeTheme)?.colors[1]})` }}>
                            View Work
                        </span>
                        <span className="text-[11px] px-3 py-1 rounded-lg text-gray-400 border border-gray-700">Contact</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemeTab;
