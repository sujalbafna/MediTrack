import React from 'react';
import { Medicine, Sale } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface StatsChartProps {
  sales: Sale[];
  medicines: Medicine[];
}

export function StatsChart({ sales, medicines }: StatsChartProps) {
  // Group sales by date
  const salesByDate = sales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);

  // Get last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString();
  }).reverse();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
      <div className="h-64 flex items-end space-x-2">
        {last7Days.map(date => {
          const value = salesByDate[date] || 0;
          const height = value ? `${(value / Math.max(...Object.values(salesByDate))) * 100}%` : '0%';
          
          return (
            <div key={date} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-indigo-100 rounded-t" style={{ height }}>
                <div className="bg-indigo-500 w-full h-full rounded-t"></div>
              </div>
              <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                {date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}