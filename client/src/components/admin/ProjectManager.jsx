import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  RocketLaunchIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

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

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ title: '', description: '', category: 'Other', image: null, status: 'Active', challenges: '', solutions: '', outcomes: '' });
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('vw_admin'));

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch projects');
      setProjects(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      // Allow spaces in title and description, only sanitize harmful characters
      const sanitizedValue = name === 'title' || name === 'description' ? 
        value.replace(/[<>]/g, '') : sanitizeInput(value);
      setForm({ ...form, [name]: sanitizedValue });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/projects/${editing._id}` : '/api/projects';
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('status', form.status);
      formData.append('challenges', form.challenges);
      formData.append('solutions', form.solutions);
      formData.append('outcomes', form.outcomes);
      if (form.image && typeof form.image !== 'string') {
        formData.append('image', form.image);
      }
      const res = await fetch(url, {
        method,
        headers: { 'x-user-role': user?.role || 'admin' },
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to save project');
      setForm({ title: '', description: '', category: 'Other', image: null, status: 'Active', challenges: '', solutions: '', outcomes: '' });
      setEditing(null);
      setModalOpen(false);
      setSuccess(editing ? 'Project updated successfully!' : 'Project created successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = project => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      category: project.category || 'Other',
      status: project.status,
      image: null,
      challenges: Array.isArray(project.challenges) ? project.challenges.join(', ') : (project.challenges || ''),
      solutions: Array.isArray(project.solutions) ? project.solutions.join(', ') : (project.solutions || ''),
      outcomes: Array.isArray(project.outcomes) ? project.outcomes.join(', ') : (project.outcomes || '')
    });
    setModalOpen(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-role': user?.role || 'admin' }
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete project');
      setSuccess('Project deleted successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchProjects();
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
            <h2 className="text-2xl font-bold text-white mb-2">Project Management</h2>
            <p className="text-slate-300">Manage your helicopter service projects and case studies.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            onClick={() => { setEditing(null); setForm({ title: '', description: '', category: 'Other', image: null, status: 'Active', challenges: '', solutions: '', outcomes: '' }); setModalOpen(true); }}
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Project</span>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading projects...</p>
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
                  <th className="py-4 px-6 text-left text-white font-semibold">Description</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Status</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/30">
                {projects.map(project => (
                  <tr key={project._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-lg shadow-md" />
                      ) : (
                        <div className="w-16 h-16 bg-slate-600 rounded-lg flex items-center justify-center">
                          <RocketLaunchIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">{project.title}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-400 text-sm line-clamp-2">{project.description}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'Active' ? 'bg-green-500/20 text-green-300' : 
                        project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          onClick={() => handleEdit(project)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          onClick={() => handleDelete(project._id)}
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
                  {editing ? 'Edit Project' : 'Create New Project'}
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
                    placeholder="Enter project title"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter project description"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="Construction Support">Construction Support</option>
                      <option value="Science & Research">Science & Research</option>
                      <option value="Aerial Cinematography">Aerial Cinematography</option>
                      <option value="Emergency Services">Emergency Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Status</label>
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Challenges</label>
                  <textarea
                    name="challenges"
                    value={form.challenges}
                    onChange={handleChange}
                    placeholder="Enter project challenges (comma separated)"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Solutions</label>
                  <textarea
                    name="solutions"
                    value={form.solutions}
                    onChange={handleChange}
                    placeholder="Enter project solutions (comma separated)"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Outcomes</label>
                  <textarea
                    name="outcomes"
                    value={form.outcomes}
                    onChange={handleChange}
                    placeholder="Enter project outcomes (comma separated)"
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-500 file:text-white file:cursor-pointer hover:file:bg-green-600 transition-all"
                  />
                  {form.image && typeof form.image !== 'string' && (
                    <div className="mt-4">
                      <img
                        src={URL.createObjectURL(form.image)}
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
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {editing ? 'Update Project' : 'Create Project'}
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

export default ProjectManager; 