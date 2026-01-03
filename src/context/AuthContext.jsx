import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('dayflow_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic
        if (email === 'admin@dayflow.com' && password === 'admin123') {
            const userData = {
                id: 'admin-1',
                name: 'Jennifer Admin',
                email,
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Jennifer+Admin&background=0D8ABC&color=fff'
            };
            setUser(userData);
            localStorage.setItem('dayflow_user', JSON.stringify(userData));
            return { success: true };
        }

        if (email === 'emp@dayflow.com' && password === 'emp123') {
            const userData = {
                id: 'emp-101',
                name: 'David Employee',
                email,
                role: 'employee',
                department: 'Engineering',
                position: 'Frontend Developer',
                avatar: 'https://ui-avatars.com/api/?name=David+Employee&background=10B981&color=fff'
            };
            setUser(userData);
            localStorage.setItem('dayflow_user', JSON.stringify(userData));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const register = (name, email, password, role = 'employee') => {
        // Mock register - just auto login
        const userData = {
            id: `new-${Date.now()}`,
            name,
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        };
        setUser(userData);
        localStorage.setItem('dayflow_user', JSON.stringify(userData));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dayflow_user');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
