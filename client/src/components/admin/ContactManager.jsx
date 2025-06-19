import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { getAdminHeaders } from '../../utils/authHeaders';

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const user = JSON.parse(localStorage.getItem('vw_admin'));

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch contacts');
      setContacts(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: getAdminHeaders(user, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to update status');
      setSuccess('Contact status updated successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(user)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete contact');
      setSuccess('Contact deleted successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkAsRead = async (id, read = true) => {
    try {
      const res = await fetch(`/api/contacts/${id}/read`, {
        method: 'PATCH',
        headers: getAdminHeaders(user, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ read })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to update read status');
      setSuccess(`Contact marked as ${read ? 'read' : 'unread'}!`);
      setTimeout(() => setSuccess(''), 3000);
      fetchContacts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedContacts.length) return;
    if (!window.confirm(`Delete ${selectedContacts.length} selected contacts?`)) return;
    
    try {
      await Promise.all(
        selectedContacts.map(id =>
          fetch(`/api/contacts/${id}`, {
            method: 'DELETE',
            headers: getAdminHeaders(user)
          })
        )
      );
      setSuccess(`${selectedContacts.length} contacts deleted successfully!`);
      setSelectedContacts([]);
      setTimeout(() => setSuccess(''), 3000);
      fetchContacts();
    } catch (err) {
      setError('Failed to delete some contacts');
    }
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c._id));
    }
  };

  const handleSelectContact = (id) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesRead = readFilter === 'all' || 
      (readFilter === 'read' && contact.read) ||
      (readFilter === 'unread' && !contact.read);
    
    return matchesSearch && matchesStatus && matchesRead;
  });

  const handleViewDetails = contact => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const getStatusColor = status => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300';
      case 'contacted': return 'bg-yellow-500/20 text-yellow-300';
      case 'resolved': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
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
            <h2 className="text-2xl font-bold text-white mb-2">Contact Management</h2>
            <p className="text-slate-300">Manage customer inquiries and contact requests.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{contacts.length}</p>
            <p className="text-slate-400 text-sm">Total Contacts</p>
          </div>
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

      {/* Filters and Search */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-slate-300 font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-slate-300 font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <div>
            <label className="block text-slate-300 font-medium mb-2">Read Status</label>
            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          <div>
            <label className="block text-slate-300 font-medium mb-2">Actions</label>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                disabled={!selectedContacts.length}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete ({selectedContacts.length})
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-slate-400 text-sm">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </div>
      </div>

      {loading ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading contacts...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Error: {error}</span>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-600/30">
          <div className="overflow-x-auto custom-scrollbar-orange pb-2 max-w-full" style={{scrollbarWidth: 'thin'}}>
            <table className="min-w-[1400px] w-max">
              <thead className="bg-gradient-to-r from-slate-700/50 to-slate-600/50">
                <tr>
                  <th className="py-4 px-6 text-left text-white font-semibold">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                    />
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Contact</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Email</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Phone</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Service</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Status</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Read</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Date</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/30">
                {filteredContacts.map(contact => (
                  <tr key={contact._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact._id)}
                        onChange={() => handleSelectContact(contact._id)}
                        className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${contact.read ? 'from-gray-500 to-gray-600' : 'from-blue-500 to-blue-600'} rounded-full flex items-center justify-center`}>
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className={`font-medium ${contact.read ? 'text-slate-300' : 'text-white font-bold'}`}>{contact.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <EnvelopeIcon className="w-4 h-4 text-slate-400" />
                        <span className={contact.read ? 'text-slate-400' : 'text-slate-300'}>{contact.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="w-4 h-4 text-slate-400" />
                        <span className={contact.read ? 'text-slate-400' : 'text-slate-300'}>{contact.phone || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`text-sm line-clamp-1 ${contact.read ? 'text-slate-400' : 'text-slate-300'}`}>{contact.service}</div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={contact.status || 'new'}
                        onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border-0 ${getStatusColor(contact.status || 'new')} bg-transparent`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleMarkAsRead(contact._id, !contact.read)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          contact.read 
                            ? 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30' 
                            : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                        } transition-colors`}
                      >
                        {contact.read ? 'Read' : 'Unread'}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <span className={`text-sm ${contact.read ? 'text-slate-400' : 'text-slate-300'}`}>
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          onClick={() => handleViewDetails(contact)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          onClick={() => handleDelete(contact._id)}
                        >
                          <XMarkIcon className="w-4 h-4" />
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
        {modalOpen && selectedContact && (
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
                <h3 className="text-2xl font-bold text-white">Contact Details</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Name</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedContact.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Email</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedContact.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Phone</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedContact.phone || 'Not provided'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Date</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {new Date(selectedContact.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Subject</label>
                  <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                    {selectedContact.subject}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-2">Message</label>
                  <div className="bg-slate-700/50 rounded-lg p-3 text-white whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactManager; 