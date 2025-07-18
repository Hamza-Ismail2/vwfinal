export function getUserId() {
  let uid = localStorage.getItem('vw_uid');
  if (!uid) {
    uid = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    localStorage.setItem('vw_uid', uid);
  }
  return uid;
} 