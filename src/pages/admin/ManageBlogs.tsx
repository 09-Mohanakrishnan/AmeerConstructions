import React, { useEffect, useState, useRef } from 'react';
import api, { uploadImage } from '../../lib/api';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';

interface BlogItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  tags: string[];
  isVisible: boolean;
  sortOrder: number;
}

const emptyBlog: Omit<BlogItem, '_id'> = {
  slug: '', title: '', excerpt: '', content: '', date: '', author: '',
  image: '', category: '', tags: [], isVisible: true, sortOrder: 0,
};

export default function ManageBlogs() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/blogs?all=true');
      setItems(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => {
    setEditing({ ...emptyBlog, sortOrder: items.length });
    setIsNew(true);
    setImageFile(null);
    setImagePreview('');
    setTagsInput('');
  };

  const openEdit = (item: BlogItem) => {
    setEditing({ ...item });
    setIsNew(false);
    setImageFile(null);
    setImagePreview(item.image || '');
    setTagsInput((item.tags || []).join(', '));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove special chars
      .replace(/[\s_-]+/g, '-') // replace spaces/underscores with hyphens
      .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
  };

  const handleTitleChange = (title: string) => {
    if (!editing) return;
    const newSlug = isNew ? generateSlug(title) : editing.slug;
    setEditing({ ...editing, title, slug: newSlug });
  };

  const handleSave = async () => {
    if (!editing) return;
    
    // Validation
    if (!editing.title?.trim()) { alert('Title is required'); return; }
    if (!editing.slug?.trim()) { alert('Slug is required'); return; }
    if (!editing.content?.trim()) { alert('Content is required'); return; }
    if (!editing.image && !imageFile) { alert('Image is required'); return; }

    setSaving(true);
    try {
      let imagePath = editing.image || '';
      if (imageFile) imagePath = await uploadImage(imageFile);
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      const payload = { ...editing, image: imagePath, tags };
      if (isNew) await api.post('/blogs', payload);
      else await api.put(`/blogs/${editing._id}`, payload);
      setEditing(null);
      fetchItems();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try { await api.delete(`/blogs/${id}`); fetchItems(); }
    catch (err) { console.error(err); }
  };

  const toggleVisibility = async (item: BlogItem) => {
    await api.put(`/blogs/${item._id}`, { isVisible: !item.isVisible });
    fetchItems();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Blogs</h2>
          <p className="text-slate-500 text-sm">{items.length} total blog posts</p>
        </div>
        <button onClick={openNew} className="bg-accent text-primary px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent/90">
          <Plus size={16} /> Add Blog
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="p-4 text-left">Blog Post</th>
              <th className="p-4 text-left hidden md:table-cell">Category</th>
              <th className="p-4 text-left hidden lg:table-cell">Author</th>
              <th className="p-4 text-center">Visible</th>
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
                      <div className="text-xs text-slate-400 mt-0.5">{item.date}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-sm text-slate-500">{item.category}</td>
                <td className="p-4 hidden lg:table-cell text-sm text-slate-500">{item.author}</td>
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
            {items.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-400">No blogs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-4 pt-10">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold">{isNew ? 'Add Blog Post' : 'Edit Blog Post'}</h3>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                  <input value={editing.title || ''} onChange={e => handleTitleChange(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Slug</label>
                  <input value={editing.slug || ''} onChange={e => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm font-mono focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Author</label>
                  <input value={editing.author || ''} onChange={e => setEditing({ ...editing, author: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                  <input value={editing.date || ''} onChange={e => setEditing({ ...editing, date: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" placeholder="March 15, 2026" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                  <input value={editing.category || ''} onChange={e => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Excerpt</label>
                <textarea rows={2} value={editing.excerpt || ''} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Content (HTML)</label>
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={() => {
                    if (editorRef.current) {
                      setEditing(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }));
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: editing.content || '' }}
                  className="w-full px-3 py-2.5 border rounded-xl text-sm min-h-[200px] focus:outline-none focus:border-accent prose prose-sm max-w-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">Rich text editor — format text directly. Supports HTML.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tags (comma-separated)</label>
                <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" placeholder="Green Building, Eco-Friendly, Future Tech" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sort Order</label>
                  <input type="number" value={editing.sortOrder || 0} onChange={e => setEditing({ ...editing, sortOrder: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-accent" />
                </div>
                <div className="flex items-end pb-1">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="blogvis" checked={editing.isVisible !== false} onChange={e => setEditing({ ...editing, isVisible: e.target.checked })} className="accent-accent" />
                    <label htmlFor="blogvis" className="text-sm font-medium text-slate-700">Visible on website</label>
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
