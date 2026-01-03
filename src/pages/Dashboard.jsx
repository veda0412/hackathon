import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Users, UserCheck, CalendarOff, Wallet, Clock, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="card flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-secondary font-medium">{title}</p>
            <h3 className="text-xl font-bold mt-1">{value}</h3>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const { employees, attendance, leaves } = useData();

    // Admin Stats
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'Active').length;
    const onLeaveToday = attendance.filter(a => a.date === new Date().toISOString().split('T')[0] && a.status === 'Leave').length; // Mock logic
    // Better logic: check if today is in any approved leave range. 
    // For simplicity, just using static mock + context logic.

    // Employee Stats
    const myAttendance = attendance.filter(a => a.empId === user.id);
    const totalPresent = myAttendance.filter(a => a.status === 'Present').length;
    const myPendingLeaves = leaves.filter(l => l.empId === user.id && l.status === 'Pending').length;

    if (user.role === 'admin') {
        return (
            <div className="container py-8">
                <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>

                <div className="grid-cols-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    <StatCard
                        title="Total Employees"
                        value={totalEmployees}
                        icon={Users}
                        colorClass="bg-primary"
                    />
                    <StatCard
                        title="Active Now"
                        value={activeEmployees}
                        icon={UserCheck}
                        colorClass="bg-green-500" // Need to ensure colors exist or use style
                    />
                    <StatCard
                        title="On Leave"
                        value={onLeaveToday}
                        icon={CalendarOff}
                        colorClass="bg-yellow-500"
                    />
                    <StatCard
                        title="Payroll Processed"
                        value="100%"
                        icon={Wallet}
                        colorClass="bg-purple-500"
                    />
                </div>

                <div className="mt-8 grid-cols-2 gap-8" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    {/* Recent Activity or detailed lists could go here */}
                    <div className="card">
                        <h3 className="font-bold mb-4">Quick Actions</h3>
                        <div className="flex gap-4">
                            <button className="btn btn-primary">Add Employee</button>
                            <button className="btn btn-outline">Process Payroll</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            {/* Welcome Banner */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem', backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', marginBottom: '2rem', border: '1px solid var(--border)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Office Background"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, #1e3a8a, #2563eb)', mixBlendMode: 'multiply', opacity: 0.9 }}></div>
                </div>

                <div style={{ position: 'relative', padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Good Morning, {user.name.split(' ')[0]}</h1>
                        <p style={{ color: '#dbeafe', maxWidth: '36rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            Welcome to your Dayflow dashboard. You have <span className="font-semibold text-white">{myPendingLeaves}</span> pending leave requests and your attendance is <span className="font-semibold text-white">95%</span> this month.
                        </p>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Today is</p>
                        <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            <div className="grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <StatCard
                    title="Days Present"
                    value={totalPresent}
                    icon={CheckCircle}
                    colorClass="bg-primary"
                />
                <StatCard
                    title="Leave Balance"
                    value="12 Days"
                    icon={CalendarOff}
                    colorClass="bg-green-500"
                />
                <StatCard
                    title="Pending Requests"
                    value={myPendingLeaves}
                    icon={Clock}
                    colorClass="bg-yellow-500"
                />
            </div>

            <div className="mt-8">
                <h3 className="font-bold mb-4">Recent Attendance</h3>
                <div className="card p-0 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myAttendance.slice(0, 5).map(record => (
                                <tr key={record.id}>
                                    <td>{record.date}</td>
                                    <td>{record.checkIn}</td>
                                    <td>{record.checkOut}</td>
                                    <td>
                                        <span className={`badge ${record.status === 'Present' ? 'badge-success' :
                                            record.status === 'Absent' ? 'badge-danger' : 'badge-warning'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {myAttendance.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center text-secondary">No records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
