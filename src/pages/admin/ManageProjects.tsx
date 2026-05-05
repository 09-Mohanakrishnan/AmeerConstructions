import React, { useEffect, useState } from 'react';
import api, { uploadImage } from '../../lib/api';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

interface ProjectItem {
  _id: string; slug: string; title: string; category: string; img: string;
  description: string; client: string; location: string; year: string;
  challenge: string; solution: string;
  specifications: { label: string; value: string }[];
  gallery: string[];
  isVisible: boolean; sortOrder: number;
}

const emptyProject: Omit<ProjectItem, '_id'> = {
  slug: '', title: '', category: '', img: '', description: '', client: '',
  location: '', year: '', challenge: '', solution: '',
  specifications: [{ label: '', value: '' }], gallery: [],
  isVisible: true, sortOrder: 0,
};

export default function ManageProjects() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ProjectItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchItems = async () => {
    try { const { data } = await api.get('/projects?all=true'); setItems(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing({ ...emptyProject, sortOrder: items.length }); setIsNew(true); setImageFile(null); setImagePreview(''); };
  const openEdit = (item: ProjectItem) => { setEditing({ ...item }); setIsNew(false); setImageFile(null); setImagePreview(item.img || ''); };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editing) return;
    for (const file of Array.from(files)) {
      try {
        const path = await uploadImage(file);
        setEditing(prev => ({ ...prev, gallery: [...(prev?.gallery || []), path] }));
      } catch (err) { console.error(err); }
    }
  };

  const removeGalleryItem = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, gallery: (editing.gallery || []).filter((_, i) => i !== idx) });
  };

  const handleSave = async () => {
    if (!editing) return;

    // Validation
    if (!editing.title?.trim()) { alert('Project Title is required'); return; }
    if (!editing.slug?.trim()) { alert('Slug is required'); return; }
    if (!editing.category?.trim()) { alert('Category is required'); return; }
    if (!editing.img && !imageFile) { alert('Main Image is required'); return; }

    setSaving(true);
    try {
      let imgPath = editing.img || '';
      if (imageFile) imgPath = await uploadImage(imageFile);
      const payload = { ...editing, img: imgPath };
      if (isNew) await api.post('/projects', payload);
      else await api.put(`/projects/${editing._id}`, payload);
      setEditing(null);
      fetchItems();
    } catch (err: any) { alert(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try { await api.delete(`/projects/${id}`); fetchItems(); } catch (err) { console.error(err); }
  };

  const toggleVisibility = async (item: ProjectItem) => {
    await api.put(`/projects/${item._id}`, { isVisible: !item.isVisible });
    fetchItems();
  };

  const updateSpec = (idx: number, key: 'label' | 'value', val: string) => {
    if (!editing) return;
    const specs = [...(editing.specifications || [])];
    specs[idx] = { ...specs[idx], [key]: val };
    setEditing({ ...editing, specifications: specs });
  };
  const addSpec = () => { if (editing) setEditing({ ...editing, specifications: [...(editing.specifications || []), { label: '', value: '' }] }); };
  const removeSpec = (idx: number) => { if (editing) setEditing({ ...editing, specifications: (editing.specifications || []).filter((_, i) => i !== idx) }); };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
          <p className="text-slate-500 text-sm">{items.length} total projects</p>
        </div>
        <button onClick={openNew} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90">
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left hidden md:table-cell">Category</th>
              <th className="p-4 text-left hidden lg:table-cell">Location</th>
              <th className="p-4 text-center">Visible</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {item.img && <img src={item.img} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                    <div>
                      <div className="font-semibold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.year} | {item.client}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-sm text-slate-500">{item.category}</td>
                <td className="p-4 hidden lg:table-cell text-sm text-slate-500">{item.location}</td>
                <td className="p-4 text-center">
                  <button onClick={() => toggleVisibility(item)}>
                    {item.isVisible ? <Eye size={16} className="text-green-500 mx-auto" /> : <EyeOff size={16} className="text-slate-300 mx-auto" />}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-slate-400">No projects yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-10">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold">{isNew ? 'Add Project' : 'Edit Project'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label><input value={editing.title||''} onChange={e=>setEditing({...editing,title:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug</label><input value={editing.slug||''} onChange={e=>setEditing({...editing,slug:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm font-mono focus:outline-none focus:border-accent" /></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label><input value={editing.category||''} onChange={e=>setEditing({...editing,category:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client</label><input value={editing.client||''} onChange={e=>setEditing({...editing,client:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label><input value={editing.location||''} onChange={e=>setEditing({...editing,location:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Year</label><input value={editing.year||''} onChange={e=>setEditing({...editing,year:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
              </div>
              <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label><textarea rows={3} value={editing.description||''} onChange={e=>setEditing({...editing,description:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Challenge</label><textarea rows={3} value={editing.challenge||''} onChange={e=>setEditing({...editing,challenge:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Solution</label><textarea rows={3} value={editing.solution||''} onChange={e=>setEditing({...editing,solution:e.target.value})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Main Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Specifications</label>
                {(editing.specifications||[]).map((s,i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input placeholder="Label" value={s.label} onChange={e=>updateSpec(i,'label',e.target.value)} className="w-1/3 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <input placeholder="Value" value={s.value} onChange={e=>updateSpec(i,'value',e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-accent" />
                    <button onClick={()=>removeSpec(i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                  </div>
                ))}
                <button onClick={addSpec} className="text-accent text-xs font-semibold flex items-center gap-1 mt-1"><Plus size={12}/> Add Spec</button>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Gallery Images</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="w-full text-sm mb-2" />
                <div className="flex flex-wrap gap-2">
                  {(editing.gallery||[]).map((g,i)=>(
                    <div key={i} className="relative group">
                      <img src={g} className="w-20 h-20 rounded-lg object-cover" alt="" />
                      <button onClick={()=>removeGalleryItem(i)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"><X size={10}/></button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sort Order</label><input type="number" value={editing.sortOrder||0} onChange={e=>setEditing({...editing,sortOrder:parseInt(e.target.value)||0})} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" /></div>
                <div className="flex items-end pb-1">
                  <div className="flex items-center gap-2"><input type="checkbox" id="pvis" checked={editing.isVisible!==false} onChange={e=>setEditing({...editing,isVisible:e.target.checked})} className="accent-accent" /><label htmlFor="pvis" className="text-sm font-medium text-slate-700">Visible on website</label></div>
                </div>
              </div>
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
