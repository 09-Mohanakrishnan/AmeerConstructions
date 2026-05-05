import React, { useEffect, useState } from 'react';
import api, { uploadImage } from '../../lib/api';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save, MessageSquareQuote, Image as ImageIcon } from 'lucide-react';

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  text: string;
  image: string;
  isVisible: boolean;
  sortOrder: number;
}

const emptyTestimonial: Omit<TestimonialItem, '_id'> = {
  name: '', role: '', text: '', image: '', isVisible: true, sortOrder: 0,
};

export default function ManageTestimonials() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<TestimonialItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchItems = async () => {
    try { const { data } = await api.get('/testimonials?all=true'); setItems(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { 
    setEditing({ ...emptyTestimonial, sortOrder: items.length }); 
    setIsNew(true); 
    setImageFile(null);
    setImagePreview('');
  };
  const openEdit = (item: TestimonialItem) => { 
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
    if (!editing.name?.trim()) { alert('Client Name is required'); return; }
    if (!editing.text?.trim()) { alert('Testimonial text is required'); return; }

    setSaving(true);
    try {
      let imagePath = editing.image || '';
      if (imageFile) {
        imagePath = await uploadImage(imageFile);
      }
      const payload = { ...editing, image: imagePath };
      if (isNew) await api.post('/testimonials', payload);
      else await api.put(`/testimonials/${editing._id}`, payload);
      setEditing(null); fetchItems();
    } catch (err: any) { alert(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}`); fetchItems(); } catch (err) { console.error(err); }
  };

  const toggleVisibility = async (item: TestimonialItem) => {
    await api.put(`/testimonials/${item._id}`, { isVisible: !item.isVisible }); fetchItems();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Testimonials</h2>
          <p className="text-slate-500 text-sm">{items.length} client testimonials — "What Clients Say" section</p>
        </div>
        <button onClick={openNew} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-start gap-4">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-accent shrink-0 overflow-hidden border border-slate-100 shadow-sm">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <MessageSquareQuote size={20} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-800">{item.name}</span>
                <span className="text-xs text-slate-400">• {item.role}</span>
              </div>
              <p className="text-sm text-slate-600 italic line-clamp-2">"{item.text}"</p>
              <div className="text-[10px] text-slate-400 mt-2">Order: {item.sortOrder}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => toggleVisibility(item)} className="p-2 rounded-lg hover:bg-slate-100">
                {item.isVisible ? <Eye size={14} className="text-green-500" /> : <EyeOff size={14} className="text-slate-300" />}
              </button>
              <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100">
            No testimonials yet. Click "Add Testimonial" to create one.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold">{isNew ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-3 text-center">Profile Picture</label>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-accent">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-slate-300" size={32} />
                      )}
                    </div>
                    <input
                      type="file"
                      id="cliimg"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="cliimg"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity"
                    >
                      <Plus size={20} />
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Click to upload client photo</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client Name</label>
                  <input value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" placeholder="Rajesh Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role / Title</label>
                  <input value={editing.role || ''} onChange={e => setEditing({ ...editing, role: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" placeholder="CEO, TechPark" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Testimonial</label>
                <textarea rows={4} value={editing.text || ''} onChange={e => setEditing({ ...editing, text: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" placeholder="What the client said about your work..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sort Order</label>
                  <input type="number" value={editing.sortOrder || 0} onChange={e => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
                <div className="flex items-end pb-1">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="tvis" checked={editing.isVisible !== false} onChange={e => setEditing({ ...editing, isVisible: e.target.checked })} className="accent-accent" />
                    <label htmlFor="tvis" className="text-sm font-medium text-slate-700">Visible on website</label>
                  </div>
                </div>
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
