import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Mock Data
    const [employees] = useState([
        { id: 'emp-101', name: 'David Employee', role: 'Frontend Developer', department: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
        { id: 'emp-102', name: 'Sarah Designer', role: 'UI/UX Designer', department: 'Design', status: 'Active', joinDate: '2023-03-10' },
        { id: 'emp-103', name: 'Michael Manager', role: 'Project Manager', department: 'Product', status: 'On Leave', joinDate: '2022-11-01' },
    ]);

    const [attendance, setAttendance] = useState([
        { id: 1, empId: 'emp-101', date: '2026-01-02', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
        { id: 2, empId: 'emp-101', date: '2026-01-01', checkIn: '09:15 AM', checkOut: '05:15 PM', status: 'Present' },
        { id: 3, empId: 'emp-101', date: '2025-12-31', checkIn: '09:05 AM', checkOut: '02:00 PM', status: 'Half Day' },
        { id: 4, empId: 'emp-102', date: '2026-01-02', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'Present' },
    ]);

    const [leaves, setLeaves] = useState([
        { id: 1, empId: 'emp-101', type: 'Sick Leave', from: '2025-12-20', to: '2025-12-21', reason: 'Flu', status: 'Approved' },
        { id: 2, empId: 'emp-102', type: 'Casual Leave', from: '2026-01-10', to: '2026-01-12', reason: 'Vacation', status: 'Pending' },
    ]);

    const [payroll] = useState([
        { id: 1, empId: 'emp-101', month: 'December 2025', basic: 5000, allowances: 1200, deductions: 200, net: 6000, status: 'Paid' },
        { id: 2, empId: 'emp-101', month: 'November 2025', basic: 5000, allowances: 1200, deductions: 200, net: 6000, status: 'Paid' },
    ]);

    // Actions
    const markAttendance = (empId, type) => {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        setAttendance(prev => {
            const existing = prev.find(a => a.empId === empId && a.date === today);
            if (existing) {
                if (type === 'checkOut') {
                    return prev.map(a => a.id === existing.id ? { ...a, checkOut: time } : a);
                }
                return prev;
            }
            // Check In
            return [{ id: Date.now(), empId, date: today, checkIn: time, checkOut: '-', status: 'Present' }, ...prev];
        });
    };

    const applyLeave = (leaveData) => {
        setLeaves(prev => [{ ...leaveData, id: Date.now(), status: 'Pending' }, ...prev]);
    };

    const updateLeaveStatus = (id, status) => {
        setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    };

    const getMyAttendance = (empId) => attendance.filter(a => a.empId === empId);
    const getMyLeaves = (empId) => leaves.filter(l => l.empId === empId);
    const getMyPayroll = (empId) => payroll.filter(p => p.empId === empId);

    return (
        <DataContext.Provider value={{
            employees,
            attendance,
            leaves,
            payroll,
            markAttendance,
            applyLeave,
            updateLeaveStatus,
            getMyAttendance,
            getMyLeaves,
            getMyPayroll
        }}>
            {children}
        </DataContext.Provider>
    );
};
