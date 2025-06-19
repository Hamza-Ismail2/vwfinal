import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { getAdminHeaders } from '../../utils/authHeaders';

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

const GalleryManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [form, setForm] = useState({ title: '', description: '', image: null });
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('vw_admin'));

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch images');
      console.log('Fetched images:', data.data); // Debug log
      setImages(data.data || []);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

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
      const url = editing ? `/api/images/${editing._id}` : '/api/images';
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      if (form.image && typeof form.image !== 'string') {
        formData.append('image', form.image);
      }
      const res = await fetch(url, {
        method,
        headers: getAdminHeaders(user),
        body: formData
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to save image');
      setForm({ title: '', description: '', image: null });
      setEditing(null);
      setModalOpen(false);
      setSuccess(editing ? 'Image updated successfully!' : 'Image uploaded successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchImages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = image => {
    setEditing(image);
    setForm({
      title: image.title,
      description: image.description,
      image: null
    });
    setModalOpen(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this image?')) return;
    try {
      const res = await fetch(`/api/images/${id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(user)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete image');
      setSuccess('Image deleted successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchImages();
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
            <h2 className="text-2xl font-bold text-white mb-2">Gallery Management</h2>
            <p className="text-slate-300">Upload and manage your helicopter service images and media.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
            onClick={() => { setEditing(null); setForm({ title: '', description: '', image: null }); setModalOpen(true); }}
          >
            <PlusIcon className="w-5 h-5" />
            <span>Upload Image</span>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading images...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Error: {error}</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.length > 0 && (
            <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-2xl border border-slate-600/30 bg-slate-800/50 backdrop-blur-sm">
              <img src={images[carouselIndex]?.url} alt={images[carouselIndex]?.title || 'Image'} className="w-full h-full object-cover" />
              <button onClick={() => setCarouselIndex((carouselIndex-1+images.length)%images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white">&#8592;</button>
              <button onClick={() => setCarouselIndex((carouselIndex+1)%images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white">&#8594;</button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center text-sm py-1">{images[carouselIndex]?.title}</div>
            </div>
          )}
          {/* Grid */}
          {images.map(image => (
            <motion.div key={image._id} whileHover={{ scale: 1.02 }} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30 overflow-hidden group">
              <div className="aspect-video relative">
                {image.url ? (
                  <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                    <PhotoIcon className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80" onClick={() => handleEdit(image)}>
                    <PencilIcon className="w-4 h-4" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600/80" onClick={() => handleDelete(image._id)}>
                    <TrashIcon className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-1">{image.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{image.description}</p>
              </div>
            </motion.div>
          ))}
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
                  {editing ? 'Edit Image' : 'Upload New Image'}
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
                    placeholder="Enter image title"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter image description"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
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
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600 transition-all"
                    required={!editing}
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
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {editing ? 'Update Image' : 'Upload Image'}
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

export default GalleryManager; 