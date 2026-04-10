import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        axios.get('bills')
            .then(res => setBills(res.data))
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
                    <h1 className="text-2xl font-extrabold text-slate-900 m-0">Billing & Invoices</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your payments and download insurance-ready receipts.</p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading invoices...</div>
                ) : bills.length > 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        {/* Desktop Table Header */}
                        <div className="hidden lg:grid grid-cols-5 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Service</span>
                            <span>Invoice Date</span>
                            <span>Amount</span>
                            <span>Status</span>
                            <span className="text-right">Actions</span>
                        </div>
                        
                        {/* List Items */}
                        <div className="flex flex-col">
                            {bills.map((b, i) => (
                                <div key={i} className="px-6 py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors flex flex-col lg:grid lg:grid-cols-5 lg:items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="lg:hidden text-[10px] font-black uppercase text-slate-400 mb-1">Service</span>
                                        <span className="text-sm font-bold text-slate-800">{b.service || 'Medical Consultation'}</span>
                                        <span className="text-[10px] text-slate-500">#{b._id.slice(-8).toUpperCase()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="lg:hidden text-[10px] font-black uppercase text-slate-400 mb-1">Invoice Date</span>
                                        <span className="text-sm text-slate-600">{new Date(b.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="lg:hidden text-[10px] font-black uppercase text-slate-400 mb-1">Amount</span>
                                        <span className="text-sm font-black text-slate-900">₹{b.amount}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="lg:hidden text-[10px] font-black uppercase text-slate-400 mb-1">Status</span>
                                        <span className={`w-fit px-2 py-1 rounded text-[10px] font-black uppercase ${b.status === 'paid' ? 'bg-teal-50 text-teal-600' : 'bg-red-50 text-red-600'}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-start lg:justify-end">
                                        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-[10px] hover:bg-slate-800 cursor-pointer border-none transition-colors">Download Receipt</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">No billing history found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bills;
