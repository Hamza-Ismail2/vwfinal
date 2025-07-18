import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ProjectManager from '../components/admin/ProjectManager';
import GalleryManager from '../components/admin/GalleryManager';
import SalesforceAnalytics from '../components/admin/SalesforceAnalytics';
import ContactManager from '../components/admin/ContactManager';
import QuoteManager from '../components/admin/QuoteManager';
import EventFeed from '../components/admin/EventFeed';
import {
  ChartBarIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { getAdminHeaders } from '../utils/authHeaders';

// Modern sidebar navigation items with sophisticated icons
const NAVIGATION_ITEMS = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: ChartBarIcon,
    description: 'Overview & Analytics'
  },
  { 
    id: 'blog', 
    label: 'Blog Posts', 
    icon: DocumentTextIcon,
    description: 'Content Management'
  },
  { 
    id: 'project', 
    label: 'Projects', 
    icon: RocketLaunchIcon,
    description: 'Project Portfolio'
  },
  { 
    id: 'contacts', 
    label: 'Contacts', 
    icon: EnvelopeIcon,
    description: 'Customer Inquiries'
  },
  { 
    id: 'quotes', 
    label: 'Quotes', 
    icon: CurrencyDollarIcon,
    description: 'Quote Requests'
  },
  { 
    id: 'gallery', 
    label: 'Gallery', 
    icon: PhotoIcon,
    description: 'Image Management'
  },
  { 
    id: 'salesforce', 
    label: 'Salesforce Analytics', 
    icon: ChartBarIcon,
    description: 'Sales & Analytics'
  },
];

// Animation variants
const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const tabVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring', stiffness: 60 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Animated number component
const AnimatedNumber = ({ value, duration = 0.7, className = '', prefix = '' }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame;
    let start;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setDisplay(value);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);
  return <span className={className}>{prefix}{display.toLocaleString()}</span>;
};

// Utility for input sanitization
const sanitizeInput = (value, type = 'text') => {
  if (typeof value !== 'string') return '';
  let v = value;
  if (type === 'email') {
    v = v.replace(/[^a-zA-Z0-9@._+-]/g, '');
  } else if (type === 'phone') {
    v = v.replace(/[^0-9+()\-\s]/g, '');
  } else if (type === 'number') {
    v = v.replace(/[^0-9]/g, '');
  } else {
    // Only remove potentially harmful characters, keep spaces and normal text
    v = v.replace(/[<>]/g, '');
  }
  return v;
};

