import { useState } from 'react';
import { Check, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { SKILLS_KEY, defaultSkillsData } from '../../sections/Skills';

const getSkills = () => {
    try {
        const stored = localStorage.getItem(SKILLS_KEY);
        return stored ? JSON.parse(stored) : defaultSkillsData;
    } catch { return defaultSkillsData; }
};

const SkillsTab = () => {
    const [skills, setSkills] = useState(() => JSON.parse(JSON.stringify(getSkills())));
    const [saved, setSaved] = useState(false);

    const updateLevel = (catIdx, skillIdx, val) => {
        const updated = skills.map((cat, ci) => ({
            ...cat,
            items: cat.items.map((sk, si) =>
                ci === catIdx && si === skillIdx ? { ...sk, level: Math.min(100, Math.max(0, Number(val))) } : sk
            )
        }));
        setSkills(updated);
    };

    const updateName = (catIdx, skillIdx, val) => {
        const updated = skills.map((cat, ci) => ({
            ...cat,
            items: cat.items.map((sk, si) =>
                ci === catIdx && si === skillIdx ? { ...sk, name: val } : sk
            )
        }));
        setSkills(updated);
    };

    const addSkill = (catIdx) => {
        const updated = skills.map((cat, ci) =>
            ci === catIdx ? { ...cat, items: [...cat.items, { name: 'New Skill', level: 70 }] } : cat
        );
        setSkills(updated);
    };

    const removeSkill = (catIdx, skillIdx) => {
        const updated = skills.map((cat, ci) =>
            ci === catIdx ? { ...cat, items: cat.items.filter((_, si) => si !== skillIdx) } : cat
        );
        setSkills(updated);
    };

    const handleSave = () => {
        localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleReset = () => {
        if (confirm('Reset to default skills?')) {
            const defaults = JSON.parse(JSON.stringify(defaultSkillsData));
            setSkills(defaults);
            localStorage.setItem(SKILLS_KEY, JSON.stringify(defaults));
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Skills</h2>
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

            <div className="grid md:grid-cols-2 gap-6">
                {skills.map((cat, catIdx) => (
                    <div key={cat.category} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                {cat.category}
                            </h3>
                            <button onClick={() => addSkill(catIdx)}
                                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2 py-1 bg-cyan-500/10 rounded-lg transition-colors">
                                <Plus size={11} /> Add
                            </button>
                        </div>
                        <div className="space-y-4">
                            {cat.items.map((skill, skillIdx) => (
                                <div key={skillIdx} className="group">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <input
                                            value={skill.name}
                                            onChange={e => updateName(catIdx, skillIdx, e.target.value)}
                                            className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                        <input
                                            type="number" min="0" max="100"
                                            value={skill.level}
                                            onChange={e => updateLevel(catIdx, skillIdx, e.target.value)}
                                            className="w-16 bg-gray-950 border border-gray-800 rounded-lg px-2 py-1.5 text-cyan-400 text-xs font-mono text-center focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                        <button onClick={() => removeSkill(catIdx, skillIdx)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    {/* Visual bar */}
                                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsTab;
