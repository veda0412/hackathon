import { useAuth } from '../context/AuthContext';
import { Mail, Briefcase, MapPin, Phone } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="container py-8">
            {/* Cover Photo Removed */}

            <div className="relative px-6 pb-6 sm:px-10 pt-8">
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Sidebar Info */}
                    <div className="card w-full md:w-1/3 mt-4 md:mt-0 relative z-10">
                        <div className="flex justify-center md:justify-start mb-4">
                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-primary text-white flex items-center justify-center text-4xl font-bold">
                                {user.name.charAt(0)}
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-secondary font-medium">{user.position || user.role}</p>
                            <div className="mt-2 flex gap-2">
                                <span className="badge badge-blue">{user.department || 'Administration'}</span>
                                <span className="badge badge-success">Active</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-secondary hover:text-primary transition-colors cursor-pointer group">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-secondary hover:text-primary transition-colors cursor-pointer group">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm">+1 (555) 000-0000</span>
                            </div>
                            <div className="flex items-center gap-3 text-secondary hover:text-primary transition-colors cursor-pointer group">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-sm">San Francisco, CA</span>
                            </div>
                            <div className="flex items-center gap-3 text-secondary hover:text-primary transition-colors cursor-pointer group">
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                    <Briefcase size={18} />
                                </div>
                                <span className="text-sm">Full-Time • Remote</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Details */}
                    <div className="card w-full md:w-2/3 mt-4 md:mt-16">
                        <div className="border-b border-gray-100 pb-4 mb-4">
                            <h3 className="font-bold text-lg">Personal Information</h3>
                        </div>

                        <div className="grid-cols-2 gap-6 mb-8" style={{ display: 'grid' }}>
                            <div>
                                <label className="text-xs text-secondary uppercase font-bold block mb-1">Full Name</label>
                                <input type="text" className="input-field bg-gray-50" value={user.name} readOnly />
                            </div>
                            <div>
                                <label className="text-xs text-secondary uppercase font-bold block mb-1">Employee ID</label>
                                <input type="text" className="input-field bg-gray-50" value={user.id} readOnly />
                            </div>
                            <div>
                                <label className="text-xs text-secondary uppercase font-bold block mb-1">Email Address</label>
                                <input type="text" className="input-field bg-gray-50" value={user.email} readOnly />
                            </div>
                            <div>
                                <label className="text-xs text-secondary uppercase font-bold block mb-1">Phone</label>
                                <input type="text" className="input-field" defaultValue="+1 (555) 000-0000" />
                            </div>
                            <div className="col-span-2" style={{ gridColumn: 'span 2' }}>
                                <label className="text-xs text-secondary uppercase font-bold block mb-1">Address</label>
                                <textarea className="input-field" rows="3" defaultValue="123 Corporate Blvd, Tech City, CA 94000"></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
