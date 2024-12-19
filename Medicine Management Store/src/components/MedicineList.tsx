import React from 'react';
import { Medicine } from '../types/medicine';
import { Edit, Trash2 } from 'lucide-react';

interface MedicineListProps {
  medicines: Medicine[];
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: string) => void;
}

export function MedicineList({ medicines, onEdit, onDelete }: MedicineListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {medicines.map((medicine) => (
            <tr key={medicine.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.manufacturer}</td>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  medicine.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {medicine.stock}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">${medicine.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{medicine.expiryDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(medicine)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(medicine.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}