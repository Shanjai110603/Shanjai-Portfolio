import { useState, useEffect } from 'react';
import { Save, Check, Plus, X, Trash2, Edit2, GripVertical, Code2, Copy, MoveUp, MoveDown } from 'lucide-react';
import { SKILLS_KEY, defaultSkillsData, THEME_MAP } from '../../sections/Skills';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const COLOR_OPTIONS = Object.keys(THEME_MAP).map(k => ({ value: k, label: k.charAt(0).toUpperCase() + k.slice(1) }));


const SkillItemRow = ({ skill, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) => {
    return (
        <div className="flex items-center gap-2 mb-2">
            <div className="flex flex-col gap-0 border-r border-gray-800 pr-2">
                <button onClick={onMoveUp} disabled={isFirst} className="text-gray-600 hover:text-white disabled:opacity-30"><MoveUp size={12} /></button>
                <button onClick={onMoveDown} disabled={isLast} className="text-gray-600 hover:text-white disabled:opacity-30"><MoveDown size={12} /></button>
            </div>
            <input value={skill.name} onChange={e => onChange('name', e.target.value)} placeholder="Skill name (e.g. React)"
                className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-white text-sm focus:border-cyan-500 outline-none" />
            <div className="w-24 relative">
                <input type="number" value={skill.level} onChange={e => onChange('level', parseInt(e.target.value) || 0)} min="0" max="100" placeholder="0-100"
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-3 pr-8 py-1.5 text-white text-sm focus:border-cyan-500 outline-none" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">%</span>
            </div>
            <button onClick={onRemove} className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"><X size={14}/></button>
        </div>
    );
};

const CategoryForm = ({ item = null, onSave, onCancel }) => {
    const [form, setForm] = useState(item || {
        id: `cat-${Date.now()}`, category: 'New Category', icon: '◈', colorTheme: 'blue', items: [{ id: `sk-${Date.now()}`, name: '', level: 50 }]
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    
    const handleAddSkill = () => setForm(f => ({ ...f, items: [...f.items, { id: `sk-${Date.now()}`, name: '', level: 50 }] }));
    
    const handleSkillChange = (idx, field, val) => {
        const newItems = [...form.items];
        newItems[idx][field] = val;
        setForm(f => ({ ...f, items: newItems }));
    };

    const handleRemoveSkill = (idx) => {
        setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
    };

    const handleMoveSkill = (idx, dir) => {
        const newItems = [...form.items];
        const swapIdx = idx + dir;
        if (swapIdx < 0 || swapIdx >= newItems.length) return;
        [newItems[idx], newItems[swapIdx]] = [newItems[swapIdx], newItems[idx]];
        setForm(f => ({ ...f, items: newItems }));
    };

    return (
        <div className="bg-gray-900 border border-purple-500/30 rounded-xl p-5 mb-6 space-y-4 shadow-xl">
            <h4 className="text-white font-semibold flex items-center gap-2 mb-4">
                <Code2 size={16} className="text-purple-400" /> {item ? 'Edit Category' : 'Create Category'}
            </h4>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 border-b border-gray-800 pb-4">
                <div className="lg:col-span-2">
                    <label className="text-xs text-gray-400 block mb-1">Category Name</label>
                    <input value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Frontend Development"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Icon Text</label>
                        <input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="e.g. </>" maxLength={5}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm text-center focus:border-purple-500 outline-none font-mono" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 block mb-1">Theme</label>
                        <select value={form.colorTheme} onChange={e => set('colorTheme', e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2 py-2 text-white text-sm focus:border-purple-500 outline-none">
                            {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <label className="text-xs text-gray-400 block mb-3 font-semibold text-purple-400 uppercase tracking-widest">Skills in this Category</label>
                <div className="space-y-1">
                    {form.items.map((skill, idx) => (
                        <SkillItemRow 
                            key={skill.id || idx} 
                            skill={skill} 
                            onChange={(f, v) => handleSkillChange(idx, f, v)}
                            onRemove={() => handleRemoveSkill(idx)}
                            onMoveUp={() => handleMoveSkill(idx, -1)}
                            onMoveDown={() => handleMoveSkill(idx, 1)}
                            isFirst={idx === 0}
                            isLast={idx === form.items.length - 1}
                        />
                    ))}
                </div>
                <button onClick={handleAddSkill} className="mt-3 text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium px-2 py-1 bg-purple-500/10 rounded-lg">
                    <Plus size={14} /> Add Skill
                </button>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button onClick={() => form.category && onSave(form)} disabled={!form.category || form.items.length === 0}
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center gap-2">
                    <Save size={16} /> Save Category
                </button>
                <button onClick={onCancel} className="px-5 py-2 bg-gray-800 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    );
};

const SkillsTab = () => {
    const [data, setData] = useState(defaultSkillsData);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPortfolioData(SKILLS_KEY, defaultSkillsData).then(res => {
            setData(res || defaultSkillsData);
            setLoading(false);
        });
    }, []);

    const commit = async (updated) => {
        setData(updated);
        await savePortfolioData(SKILLS_KEY, updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSave = (form) => {
        if (editingId === 'new') {
            commit([...data, form]);
        } else {
            commit(data.map(c => c.id === form.id ? form : c));
        }
        setEditingId(null);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this entire skill category?')) {
            commit(data.filter(c => c.id !== id));
        }
    };

    const handleDuplicate = (cat) => {
        const dupe = { ...cat, id: `cat-${Date.now()}`, category: `${cat.category} (Copy)`, items: cat.items.map(i => ({...i, id: `sk-${Date.now()}-${Math.random()}`})) };
        commit([...data, dupe]);
    };

    const moveCategory = (idx, dir) => {
        const newArr = [...data];
        const swapIdx = idx + dir;
        if (swapIdx < 0 || swapIdx >= newArr.length) return;
        [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
        commit(newArr);
    };

    if (loading) return <div className="text-gray-500 animate-pulse">Loading skills settings...</div>;

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Advanced Skills Manager</h2>
                    <p className="text-xs text-gray-500 mt-1">Full control over tech stack categories, colors, and individual skill bars.</p>
                </div>
                <div className="flex gap-3 items-center">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={() => confirm('Reset to defaults?') && commit(defaultSkillsData)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                    <button onClick={() => setEditingId('new')} className="text-sm flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg font-medium hover:bg-purple-500/30 transition-colors">
                        <Plus size={16} /> New Category
                    </button>
                </div>
            </div>

            {editingId === 'new' && <CategoryForm onSave={handleSave} onCancel={() => setEditingId(null)} />}

            <div className="grid lg:grid-cols-2 gap-4">
                {data.map((cat, idx) => (
                    <div key={cat.id || cat.category}>
                        {editingId === cat.id ? (
                            <CategoryForm item={cat} onSave={handleSave} onCancel={() => setEditingId(null)} />
                        ) : (
                            <div className={`p-5 rounded-2xl border bg-gray-900 flex flex-col gap-4 group transition-all relative overflow-hidden`}>
                                {/* Abstract BG based on theme */}
                                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 bg-${cat.colorTheme}-500 blur-2xl z-0`}></div>
                                
                                <div className="flex justify-between items-start z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col gap-1 text-gray-600 justify-center">
                                            <button onClick={() => moveCategory(idx, -1)} disabled={idx === 0} className="hover:text-purple-400 disabled:opacity-30 p-0.5"><GripVertical size={14} className="rotate-90" /></button>
                                            <button onClick={() => moveCategory(idx, 1)} disabled={idx === data.length - 1} className="hover:text-purple-400 disabled:opacity-30 p-0.5"><GripVertical size={14} className="rotate-90" /></button>
                                        </div>
                                        <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-white">{cat.category}</h3>
                                            <p className="text-xs text-gray-500">{cat.items.length} skills • {cat.colorTheme} theme</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-950 p-1 rounded-lg border border-gray-800">
                                        <button title="Duplicate" onClick={() => handleDuplicate(cat)} className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-800 rounded"><Copy size={12} /></button>
                                        <button title="Edit" onClick={() => setEditingId(cat.id)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded"><Edit2 size={12} /></button>
                                        <button title="Delete" onClick={() => handleDelete(cat.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded"><Trash2 size={12} /></button>
                                    </div>
                                </div>

                                <div className="space-y-2 z-10 pl-6 border-l border-gray-800 ml-5">
                                    {cat.items.map((skill, sIdx) => (
                                        <div key={skill.id || sIdx} className="flex justify-between items-center text-xs">
                                            <span className="text-gray-400 font-medium truncate pr-4">{skill.name}</span>
                                            <div className="flex items-center gap-2 w-1/3">
                                                <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-${cat.colorTheme}-400 rounded-full`} style={{ width: `${skill.level}%`}}></div>
                                                </div>
                                                <span className="text-gray-500 font-mono w-6 text-right">{skill.level}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsTab;
