import React, { useState } from 'react';
import { Medicine, MedicineFormData } from '../../types/medicine';
import { MedicineFormFields } from './MedicineFormFields';
import { useMedicines } from '../../hooks/useMedicines';

interface MedicineFormProps {
  initialData?: Medicine;
  onClose: () => void;
}

export function MedicineForm({ initialData, onClose }: MedicineFormProps) {
  const { addMedicine, updateMedicine } = useMedicines();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<MedicineFormData>({
    name: initialData?.name || '',
    manufacturer: initialData?.manufacturer || '',
    category: initialData?.category || 'Tablets',
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    expiryDate: initialData?.expiryDate || '',
    batchNumber: initialData?.batchNumber || '',
    minStockLevel: initialData?.minStockLevel || 10,
    prescriptionRequired: initialData?.prescriptionRequired || false,
    supplierId: initialData?.supplierId || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) || 0
          : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (initialData) {
        await updateMedicine(initialData.id, formData);
      } else {
        await addMedicine(formData);
      }
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      <MedicineFormFields values={formData} onChange={handleChange} />
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {initialData ? 'Updating...' : 'Adding...'}
            </span>
          ) : (
            <span>{initialData ? 'Update' : 'Add'} Medicine</span>
          )}
        </button>
      </div>
    </form>
  );
}