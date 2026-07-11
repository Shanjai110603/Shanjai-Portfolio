import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, Check, Inbox } from 'lucide-react';
import { MESSAGES_KEY } from '../../sections/Contact';
import { fetchPortfolioData, savePortfolioData } from '../../lib/api';

const MessagesTab = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchPortfolioData(MESSAGES_KEY, []).then(res => {
            setMessages(res || []);
            setLoading(false);
        });
    }, []);

    const commit = async (updated) => {
        setMessages(updated);
        await savePortfolioData(MESSAGES_KEY, updated);
    };

    const markRead = (id) => {
        commit(messages.map(m => m.id === id ? { ...m, read: true } : m));
    };

    const deleteMsg = (id) => {
        if (confirm('Delete this message?')) {
            const updated = messages.filter(m => m.id !== id);
            commit(updated);
            if (selected?.id === id) setSelected(null);
        }
    };

    const clearAll = () => {
        if (confirm('Delete all messages?')) {
            commit([]);
            setSelected(null);
        }
    };

    const handleOpen = (msg) => {
        setSelected(msg);
        markRead(msg.id);
    };


    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        } catch { return iso; }
    };

    const unread = messages.filter(m => !m.read).length;

    if (loading) return <div className="text-gray-500 animate-pulse">Loading messages...</div>;

    if (messages.length === 0) {
        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Messages</h2>
                </div>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-800/60 flex items-center justify-center mb-4">
                        <Inbox size={28} className="text-gray-600" />
                    </div>
                    <p className="text-gray-400 font-medium">No messages yet</p>
                    <p className="text-gray-600 text-sm mt-1">Contact form submissions will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                    Messages
                    {unread > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full font-normal">{unread} unread</span>
                    )}
                </h2>
                {messages.length > 0 && (
                    <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 bg-red-500/10 rounded-lg transition-colors">
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid md:grid-cols-5 gap-4">
                {/* List */}
                <div className="md:col-span-2 space-y-2">
                    {messages.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => handleOpen(msg)}
                            className={`w-full text-left p-4 rounded-xl border transition-all ${
                                selected?.id === msg.id
                                    ? 'border-cyan-500/40 bg-cyan-500/10'
                                    : 'border-gray-800 bg-gray-900/60 hover:border-gray-700'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    {!msg.read && <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1" />}
                                    <div className="min-w-0">
                                        <p className={`text-sm font-medium truncate ${msg.read ? 'text-gray-300' : 'text-white'}`}>{msg.name}</p>
                                        <p className="text-gray-500 text-xs truncate">{msg.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={e => { e.stopPropagation(); deleteMsg(msg.id); }}
                                    className="text-gray-600 hover:text-red-400 transition-colors shrink-0 p-1"
                                >
                                    <Trash2 size={13} />
                                </button>
                            </div>
                            <p className="text-gray-500 text-xs mt-2 line-clamp-2">{msg.message}</p>
                            <p className="text-gray-600 text-xs mt-1">{formatDate(msg.date)}</p>
                        </button>
                    ))}
                </div>

                {/* Detail */}
                <div className="md:col-span-3">
                    {selected ? (
                        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{selected.name}</h3>
                                    <a href={`mailto:${selected.email}`} className="text-cyan-400 text-sm hover:underline flex items-center gap-1 mt-1">
                                        <Mail size={13} />{selected.email}
                                    </a>
                                    <p className="text-gray-600 text-xs mt-1">{formatDate(selected.date)}</p>
                                </div>
                                <div className="flex gap-2">
                                    {!selected.read && (
                                        <button onClick={() => markRead(selected.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs hover:bg-green-500/20 transition-colors">
                                            <Check size={12} /> Mark Read
                                        </button>
                                    )}
                                    <button onClick={() => deleteMsg(selected.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors">
                                        <Trash2 size={12} /> Delete
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-950 rounded-xl p-5 border border-gray-800">
                                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{selected.message}</p>
                            </div>
                            <a
                                href={`mailto:${selected.email}?subject=Re: Portfolio Inquiry`}
                                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                            >
                                <Mail size={14} /> Reply via Email
                            </a>
                        </div>
                    ) : (
                        <div className="bg-gray-900/40 border border-gray-800 border-dashed rounded-xl h-full min-h-[200px] flex items-center justify-center">
                            <div className="text-center text-gray-600">
                                <Eye size={24} className="mx-auto mb-2" />
                                <p className="text-sm">Select a message to read</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagesTab;
