import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        axios.get('prescriptions')
            .then(res => setPrescriptions(res.data))
            .catch(() => { })
            .finally(() => setLoading(false));
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
                    <h1 className="text-2xl font-extrabold text-slate-900 m-0">My Prescriptions</h1>
                    <p className="text-sm text-slate-500 mt-1">View and download your medical prescriptions.</p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading prescriptions...</div>
                ) : prescriptions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {prescriptions.map((p, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-slate-800 m-0">Dr. {p.doctor?.name || 'Medical Specialist'}</h3>
                                    <p className="text-xs text-slate-500 m-0 mt-1">{new Date(p.date).toLocaleDateString()} · ID: {p._id.slice(-8).toUpperCase()}</p>
                                    
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {p.medicines?.map((m, idx) => (
                                            <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase border border-slate-100">
                                                {m.name} ({m.dosage})
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 cursor-pointer border-none transition-colors">Download PDF</button>
                                    <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-slate-600 transition-colors border-none cursor-pointer">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path></svg>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">No prescriptions found in your records.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Prescriptions;
