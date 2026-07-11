import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminApp = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Check sessionStorage first for local session
        const localSession = sessionStorage.getItem('portfolio_local_session');
        if (localSession) {
            setSession(JSON.parse(localSession));
            setLoading(false);
            return;
        }

        // 2. Check active Supabase session
        supabase.auth.getSession().then(({ data: { session: supabaseSession } }) => {
            if (supabaseSession) {
                setSession(supabaseSession);
            }
            setLoading(false);
        }).catch(() => {
            // Supabase failure
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, supabaseSession) => {
            if (supabaseSession) {
                setSession(supabaseSession);
            } else {
                if (!sessionStorage.getItem('portfolio_local_session')) {
                    setSession(null);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = (userSession) => {
        setSession(userSession);
    };

    const handleLogout = async () => {
        sessionStorage.removeItem('portfolio_local_session');
        try {
            await supabase.auth.signOut();
        } catch {}
        setSession(null);
    };

    if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" /></div>;

    return session
        ? <AdminDashboard onLogout={handleLogout} />
        : <AdminLogin onLogin={handleLogin} />;
};

export default AdminApp;

