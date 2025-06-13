import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import ReactDOM from 'react-dom';

const TABS = [
  { label: 'Blog Management', value: 'blog' },
    { label: 'Project Management', value: 'project' },
  { label: 'Salesforce Analytics', value: 'salesforce' },
  { label: 'Contact Submissions', value: 'contacts' },
];

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring', stiffness: 60 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Dummy Salesforce data
const dummySalesforceData = {
  totalLeads: 120,
  closedDeals: 45,
  revenue: 125000,
  pipeline: 32000,
  monthly: [
    { month: 'Jan', value: 8000 },
    { month: 'Feb', value: 12000 },
    { month: 'Mar', value: 15000 },
    { month: 'Apr', value: 11000 },
    { month: 'May', value: 17000 },
    { month: 'Jun', value: 21000 },
  ],
};

// Animated number component
const AnimatedNumber = ({ value, duration = 0.7, className = '', prefix = '' }) => {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    let frame;
    let start;
    const from = display;
    const to = value;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setDisplay(Math.floor(from + (to - from) * progress));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setDisplay(to);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line
  }, [value]);
  return <span className={className}>{prefix}{display.toLocaleString()}</span>;
};

// Utility for input sanitization
const sanitizeInput = (value, type = 'text') => {
  if (typeof value !== 'string') return '';
  let v = value.trim();
  if (type === 'email') {
    v = v.replace(/[^a-zA-Z0-9@._+-]/g, '');
  } else if (type === 'phone') {
    v = v.replace(/[^0-9+()\-\s]/g, '');
  } else if (type === 'number') {
    v = v.replace(/[^0-9]/g, '');
  } else {
    v = v.replace(/[<>]/g, '');
  }
  return v;
};

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#ff5a1f] relative overflow-x-hidden">
      {/* Glassmorphism Main Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
        className="w-full max-w-5xl mx-auto my-4 sm:my-8 px-2 sm:px-8 py-4 sm:py-8 rounded-3xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30 relative z-10 overflow-x-auto"
        style={{ minHeight: '70vh', maxHeight: '95vh', overflowY: 'auto' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center sm:text-left text-orange-500 drop-shadow mb-2 sm:mb-0">Admin Panel</h1>
          <div className="flex flex-wrap justify-center gap-2">
            {TABS.map(tab => (
              <motion.button
                key={tab.value}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 focus:outline-none shadow-md text-base sm:text-lg ${activeTab === tab.value ? 'bg-white text-orange-600 shadow-lg' : 'bg-gray-800/80 text-white hover:bg-orange-600/80'}`}
                onClick={() => setActiveTab(tab.value)}
                aria-selected={activeTab === tab.value}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
        {/* Animated Tab Content */}
        <div className="relative min-h-[400px] w-full">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === 'blog' ? (
              <motion.div
                key="blog"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full left-0 top-0"
              >
                <BlogManager />
              </motion.div>
            ) : activeTab === 'project' ? (
              <motion.div
                key="project"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full left-0 top-0"
              >
                <ProjectManager />
              </motion.div>
            ) : activeTab === 'salesforce' ? (
              <motion.div
                key="salesforce"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full left-0 top-0"
              >
                <SalesforceAnalytics />
              </motion.div>
            ) : (
              <motion.div
                key="contacts"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute w-full left-0 top-0"
              >
                <ContactSubmissions />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
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
    const { name, value, type } = e.target;
    let sanitized = value;
    if (name === 'title' || name === 'desc' || name === 'type' || name === 'tags') sanitized = sanitizeInput(value, 'text');
    else sanitized = value;
    setForm({ ...form, [name]: sanitized });
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
        <h2 className="text-2xl font-bold text-orange-500">Blogs</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-700 hover:shadow-lg transition z-20" onClick={() => { setEditing(null); setForm({ title: '', desc: '', img: null, type: 'Other', tags: '' }); setModalOpen(true); }}>+ New Blog</button>
      </div>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-600">{error}</div> : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-black/70">
          <table className="min-w-full bg-black/70 rounded-lg shadow z-10 text-white">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Tags</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id} className="border-b border-orange-900/40 hover:bg-orange-900/20 transition">
                  <td className="py-2 px-4 font-semibold">{blog.title}</td>
                  <td className="py-2 px-4">{blog.type}</td>
                  <td className="py-2 px-4">
                    {blog.tags && blog.tags.map((tag, i) => (
                      <span key={i} className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs mr-1 mb-1">{tag}</span>
                    ))}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition z-20 w-full sm:w-auto" onClick={() => handleEdit(blog)}>Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 transition z-20 w-full sm:w-auto" onClick={() => handleDelete(blog._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-black/90 rounded-2xl p-8 w-full max-w-lg relative z-50 shadow-2xl custom-scrollbar border border-orange-600" style={{maxHeight:'90vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 text-2xl z-50" onClick={() => setModalOpen(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4 text-orange-500">{editing ? 'Edit Blog' : 'New Blog'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" required />
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700">
                  <option value="Helicopter Services">Helicopter Services</option>
                  <option value="Industry News">Industry News</option>
                  <option value="Company Updates">Company Updates</option>
                  <option value="Safety Tips">Safety Tips</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Description</label>
                <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Description (HTML allowed)" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" rows={4} required />
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Image (JPG or PNG)</label>
                <input type="file" name="img" accept="image/jpeg,image/png" onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700" required={!editing} />
                {form.img && typeof form.img === 'string' && (
                  <img src={form.img} alt="Blog" className="mt-2 rounded shadow max-h-32" />
                )}
                {form.img && typeof form.img !== 'string' && (
                  <img src={URL.createObjectURL(form.img)} alt="Preview" className="mt-2 rounded shadow max-h-32" />
                )}
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Tags</label>
                <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" />
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

  const handleChangeProject = e => {
    const { name, value, type } = e.target;
    let sanitized = value;
    if (['title', 'category', 'description', 'challenges', 'solutions', 'outcomes'].includes(name)) sanitized = sanitizeInput(value, 'text');
    else sanitized = value;
    setForm({ ...form, [name]: sanitized });
  };

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
        <h2 className="text-2xl font-bold text-orange-500">Projects</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-orange-700 hover:shadow-lg transition z-20" onClick={() => { setEditing(null); setForm({ title: '', category: 'Other', description: '', challenges: '', solutions: '', outcomes: '' }); setModalOpen(true); }}>+ New Project</button>
      </div>
      {loading ? <div>Loading...</div> : error ? <div className="text-red-600">{error}</div> : (
        <div className="overflow-x-auto rounded-xl shadow-lg bg-black/70">
          <table className="min-w-full bg-black/70 rounded-lg shadow z-10 text-white">
            <thead>
              <tr className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-b border-orange-900/40 hover:bg-orange-900/20 transition">
                  <td className="py-2 px-4 font-semibold">{project.title}</td>
                  <td className="py-2 px-4">{project.category}</td>
                  <td className="py-2 px-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition z-20 w-full sm:w-auto" onClick={() => handleEdit(project)}>Edit</button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 transition z-20 w-full sm:w-auto" onClick={() => handleDelete(project._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-black/90 rounded-2xl p-8 w-full max-w-lg relative z-50 shadow-2xl custom-scrollbar border border-orange-600" style={{maxHeight:'90vh', overflowY:'auto'}} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 text-2xl z-50" onClick={() => setModalOpen(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-4 text-orange-500">{editing ? 'Edit Project' : 'New Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Title</label>
                <input name="title" value={form.title} onChange={handleChangeProject} placeholder="Title" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" required />
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChangeProject} className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700">
                  <option value="Construction Support">Construction Support</option>
                  <option value="Science & Research">Science & Research</option>
                  <option value="Aerial Cinematography">Aerial Cinematography</option>
                  <option value="Emergency Services">Emergency Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChangeProject} placeholder="Description" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" rows={3} required />
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Challenges</label>
                <input name="challenges" value={form.challenges} onChange={handleChangeProject} placeholder="Challenges (comma separated)" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Solutions</label>
                <input name="solutions" value={form.solutions} onChange={handleChangeProject} placeholder="Solutions (comma separated)" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-orange-200 font-semibold mb-1">Outcomes</label>
                <input name="outcomes" value={form.outcomes} onChange={handleChangeProject} placeholder="Outcomes (comma separated)" className="w-full px-3 py-2 border rounded-lg bg-black/60 text-white border-orange-700 placeholder-orange-300" />
              </div>
              <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 z-20 shadow">{editing ? 'Update' : 'Create'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Salesforce Analytics Tab
const SalesforceAnalytics = () => {
  // Uncomment and use this code when Salesforce API access is available
  // const [sfData, setSfData] = useState(null);
  // useEffect(() => {
  //   fetch('/api/salesforce/analytics')
  //     .then(res => res.json())
  //     .then(data => setSfData(data));
  // }, []);
  // For now, use dummy data
  const sfData = dummySalesforceData;
  const maxY = Math.max(...sfData.monthly.map(m => m.value));
  const yTicks = 4;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => Math.round((maxY / yTicks) * (yTicks - i)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full flex flex-col gap-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-black/70 rounded-xl p-4 flex flex-col items-center border border-orange-700 shadow-md">
          <span className="text-orange-400 text-lg font-semibold">Leads</span>
          <span className="text-2xl font-bold text-white">
            <AnimatedNumber value={sfData.totalLeads} />
          </span>
        </div>
        <div className="bg-black/70 rounded-xl p-4 flex flex-col items-center border border-orange-700 shadow-md">
          <span className="text-orange-400 text-lg font-semibold">Closed Deals</span>
          <span className="text-2xl font-bold text-white">
            <AnimatedNumber value={sfData.closedDeals} />
          </span>
        </div>
        <div className="bg-black/70 rounded-xl p-4 flex flex-col items-center border border-orange-700 shadow-md">
          <span className="text-orange-400 text-lg font-semibold">Revenue</span>
          <span className="text-2xl font-bold text-white">
            <AnimatedNumber value={sfData.revenue} prefix="$" />
          </span>
        </div>
        <div className="bg-black/70 rounded-xl p-4 flex flex-col items-center border border-orange-700 shadow-md">
          <span className="text-orange-400 text-lg font-semibold">Pipeline</span>
          <span className="text-2xl font-bold text-white">
            <AnimatedNumber value={sfData.pipeline} prefix="$" />
          </span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 60 }}
        className="bg-black/70 rounded-xl p-6 border border-orange-700 shadow-lg"
      >
        <h3 className="text-lg font-bold text-orange-400 mb-4">Monthly Revenue</h3>
        {/* Modern animated bar graph with Y-axis */}
        <div className="flex w-full">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between h-40 mr-2">
            {yLabels.map((label, i) => (
              <span key={i} className="text-xs text-orange-300 font-mono" style={{ minHeight: '10px' }}>
                ${label.toLocaleString()}
              </span>
            ))}
          </div>
          {/* Bars */}
          <div className="flex items-end gap-3 h-40 w-full">
            {sfData.monthly.map((m, i) => (
              <motion.div
                key={m.month}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, type: 'spring', stiffness: 80 }}
                className="flex flex-col items-center w-8"
                style={{ originY: 1 }}
              >
                <div
                  className="bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-xl shadow-lg"
                  style={{ height: `${m.value / 250}px`, minHeight: '10px', width: '100%' }}
                  title={`$${m.value.toLocaleString()}`}
                ></div>
                <span className="text-xs text-orange-200 mt-1">{m.month}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="text-xs text-gray-400 mt-4">
        {/*
        // Example fetch for real Salesforce data:
        // fetch('/api/salesforce/analytics')
        //   .then(res => res.json())
        //   .then(data => setSfData(data));
        */}
        <span>Salesforce data is currently using dummy values. Live integration coming soon.</span>
      </div>
    </motion.div>
  );
};

// Utility for CSV export
function exportToCSV(data, filename = 'contact_submissions.csv') {
  const replacer = (key, value) => (value === null ? '' : value);
  const header = Object.keys(data[0] || {});
  const csv = [
    header.join(','),
    ...data.map(row =>
      header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
    ),
  ].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const statusOptions = ['pending', 'in-progress', 'completed'];
const allowedServices = ["Aircraft Maintenance", "Helicopter Services", "Training", "Other"];

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewContact, setViewContact] = useState(null);
  const [deleteContact, setDeleteContact] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Analytics
  const statusCounts = contacts.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});
  const serviceCounts = contacts.reduce((acc, c) => {
    acc[c.service] = (acc[c.service] || 0) + 1;
    return acc;
  }, {});
  const trendData = contacts.reduce((acc, c) => {
    const date = new Date(c.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(data.data);
        else setError('Failed to fetch contact submissions');
      })
      .catch(() => setError('Failed to fetch contact submissions'))
      .finally(() => setLoading(false));
  };

  const handleMarkRead = (id, read) => {
    fetch(`/api/contact/${id}/read`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: !read })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(contacts => contacts.map(c => c._id === id ? { ...c, read: data.data.read } : c));
      });
  };

  const handleStatusChange = (id, status) => {
    fetch(`/api/contact/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(contacts => contacts.map(c => c._id === id ? { ...c, status: data.data.status } : c));
      });
  };

  const handleDelete = (id) => {
    setDeleting(true);
    fetch(`/api/contact/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) setContacts(contacts => contacts.filter(c => c._id !== id));
        setDeleteContact(null);
      })
      .finally(() => setDeleting(false));
  };

  // --- UI ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full font-adminpanel"
    >
      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 items-end px-2 md:px-0">
        {statusOptions.map(status => (
          <div key={status} className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-xl p-4 flex flex-col items-center shadow border border-orange-700">
            <span className="text-white text-lg font-semibold capitalize tracking-wide">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            <AnimatedNumber value={statusCounts[status] || 0} className="text-4xl font-extrabold text-white drop-shadow-lg" />
          </div>
        ))}
        <div className="flex justify-center items-center h-full">
          <motion.button
            onClick={() => exportToCSV(contacts)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white font-extrabold text-lg shadow-2xl backdrop-blur-lg border-2 border-white/30 hover:scale-105 hover:shadow-orange-400/40 transition-all duration-300 flex items-center gap-2"
            style={{ boxShadow: '0 8px 32px 0 rgba(255,90,31,0.25)' }}
            title="Export all contact submissions to CSV"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Export CSV
          </motion.button>
        </div>
      </div>
      {/* Trends and Top Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 px-2 md:px-0">
        {/* Trends */}
        <div className="bg-black/70 rounded-xl p-6 border border-orange-700 shadow-lg relative flex flex-col items-stretch min-h-[220px]">
          <h4 className="text-orange-400 font-bold mb-2 tracking-wide">Submission Trends</h4>
          {/* Y-axis label */}
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-orange-300 font-semibold rotate-[-90deg] origin-bottom whitespace-nowrap hidden sm:block">Submissions</span>
          <div className="flex items-end gap-2 h-32 relative w-full pt-2 pb-6 md:pb-8">
            {/* X-axis label */}
            {Object.entries(trendData).map(([date, count], i) => (
              <div key={date} className="flex flex-col items-center w-8">
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.05, duration: 0.5, type: 'spring', stiffness: 80 }}
                  className="bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-xl shadow-lg" style={{ height: `${count * 18}px`, minHeight: '10px', width: '100%' }} title={`${count} on ${date}`}></motion.div>
                <span className="text-xs text-orange-200 mt-1 font-semibold">{date.split('/').slice(0,2).join('/')}</span>
              </div>
            ))}
            {/* X-axis label (centered below bars) */}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 text-xs text-orange-300 font-semibold whitespace-nowrap">Date</span>
          </div>
          {/* Y-axis label for mobile (top left) */}
          <span className="block sm:hidden absolute top-2 left-4 text-xs text-orange-300 font-semibold">Submissions</span>
        </div>
        {/* Top Services */}
        <div className="bg-black/70 rounded-xl p-6 border border-orange-700 shadow-lg relative flex flex-col items-stretch min-h-[220px]">
          <h4 className="text-orange-400 font-bold mb-2 tracking-wide">Top Services</h4>
          {/* Y-axis label */}
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-orange-300 font-semibold rotate-[-90deg] origin-bottom whitespace-nowrap hidden sm:block">Count</span>
          <div className="flex items-end gap-2 h-32 relative w-full pt-2 pb-6 md:pb-8">
            {Object.entries(serviceCounts).map(([service, count], i) => (
              <div key={service} className="flex flex-col items-center w-8">
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.05, duration: 0.5, type: 'spring', stiffness: 80 }}
                  className="bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-xl shadow-lg" style={{ height: `${count * 18}px`, minHeight: '10px', width: '100%' }} title={`${count} for ${service}`}></motion.div>
                <span className="text-xs text-orange-200 mt-1 font-semibold">{service.slice(0, 8)}</span>
              </div>
            ))}
            {/* X-axis label (centered below bars) */}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 text-xs text-orange-300 font-semibold whitespace-nowrap">Service</span>
          </div>
          {/* Y-axis label for mobile (top left) */}
          <span className="block sm:hidden absolute top-2 left-4 text-xs text-orange-300 font-semibold">Count</span>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-black/70 custom-scrollbar-orange border border-orange-700 px-2 md:px-0 pb-4 md:pb-0">
        <table className="min-w-full bg-black/70 rounded-lg shadow z-10 text-white">
          <thead>
            <tr className="bg-gradient-to-r from-orange-600 to-orange-400 text-white">
              <th className="py-3 px-4 font-semibold">Read</th>
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Phone</th>
              <th className="py-3 px-4 font-semibold">Service</th>
              <th className="py-3 px-4 font-semibold">Message</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} className="text-center py-8 text-orange-300">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={9} className="text-center py-8 text-red-400">{error}</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td colSpan={9} className="text-center py-8 text-orange-300">No submissions found.</td></tr>
            ) : contacts.map(contact => (
              <tr key={contact._id} className={`border-b border-orange-900/40 hover:bg-orange-900/20 transition ${!contact.read ? 'font-bold' : 'opacity-80'}`}> 
                <td className="py-2 px-4 text-center">
                  <button onClick={() => handleMarkRead(contact._id, contact.read)} title={contact.read ? 'Mark as unread' : 'Mark as read'} className="focus:outline-none">
                    {contact.read ? (
                      <span className="inline-block w-3 h-3 rounded-full bg-orange-400 opacity-60"></span>
                    ) : (
                      <span className="inline-block w-3 h-3 rounded-full bg-orange-500 ring-2 ring-orange-300 animate-pulse"></span>
                    )}
                  </button>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">{contact.name}</td>
                <td className="py-2 px-4 whitespace-nowrap">{contact.email}</td>
                <td className="py-2 px-4 whitespace-nowrap">{contact.phone}</td>
                <td className="py-2 px-4 whitespace-nowrap">{contact.service}</td>
                <td className="py-2 px-4 max-w-xs truncate" title={contact.message}>{contact.message}</td>
                <td className="py-2 px-4 whitespace-nowrap capitalize">
                  <select value={contact.status} onChange={e => handleStatusChange(contact._id, e.target.value)} className="bg-black/70 border border-orange-700 rounded px-2 py-1 text-orange-300 focus:ring-2 focus:ring-orange-500 capitalize">
                    {statusOptions.map(opt => <option key={opt} value={opt} className="capitalize">{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                  </select>
                </td>
                <td className="py-2 px-4 whitespace-nowrap">{new Date(contact.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4 flex gap-2 items-center">
                  <button onClick={() => setViewContact(contact)} title="View details" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow focus:outline-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                  <a href={`mailto:${contact.email}`} title="Reply" className="bg-orange-400 hover:bg-orange-500 text-white rounded-full p-2 shadow focus:outline-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" /></svg>
                  </a>
                  <button onClick={() => setDeleteContact(contact)} title="Delete" className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow focus:outline-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Modal */}
      <AnimatePresence>
        {viewContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-lg w-full border-2 border-orange-400">
              <h4 className="text-2xl font-bold text-orange-600 mb-4">Contact Details</h4>
              <div className="space-y-2 text-gray-800">
                <div><span className="font-semibold">Name:</span> {viewContact.name}</div>
                <div><span className="font-semibold">Email:</span> {viewContact.email}</div>
                <div><span className="font-semibold">Phone:</span> {viewContact.phone}</div>
                <div><span className="font-semibold">Service:</span> {viewContact.service}</div>
                <div><span className="font-semibold">Status:</span> {viewContact.status}</div>
                <div><span className="font-semibold">Read:</span> {viewContact.read ? 'Yes' : 'No'}</div>
                <div><span className="font-semibold">Date:</span> {new Date(viewContact.createdAt).toLocaleString()}</div>
                <div><span className="font-semibold">Message:</span><br /><span className="whitespace-pre-line text-gray-700">{viewContact.message}</span></div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button onClick={() => setViewContact(null)} className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full border-2 border-red-500">
              <h4 className="text-2xl font-bold text-red-600 mb-4">Delete Submission?</h4>
              <p className="text-gray-800 mb-6">Are you sure you want to delete this contact submission? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setDeleteContact(null)} className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Cancel</button>
                <button onClick={() => handleDelete(deleteContact._id)} disabled={deleting} className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Custom scrollbar styles for admin-panel and admin-login
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 10px;
      background: #18181b;
      border-radius: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #ff5a1f, #0f172a);
      border-radius: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #ff5a1f, #18181b);
    }
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #ff5a1f #18181b;
    }
  `;
  document.head.appendChild(style);
}

export default AdminPanel; 