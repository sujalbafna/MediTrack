import React from 'react';
import { Medicine } from '../../types';
import { Edit, Trash2, ShoppingCart } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/currency';

interface MedicineListItemProps {
  medicine: Medicine;
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: string) => void;
  onSellClick: (medicine: Medicine) => void;
}

export function MedicineListItem({ 
  medicine, 
  onEdit, 
  onDelete, 
  onSellClick 
}: MedicineListItemProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{medicine.manufacturer}</td>
      <td className="px-6 py-4 whitespace-nowrap">{medicine.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-sm ${
          medicine.stock < medicine.minStockLevel 
            ? 'bg-red-100 text-red-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {medicine.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(medicine.price)}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formatDate(medicine.expiryDate)}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <button
            onClick={() => onSellClick(medicine)}
            className="text-green-600 hover:text-green-900"
            title="Sell Medicine"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button
            onClick={() => onEdit(medicine)}
            className="text-indigo-600 hover:text-indigo-900"
            title="Edit Medicine"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(medicine.id)}
            className="text-red-600 hover:text-red-900"
            title="Delete Medicine"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}