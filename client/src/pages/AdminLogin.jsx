import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      {/* Hero Section */}
      <div className="w-full bg-white py-8 shadow-sm z-50 fixed top-0 left-0 flex items-center justify-between px-8" style={{zIndex: 50}}>
        <img src="/whitebglogo.jpg" alt="Vertical Worx Logo" className="h-12 w-auto" />
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight text-center" style={{fontFamily: 'Montserrat, Inter, Arial, sans-serif'}}>Admin Login</h1>
        </div>
        <div className="w-12" /> {/* Spacer to balance the logo's width on the right */}
      </div>
      {/* Spacer for hero */}
      <div className="h-32" />
      {/* Login Card */}
      <div className="w-full max-w-md p-8 rounded-lg border border-gray-200 bg-white z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900" value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10 bg-white text-gray-900"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition duration-200" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 