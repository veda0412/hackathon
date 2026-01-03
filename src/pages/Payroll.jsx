import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Download } from 'lucide-react';

const Payroll = () => {
    const { user } = useAuth();
    const { payroll, getMyPayroll } = useData();

    const data = user.role === 'admin' ? payroll : getMyPayroll(user.id);

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Payroll</h1>
                {user.role === 'admin' && (
                    <button className="btn btn-primary">Process Payroll</button>
                )}
            </div>

            <div className="card p-0">
                <table className="w-full">
                    <thead>
                        <tr>
                            {user.role === 'admin' && <th>Employee ID</th>}
                            <th>Month</th>
                            <th>Basic Salary</th>
                            <th>Allowances</th>
                            <th>Deductions</th>
                            <th>Net Pay</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(record => (
                            <tr key={record.id}>
                                {user.role === 'admin' && <td className="font-medium">{record.empId}</td>}
                                <td>{record.month}</td>
                                <td>${record.basic.toLocaleString()}</td>
                                <td className="text-success">+${record.allowances.toLocaleString()}</td>
                                <td className="text-danger">-${record.deductions.toLocaleString()}</td>
                                <td className="font-bold">${record.net.toLocaleString()}</td>
                                <td>
                                    <span className="badge badge-success">{record.status}</span>
                                </td>
                                <td>
                                    <button className="btn btn-outline p-2" title="Download Slip">
                                        <Download size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={user.role === 'admin' ? 8 : 7} className="text-center text-secondary py-4">No payroll records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payroll;
