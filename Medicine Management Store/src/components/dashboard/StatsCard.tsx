import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: 'up' | 'down';
  trendValue: string;
  isCurrency?: boolean;
}

export function StatsCard({ title, value, trend, trendValue, isCurrency = false }: StatsCardProps) {
  const displayValue = isCurrency ? formatCurrency(Number(value)) : value;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{displayValue}</p>
      <div className="mt-2 flex items-center text-sm">
        {trend === 'up' ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
          {trendValue}
        </span>
      </div>
    </div>
  );
}