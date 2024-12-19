import React from 'react';
import { MedicineCategory } from '../../../types/medicine';

interface CategorySelectProps {
  value: MedicineCategory;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export function CategorySelect({
  value,
  onChange,
  required = false
}: CategorySelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Category</label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Select category</option>
        <option value="Tablets">Tablets</option>
        <option value="Syrups">Syrups</option>
        <option value="Injections">Injections</option>
        <option value="First Aid">First Aid</option>
        <option value="Antibiotics">Antibiotics</option>
        <option value="Painkillers">Painkillers</option>
        <option value="Vitamins">Vitamins</option>
      </select>
    </div>
  );
}