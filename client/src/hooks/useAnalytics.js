import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Track SPA page view
    trackEvent('page_view', {
      path: location.pathname + location.search,
    });
    // We only want to run on pathname/search change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);
} 