import { useState, useEffect } from 'react';
import { Save, Check, Plus, X, Trash2, Edit2, GripVertical } from 'lucide-react';
import { EXP_KEY, defaultExperiences } from '../../sections/Experience';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const COLOR_OPTIONS = [
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'cyan', label: 'Cyan' },
    { value: 'emerald', label: 'Emerald' }
];


const ExperienceForm = ({ item = null, onSave, onCancel }) => {
    const [form, setForm] = useState(item || {
        id: Date.now(), role: '', company: '', type: 'Full-time', date: '', location: '', color: 'blue', points: ['']
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleAddPoint = () => setForm(f => ({ ...f, points: [...f.points, ''] }));
    const handleRemovePoint = (idx) => {
        const newPoints = [...form.points];
        newPoints.splice(idx, 1);
        setForm(f => ({ ...f, points: newPoints }));
    };
    const handlePointChange = (idx, val) => {
        const newPoints = [...form.points];
        newPoints[idx] = val;
        setForm(f => ({ ...f, points: newPoints }));
    };

    return (
        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-xl p-5 mb-6 space-y-4">
            <h4 className="text-white font-semibold mb-2">{item ? 'Edit Experience' : 'Add Experience'}</h4>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Role / Job Title</label>
                    <input value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Frontend Engineer"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Company</label>
                    <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="e.g. Google"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none" />
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Job Type</label>
                    <input value={form.type} onChange={e => set('type', e.target.value)} placeholder="e.g. Full-time"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Date Range</label>
                    <input value={form.date} onChange={e => set('date', e.target.value)} placeholder="e.g. Jan 2023 - Present"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Location</label>
                    <input value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Remote"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Theme Color</label>
                    <select value={form.color} onChange={e => set('color', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm">
                        {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label className="text-xs text-gray-400 block mb-2">Bullet Points (Responsibilities / Achievements)</label>
                <div className="space-y-2">
                    {form.points.map((pt, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                            <span className="text-gray-600 mt-2 text-xs">{idx + 1}.</span>
                            <textarea value={pt} onChange={e => handlePointChange(idx, e.target.value)} rows={2}
                                className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 outline-none resize-y" />
                            <button onClick={() => handleRemovePoint(idx)} disabled={form.points.length === 1}
                                className={`p-2 rounded-lg mt-1 ${form.points.length === 1 ? 'text-gray-600' : 'text-gray-400 hover:text-red-400 hover:bg-gray-800'}`}>
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={handleAddPoint} className="mt-3 text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300">
                    <Plus size={14} /> Add Bullet Point
                </button>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button onClick={() => form.role && onSave(form)} disabled={!form.role}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center gap-2">
                    <Save size={16} /> Save Experience
                </button>
                <button onClick={onCancel} className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    );
};

const ExperienceTab = () => {
    const [experiences, setExperiences] = useState(defaultExperiences);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [editingId, setEditingId] = useState(null); // 'new' or experience.id

    useEffect(() => {
        fetchPortfolioData(EXP_KEY, defaultExperiences).then(res => {
            setExperiences(res || defaultExperiences);
            setLoading(false);
        });
    }, []);

    const commit = async (updated) => {
        setExperiences(updated);
        await savePortfolioData(EXP_KEY, updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSave = (form) => {
        if (editingId === 'new') {
            commit([form, ...experiences]);
        } else {
            commit(experiences.map(e => e.id === form.id ? form : e));
        }
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this experience entry?')) {
            commit(experiences.filter(e => e.id !== id));
        }
    };

    const handleReset = () => {
        if (confirm('Reset to default experience data?')) {
            commit(defaultExperiences);
        }
    };

    const moveUp = (idx) => {
        if (idx === 0) return;
        const newExp = [...experiences];
        const temp = newExp[idx - 1];
        newExp[idx - 1] = newExp[idx];
        newExp[idx] = temp;
        commit(newExp);
    };

    const moveDown = (idx) => {
        if (idx === experiences.length - 1) return;
        const newExp = [...experiences];
        const temp = newExp[idx + 1];
        newExp[idx + 1] = newExp[idx];
        newExp[idx] = temp;
        commit(newExp);
    };

    if (loading) return <div className="text-gray-500 animate-pulse">Loading experience settings...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Experience Section</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage your work history and timeline.</p>
                </div>
                <div className="flex gap-3 items-center">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                    <button onClick={() => setEditingId('new')} className="text-sm flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        <Plus size={16} /> Add Position
                    </button>
                </div>
            </div>

            {editingId === 'new' && (
                <ExperienceForm onSave={handleSave} onCancel={() => setEditingId(null)} />
            )}

            <div className="space-y-4">
                {experiences.map((exp, idx) => (
                    <div key={exp.id}>
                        {editingId === exp.id ? (
                            <ExperienceForm item={exp} onSave={handleSave} onCancel={() => setEditingId(null)} />
                        ) : (
                            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 flex gap-4 group hover:border-gray-700 transition-all">
                                <div className="flex flex-col gap-1 text-gray-600 justify-center">
                                    <button onClick={() => moveUp(idx)} disabled={idx === 0} className="hover:text-cyan-400 disabled:opacity-30 p-1"><GripVertical size={16} className="rotate-90" /></button>
                                    <button onClick={() => moveDown(idx)} disabled={idx === experiences.length - 1} className="hover:text-cyan-400 disabled:opacity-30 p-1"><GripVertical size={16} className="rotate-90" /></button>
                                </div>
                                <div className={`w-2 rounded-full bg-${exp.color}-500/50 shadow-[0_0_10px_rgba(0,0,0,0.5)] shadow-${exp.color}-500/50`} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-tight">{exp.role}</h3>
                                            <p className="text-gray-400 text-sm font-medium">{exp.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-gray-500 block mb-1">{exp.date}</span>
                                            <span className="inline-block px-2 text-[10px] uppercase tracking-wider font-semibold rounded bg-gray-800 text-gray-400">{exp.type}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex gap-4 text-xs text-gray-500 mb-3">
                                        <span>📍 {exp.location}</span>
                                        <span>🎨 {COLOR_OPTIONS.find(c => c.value === exp.color)?.label} Theme</span>
                                    </div>
                                    <ul className="list-disc list-inside space-y-1">
                                        {exp.points.map((pt, i) => (
                                            <li key={i} className="text-sm text-gray-400 truncate">{pt}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2 border-l border-gray-800 pl-4 justify-center">
                                    <button onClick={() => setEditingId(exp.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-colors"><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(exp.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                
                {experiences.length === 0 && (
                    <div className="text-center py-12 bg-gray-900/40 rounded-xl border border-dashed border-gray-800">
                        <p className="text-gray-500">No experience records found.</p>
                        <button onClick={() => setEditingId('new')} className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium">Add Your First Role</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceTab;
