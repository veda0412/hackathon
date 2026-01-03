
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('employee'); // Default role for signup
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            // Quick helpers for demo
            let finalEmail = email;
            if (email === 'admin') finalEmail = 'admin@dayflow.com';
            if (email === 'emp') finalEmail = 'emp@dayflow.com';

            const result = login(finalEmail, password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } else {
            const result = register(name, email, password, role);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card-container">
                {/* Left Side - Brand Panel */}
                <div className="login-left-panel">
                    <div className="login-bg-overlay">
                        <div className="login-bg-gradient"></div>
                        <div className="login-blob-1"></div>
                        <div className="login-blob-2"></div>

                        <div className="shard shard-1"></div>
                        <div className="shard shard-2"></div>
                    </div>

                    <div className="login-content" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <div style={{ width: '3rem', height: '3rem', background: 'white', borderRadius: '0.75rem', color: '#1E3A8A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>T</div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '0.025em' }}>TeamNest</span>
                    </div>

                    <div className="login-content">
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>Elevate your<br />Workforce.</h1>
                        <p style={{ color: '#DBEAFE', fontSize: '0.875rem', lineHeight: '1.6', maxWidth: '20rem' }}>
                            Experience the future of HR management. Streamline attendance, payroll, and leave management in one professional platform.
                        </p>
                    </div>

                    <div className="login-content">
                        <div style={{ display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.875rem', fontWeight: '500' }}>
                            © 2024 TeamNest Inc.
                        </div>
                    </div>
                </div>

                {/* Right Side - Form Panel */}
                <div className="login-right-panel">
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 className="login-title">{isLogin ? 'Log in' : 'Get Started'}</h2>
                        <p className="login-subtitle">
                            {isLogin ? 'Welcome back! Please enter your details.' : 'Create your professional account today.'}
                        </p>
                    </div>

                    {error && (
                        <div className="login-alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="login-input-group">
                                <label className="login-label">Full Name</label>
                                <input
                                    type="text"
                                    className="login-input"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        <div className="login-input-group">
                            <label className="login-label">Email</label>
                            <input
                                type="text"
                                className="login-input"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-input-group">
                            <label className="login-label">Password</label>
                            <input
                                type="password"
                                className="login-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="login-input-group">
                                <label className="login-label">Role</label>
                                <select
                                    className="login-input"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" className="login-btn">
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                        <span
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="login-link"
                        >
                            {isLogin ? "Register" : "Login"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
