import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

export default function useClickAnalytics() {
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      const target = e.target.closest('[data-track-click]');
      if (!target) return;
      const buttonName = target.getAttribute('data-track-click') || target.textContent.trim().slice(0, 50);
      const href = target.getAttribute('href') || '';
      trackEvent('button_click', {
        button: buttonName,
        from: location.pathname,
        to: href,
      });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
    // location dependency ensures from path updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
} 