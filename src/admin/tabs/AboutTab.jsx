import { useState, useEffect } from 'react';
import { Save, Check, Plus, X, Trash2, Edit2 } from 'lucide-react';
import { ABOUT_KEY, defaultAboutData, ICON_MAP } from '../../sections/About';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const GRADIENT_OPTIONS = [
    { label: 'Blue', bg: 'from-blue-500/10 to-blue-600/5', color: 'text-blue-400', border: 'border-blue-500/20' },
    { label: 'Purple', bg: 'from-purple-500/10 to-purple-600/5', color: 'text-purple-400', border: 'border-purple-500/20' },
    { label: 'Cyan', bg: 'from-cyan-500/10 to-cyan-600/5', color: 'text-cyan-400', border: 'border-cyan-500/20' },
    { label: 'Emerald', bg: 'from-emerald-500/10 to-emerald-600/5', color: 'text-emerald-400', border: 'border-emerald-500/20' },
    { label: 'Orange', bg: 'from-orange-500/10 to-orange-600/5', color: 'text-orange-400', border: 'border-orange-500/20' },
];


const HighlightForm = ({ item = null, onSave, onCancel }) => {
    const [form, setForm] = useState(item || {
        icon: 'Code2', title: '', desc: '', ...GRADIENT_OPTIONS[0]
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleColorChange = (e) => {
        const opt = GRADIENT_OPTIONS.find(o => o.label === e.target.value);
        if (opt) {
            setForm(f => ({ ...f, bg: opt.bg, color: opt.color, border: opt.border }));
        }
    };

    return (
        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl p-4 space-y-3 mb-4">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Title</label>
                    <input value={form.title} onChange={e => set('title', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-white text-sm" placeholder="e.g. Full-Stack Dev" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Description</label>
                    <input value={form.desc} onChange={e => set('desc', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-white text-sm" placeholder="e.g. End-to-end solutions" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Icon Name</label>
                    <select value={form.icon} onChange={e => set('icon', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-white text-sm">
                        {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Color Theme</label>
                    <select value={GRADIENT_OPTIONS.find(o => o.bg === form.bg)?.label || 'Blue'} onChange={handleColorChange}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-white text-sm">
                        {GRADIENT_OPTIONS.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
                    </select>
                </div>
            </div>
            <div className="flex gap-2 pt-2">
                <button onClick={() => form.title && onSave(form)} className="px-3 py-1.5 text-xs bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30">Save</button>
                <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-gray-800 text-gray-400 rounded hover:text-white">Cancel</button>
            </div>
        </div>
    );
};

const AboutTab = () => {
    const [data, setData] = useState(defaultAboutData);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [editingHighlight, setEditingHighlight] = useState(null); // null, 'new', or index

    useEffect(() => {
        fetchPortfolioData(ABOUT_KEY, defaultAboutData).then(res => {
            setData(res || defaultAboutData);
            setLoading(false);
        });
    }, []);

    const commit = async (updated) => {
        setData(updated);
        await savePortfolioData(ABOUT_KEY, updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleChange = (field, value) => {
        commit({ ...data, [field]: value });
    };

    const handleAddTag = () => {
        if (newTag.trim() && !data.techTags.includes(newTag.trim())) {
            commit({ ...data, techTags: [...data.techTags, newTag.trim()] });
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        commit({ ...data, techTags: data.techTags.filter(t => t !== tag) });
    };

    const handleSaveHighlight = (form) => {
        const newHighlights = [...data.highlights];
        if (editingHighlight === 'new') {
            newHighlights.push(form);
        } else {
            newHighlights[editingHighlight] = form;
        }
        commit({ ...data, highlights: newHighlights });
        setEditingHighlight(null);
    };

    const handleRemoveHighlight = (idx) => {
        if (confirm('Remove this highlight card?')) {
            const newH = [...data.highlights];
            newH.splice(idx, 1);
            commit({ ...data, highlights: newH });
        }
    };

    const handleReset = () => {
        if (confirm('Reset to default About data?')) {
            commit(defaultAboutData);
        }
    };

    if (loading) return <div className="text-gray-500 animate-pulse">Loading about settings...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">About Section</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage your bio, key traits, and highlights.</p>
                </div>
                <div className="flex gap-3">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Basics */}
                <div className="space-y-6">
                    <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Basic Info</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Location</label>
                                <input value={data.location} onChange={e => handleChange('location', e.target.value)}
                                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Email</label>
                                <input value={data.email} onChange={e => handleChange('email', e.target.value)}
                                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">GitHub Profile Link</label>
                            <input value={data.githubUrl} onChange={e => handleChange('githubUrl', e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Bio Paragraph 1</label>
                            <textarea value={data.bioP1} onChange={e => handleChange('bioP1', e.target.value)} rows={3}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Bio Paragraph 2</label>
                            <textarea value={data.bioP2} onChange={e => handleChange('bioP2', e.target.value)} rows={3}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                        </div>
                    </div>

                    {/* Tech Tags */}
                    <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
                        <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Key Tech Traits</h3>
                        <div className="flex gap-2 mb-4">
                            <input value={newTag} onChange={e => setNewTag(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm"
                                placeholder="Add skill tag (e.g. React)" />
                            <button onClick={handleAddTag} className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30"><Plus size={16} /></button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.techTags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-gray-800 text-blue-300 text-xs rounded-full border border-gray-700">
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-400 ml-1"><X size={10} /></button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Highlight Cards */}
                <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
                        <h3 className="text-lg font-semibold text-white">Highlight Cards</h3>
                        <button onClick={() => setEditingHighlight('new')} className="text-xs flex items-center gap-1 bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded hover:bg-cyan-500/30">
                            <Plus size={14} /> Add
                        </button>
                    </div>

                    {editingHighlight === 'new' && (
                        <HighlightForm onSave={handleSaveHighlight} onCancel={() => setEditingHighlight(null)} />
                    )}

                    <div className="space-y-3">
                        {data.highlights.map((item, idx) => (
                            <div key={idx}>
                                {editingHighlight === idx ? (
                                    <HighlightForm item={item} onSave={handleSaveHighlight} onCancel={() => setEditingHighlight(null)} />
                                ) : (
                                    <div className="flex items-center justify-between p-3 bg-gray-950 border border-gray-800 rounded-xl group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded bg-gradient-to-br ${item.bg} flex items-center justify-center ${item.color}`}>
                                                {(() => {
                                                    const Icon = ICON_MAP[item.icon] || Code2;
                                                    return <Icon size={16} />;
                                                })()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.title}</p>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingHighlight(idx)} className="text-gray-400 hover:text-cyan-400"><Edit2 size={14} /></button>
                                            <button onClick={() => handleRemoveHighlight(idx)} className="text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutTab;
