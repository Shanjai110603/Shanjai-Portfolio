import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Edit2, X, Check, Star, DownloadCloud } from 'lucide-react';
import { PROJECTS_KEY, defaultProjects } from '../../sections/Projects';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const GRADIENT_OPTIONS = [
    { label: 'Cyan → Blue', value: 'from-cyan-500 to-blue-600' },
    { label: 'Orange → Yellow', value: 'from-orange-500 to-yellow-500' },
    { label: 'Purple → Pink', value: 'from-purple-500 to-pink-600' },
    { label: 'Green → Teal', value: 'from-green-500 to-teal-600' },
    { label: 'Red → Orange', value: 'from-red-500 to-orange-500' },
    { label: 'Blue → Purple', value: 'from-blue-500 to-purple-600' },
];

const emptyProject = () => ({
    id: Date.now(),
    title: '',
    description: '',
    tech: [],
    github: '',
    demo: '',
    color: 'from-cyan-500 to-blue-600',
    featured: false
});


const ProjectForm = ({ project, onSave, onCancel }) => {
    const [form, setForm] = useState({ ...project });
    const [techInput, setTechInput] = useState('');

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const addTech = () => {
        const t = techInput.trim();
        if (t && !form.tech.includes(t)) set('tech', [...form.tech, t]);
        setTechInput('');
    };
    const removeTech = (t) => set('tech', form.tech.filter(x => x !== t));

    return (
        <div className="bg-gray-900/80 border border-cyan-500/20 rounded-2xl p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Title *</label>
                    <input value={form.title} onChange={e => set('title', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="Project Title" />
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">GitHub URL</label>
                    <input value={form.github} onChange={e => set('github', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="https://github.com/..." />
                </div>
            </div>
            <div>
                <label className="text-xs text-gray-400 mb-1 block">Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)}
                    rows={3}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm resize-none"
                    placeholder="Project description..." />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Demo URL</label>
                    <input value={form.demo} onChange={e => set('demo', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="https://..." />
                </div>
                <div>
                    <label className="text-xs text-gray-400 mb-1 block">Banner Color</label>
                    <select value={form.color} onChange={e => set('color', e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm">
                        {GRADIENT_OPTIONS.map(g => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label className="text-xs text-gray-400 mb-1 block">Tech Stack</label>
                <div className="flex gap-2 mb-2">
                    <input value={techInput} onChange={e => setTechInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                        className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="Add tech tag and press Enter" />
                    <button onClick={addTech} className="px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                        <Plus size={16} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {form.tech.map(t => (
                        <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full border border-gray-700">
                            {t}
                            <button onClick={() => removeTech(t)} className="hover:text-red-400 transition-colors"><X size={10} /></button>
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button onClick={() => form.title && onSave(form)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                    <Check size={15} /> Save Project
                </button>
                <button onClick={onCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-400 rounded-lg text-sm hover:text-white transition-colors">
                    <X size={15} /> Cancel
                </button>
            </div>
        </div>
    );
};

const ProjectsTab = () => {
    const [projects, setProjects] = useState(defaultProjects);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null | 'new' | project id
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchPortfolioData(PROJECTS_KEY, defaultProjects).then(res => {
            setProjects(res || defaultProjects);
            setLoading(false);
        });
    }, []);

    const commit = async (updated) => {
        setProjects(updated);
        await savePortfolioData(PROJECTS_KEY, updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSave = (form) => {
        if (editing === 'new') {
            commit([...projects, { ...form, id: Date.now() }]);
        } else {
            commit(projects.map(p => p.id === editing ? form : p));
        }
        setEditing(null);
    };

    const handleDelete = (id) => {
        if (confirm('Delete this project?')) commit(projects.filter(p => p.id !== id));
    };

    const handleToggleFeatured = (id) => {
        commit(projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    };

    const handleFetchGithub = async () => {
        try {
            const res = await fetch('https://api.github.com/users/Shanjai110603/repos?sort=updated');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            
            const newProjects = data.map(repo => ({
                id: repo.id,
                title: repo.name.replace(/[-_]/g, ' '),
                description: repo.description || 'No description available.',
                tech: repo.language ? [repo.language] : [],
                github: repo.html_url,
                demo: repo.homepage || '#',
                color: 'from-cyan-500 to-blue-600',
                highlight: '',
                featured: false
            }));

            // Merge with existing avoiding duplicates
            const existingUrls = new Set(projects.map(p => p.github));
            const toAdd = newProjects.filter(p => !existingUrls.has(p.github));
            
            if (toAdd.length > 0) {
                commit([...toAdd, ...projects]);
                alert(`Imported ${toAdd.length} new repositories!`);
            } else {
                alert('No new repositories found.');
            }
        } catch (error) {
            alert('Error fetching GitHub repos: ' + error.message);
        }
    };

    const handleReset = async () => {
        if (confirm('Reset to default projects?')) {
            setProjects(defaultProjects);
            await savePortfolioData(PROJECTS_KEY, defaultProjects);
        }
    };

    if (loading) return <div className="text-gray-500 animate-pulse">Loading projects settings...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Projects <span className="text-gray-500 font-normal text-sm ml-2">({projects.length})</span></h2>
                    <p className="text-xs text-cyan-400 mt-1">{projects.filter(p => p.featured).length} Featured on Home</p>
                </div>
                <div className="flex gap-3">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={handleFetchGithub} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-gray-300 hover:text-white rounded-lg text-sm transition-colors border border-gray-700 hover:border-gray-600">
                        <DownloadCloud size={14} /> Sync GitHub
                    </button>
                    <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                    <button onClick={() => setEditing('new')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                        <Plus size={15} /> Add Project
                    </button>
                </div>
            </div>

            {editing === 'new' && (
                <div className="mb-6">
                    <ProjectForm project={emptyProject()} onSave={handleSave} onCancel={() => setEditing(null)} />
                </div>
            )}

            <div className="space-y-4">
                {projects.map(project => (
                    <div key={project.id}>
                        {editing === project.id ? (
                            <ProjectForm project={project} onSave={handleSave} onCancel={() => setEditing(null)} />
                        ) : (
                            <div className="flex items-center gap-4 p-4 bg-gray-900/60 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors group">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.color || 'from-cyan-500 to-blue-600'} shrink-0`} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white text-sm truncate">{project.title}</p>
                                    <p className="text-gray-500 text-xs truncate">{project.description}</p>
                                    <div className="flex gap-1 mt-1.5 flex-wrap">
                                        {project.tech.slice(0, 4).map(t => (
                                            <span key={t} className="px-1.5 py-0.5 bg-gray-800 text-cyan-400 text-xs rounded">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleToggleFeatured(project.id)}
                                        className={`p-2 transition-all rounded-lg ${project.featured ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'}`}
                                        title={project.featured ? "Unfeature" : "Feature on Home"}
                                    >
                                        <Star size={15} fill={project.featured ? "currentColor" : "none"} />
                                    </button>
                                    <button onClick={() => setEditing(project.id)}
                                        className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all">
                                        <Edit2 size={15} />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsTab;
