import React, { useEffect, useState } from 'react';
import api, { uploadImage } from '../../lib/api';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, GripVertical } from 'lucide-react';

interface ServiceItem {
  _id: string;
  slug: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
  process: { title: string; desc: string }[];
  benefits: string[];
  isVisible: boolean;
  sortOrder: number;
}

const ICONS = ['Building2', 'Clock', 'Hammer', 'Ruler', 'Briefcase', 'HardHat'];

const emptyService: Omit<ServiceItem, '_id'> = {
  slug: '', title: '', icon: 'Building2', shortDesc: '', fullDesc: '',
  features: [''], image: '', process: [{ title: '', desc: '' }], benefits: [''],
  isVisible: true, sortOrder: 0,
};

export default function ManageServices() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ServiceItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/services?all=true');
      setItems(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => {
    setEditing({ ...emptyService, sortOrder: items.length });
    setIsNew(true);
    setImageFile(null);
    setImagePreview('');
  };

  const openEdit = (item: ServiceItem) => {
    setEditing({ ...item });
    setIsNew(false);
    setImageFile(null);
    setImagePreview(item.image || '');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    
    // Validation
    if (!editing.title?.trim()) { alert('Title is required'); return; }
    if (!editing.slug?.trim()) { alert('Slug is required'); return; }
    if (!editing.shortDesc?.trim()) { alert('Short description is required'); return; }
    if (!editing.image && !imageFile) { alert('Image is required'); return; }

    setSaving(true);
    try {
      let imagePath = editing.image || '';
      if (imageFile) {
        imagePath = await uploadImage(imageFile);
      }
      const payload = { ...editing, image: imagePath };
      if (isNew) {
        await api.post('/services', payload);
      } else {
        await api.put(`/services/${editing._id}`, payload);
      }
      setEditing(null);
      fetchItems();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchItems();
    } catch (err) { console.error(err); }
  };

  const toggleVisibility = async (item: ServiceItem) => {
    await api.put(`/services/${item._id}`, { isVisible: !item.isVisible });
    fetchItems();
  };

  // Array field helpers
  const updateArrayField = (field: 'features' | 'benefits', idx: number, val: string) => {
    if (!editing) return;
    const arr = [...(editing[field] || [])];
    arr[idx] = val;
    setEditing({ ...editing, [field]: arr });
  };
  const addArrayField = (field: 'features' | 'benefits') => {
    if (!editing) return;
    setEditing({ ...editing, [field]: [...(editing[field] || []), ''] });
  };
  const removeArrayField = (field: 'features' | 'benefits', idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: (editing[field] || []).filter((_: any, i: number) => i !== idx) });
  };

  // Process field helpers
  const updateProcess = (idx: number, key: 'title' | 'desc', val: string) => {
    if (!editing) return;
    const arr = [...(editing.process || [])];
    arr[idx] = { ...arr[idx], [key]: val };
    setEditing({ ...editing, process: arr });
  };
  const addProcess = () => {
    if (!editing) return;
    setEditing({ ...editing, process: [...(editing.process || []), { title: '', desc: '' }] });
  };
  const removeProcess = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, process: (editing.process || []).filter((_: any, i: number) => i !== idx) });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Services</h2>
          <p className="text-slate-500 text-sm">{items.length} total services</p>
        </div>
        <button onClick={openNew} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90">
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left hidden md:table-cell">Slug</th>
              <th className="p-4 text-center">Visible</th>
              <th className="p-4 text-center">Order</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.image && <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                    <div>
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.shortDesc}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-sm text-slate-500 font-mono">{item.slug}</td>
                <td className="p-4 text-center">
                  <button onClick={() => toggleVisibility(item)}>
                    {item.isVisible ? <Eye size={16} className="text-green-500 mx-auto" /> : <EyeOff size={16} className="text-slate-300 mx-auto" />}
                  </button>
                </td>
                <td className="p-4 text-center text-sm text-slate-500">{item.sortOrder}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No services yet. Click "Add Service" to create one.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-10">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold">{isNew ? 'Add Service' : 'Edit Service'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                  <input value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug</label>
                  <input value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm font-mono focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Icon</label>
                  <select value={editing.icon || ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent">
                    {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sort Order</label>
                  <input type="number" value={editing.sortOrder || 0} onChange={(e) => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Short Description</label>
                <textarea rows={2} value={editing.shortDesc || ''} onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Description</label>
                <textarea rows={4} value={editing.fullDesc || ''} onChange={(e) => setEditing({ ...editing, fullDesc: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}
              </div>
              {/* Features */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Features</label>
                {(editing.features || []).map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input value={f} onChange={(e) => updateArrayField('features', i, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <button onClick={() => removeArrayField('features', i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                  </div>
                ))}
                <button onClick={() => addArrayField('features')} className="text-accent text-xs font-semibold flex items-center gap-1 mt-1"><Plus size={12} /> Add Feature</button>
              </div>
              {/* Process */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Process Steps</label>
                {(editing.process || []).map((p: any, i: number) => (
                  <div key={i} className="flex items-start gap-2 mb-2">
                    <input placeholder="Step title" value={p.title} onChange={(e) => updateProcess(i, 'title', e.target.value)} className="w-1/3 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <input placeholder="Description" value={p.desc} onChange={(e) => updateProcess(i, 'desc', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <button onClick={() => removeProcess(i)} className="text-red-400 hover:text-red-600 mt-2"><X size={14} /></button>
                  </div>
                ))}
                <button onClick={addProcess} className="text-accent text-xs font-semibold flex items-center gap-1 mt-1"><Plus size={12} /> Add Step</button>
              </div>
              {/* Benefits */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Benefits</label>
                {(editing.benefits || []).map((b: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input value={b} onChange={(e) => updateArrayField('benefits', i, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <button onClick={() => removeArrayField('benefits', i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                  </div>
                ))}
                <button onClick={() => addArrayField('benefits')} className="text-accent text-xs font-semibold flex items-center gap-1 mt-1"><Plus size={12} /> Add Benefit</button>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="vis" checked={editing.isVisible !== false} onChange={(e) => setEditing({ ...editing, isVisible: e.target.checked })} className="accent-accent" />
                <label htmlFor="vis" className="text-sm font-medium text-slate-700">Visible on website</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90 disabled:opacity-50">
                <Save size={14} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
