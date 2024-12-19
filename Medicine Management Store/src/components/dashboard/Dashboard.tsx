import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useMedicines } from '../../hooks/useMedicines';
import { DashboardStats } from './DashboardStats';
import { UserProfile } from './UserProfile';
import { StockAlerts } from '../alerts/StockAlerts';

export function Dashboard() {
  const { user } = useAuth();
  const { medicines, loading } = useMedicines();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to MediTrack Pro</h1>
      <UserProfile />
      <DashboardStats medicines={medicines} />
      <StockAlerts medicines={medicines} />
    </div>
  );
}