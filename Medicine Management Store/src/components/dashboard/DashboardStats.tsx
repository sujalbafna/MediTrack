import React from 'react';
import { Medicine } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { StatsCard } from './StatsCard';
import { useSales } from '../../hooks/useSales';
import { calculateInventoryValue } from '../../utils/currency';
import { isLowStock } from '../../utils/stock';

interface DashboardStatsProps {
  medicines: Medicine[];
}

export function DashboardStats({ medicines }: DashboardStatsProps) {
  const { sales, loading } = useSales();

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const totalInventoryValue = calculateInventoryValue(medicines);
  const lowStockItems = medicines.filter(med => isLowStock(med.stock, med.minStockLevel));
  const totalSales = sales?.reduce((total, sale) => total + sale.total, 0) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total Inventory Value"
        value={formatCurrency(totalInventoryValue)}
        trend="up"
        trendValue="12%"
      />
      <StatsCard
        title="Low Stock Items"
        value={lowStockItems.length.toString()}
        trend="down"
        trendValue="3"
      />
      <StatsCard
        title="Total Sales"
        value={formatCurrency(totalSales)}
        trend="up"
        trendValue="8%"
      />
    </div>
  );
}