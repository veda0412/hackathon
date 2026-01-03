import { useData } from '../context/DataContext';
import { Mail, Briefcase, Calendar } from 'lucide-react';

const Employees = () => {
    const { employees } = useData();

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Employees</h1>
                <button className="btn btn-primary">Add New Employee</button>
            </div>

            <div className="grid-cols-3 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {employees.map(emp => (
                    <div key={emp.id} className="card">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg">
                                    {emp.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold">{emp.name}</h3>
                                    <p className="text-sm text-secondary">{emp.role}</p>
                                </div>
                            </div>
                            <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                                {emp.status}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Mail size={16} />
                                <span>{emp.id}@dayflow.com</span> {/* Mock email */}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Briefcase size={16} />
                                <span>{emp.department}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Calendar size={16} />
                                <span>Joined {new Date(emp.joinDate).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                            <button className="btn btn-outline text-sm flex-1">View Profile</button>
                            <button className="btn btn-outline text-sm flex-1">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employees;
