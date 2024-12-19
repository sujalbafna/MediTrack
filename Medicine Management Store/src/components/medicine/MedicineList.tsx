import React, { useState } from 'react';
import { Medicine } from '../../types';
import { MedicineListItem } from './MedicineListItem';
import { SearchBar } from '../search/SearchBar';
import { MedicineFilters } from '../filters/MedicineFilters';
import { useSearchAndFilter } from '../../hooks/useSearchAndFilter';
import { useMedicines } from '../../hooks/useMedicines';
import { useSales } from '../../hooks/useSales';
import { MedicineForm } from './MedicineForm';
import { SellMedicineModal } from './SellMedicineModal';
import { Plus } from 'lucide-react';

export function MedicineList() {
  const { medicines, loading, deleteMedicine, updateMedicine } = useMedicines();
  const { addSale } = useSales();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [sellingMedicine, setSellingMedicine] = useState<Medicine | null>(null);
  const {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    filteredMedicines,
  } = useSearchAndFilter(medicines);

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingMedicine(null);
  };

  const handleSell = async (quantity: number) => {
    if (!sellingMedicine) return;

    try {
      // Update medicine stock
      await updateMedicine(sellingMedicine.id, {
        ...sellingMedicine,
        stock: sellingMedicine.stock - quantity
      });

      // Add sale record
      await addSale({
        items: [{
          medicineId: sellingMedicine.id,
          quantity,
          price: sellingMedicine.price,
          subtotal: sellingMedicine.price * quantity
        }],
        total: sellingMedicine.price * quantity,
        date: new Date().toISOString(),
        prescriptionIds: []
      });

      setSellingMedicine(null);
    } catch (error) {
      console.error('Error processing sale:', error);
      alert('Failed to process sale. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {showAddForm ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
              </h2>
            </div>
            <MedicineForm
              initialData={editingMedicine || undefined}
              onClose={handleCloseForm}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Medicine Inventory</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, batch number, or manufacturer..."
              />
              <MedicineFilters
                filters={filters}
                onFilterChange={updateFilter}
              />
            </div>

            <div className="mt-6 overflow-x-auto">
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
                  {filteredMedicines.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No medicines found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredMedicines.map((medicine) => (
                      <MedicineListItem
                        key={medicine.id}
                        medicine={medicine}
                        onEdit={handleEdit}
                        onDelete={deleteMedicine}
                        onSellClick={setSellingMedicine}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {sellingMedicine && (
        <SellMedicineModal
          medicine={sellingMedicine}
          onClose={() => setSellingMedicine(null)}
          onSell={handleSell}
        />
      )}
    </>
  );
}