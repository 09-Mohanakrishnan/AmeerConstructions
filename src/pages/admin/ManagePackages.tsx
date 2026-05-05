import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, Star } from 'lucide-react';

interface DetailItem { label: string; value: string; included: boolean }
interface FeatureItem { text: string; included: boolean }
interface PackageItem {
  _id: string; title: string; price: string; icon: string; isPopular: boolean;
  features: FeatureItem[];
  details: { design: DetailItem[]; civil: DetailItem[]; finishing: DetailItem[] };
  isVisible: boolean; sortOrder: number;
}

const ICONS = ['Shield', 'Crown', 'Star', 'Zap', 'Award'];
const emptyPackage: Omit<PackageItem, '_id'> = {
  title: '', price: '', icon: 'Shield', isPopular: false,
  features: [{ text: '', included: true }],
  details: { design: [{ label: '', value: '', included: true }], civil: [{ label: '', value: '', included: true }], finishing: [{ label: '', value: '', included: true }] },
  isVisible: true, sortOrder: 0,
};

export default function ManagePackages() {
  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<PackageItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try { const { data } = await api.get('/packages?all=true'); setItems(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing({ ...emptyPackage, sortOrder: items.length }); setIsNew(true); };
  const openEdit = (item: PackageItem) => { setEditing(JSON.parse(JSON.stringify(item))); setIsNew(false); };

  const handleSave = async () => {
    if (!editing) return;

    // Validation
    if (!editing.title?.trim()) { alert('Package Title is required'); return; }
    if (!editing.price?.trim()) { alert('Price is required'); return; }
    if (!editing.features || editing.features.length === 0) { alert('At least one feature is required'); return; }

    setSaving(true);
    try {
      if (isNew) await api.post('/packages', editing);
      else await api.put(`/packages/${editing._id}`, editing);
      setEditing(null); fetchItems();
    } catch (err: any) { alert(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    try { await api.delete(`/packages/${id}`); fetchItems(); } catch (err) { console.error(err); }
  };

  const toggleVisibility = async (item: PackageItem) => {
    await api.put(`/packages/${item._id}`, { isVisible: !item.isVisible }); fetchItems();
  };

  // Feature helpers
  const updateFeature = (idx: number, val: string) => {
    if (!editing) return;
    const f = [...(editing.features || [])]; f[idx] = { ...f[idx], text: val };
    setEditing({ ...editing, features: f });
  };
  const addFeature = () => { if (editing) setEditing({ ...editing, features: [...(editing.features || []), { text: '', included: true }] }); };
  const removeFeature = (idx: number) => { if (editing) setEditing({ ...editing, features: (editing.features || []).filter((_, i) => i !== idx) }); };

  // Detail helpers
  const updateDetail = (section: 'design' | 'civil' | 'finishing', idx: number, key: 'label' | 'value', val: string) => {
    if (!editing?.details) return;
    const d = JSON.parse(JSON.stringify(editing.details));
    d[section][idx][key] = val;
    setEditing({ ...editing, details: d });
  };
  const toggleDetailIncluded = (section: 'design' | 'civil' | 'finishing', idx: number) => {
    if (!editing?.details) return;
    const d = JSON.parse(JSON.stringify(editing.details));
    d[section][idx].included = !d[section][idx].included;
    setEditing({ ...editing, details: d });
  };
  const addDetail = (section: 'design' | 'civil' | 'finishing') => {
    if (!editing?.details) return;
    const d = JSON.parse(JSON.stringify(editing.details));
    d[section].push({ label: '', value: '', included: true });
    setEditing({ ...editing, details: d });
  };
  const removeDetail = (section: 'design' | 'civil' | 'finishing', idx: number) => {
    if (!editing?.details) return;
    const d = JSON.parse(JSON.stringify(editing.details));
    d[section] = d[section].filter((_: any, i: number) => i !== idx);
    setEditing({ ...editing, details: d });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Packages</h2>
          <p className="text-slate-500 text-sm">{items.length} total packages</p>
        </div>
        <button onClick={openNew} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90">
          <Plus size={16} /> Add Package
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item._id} className={`bg-white rounded-2xl shadow-sm border p-6 relative ${item.isPopular ? 'border-accent' : 'border-slate-100'}`}>
            {item.isPopular && <div className="absolute -top-3 left-4 bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</div>}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <div className="flex gap-1">
                <button onClick={() => toggleVisibility(item)} className="p-1.5 rounded-lg hover:bg-slate-100">
                  {item.isVisible ? <Eye size={14} className="text-green-500" /> : <EyeOff size={14} className="text-slate-300" />}
                </button>
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800">₹{item.price} <span className="text-xs text-slate-400 font-normal">/ sq.ft</span></div>
            <div className="text-xs text-slate-400 mt-2">{item.features.length} features • Order: {item.sortOrder}</div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-10">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold">{isNew ? 'Add Package' : 'Edit Package'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label><input value={editing.title||''} onChange={e=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price (₹/sqft)</label><input value={editing.price||''} onChange={e=>setEditing({...editing,price:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Icon</label>
                  <select value={editing.icon||''} onChange={e=>setEditing({...editing,icon:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent">
                    {ICONS.map(i=><option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><input type="checkbox" checked={editing.isPopular||false} onChange={e=>setEditing({...editing,isPopular:e.target.checked})} className="accent-accent" /><label className="text-sm font-medium">Most Popular</label></div>
                <div className="flex items-center gap-2"><input type="checkbox" checked={editing.isVisible!==false} onChange={e=>setEditing({...editing,isVisible:e.target.checked})} className="accent-accent" /><label className="text-sm font-medium">Visible</label></div>
                <div><label className="text-xs font-bold text-slate-500 mr-2">Order:</label><input type="number" value={editing.sortOrder||0} onChange={e=>setEditing({...editing,sortOrder:parseInt(e.target.value)||0})} className="w-16 px-2 py-1 border rounded-lg text-sm" /></div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Features</label>
                {(editing.features||[]).map((f,i)=>(
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input value={f.text} onChange={e=>updateFeature(i,e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <button onClick={()=>removeFeature(i)} className="text-red-400"><X size={14}/></button>
                  </div>
                ))}
                <button onClick={addFeature} className="text-accent text-xs font-semibold flex items-center gap-1 mt-1"><Plus size={12}/> Add</button>
              </div>

              {/* Details Sections */}
              {(['design','civil','finishing'] as const).map(section=>(
                <div key={section}>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{section === 'design' ? 'Design & Engineering' : section === 'civil' ? 'Civil & Structural' : 'Finishing & Aesthetics'}</label>
                  {(editing.details?.[section]||[]).map((d,i)=>(
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input placeholder="Label" value={d.label} onChange={e=>updateDetail(section,i,'label',e.target.value)} className="w-1/3 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                      <input placeholder="Value" value={d.value} onChange={e=>updateDetail(section,i,'value',e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                      <button onClick={()=>toggleDetailIncluded(section,i)} className={`text-xs font-semibold px-2 py-1 rounded ${d.included?'bg-green-100 text-green-600':'bg-red-100 text-red-500'}`}>{d.included?'Yes':'No'}</button>
                      <button onClick={()=>removeDetail(section,i)} className="text-red-400"><X size={14}/></button>
                    </div>
                  ))}
                  <button onClick={()=>addDetail(section)} className="text-accent text-xs font-semibold flex items-center gap-1 mt-1"><Plus size={12}/> Add Row</button>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={()=>setEditing(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90 disabled:opacity-50"><Save size={14}/> {saving?'Saving...':'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
