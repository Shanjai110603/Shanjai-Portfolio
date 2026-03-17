import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, FolderKanban, Zap, MessageSquare,
    Settings, LogOut, Menu, X, Terminal, ChevronRight, Home, User, Briefcase, GraduationCap, Activity, Palette
} from 'lucide-react';
import HeroTab from './tabs/HeroTab';
import AboutTab from './tabs/AboutTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import StatsTab from './tabs/StatsTab';
import ProjectsTab from './tabs/ProjectsTab';
import SkillsTab from './tabs/SkillsTab';
import MessagesTab from './tabs/MessagesTab';
import SiteInfoTab from './tabs/SiteInfoTab';
import ThemeTab from './tabs/ThemeTab';

const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'stats', label: 'Stats', icon: Activity },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'siteinfo', label: 'Site Info', icon: Settings },
];

const StatCard = ({ label, value, color }) => (
    <div className={`bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-${color}-500/40 transition-colors`}>
        <p className="text-gray-400 text-sm mb-1">{label}</p>
        <p className={`text-3xl font-bold font-mono text-${color}-400`}>{value}</p>
    </div>
);

const OverviewTab = ({ onNavigate }) => {
    const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    const unread = messages.filter(m => !m.read).length;
    const skills = JSON.parse(localStorage.getItem('portfolio_skills') || '[]');
    const skillCount = skills.reduce((acc, cat) => acc + cat.items.length, 0);

    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Projects" value={projects.length || '4'} color="cyan" />
                <StatCard label="Skills" value={skillCount || '12'} color="blue" />
                <StatCard label="Messages" value={messages.length} color="purple" />
                <StatCard label="Unread" value={unread} color="green" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {tabs.slice(1).map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onNavigate(tab.id)}
                        className="flex items-center gap-4 p-5 bg-gray-900/60 border border-gray-800 rounded-xl hover:border-cyan-500/40 hover:bg-gray-900 transition-all group text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                            <tab.icon size={18} className="text-cyan-400" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-white">{tab.label}</p>
                            <p className="text-gray-500 text-xs">Manage {tab.label.toLowerCase()}</p>
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </button>
                ))}
            </div>
        </div>
    );
};

const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        onLogout();
    };

    const renderTab = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab onNavigate={setActiveTab} />;
            case 'hero': return <HeroTab />;
            case 'about': return <AboutTab />;
            case 'experience': return <ExperienceTab />;
            case 'education': return <EducationTab />;
            case 'stats': return <StatsTab />;
            case 'projects': return <ProjectsTab />;
            case 'skills': return <SkillsTab />;
            case 'messages': return <MessagesTab />;
            case 'theme': return <ThemeTab />;
            case 'siteinfo': return <SiteInfoTab />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex">
            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-gray-900/95 md:bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <Terminal size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-white text-sm">Admin Panel</p>
                            <p className="text-gray-500 text-xs">Shanjai Portfolio</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {tabs.map(tab => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-400 border border-cyan-500/20'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <tab.icon size={17} />
                                {tab.label}
                                {tab.id === 'messages' && (() => {
                                    const msgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
                                    const unread = msgs.filter(m => !m.read).length;
                                    return unread > 0 ? (
                                        <span className="ml-auto w-5 h-5 bg-cyan-500 rounded-full text-xs text-white flex items-center justify-center font-bold">{unread}</span>
                                    ) : null;
                                })()}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 space-y-2">
                    <a href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                        <LayoutDashboard size={17} />
                        View Portfolio
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={17} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top bar */}
                <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(s => !s)}
                            className="md:hidden text-gray-400 hover:text-white"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h1 className="font-semibold text-white capitalize">
                            {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="text-xs text-gray-500 font-mono hidden md:block">
                        shanjai@portfolio:admin
                    </div>
                </header>

                {/* Tab content */}
                <div className="flex-1 p-6 overflow-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderTab()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
