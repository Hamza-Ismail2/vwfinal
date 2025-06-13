import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const bgGradient = {
  background: 'linear-gradient(135deg, #0f172a 0%, #ff5a1f 100%)',
  minHeight: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 0,
  overflow: 'hidden',
};

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Utility for input sanitization
  const sanitizeInput = (value, type = 'text') => {
    if (typeof value !== 'string') return '';
    let v = value.trim();
    if (type === 'email') {
      v = v.replace(/[^a-zA-Z0-9@._+-]/g, '');
    } else if (type === 'password') {
      v = v.replace(/[<>]/g, '');
    } else {
      v = v.replace(/[<>]/g, '');
    }
    return v;
  };

  // In onChange handlers, sanitize input
  // For username
  const handleUsernameChange = (e) => {
    setUsername(sanitizeInput(e.target.value, 'text'));
  };
  // For password
  const handlePasswordChange = (e) => {
    setPassword(sanitizeInput(e.target.value, 'password'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const sanitizedUsername = sanitizeInput(username, 'text');
    const sanitizedPassword = sanitizeInput(password, 'password');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: sanitizedUsername, password: sanitizedPassword })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Login failed');
      if (data.data.role !== 'admin') throw new Error('Admin access only');
      localStorage.setItem('vw_admin', JSON.stringify(data.data));
      navigate('/admin-panel');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={bgGradient}
        aria-hidden="true"
      />
      {/* Glassmorphism Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30"
      >
        <div className="flex flex-col items-center mb-6">
          <img src="/whitebglogo.jpg" alt="Vertical Worx Logo" className="h-14 w-auto mb-2 drop-shadow-lg" />
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-orange-600 tracking-tight text-center font-display drop-shadow"
          >
            Admin Login
          </motion.h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Username</label>
            <motion.input
              whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #ff5a1f55' }}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-white/40 backdrop-blur border border-white/30 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={username}
              onChange={handleUsernameChange}
              required
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Password</label>
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #ff5a1f55' }}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 rounded-lg bg-white/40 backdrop-blur border border-white/30 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                style={{ fontFamily: 'inherit', letterSpacing: showPassword ? 'normal' : '0.3em' }}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 focus:outline-none"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.857-.676 1.664-1.186 2.393M15.54 15.54A5.978 5.978 0 0112 17c-3.314 0-6-2.686-6-6 0-.795.155-1.552.44-2.24" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575m1.664-2.13A9.956 9.956 0 0112 3c5.523 0 10 4.477 10 10 0 1.657-.403 3.22-1.125 4.575m-1.664 2.13A9.956 9.956 0 0112 21c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575" /></svg>
                )}
              </button>
            </div>
          </div>
          {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center font-semibold">{error}</motion.div>}
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: '#ff5a1f', color: '#fff' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-orange-200/30"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                Logging in...
              </span>
            ) : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin; 