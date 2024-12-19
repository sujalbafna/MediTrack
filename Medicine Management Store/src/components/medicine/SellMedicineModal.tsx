import React, { useState } from 'react';
import { Medicine } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface SellMedicineModalProps {
  medicine: Medicine;
  onClose: () => void;
  onSell: (quantity: number) => void;
}

export function SellMedicineModal({ medicine, onClose, onSell }: SellMedicineModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    if (quantity > medicine.stock) {
      setError('Not enough stock available');
      return;
    }
    onSell(quantity);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Sell {medicine.name}</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">Available Stock: {medicine.stock}</p>
          <p className="text-sm text-gray-600">Price: {formatCurrency(medicine.price)}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              min="1"
              max={medicine.stock}
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value) || 0);
                setError('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold">
              Total: {formatCurrency(medicine.price * quantity)}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Confirm Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}