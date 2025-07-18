import { getUserId } from './userId';
// Lightweight analytics helper
// Usage: trackEvent('quote_request', { method: 'form' })

export function trackEvent(name, params = {}) {
  try {
    // Send to Google Analytics (if tag is loaded)
    if (window.gtag) {
      window.gtag('event', name, params);
    }
    if (!('uid' in params)) {
      params.uid = getUserId();
    }
    // Mirror to backend for temporary admin tracking
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, params }),
    }).catch(() => {/* silent */});
    // Also persist locally so EventFeed works without backend/DB
    try {
      const localEvents = JSON.parse(localStorage.getItem('vw_events') || '[]');
      localEvents.unshift({ name, params, timestamp: Date.now() });
      // keep only the newest 100
      localStorage.setItem('vw_events', JSON.stringify(localEvents.slice(0, 100)));
    } catch (e) {
      // ignore localStorage errors
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('trackEvent error', err);
  }
} 