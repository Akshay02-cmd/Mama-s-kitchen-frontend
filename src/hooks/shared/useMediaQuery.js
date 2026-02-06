import { useState, useEffect } from 'react';

/**
 * useMediaQuery Hook
 * Tracks media query matches
 * 
 * @param {string} query - Media query string
 * @returns {boolean} Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => 
    window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    // Create listener
    const listener = (e) => setMatches(e.matches);
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
};

// Predefined breakpoint hooks
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)');
