import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../utils/AuthContext';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        appointments: 0,
        prescriptions: 0,
        bills: 0
    });
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        axios.get('patients/dashboard-stats')
            .then(res => setStats(res.data))
            .catch(() => { });

        axios.get('appointments?limit=3')
            .then(res => setRecentAppointments(res.data))
            .catch(() => { });
    }, []);

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="dashboard-content">
                
                {/* Mobile Header */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                   <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                   </button>
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white font-bold text-xs">L</div>
                      <span className="font-bold text-slate-800">LemiCare</span>
                   </div>
                </div>

                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 m-0">Welcome back, {user?.name || 'Patient'}</h1>
                    <p className="text-sm text-slate-500 mt-1">Here is what is happening with your health records today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider m-0">Appointments</p>
                            <p className="text-2xl font-black text-slate-800 m-0">{stats.appointments}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider m-0">Prescriptions</p>
                            <p className="text-2xl font-black text-slate-800 m-0">{stats.prescriptions}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider m-0">Pending Bills</p>
                            <p className="text-2xl font-black text-slate-800 m-0">{stats.bills}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-slate-800 m-0">Recent Appointments</h3>
                            <button className="text-xs font-bold text-teal-600 hover:text-teal-700 bg-transparent border-none cursor-pointer">View All</button>
                        </div>
                        <div className="p-0">
                            {recentAppointments.length > 0 ? (
                                recentAppointments.map((appt, i) => (
                                    <div key={i} className="px-6 py-4 flex items-center gap-4 border-b border-slate-50 last:border-0">
                                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-800 m-0">Dr. {appt.doctor?.name || 'Consultant'}</p>
                                            <p className="text-xs text-slate-500 m-0">{new Date(appt.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${appt.status === 'confirmed' ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-500'}`}>
                                                {appt.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-slate-400 text-sm">No recent appointments.</div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center text-center">
                         <div className="w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-teal-200">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"></path></svg>
                         </div>
                         <h3 className="text-lg font-black text-slate-800 mb-2">Need a Consultation?</h3>
                         <p className="text-slate-500 text-sm mb-6 max-w-[240px]">Book a new appointment with our specialist doctors in just a few clicks.</p>
                         <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all cursor-pointer border-none">Book Appointment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
