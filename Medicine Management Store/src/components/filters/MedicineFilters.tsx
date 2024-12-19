import React from 'react';
import { MedicineCategory } from '../../types/medicine';

interface MedicineFiltersProps {
  filters: {
    category: MedicineCategory | '';
    availability: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';
    expiration: 'all' | 'expiring-soon' | 'expired' | 'valid';
  };
  onFilterChange: (key: keyof MedicineFiltersProps['filters'], value: string) => void;
}

export function MedicineFilters({ filters, onFilterChange }: MedicineFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          <option value="Tablets">Tablets</option>
          <option value="Syrups">Syrups</option>
          <option value="Injections">Injections</option>
          <option value="First Aid">First Aid</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Painkillers">Painkillers</option>
          <option value="Vitamins">Vitamins</option>
        </select>
      </div>

      <div className="min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
        <select
          value={filters.availability}
          onChange={(e) => onFilterChange('availability', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">All Stock Levels</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      <div className="min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
        <select
          value={filters.expiration}
          onChange={(e) => onFilterChange('expiration', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">All Dates</option>
          <option value="valid">Valid</option>
          <option value="expiring-soon">Expiring Soon</option>
          <option value="expired">Expired</option>
        </select>
      </div>
    </div>
  );
}