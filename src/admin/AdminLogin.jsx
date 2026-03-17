import { useState } from 'react';
import { Lock, Eye, EyeOff, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const PASSWORD_KEY = 'admin_password';
const SESSION_KEY = 'admin_session';

const getPassword = () => localStorage.getItem(PASSWORD_KEY) || 'admin123';

export const checkSession = () => sessionStorage.getItem(SESSION_KEY) === 'true';
export const clearSession = () => sessionStorage.removeItem(SESSION_KEY);

const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [shaking, setShaking] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === getPassword()) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            onLogin();
        } else {
            setError('Incorrect password');
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
            setPassword('');
        }
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

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    autoFocus
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
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-xs mt-6">
                        Default password: <span className="font-mono text-gray-500">admin123</span>
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

export { PASSWORD_KEY };
export default AdminLogin;
