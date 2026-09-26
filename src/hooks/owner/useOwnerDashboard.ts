import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../shared/useAuth';

/**
 * useOwnerDashboard Hook
 * Manages owner dashboard data and statistics
 * 
 * @returns {Object} Dashboard data, loading state, and handlers
 */
export const useOwnerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeMesses: 0,
    pendingApprovals: 0
  });
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!user || user.role !== 'OWNER') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API calls
      // const [statsData, messesData] = await Promise.all([
      //   getOwnerStats(),
      //   getOwnerMesses()
      // ]);
      
      // Mock data for now
      setStats({
        totalRevenue: 45230,
        totalOrders: 234,
        activeMesses: 3,
        pendingApprovals: 5
      });
      
      setMesses([
        {
          id: 1,
          name: 'Homely Kitchen',
          revenue: 25000,
          orders: 145,
          rating: 4.5,
          status: 'active'
        }
      ]);
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    messes,
    loading,
    error,
    refetch: fetchDashboardData
  };
};
