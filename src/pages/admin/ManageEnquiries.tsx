import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Trash2, CheckCircle, Clock, XCircle, Mail, Phone, MessageSquare } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  interest: string;
  status: 'New' | 'In-Progress' | 'Closed';
  createdAt: string;
}

export default function ManageEnquiries() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'newsletter'>('enquiries');

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/enquiries');
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const { data } = await api.get('/newsletter');
      setSubscribers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchItems(), fetchSubscribers()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    try {
      await api.delete(`/newsletter/${id}`);
      fetchSubscribers();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <Clock size={16} className="text-blue-500" />;
      case 'In-Progress': return <CheckCircle size={16} className="text-orange-500" />;
      case 'Closed': return <XCircle size={16} className="text-slate-400" />;
      default: return null;
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-display font-black text-primary uppercase italic mb-2">Leads Management</h2>
          <p className="text-slate-500 text-sm font-accent font-medium">Manage your website enquiries and newsletter subscriptions.</p>
        </div>
        
        <div className="flex bg-surface p-1.5 rounded-xl border border-slate-100">
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`px-6 py-2.5 rounded-lg text-xs font-display font-black uppercase tracking-widest transition-all ${activeTab === 'enquiries' ? 'bg-white text-accent shadow-sm' : 'text-slate-400 hover:text-primary'}`}
          >
            Project Enquiries ({items.length})
          </button>
          <button 
            onClick={() => setActiveTab('newsletter')}
            className={`px-6 py-2.5 rounded-lg text-xs font-display font-black uppercase tracking-widest transition-all ${activeTab === 'newsletter' ? 'bg-white text-accent shadow-sm' : 'text-slate-400 hover:text-primary'}`}
          >
            Newsletter Leads ({subscribers.length})
          </button>
        </div>
      </div>

      {activeTab === 'enquiries' ? (
        <div className="grid gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${
                      item.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                      item.status === 'In-Progress' ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium font-accent">Received {new Date(item.createdAt).toLocaleDateString()}</span>
                    <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-black uppercase rounded">{item.interest}</span>
                  </div>
                  <h3 className="text-xl font-display font-black text-primary uppercase italic mb-1">{item.name}</h3>
                  <p className="text-slate-500 text-sm font-accent font-bold mb-4">{item.subject}</p>
                  
                  <div className="bg-surface p-6 rounded-2xl text-slate-600 font-accent leading-relaxed italic border border-slate-50 mb-6">
                    "{item.message}"
                  </div>

                  <div className="flex flex-wrap gap-8">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-xs font-display font-black uppercase tracking-widest">
                      <Mail size={16} className="text-accent" /> {item.email}
                    </a>
                    {item.phone && item.phone !== 'Not Provided' && (
                      <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-xs font-display font-black uppercase tracking-widest">
                        <Phone size={16} className="text-accent" /> {item.phone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex lg:flex-col justify-end gap-3">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className="bg-surface border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-display font-black uppercase tracking-widest focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="New">New Lead</option>
                    <option value="In-Progress">In Progress</option>
                    <option value="Closed">Close Lead</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                    title="Delete Enquiry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100">
              <MessageSquare size={48} className="mx-auto text-slate-200 mb-6" />
              <p className="text-slate-400 font-display font-black uppercase tracking-widest text-sm">No project enquiries found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-display font-black uppercase tracking-widest text-slate-400">Subscriber Email</th>
                  <th className="px-8 py-5 text-[10px] font-display font-black uppercase tracking-widest text-slate-400">Date Joined</th>
                  <th className="px-8 py-5 text-[10px] font-display font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {subscribers.map((sub) => (
                  <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-accent" />
                        <span className="font-display font-black text-primary uppercase tracking-wide">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-accent text-sm text-slate-500">
                      {new Date(sub.subscribedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleDeleteSubscriber(sub._id)}
                        className="p-2.5 rounded-lg text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subscribers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 font-display font-black uppercase tracking-widest text-xs">No newsletter subscribers yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