// Modern Dashboard Component
const Dashboard = ({ setActiveSection }) => {
  const [stats, setStats] = useState({
    blogs: { count: 0, change: 0 },
    projects: { count: 0, change: 0 },
    contacts: { count: 0, change: 0 },
    quotes: { count: 0, change: 0 },
    images: { count: 0, change: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState(null);
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  const fetchStats = async (forceRefresh = false) => {
    // Check cache first
    const now = Date.now();
    if (!forceRefresh && lastFetch && (now - lastFetch) < CACHE_DURATION) {
      console.log('Using cached dashboard data');
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching fresh dashboard data');
      // Fetch data from all endpoints in parallel
      const [blogsRes, projectsRes, contactsRes, quotesRes, imagesRes] = await Promise.all([
        fetch('/api/blogs').catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch('/api/projects').catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch('/api/contacts').catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch('/api/quotes').catch(() => ({ json: () => ({ success: false, data: [] }) })),
        fetch('/api/images').catch(() => ({ json: () => ({ success: false, data: [] }) }))
      ]);

      const [blogsData, projectsData, contactsData, quotesData, imagesData] = await Promise.all([
        blogsRes.json(),
        projectsRes.json(),
        contactsRes.json(),
        quotesRes.json(),
        imagesRes.json()
      ]);

      // Calculate stats with simulated growth percentages
      setStats({
        blogs: { 
          count: blogsData.success ? (blogsData.data?.length || 0) : 0, 
          change: Math.floor(Math.random() * 20) + 5 
        },
        projects: { 
          count: projectsData.success ? (projectsData.data?.length || 0) : 0, 
          change: Math.floor(Math.random() * 15) + 3 
        },
        contacts: { 
          count: contactsData.success ? (contactsData.data?.length || 0) : 0, 
          change: Math.floor(Math.random() * 25) + 8 
        },
        quotes: { 
          count: quotesData.success ? (quotesData.data?.length || 0) : 0, 
          change: Math.floor(Math.random() * 18) + 6 
        },
        images: { 
          count: imagesData.success ? (imagesData.data?.length || 0) : 0, 
          change: Math.floor(Math.random() * 12) + 2 
        }
      });
      
      // Update cache timestamp
      setLastFetch(Date.now());
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set default values on error
      setStats({
        blogs: { count: 0, change: 0 },
        projects: { count: 0, change: 0 },
        contacts: { count: 0, change: 0 },
        quotes: { count: 0, change: 0 },
        images: { count: 0, change: 0 }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 10 minutes (reduced frequency)
    const interval = setInterval(() => fetchStats(true), 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    { title: 'Blog Posts', value: stats.blogs.count, change: stats.blogs.change, icon: DocumentTextIcon, color: 'from-blue-500 to-blue-600' },
    { title: 'Projects', value: stats.projects.count, change: stats.projects.change, icon: RocketLaunchIcon, color: 'from-green-500 to-green-600' },
    { title: 'Contacts', value: stats.contacts.count, change: stats.contacts.change, icon: EnvelopeIcon, color: 'from-purple-500 to-purple-600' },
    { title: 'Quotes', value: stats.quotes.count, change: stats.quotes.change, icon: CurrencyDollarIcon, color: 'from-orange-500 to-orange-600' },
    { title: 'Gallery Images', value: stats.images.count, change: stats.images.change, icon: PhotoIcon, color: 'from-pink-500 to-pink-600' }
  ];

  const quickActions = [
    { title: 'New Blog Post', description: 'Create a new blog article', icon: DocumentTextIcon, action: () => setActiveSection('blog'), color: 'from-blue-500 to-blue-600' },
    { title: 'Add Project', description: 'Add a new project showcase', icon: RocketLaunchIcon, action: () => setActiveSection('project'), color: 'from-green-500 to-green-600' },
    { title: 'Upload Images', description: 'Add images to gallery', icon: PhotoIcon, action: () => setActiveSection('gallery'), color: 'from-purple-500 to-purple-600' },
    { title: 'View Analytics', description: 'Check sales performance', icon: ChartBarIcon, action: () => setActiveSection('salesforce'), color: 'from-orange-500 to-orange-600' }
  ];

  return (
      <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Admin!</h1>
            <p className="text-slate-300 text-lg">Here's what's happening with your helicopter services business today.</p>
            {lastFetch && (
              <p className="text-slate-400 text-sm mt-2">
                Last updated: {new Date(lastFetch).toLocaleTimeString()}
              </p>
            )}
          </div>
              <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchStats(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            disabled={loading}
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </motion.button>
          </div>
        </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {statsCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 text-sm font-medium">+{card.change}%</span>
                  </div>
                </div>
                <h3 className="text-slate-300 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-white">
                  <AnimatedNumber value={card.value} />
                </p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 text-left group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5 text-white" />
        </div>
                <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                <p className="text-slate-400 text-sm">{action.description}</p>
              </motion.button>
            );
          })}
    </div>
      </div>

      {/* Analytics Event Feed */}
      <EventFeed />
    </motion.div>
  );
};

// Blog Manager Component with full functionality
const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      setBlogs(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setForm({ ...form, img: files[0] });
    } else {
      // Allow spaces in title and description, only sanitize harmful characters
      const sanitizedValue = name === 'title' || name === 'desc' || name === 'tags' ? 
        value.replace(/[<>]/g, '') : sanitizeInput(value);
      setForm({ ...form, [name]: sanitizedValue });
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
      if (form.img && typeof form.img !== 'string') {
        formData.append('img', form.img);
      }
      const res = await fetch(url, {
        method,
        headers: getAdminHeaders(user),
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to save blog');
      setForm({ title: '', desc: '', img: null, type: 'Other', tags: '' });
      setEditing(null);
      setModalOpen(false);
      setSuccess(editing ? 'Blog post updated successfully!' : 'Blog post created successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
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
      type: blog.type,
      tags: typeof blog.tags === 'string' ? blog.tags : '',
      img: null
    });
    setModalOpen(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(user)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete blog');
      setSuccess('Blog post deleted successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      variants={contentVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6"
    >
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
        <div className="flex justify-between items-center">
    <div>
            <h2 className="text-2xl font-bold text-white mb-2">Blog Management</h2>
            <p className="text-slate-300">Create and manage your blog posts and content.</p>
      </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            onClick={() => { setEditing(null); setForm({ title: '', desc: '', img: null, type: 'Other', tags: '' }); setModalOpen(true); }}
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Blog Post</span>
          </motion.button>
        </div>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">{success}</span>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading blog posts...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Error: {error}</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                <tr>
                  <th className="py-4 px-6 text-left text-white font-semibold">Image</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Title</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Type</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Tags</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-slate-600/30">
              {blogs.map(blog => (
                  <tr key={blog._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6">
                      {blog.img ? (
                        <img src={blog.img} alt={blog.title} className="w-16 h-16 object-cover rounded-lg shadow-md" />
                      ) : (
                        <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
                          <PhotoIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">{blog.title}</div>
                      <div className="text-slate-400 text-sm mt-1 line-clamp-2">{blog.desc}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                        {blog.type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {(typeof blog.tags === 'string' ? blog.tags.split(',') : []).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded text-xs">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                  </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          onClick={() => handleEdit(blog)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      <AnimatePresence>
      {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-2xl border border-slate-600/30 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editing ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                  <label className="block text-slate-300 font-medium mb-2">Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
              </div>

              <div>
                  <label className="block text-slate-300 font-medium mb-2">Description</label>
                  <textarea
                    name="desc"
                    value={form.desc}
                    onChange={handleChange}
                    placeholder="Enter blog description"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                  <option value="Helicopter Services">Helicopter Services</option>
                  <option value="Industry News">Industry News</option>
                  <option value="Company Updates">Company Updates</option>
                  <option value="Safety Tips">Safety Tips</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                    <label className="block text-slate-300 font-medium mb-2">Tags</label>
                    <input
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="tag1, tag2, tag3"
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
              </div>
                </div>

              <div>
                  <label className="block text-slate-300 font-medium mb-2">Image</label>
                  <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600 transition-all"
                  />
                {form.img && typeof form.img !== 'string' && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(form.img)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                    </div>
                )}
              </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-3 bg-slate-600/50 text-slate-300 rounded-lg font-medium hover:bg-slate-600/70 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {editing ? 'Update Post' : 'Create Post'}
                  </motion.button>
              </div>
            </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main Admin Panel Component
const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState('');
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  // Load user data on component mount
  useEffect(() => {
    const adminData = localStorage.getItem('vw_admin');
    if (adminData) {
      try {
        setUser(JSON.parse(adminData));
      } catch (error) {
        console.error('Error parsing admin data:', error);
        handleLogout();
      }
    } else {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = async () => {
    // Confirm logout
    if (!window.confirm('Are you sure you want to logout?')) {
      return;
    }

    try {
      setLogoutError('');
      
      // Call logout API if it exists
      try {
        await fetch('/api/users/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-role': user?.role || 'admin'
          }
        });
      } catch (apiError) {
        // API logout failed, but we'll still clear local storage
        console.warn('API logout failed:', apiError);
      }

      // Clear all session data
      localStorage.removeItem('vw_admin');
      sessionStorage.clear();
      
      // Clear any cookies (if they exist)
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });

      setLogoutSuccess('Logged out successfully! Redirecting...');
      setUser(null);
      
      // Redirect to login after showing success message
      setTimeout(() => {
        navigate('/admin-login');
      }, 1500);
      
    } catch (error) {
      setLogoutError('Logout failed. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-x-auto">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        className="fixed lg:relative z-30 h-full"
      >
        <div className="w-80 h-full bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <img src="/whitebglogo.jpg" alt="Vertical Worx Logo" className="h-10 w-auto rounded-lg shadow-md" />
    <div>
                <h1 className="text-xl font-bold text-white">Vertical Worx</h1>
                <p className="text-slate-400 text-sm">Admin Panel</p>
      </div>
                    </div>
        </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {NAVIGATION_ITEMS.map((item) => {
              const IconComponent = item.icon;
  return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 text-white'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
        </div>
                </motion.button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-slate-700/50 space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white" />
        </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{user?.username || 'Admin User'}</div>
                <div className="text-slate-400 text-xs">{user?.role || 'Administrator'}</div>
        </div>
        </div>
            
            {/* Logout Button */}
          <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-700/50 text-white hover:bg-slate-600/50 transition-colors"
          >
            {sidebarOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
                    )}
                  </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <span className="text-slate-400">Current Section: </span>
              <span className="font-medium capitalize">{activeSection}</span>
      </div>

              </div>
              </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Logout Notifications */}
      <AnimatePresence>
            {logoutSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">{logoutSuccess}</span>
              </div>
          </motion.div>
        )}
            
            {logoutError && (
    <motion.div
                initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">{logoutError}</span>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeSection === 'dashboard' && <Dashboard setActiveSection={setActiveSection} />}
            {activeSection === 'blog' && <BlogManager key="blog" />}
            {activeSection === 'project' && <ProjectManager key="project" />}
            {activeSection === 'contacts' && <ContactManager key="contacts" />}
            {activeSection === 'quotes' && <QuoteManager key="quotes" />}
            {activeSection === 'gallery' && <GalleryManager key="gallery" />}
            {activeSection === 'salesforce' && <SalesforceAnalytics key="salesforce" />}
          </AnimatePresence>
      </div>
                    </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPanel; 