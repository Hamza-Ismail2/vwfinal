import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  EyeIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { getAdminHeaders } from '../../utils/authHeaders';

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const QuoteManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const user = JSON.parse(localStorage.getItem('vw_admin'));

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quotes');
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch quotes');
      // Map API data to fields expected by the UI for backward compatibility
      const mapped = (data.data || []).map(q => ({
        ...q,
        // Combine first & last name for display convenience
        name: `${q.firstName || ''} ${q.lastName || ''}`.trim() || q.name || 'Unknown',
        service: q.serviceType || q.service || '—',
        departure: q.origin || q.departure || '—',
        departureDate: q.flightDate || q.departureDate || '—',
        // Preserve existing returnDate if present
        returnDate: q.returnDate || '—'
      }));
      setQuotes(mapped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuotes(); }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: getAdminHeaders(user, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to update status');
      setSuccess('Quote status updated successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchQuotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this quote?')) return;
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(user)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to delete quote');
      setSuccess('Quote deleted successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
      fetchQuotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedQuotes.length) return;
    if (!window.confirm(`Delete ${selectedQuotes.length} selected quotes?`)) return;
    
    try {
      await Promise.all(
        selectedQuotes.map(id =>
          fetch(`/api/quotes/${id}`, {
            method: 'DELETE',
            headers: getAdminHeaders(user)
          })
        )
      );
      setSuccess(`${selectedQuotes.length} quotes deleted successfully!`);
      setSelectedQuotes([]);
      setTimeout(() => setSuccess(''), 3000);
      fetchQuotes();
    } catch (err) {
      setError('Failed to delete some quotes');
    }
  };

  const handleSelectAll = () => {
    if (selectedQuotes.length === filteredQuotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(filteredQuotes.map(q => q._id));
    }
  };

  const handleSelectQuote = (id) => {
    setSelectedQuotes(prev =>
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  const filteredQuotes = quotes.filter(quote => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      (quote.name && quote.name.toLowerCase().includes(lowerSearch)) ||
      (quote.email && quote.email.toLowerCase().includes(lowerSearch)) ||
      (quote.service && quote.service.toLowerCase().includes(lowerSearch)) ||
      (quote.additionalInfo && quote.additionalInfo.toLowerCase().includes(lowerSearch));
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = quote => {
    setSelectedQuote(quote);
    setModalOpen(true);
  };

  const getStatusColor = status => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'quoted': return 'bg-blue-500/20 text-blue-300';
      case 'accepted': return 'bg-green-500/20 text-green-300';
      case 'rejected': return 'bg-red-500/20 text-red-300';
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
            <h2 className="text-2xl font-bold text-white mb-2">Quote Management</h2>
            <p className="text-slate-300">Manage service quotes and pricing requests.</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{quotes.length}</p>
            <p className="text-slate-400 text-sm">Total Quotes</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-slate-300 font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          <div>
            <label className="block text-slate-300 font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Status</option>
              <option value="pending">🕐 Pending Review</option>
              <option value="quoted">💵 Quote Sent</option>
              <option value="accepted">🎉 Accepted</option>
              <option value="rejected">🚫 Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-slate-300 font-medium mb-2">Actions</label>
            <div className="flex space-x-2">
              <button
                onClick={handleBulkDelete}
                disabled={!selectedQuotes.length}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete ({selectedQuotes.length})
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-slate-400 text-sm">
          Showing {filteredQuotes.length} of {quotes.length} quotes
        </div>
      </div>

      {loading ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading quotes...</p>
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
                      checked={selectedQuotes.length === filteredQuotes.length && filteredQuotes.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Customer</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Contact</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Service</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Date</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Status</th>
                  <th className="py-4 px-6 text-left text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600/30">
                {filteredQuotes.map(quote => (
                  <tr key={quote._id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={selectedQuotes.includes(quote._id)}
                        onChange={() => handleSelectQuote(quote._id)}
                        className="rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <UserIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{quote.name}</div>
                          <div className="text-slate-400 text-sm">{quote.company || 'Individual'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <EnvelopeIcon className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-300 text-sm">{quote.email}</span>
                        </div>
                        {quote.phone && (
                          <div className="flex items-center space-x-2">
                            <PhoneIcon className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-300 text-sm">{quote.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-300">{quote.service}</div>
                      <div className="text-slate-400 text-sm">{quote.passengers} passengers</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 text-sm">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={quote.status || 'pending'}
                        onChange={(e) => handleStatusUpdate(quote._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium border border-slate-600/50 ${getStatusColor(quote.status || 'pending')} bg-slate-700/50 hover:bg-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer`}
                      >
                        <option value="pending" className="bg-slate-800 text-yellow-300">🕐 Pending Review</option>
                        <option value="quoted" className="bg-slate-800 text-blue-300">💵 Quote Sent</option>
                        <option value="accepted" className="bg-slate-800 text-green-300">🎉 Accepted</option>
                        <option value="rejected" className="bg-slate-800 text-red-300">🚫 Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          onClick={() => handleViewDetails(quote)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          onClick={() => handleDelete(quote._id)}
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
        {modalOpen && selectedQuote && (
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
              className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 w-full max-w-4xl border border-slate-600/30 max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Quote Request Details</h3>
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
                      {selectedQuote.name}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Company</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.company || 'Individual'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Email</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Phone</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.phone || 'Not provided'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Service</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.service}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Passengers</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.passengers}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Date Requested</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {new Date(selectedQuote.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Departure</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.departure}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Destination</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.destination}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Departure Date</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.departureDate}
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Return Date</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white">
                      {selectedQuote.returnDate || 'One way'}
                    </div>
                  </div>
                </div>

                {selectedQuote.specialRequests && (
                  <div>
                    <label className="block text-slate-300 font-medium mb-2">Special Requests</label>
                    <div className="bg-slate-700/50 rounded-lg p-3 text-white whitespace-pre-wrap">
                      {selectedQuote.specialRequests}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuoteManager; 