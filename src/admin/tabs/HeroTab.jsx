import { useState } from 'react';
import { Save, Check, Plus, X } from 'lucide-react';
import { HERO_KEY, defaultHeroData } from '../../sections/Hero';

const getHeroData = () => {
    try {
        const stored = localStorage.getItem(HERO_KEY);
        return stored ? JSON.parse(stored) : defaultHeroData;
    } catch { return defaultHeroData; }
};

const saveHeroData = (data) => localStorage.setItem(HERO_KEY, JSON.stringify(data));

const HeroTab = () => {
    const [data, setData] = useState(getHeroData());
    const [saved, setSaved] = useState(false);
    const [newRole, setNewRole] = useState('');

    const commit = (updated) => {
        setData(updated);
        saveHeroData(updated);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleChange = (field, value) => {
        commit({ ...data, [field]: value });
    };

    const handleAddRole = () => {
        if (newRole.trim()) {
            commit({ ...data, roles: [...data.roles, newRole.trim()] });
            setNewRole('');
        }
    };

    const handleRemoveRole = (idx) => {
        const newRoles = [...data.roles];
        newRoles.splice(idx, 1);
        commit({ ...data, roles: newRoles });
    };

    const handleReset = () => {
        if (confirm('Reset to default Hero data?')) {
            commit(defaultHeroData);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Hero Section</h2>
                    <p className="text-xs text-gray-500 mt-1">Manage what visitors see first.</p>
                </div>
                <div className="flex gap-3">
                    {saved && <span className="flex items-center gap-1 text-green-400 text-sm"><Check size={14} /> Saved</span>}
                    <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 bg-gray-800 rounded-lg">Reset Defaults</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Basic Info</h3>
                    
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Greeting Text</label>
                        <input value={data.greeting} onChange={e => handleChange('greeting', e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">First Name</label>
                            <input value={data.nameFirst} onChange={e => handleChange('nameFirst', e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Last Name</label>
                            <input value={data.nameLast} onChange={e => handleChange('nameLast', e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Short Bio</label>
                        <textarea value={data.bioText || data.bioHtml || ''} onChange={e => handleChange('bioText', e.target.value)}
                            rows={3}
                            placeholder="Write a short bio about yourself..."
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm" />
                    </div>

                    {/* Profile Image Toggle */}
                    <label className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 cursor-pointer hover:border-gray-600 transition-colors">
                        <input
                            type="checkbox"
                            checked={data.showImage !== false}
                            onChange={e => handleChange('showImage', e.target.checked)}
                            className="w-4 h-4 accent-cyan-500 rounded"
                        />
                        <div>
                            <p className="text-sm text-white font-medium">Show Profile Photo</p>
                            <p className="text-xs text-gray-400">Toggle the profile image on the hero section</p>
                        </div>
                    </label>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Details & Links</h3>
                    
                    <div>
                        <label className="text-xs text-gray-400 mb-1 block">Status Badge</label>
                        <input value={data.statusBadge} onChange={e => handleChange('statusBadge', e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-emerald-400 focus:outline-none focus:border-emerald-500 text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Top Right Badge</label>
                            <input value={data.badgeTopRight} onChange={e => handleChange('badgeTopRight', e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-blue-400 focus:outline-none focus:border-blue-500 text-sm" />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Bottom Left Badge</label>
                            <input value={data.badgeBottomLeft} onChange={e => handleChange('badgeBottomLeft', e.target.value)}
                                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-purple-400 focus:outline-none focus:border-purple-500 text-sm" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400 block">Links</label>
                        <input value={data.cvUrl} onChange={e => handleChange('cvUrl', e.target.value)} placeholder="CV PDF URL"
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                        <input value={data.githubUrl} onChange={e => handleChange('githubUrl', e.target.value)} placeholder="GitHub URL"
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                        <input value={data.linkedinUrl} onChange={e => handleChange('linkedinUrl', e.target.value)} placeholder="LinkedIn URL"
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                        <input value={data.emailAddr} onChange={e => handleChange('emailAddr', e.target.value)} placeholder="Email Address"
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                </div>
            </div>

            {/* Typewriter Roles */}
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Typewriter Roles</h3>
                <div className="flex gap-2 mb-4">
                    <input value={newRole} onChange={e => setNewRole(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddRole())}
                        className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
                        placeholder="Add new role (e.g., Problem Solver)" />
                    <button onClick={handleAddRole} className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors flex items-center gap-2 text-sm">
                        <Plus size={16} /> Add
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    {data.roles.map((role, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-gray-950 px-4 py-2 rounded-lg border border-gray-800">
                            <span className="text-sm text-gray-300">{role}</span>
                            <button onClick={() => handleRemoveRole(idx)} className="text-gray-500 hover:text-red-400 p-1">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {data.roles.length === 0 && <p className="text-xs text-gray-500 text-center py-2">No roles added yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default HeroTab;
