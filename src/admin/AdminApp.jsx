import { useState } from 'react';
import AdminLogin, { checkSession } from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminApp = () => {
    const [loggedIn, setLoggedIn] = useState(checkSession());

    return loggedIn
        ? <AdminDashboard onLogout={() => setLoggedIn(false)} />
        : <AdminLogin onLogin={() => setLoggedIn(true)} />;
};

export default AdminApp;
