import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    User,
    CalendarCheck,
    CalendarDays,
    Receipt,
    Users,
    LogOut
} from 'lucide-react';

const Sidebar = ({ onCloseMobile }) => {
    const { user, logout } = useAuth();

    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'employee'] },
        { to: '/profile', icon: User, label: 'My Profile', roles: ['employee'] },
        { to: '/attendance', icon: CalendarCheck, label: 'Attendance', roles: ['admin', 'employee'] },
        { to: '/leaves', icon: CalendarDays, label: 'Leaves', roles: ['admin', 'employee'] },
        { to: '/payroll', icon: Receipt, label: 'Payroll', roles: ['admin', 'employee'] },
        { to: '/employees', icon: Users, label: 'Employees', roles: ['admin'] },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon" style={{ background: 'linear-gradient(135deg, var(--primary), #2563EB)' }}>T</div>
                    <span>TeamNest</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.filter(item => item.roles.includes(user?.role)).map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon size={20} />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <img src={user?.avatar} alt="User" className="user-avatar" />
                    <div className="user-info">
                        <p className="user-name">{user?.name}</p>
                        <p className="user-role">{user?.role}</p>
                    </div>
                </div>
                <button onClick={logout} className="btn-logout">
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
