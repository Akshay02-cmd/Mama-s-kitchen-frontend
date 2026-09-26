import { useState, useEffect } from 'react';

/**
 * useAsync Hook
 * Handles async operations with loading, error, and data states
 * 
 * @param {Function} asyncFunction - Async function to execute
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Object} { execute, loading, data, error }
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (...params) => {
    setLoading(true);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return { execute, loading, data, error, setData };
};
