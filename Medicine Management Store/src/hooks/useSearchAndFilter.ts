import { useState, useMemo } from 'react';
import { Medicine, MedicineCategory } from '../types/medicine';
import { isLowStock, isExpiringSoon, isExpired } from '../utils/stock';

interface Filters {
  category: MedicineCategory | '';
  availability: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';
  expiration: 'all' | 'expiring-soon' | 'expired' | 'valid';
}

export function useSearchAndFilter(medicines: Medicine[] = []) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: '',
    availability: 'all',
    expiration: 'all',
  });

  const filteredMedicines = useMemo(() => {
    if (!medicines.length) return [];
    
    return medicines.filter((medicine) => {
      // Search query filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        medicine.name.toLowerCase().includes(searchLower) ||
        medicine.batchNumber.toLowerCase().includes(searchLower) ||
        medicine.manufacturer.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Category filter
      if (filters.category && medicine.category !== filters.category) {
        return false;
      }

      // Availability filter
      if (filters.availability !== 'all') {
        const isOutOfStock = medicine.stock === 0;
        const isLowStockItem = isLowStock(medicine.stock, medicine.minStockLevel);

        if (
          (filters.availability === 'out-of-stock' && !isOutOfStock) ||
          (filters.availability === 'low-stock' && !isLowStockItem) ||
          (filters.availability === 'in-stock' && (isOutOfStock || isLowStockItem))
        ) {
          return false;
        }
      }

      // Expiration filter
      if (filters.expiration !== 'all') {
        const isExpiredItem = isExpired(medicine.expiryDate);
        const isExpiringSoonItem = isExpiringSoon(medicine.expiryDate);

        if (
          (filters.expiration === 'expired' && !isExpiredItem) ||
          (filters.expiration === 'expiring-soon' && !isExpiringSoonItem) ||
          (filters.expiration === 'valid' && (isExpiredItem || isExpiringSoonItem))
        ) {
          return false;
        }
      }

      return true;
    });
  }, [medicines, searchQuery, filters]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    filteredMedicines,
  };
}