import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Check, X, Plus } from 'lucide-react';

const Leaves = () => {
    const { user } = useAuth();
    const { leaves, applyLeave, updateLeaveStatus, getMyLeaves } = useData();
    const [showApplyForm, setShowApplyForm] = useState(false);

    // Form State
    const [leaveType, setLeaveType] = useState('Sick Leave');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reason, setReason] = useState('');

    const handleApply = (e) => {
        e.preventDefault();
        applyLeave({
            empId: user.id,
            type: leaveType,
            from: fromDate,
            to: toDate,
            reason
        });
        setShowApplyForm(false);
        // Reset form
        setFromDate('');
        setToDate('');
        setReason('');
    };

    const pendingLeaves = leaves.filter(l => l.status === 'Pending');

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Leave Management</h1>
                {user.role === 'employee' && (
                    <button
                        onClick={() => setShowApplyForm(!showApplyForm)}
                        className="btn btn-primary"
                    >
                        <Plus size={18} className="mr-2" />
                        Apply for Leave
                    </button>
                )}
            </div>

            {/* Employee: Apply Form */}
            {showApplyForm && user.role === 'employee' && (
                <div className="card mb-8">
                    <h3 className="font-bold mb-4">New Leave Request</h3>
                    <form onSubmit={handleApply} className="grid-cols-2 gap-4" style={{ display: 'grid' }}>
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-secondary mb-1 block">Leave Type</label>
                            <select
                                className="input-field"
                                value={leaveType}
                                onChange={(e) => setLeaveType(e.target.value)}
                            >
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Unpaid Leave</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-secondary mb-1 block">From Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-secondary mb-1 block">To Date</label>
                            <input
                                type="date"
                                className="input-field"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-span-2" style={{ gridColumn: 'span 2' }}>
                            <label className="text-sm font-medium text-secondary mb-1 block">Reason</label>
                            <textarea
                                className="input-field"
                                rows="3"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="col-span-2 flex gap-2 justify-end" style={{ gridColumn: 'span 2' }}>
                            <button
                                type="button"
                                onClick={() => setShowApplyForm(false)}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">Submit Request</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Admin: Pending Requests */}
            {user.role === 'admin' && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold mb-4">Pending Approvals</h2>
                    <div className="card p-0 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Type</th>
                                    <th>Dates</th>
                                    <th>Reason</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingLeaves.map(leave => (
                                    <tr key={leave.id}>
                                        <td className="font-medium">{leave.empId}</td>
                                        <td>{leave.type}</td>
                                        <td className="text-sm">
                                            {leave.from} <span className="text-secondary">to</span> {leave.to}
                                        </td>
                                        <td className="text-sm text-secondary truncate max-w-xs">{leave.reason}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                                                    className="btn btn-primary p-2 rounded-full"
                                                    title="Approve"
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                                                    className="btn btn-outline p-2 rounded-full text-danger border-danger hover:bg-red-50"
                                                    title="Reject"
                                                    style={{ padding: '0.5rem' }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {pendingLeaves.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center text-secondary py-8">
                                            No pending requests
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Everyone: Leave History */}
            <div className="card p-0">
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold">{user.role === 'admin' ? 'All Leave Records' : 'My Leave History'}</h3>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            {user.role === 'admin' && <th>Employee</th>}
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(user.role === 'admin' ? leaves : getMyLeaves(user.id)).map(leave => (
                            <tr key={leave.id}>
                                {user.role === 'admin' && <td>{leave.empId}</td>}
                                <td>{leave.type}</td>
                                <td>{leave.from}</td>
                                <td>{leave.to}</td>
                                <td className="text-secondary">{leave.reason}</td>
                                <td>
                                    <span className={`badge ${leave.status === 'Approved' ? 'badge-success' :
                                            leave.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
                                        }`}>
                                        {leave.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaves;
