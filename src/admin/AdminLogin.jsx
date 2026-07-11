import { useState } from 'react';
import { Lock, Eye, EyeOff, Terminal, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shaking, setShaking] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let loginSuccess = false;
        let sessionObject = null;

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (!authError && data?.session) {
                loginSuccess = true;
                sessionObject = data.session;
            }
        } catch (err) {
            console.warn('Supabase authentication failed or was unreachable:', err);
        }

        // Try local fallback if Supabase didn't succeed
        if (!loginSuccess) {
            const fallbackEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';
            const fallbackPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

            if (email === fallbackEmail && password === fallbackPassword) {
                const mockSession = {
                    user: { email: fallbackEmail },
                    isLocal: true,
                    expires_at: Math.floor(Date.now() / 1000) + 3600
                };
                sessionStorage.setItem('portfolio_local_session', JSON.stringify(mockSession));
                sessionObject = mockSession;
                loginSuccess = true;
            }
        }

        if (loginSuccess) {
            if (onLogin) onLogin(sessionObject);
        } else {
            setError('Invalid login credentials');
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
            setPassword('');
        }
        setLoading(false);
    };


    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5 -z-10"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #06b6d4 40px, #06b6d4 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #06b6d4 40px, #06b6d4 41px)' }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`w-full max-w-md mx-4 ${shaking ? 'animate-bounce' : ''}`}
                style={shaking ? { animation: 'shake 0.5s ease' } : {}}
            >
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-black/50">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4 shadow-lg shadow-cyan-500/20">
                            <Terminal size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
                        <p className="text-gray-500 text-sm">Shanjai Portfolio · Management</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Admin Email</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Mail size={16} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); setError(''); }}
                                    className="w-full bg-gray-950 border border-gray-800 focus:border-cyan-500 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none transition-colors placeholder-gray-600"
                                    placeholder="admin@example.com"
                                    autoFocus
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    type={show ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setError(''); }}
                                    className="w-full bg-gray-950 border border-gray-800 focus:border-cyan-500 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none transition-colors placeholder-gray-600"
                                    placeholder="Enter admin password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                >
                                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {error && <p className="text-red-400 text-xs mt-2 flex items-center gap-1">⚠ {error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-cyan-500/25'}`}
                        >
                            {loading ? 'Authenticating...' : 'Login'}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-6">
                        Secured by Supabase Authentication
                    </p>
                </div>
            </motion.div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-8px); }
                    80% { transform: translateX(8px); }
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
