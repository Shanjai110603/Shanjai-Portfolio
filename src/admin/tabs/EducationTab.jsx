import { useState } from 'react';
import { Save, Check, Plus, X, Trash2, Edit2, GripVertical, Award, GraduationCap } from 'lucide-react';
import { EDU_KEY, defaultEducation } from '../../sections/Education';

const CERT_COLORS = [
    { value: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', label: 'Gold (Yellow)' },
    { value: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Blue' },
    { value: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Emerald (Green)' },
    { value: 'text-purple-400 bg-purple-500/10 border-purple-500/20', label: 'Purple' },
    { value: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', label: 'Cyan' },
];

const getEducationData = () => {
    try {
        const stored = localStorage.getItem(EDU_KEY);
        return stored ? JSON.parse(stored) : defaultEducation;
    } catch { return defaultEducation; }
};

const saveEducationData = (data) => localStorage.setItem(EDU_KEY, JSON.stringify(data));

const EduForm = ({ item = null, onSave, onCancel }) => {
    const [form, setForm] = useState(item || {
        id: Date.now(), degree: '', institution: '', year: '', grade: '', highlight: false
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="bg-gray-900/80 border border-indigo-500/20 rounded-xl p-5 mb-4 space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2"><GraduationCap size={16} className="text-indigo-400" /> {item ? 'Edit Degree' : 'Add Degree'}</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Degree / Output</label>
                    <input value={form.degree} onChange={e => set('degree', e.target.value)} placeholder="e.g. B.Sc Computer Science"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Institution</label>
                    <input value={form.institution} onChange={e => set('institution', e.target.value)} placeholder="e.g. Harvard University"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Year</label>
                    <input value={form.year} onChange={e => set('year', e.target.value)} placeholder="e.g. 2024"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Grade / CGPA</label>
                    <input value={form.grade} onChange={e => set('grade', e.target.value)} placeholder="e.g. CGPA: 8.5"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" checked={form.highlight} onChange={e => set('highlight', e.target.checked)}
                    className="rounded border-gray-700 text-indigo-500 focus:ring-indigo-500 bg-gray-950" />
                Highlight this degree (makes it glow)
            </label>
            <div className="flex gap-3 pt-2">
                <button onClick={() => form.degree && onSave(form)} disabled={!form.degree} className="px-3 py-1.5 bg-indigo-500/20 text-indigo-400 text-sm rounded-lg hover:bg-indigo-500/30">Save</button>
                <button onClick={onCancel} className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    );
};

const CertForm = ({ item = null, onSave, onCancel }) => {
    const [form, setForm] = useState(item || {
        id: Date.now(), name: '', provider: '', color: CERT_COLORS[0].value
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="bg-gray-900/80 border border-emerald-500/20 rounded-xl p-5 mb-4 space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2"><Award size={16} className="text-emerald-400" /> {item ? 'Edit Certificate' : 'Add Certificate'}</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Certificate Name</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. AWS Certified"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Provider</label>
                    <input value={form.provider} onChange={e => set('provider', e.target.value)} placeholder="e.g. Coursera"
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
            </div>
            <div>
                <label className="text-xs text-gray-400 block mb-1">Theme Color</label>
                <select value={form.color} onChange={e => set('color', e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm">
                    {CERT_COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
            </div>
            <div className="flex gap-3 pt-2">
                <button onClick={() => form.name && onSave(form)} disabled={!form.name} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm rounded-lg hover:bg-emerald-500/30">Save</button>
                <button onClick={onCancel} className="px-3 py-1.5 bg-gray-800 text-gray-300 text-sm rounded-lg hover:bg-gray-700">Cancel</button>
            </div>
        </div>
    );
};


const EducationTab = () => {
    const [data, setData] = useState(getEducationData());
    const [saved, setSaved] = useState(false);
    const [editingEduId, setEditingEduId] = useState(null);
    const [editingCertId, setEditingCertId] = useState(null);

    const commit = (updated) => {
        setData(updated);
        saveEducationData(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    /* Degrees Handlers */
    const handleSaveEdu = (form) => {
        const newEdu = editingEduId === 'new' 
            ? [form, ...data.education] 
            : data.education.map(e => e.id === form.id ? form : e);
        commit({ ...data, education: newEdu });
        setEditingEduId(null);
    };
    const handleDeleteEdu = (id) => confirm('Delete degree?') && commit({ ...data, education: data.education.filter(e => e.id !== id) });
    const moveEdu = (idx, dir) => {
        const newArr = [...data.education];
        const swapIdx = idx + dir;
        if (swapIdx < 0 || swapIdx >= newArr.length) return;
        [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
        commit({ ...data, education: newArr });
    };

    /* Certs Handlers */
    const handleSaveCert = (form) => {
        const newCerts = editingCertId === 'new' 
            ? [...data.certifications, form] 
            : data.certifications.map(c => c.id === form.id ? form : c);
        commit({ ...data, certifications: newCerts });
        setEditingCertId(null);
    };
    const handleDeleteCert = (id) => confirm('Delete cert?') && commit({ ...data, certifications: data.certifications.filter(c => c.id !== id) });
    const moveCert = (idx, dir) => {
        const newArr = [...data.certifications];
        const swapIdx = idx + dir;
        if (swapIdx < 0 || swapIdx >= newArr.length) return;
        [newArr[idx], newArr[swapIdx]] = [newArr[swapIdx], newArr[idx]];
        commit({ ...data, certifications: newArr });
    };

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Education & Certs</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage academic history and certifications.</p>
                </div>
                <div className="flex gap-3 items-center">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={() => confirm('Reset to defaults?') && commit(defaultEducation)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Education */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2"><GraduationCap size={18} className="text-indigo-400"/> Degrees</h3>
                        <button onClick={() => setEditingEduId('new')} className="text-xs flex items-center gap-1 bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded hover:bg-indigo-500/30">
                            <Plus size={14} /> Add
                        </button>
                    </div>

                    {editingEduId === 'new' && <EduForm onSave={handleSaveEdu} onCancel={() => setEditingEduId(null)} />}

                    <div className="space-y-3">
                        {data.education.map((edu, idx) => (
                            <div key={edu.id}>
                                {editingEduId === edu.id ? (
                                    <EduForm item={edu} onSave={handleSaveEdu} onCancel={() => setEditingEduId(null)} />
                                ) : (
                                    <div className={`p-4 rounded-xl border flex gap-3 group transition-all ${edu.highlight ? 'bg-indigo-500/5 border-indigo-500/20' : 'bg-gray-900/60 border-gray-800'}`}>
                                        <div className="flex flex-col gap-1 text-gray-600 justify-center">
                                            <button onClick={() => moveEdu(idx, -1)} disabled={idx === 0} className="hover:text-indigo-400 disabled:opacity-30"><GripVertical size={14} className="rotate-90" /></button>
                                            <button onClick={() => moveEdu(idx, 1)} disabled={idx === data.education.length - 1} className="hover:text-indigo-400 disabled:opacity-30"><GripVertical size={14} className="rotate-90" /></button>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="text-sm font-bold text-white truncate">{edu.degree}</h4>
                                                <span className="text-xs text-gray-400 shrink-0 ml-2">{edu.year}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 truncate">{edu.institution}</p>
                                            <p className="text-xs font-semibold text-gray-500 mt-1">{edu.grade}</p>
                                        </div>
                                        <div className="flex flex-col gap-2 justify-center pl-2 border-l border-gray-800">
                                            <button onClick={() => setEditingEduId(edu.id)} className="text-gray-500 hover:text-indigo-400"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDeleteEdu(edu.id)} className="text-gray-500 hover:text-red-400"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Certs */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Award size={18} className="text-emerald-400"/> Certifications</h3>
                        <button onClick={() => setEditingCertId('new')} className="text-xs flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/30">
                            <Plus size={14} /> Add
                        </button>
                    </div>

                    {editingCertId === 'new' && <CertForm onSave={handleSaveCert} onCancel={() => setEditingCertId(null)} />}

                    <div className="space-y-3 mb-6">
                        {data.certifications.map((cert, idx) => (
                            <div key={cert.id}>
                                {editingCertId === cert.id ? (
                                    <CertForm item={cert} onSave={handleSaveCert} onCancel={() => setEditingCertId(null)} />
                                ) : (
                                    <div className="p-3 rounded-xl border border-gray-800 bg-gray-900/60 flex items-center gap-3 group hover:border-gray-700">
                                        <div className="flex flex-col text-gray-600">
                                            <button onClick={() => moveCert(idx, -1)} disabled={idx === 0} className="hover:text-emerald-400 disabled:opacity-30"><GripVertical size={12} className="rotate-90" /></button>
                                            <button onClick={() => moveCert(idx, 1)} disabled={idx === data.certifications.length - 1} className="hover:text-emerald-400 disabled:opacity-30"><GripVertical size={12} className="rotate-90" /></button>
                                        </div>
                                        <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border ${cert.color}`}>
                                            <Award size={14} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">{cert.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{cert.provider}</p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingCertId(cert.id)} className="text-gray-400 hover:text-emerald-400"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDeleteCert(cert.id)} className="text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Quote */}
                    <div className="bg-gray-900/60 p-4 rounded-xl border border-dashed border-gray-800 relative group">
                        <label className="text-xs text-gray-500 block mb-2 font-semibold">Mini Quote</label>
                        <textarea value={data.quote} onChange={e => {
                            commit({ ...data, quote: e.target.value });
                        }} rows={2} className="w-full bg-transparent text-gray-400 text-sm outline-none resize-none leading-relaxed italic" />
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-green-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Auto-saves
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationTab;
