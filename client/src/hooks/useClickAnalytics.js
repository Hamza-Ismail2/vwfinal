import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

export default function useClickAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      // find a clickable element (button or link) up the DOM tree
      const target = e.target.closest('[data-track-click],a[href],button');
      if (!target) return;

      // Determine a descriptive name
      let buttonName = target.getAttribute('data-track-click') || target.getAttribute('aria-label');
      if (!buttonName) {
        buttonName = (target.textContent || '').trim().split(/\s+/).slice(0,4).join(' ');
      }
      if (!buttonName) buttonName = target.tagName.toLowerCase();

      // Destination path (for links)
      const href = target.getAttribute('href') || '';

      trackEvent('button_click', {
        button: buttonName,
        from: location.pathname,
        to: href,
      });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
} 