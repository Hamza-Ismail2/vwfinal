export const getAdminHeaders = (user, extraHeaders = {}) => {
  const headers = { 'x-user-role': user?.role || 'admin', ...extraHeaders };
  // Try token from user object or separate storage
  const token = user?.token || localStorage.getItem('vw_admin_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}; 