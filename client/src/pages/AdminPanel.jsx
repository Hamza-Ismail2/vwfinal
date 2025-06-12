import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { label: 'Blog Management', value: 'blog' },
  { label: 'Project Management', value: 'project' }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('vw_admin');
    if (!stored) return navigate('/admin-login');
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'admin') return navigate('/admin-login');
    setUser(parsed);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-32 relative z-30">
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
        <div className="flex justify-center mb-8">
          {TABS.map(tab => (
            <button
              key={tab.value}
              className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none ${activeTab === tab.value ? 'bg-white text-orange-600 shadow-lg' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-b-xl p-8 text-gray-900 relative z-30" style={{backgroundColor:'#ffffff'}}>
          {activeTab === 'blog' ? <BlogManager /> : <ProjectManager />}
        </div>
      </div>
    </div>
  );
};

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', desc: '', img: null, type: 'Other', tags: '' });
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('vw_admin'));

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch blogs');
      setBlogs(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = e => {
    if (e.target.name === 'img') {
      const file = e.target.files[0];
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        setForm({ ...form, img: file });
      } else {
        alert('Only JPG or PNG images are allowed.');
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/blogs/${editing._id}` : '/api/blogs';
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('desc', form.desc);
      formData.append('type', form.type);
      formData.append('tags', form.tags);
      formData.append('role', user?.role || 'admin');
      if (form.img && typeof form.img !== 'string') {
        formData.append('img', form.img);
      }
      const res = await fetch(url, {
        method,
        headers: { 'x-user-role': user?.role || 'admin' },
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to save blog');
      setForm({ title: '', desc: '', img: null, type: 'Other', tags: '' });
      setEditing(null);
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = blog => {
    setEditing(blog);
    setForm({
      title: blog.title,
      desc: blog.desc,
      img: blog.img || null,
      type: blog.type,
      tags: blog.tags ? blog.tags.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-user-role': user?.role || 'admin' },
        body: JSON.stringify({ role: user?.role || 'admin' })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete blog');
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blogs</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-700 hover:shadow-lg transition z-20" onClick={() => { setEditing(null); setForm({ title: '', desc: '', img: null, type: 'Other', tags: '' }); setModalOpen(true); }}>+ New Blog</button>
      </div>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-600">{error}</div> : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white rounded-lg shadow z-10">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Tags</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id} className="border-b hover:bg-orange-50 transition">
                  <td className="py-2 px-4 font-semibold">{blog.title}</td>
                  <td className="py-2 px-4">{blog.type}</td>
                  <td className="py-2 px-4">
                    {blog.tags && blog.tags.map((tag, i) => (
                      <span key={i} className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs mr-1 mb-1">{tag}</span>
                    ))}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="inline-block px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition z-20" onClick={() => handleEdit(blog)}>Edit</button>
                    <button className="inline-block px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 transition z-20" onClick={() => handleDelete(blog._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-xl p-8 w-full max-w-lg relative z-50 shadow-2xl custom-scrollbar" style={{maxHeight:'90vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-2xl z-50" onClick={() => setModalOpen(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4">{editing ? 'Edit Blog' : 'New Blog'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                  <option value="Helicopter Services">Helicopter Services</option>
                  <option value="Industry News">Industry News</option>
                  <option value="Company Updates">Company Updates</option>
                  <option value="Safety Tips">Safety Tips</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Description (HTML allowed)" className="w-full px-3 py-2 border rounded-lg" rows={4} required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Image (JPG or PNG)</label>
                <input type="file" name="img" accept="image/jpeg,image/png" onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required={!editing} />
                {form.img && typeof form.img === 'string' && (
                  <img src={form.img} alt="Blog" className="mt-2 rounded shadow max-h-32" />
                )}
                {form.img && typeof form.img !== 'string' && (
                  <img src={URL.createObjectURL(form.img)} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Tags</label>
                <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 z-20 shadow">{editing ? 'Update' : 'Create'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', category: 'Other', description: '', challenges: '', solutions: '', outcomes: '' });
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('vw_admin'));

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch projects');
      setProjects(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/projects/${editing._id}` : '/api/projects';
      const payload = {
        ...form,
        challenges: form.challenges.split(',').map(t => t.trim()),
        solutions: form.solutions.split(',').map(t => t.trim()),
        outcomes: form.outcomes.split(',').map(t => t.trim()),
        role: user?.role || 'admin'
      };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-user-role': user?.role || 'admin' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to save project');
      setForm({ title: '', category: 'Other', description: '', challenges: '', solutions: '', outcomes: '' });
      setEditing(null);
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = project => {
    setEditing(project);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      challenges: project.challenges ? project.challenges.join(', ') : '',
      solutions: project.solutions ? project.solutions.join(', ') : '',
      outcomes: project.outcomes ? project.outcomes.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-user-role': user?.role || 'admin' },
        body: JSON.stringify({ role: user?.role || 'admin' })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete project');
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-700 hover:shadow-lg transition z-20" onClick={() => { setEditing(null); setForm({ title: '', category: 'Other', description: '', challenges: '', solutions: '', outcomes: '' }); setModalOpen(true); }}>+ New Project</button>
      </div>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-600">{error}</div> : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white rounded-lg shadow z-10">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-b hover:bg-orange-50 transition">
                  <td className="py-2 px-4 font-semibold">{project.title}</td>
                  <td className="py-2 px-4">{project.category}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="inline-block px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition z-20" onClick={() => handleEdit(project)}>Edit</button>
                    <button className="inline-block px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 transition z-20" onClick={() => handleDelete(project._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-xl p-8 w-full max-w-lg relative z-50 shadow-2xl custom-scrollbar" style={{maxHeight:'90vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-2xl z-50" onClick={() => setModalOpen(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4">{editing ? 'Edit Project' : 'New Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
                  <option value="Construction Support">Construction Support</option>
                  <option value="Science & Research">Science & Research</option>
                  <option value="Aerial Cinematography">Aerial Cinematography</option>
                  <option value="Emergency Services">Emergency Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-3 py-2 border rounded-lg" rows={3} required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Challenges</label>
                <input name="challenges" value={form.challenges} onChange={handleChange} placeholder="Challenges (comma separated)" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Solutions</label>
                <input name="solutions" value={form.solutions} onChange={handleChange} placeholder="Solutions (comma separated)" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Outcomes</label>
                <input name="outcomes" value={form.outcomes} onChange={handleChange} placeholder="Outcomes (comma separated)" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 z-20 shadow">{editing ? 'Update' : 'Create'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Add custom scrollbar styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
      background: #f3f4f6;
      border-radius: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #fb923c;
      border-radius: 8px;
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #fb923c #f3f4f6;
    }
  `;
  document.head.appendChild(style);
}

export default AdminPanel; 