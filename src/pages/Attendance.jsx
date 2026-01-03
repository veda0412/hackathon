import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Attendance = () => {
    const { user } = useAuth();
    const { markAttendance, getMyAttendance, attendance } = useData();

    const myAttendance = getMyAttendance(user.id);
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = myAttendance.find(a => a.date === today);

    const handleCheckIn = () => markAttendance(user.id, 'checkIn');
    const handleCheckOut = () => markAttendance(user.id, 'checkOut');

    return (
        <div className="container py-8">
            <h1 className="text-xl font-bold mb-6">Attendance</h1>

            {user.role === 'employee' && (
                <div className="card mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold">Today's Status</h2>
                            <p className="text-secondary text-sm">{new Date().toDateString()}</p>
                        </div>
                        <div className="flex gap-4">
                            {!todayRecord ? (
                                <button onClick={handleCheckIn} className="btn btn-primary">Check In</button>
                            ) : !todayRecord.checkOut || todayRecord.checkOut === '-' ? (
                                <button onClick={handleCheckOut} className="btn btn-outline text-warning border-warning">Check Out</button>
                            ) : (
                                <span className="badge badge-success">Completed</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="card p-0">
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold">History</h3>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Employee</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(user.role === 'admin' ? attendance : myAttendance).map(record => (
                            <tr key={record.id}>
                                <td>{record.date}</td>
                                <td>{record.empId}</td>
                                <td>{record.checkIn}</td>
                                <td>{record.checkOut}</td>
                                <td>
                                    <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-warning'
                                        }`}>
                                        {record.status}
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

export default Attendance;
