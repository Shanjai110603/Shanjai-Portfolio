import { useState } from 'react';
import { Save, Check, Plus, X, Trash2, Edit2, GripVertical, Activity } from 'lucide-react';
import { STATS_KEY, defaultStats, ICON_MAP } from '../../sections/Stats';

const COLOR_OPTIONS = [
    { value: 'blue', label: 'Blue', color: 'text-blue-400', bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/15' },
    { value: 'purple', label: 'Purple', color: 'text-purple-400', bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/15' },
    { value: 'cyan', label: 'Cyan', color: 'text-cyan-400', bg: 'from-cyan-500/10 to-cyan-600/5', border: 'border-cyan-500/15' },
    { value: 'amber', label: 'Amber', color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/15' },
    { value: 'emerald', label: 'Emerald', color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/15' },
    { value: 'rose', label: 'Rose', color: 'text-rose-400', bg: 'from-rose-500/10 to-rose-600/5', border: 'border-rose-500/15' },
];

const getStatsData = () => {
    try {
        const stored = localStorage.getItem(STATS_KEY);
        return stored ? JSON.parse(stored) : defaultStats;
    } catch { return defaultStats; }
};

const saveStatsData = (data) => localStorage.setItem(STATS_KEY, JSON.stringify(data));

const StatForm = ({ item = null, onSave, onCancel }) => {
    const [form, setForm] = useState(item || {
        id: Date.now(), icon: 'Layers', label: '', value: 0, suffix: '+', ...COLOR_OPTIONS[0]
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    
    const handleColorChange = (e) => {
        const c = COLOR_OPTIONS.find(opt => opt.value === e.target.value);
        if (c) setForm(f => ({ ...f, color: c.color, bg: c.bg, border: c.border }));
    };

    return (
        <div className="bg-gray-900/80 border border-amber-500/20 rounded-xl p-5 mb-4 space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2"><Activity size={16} className="text-amber-400" /> {item ? 'Edit Metric' : 'Add Metric'}</h4>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Metric Label</label>
                    <input value={form.label} onChange={e => set('label', e.target.value)} placeholder="e.g. Lines of Code"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Number Value</label>
                    <input type="number" value={form.value} onChange={e => set('value', parseInt(e.target.value) || 0)} placeholder="e.g. 1000"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Suffix (Optional)</label>
                    <input value={form.suffix} onChange={e => set('suffix', e.target.value)} placeholder="e.g. K+"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Icon</label>
                    <select value={form.icon} onChange={e => set('icon', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm">
                        {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                    </select>
                </div>
            </div>
            
            <div>
                <label className="text-xs text-gray-400 block mb-1">Theme Color</label>
                <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map(c => (
                        <button key={c.value} onClick={() => handleColorChange({ target: { value: c.value } })}
                            className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${form.color === c.color ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-gray-300'}`}>
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-gray-800 mt-4">
                <button onClick={() => form.label && onSave(form)} disabled={!form.label} className="px-4 py-1.5 bg-amber-500/20 text-amber-400 font-medium text-sm rounded-lg hover:bg-amber-500/30">Save Metric</button>
                <button onClick={onCancel} className="px-4 py-1.5 bg-gray-800 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    );
};

const StatsTab = () => {
    const [stats, setStats] = useState(getStatsData());
    const [saved, setSaved] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const commit = (updated) => {
        setStats(updated);
        saveStatsData(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSave = (form) => {
        if (editingId === 'new') {
            commit([...stats, form]);
        } else {
            commit(stats.map(s => s.id === form.id ? form : s));
        }
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this stat metric?')) {
            commit(stats.filter(s => s.id !== id));
        }
    };

    const moveStat = (idx, dir) => {
        const newArr = [...stats];
        const swapIdx = idx + dir;
        if (swapIdx < 0 || swapIdx >= newArr.length) return;
        [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
        commit(newArr);
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Metrics / Stats</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage the highlighted statistics shown below the Hero.</p>
                </div>
                <div className="flex gap-3 items-center">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={() => confirm('Reset to defaults?') && commit(defaultStats)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                    <button onClick={() => setEditingId('new')} className="text-sm flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-lg font-medium hover:bg-amber-500/30 transition-colors">
                        <Plus size={16} /> Add Metric
                    </button>
                </div>
            </div>

            {editingId === 'new' && <StatForm onSave={handleSave} onCancel={() => setEditingId(null)} />}

            <div className="grid md:grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                    <div key={stat.id}>
                        {editingId === stat.id ? (
                            <StatForm item={stat} onSave={handleSave} onCancel={() => setEditingId(null)} />
                        ) : (
                            <div className={`p-5 rounded-2xl border bg-gradient-to-br ${stat.bg} ${stat.border} flex gap-4 group transition-all`}>
                                <div className="flex flex-col gap-1 text-gray-600 justify-center">
                                    <button onClick={() => moveStat(idx, -1)} disabled={idx === 0} className={`hover:${stat.color} disabled:opacity-30 p-1`}><GripVertical size={16} className="rotate-90" /></button>
                                    <button onClick={() => moveStat(idx, 1)} disabled={idx === stats.length - 1} className={`hover:${stat.color} disabled:opacity-30 p-1`}><GripVertical size={16} className="rotate-90" /></button>
                                </div>
                                
                                <div className={`w-12 h-12 rounded-xl bg-gray-950/50 border border-white/5 shadow-inner flex items-center justify-center shrink-0 ${stat.color}`}>
                                    {(() => {
                                        const Icon = ICON_MAP[stat.icon] || Activity;
                                        return <Icon size={24} />;
                                    })()}
                                </div>

                                <div className="flex-1">
                                    <p className={`text-2xl font-black tabular-nums tracking-tight ${stat.color}`}>
                                        {stat.value}{stat.suffix}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-300">{stat.label}</p>
                                </div>

                                <div className="flex flex-col gap-2 justify-center border-l border-gray-800/50 pl-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingId(stat.id)} className="text-gray-400 hover:text-white"><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(stat.id)} className="text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {stats.length === 0 && (
                     <div className="col-span-full text-center py-12 bg-gray-900/40 rounded-xl border border-dashed border-gray-800">
                        <p className="text-gray-500">No stats to display.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

export default StatsTab;
