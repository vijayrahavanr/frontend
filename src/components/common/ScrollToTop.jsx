import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Renders nothing — resets window scroll position to the top on every
 * route change. Mount once near the root of the router tree.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
