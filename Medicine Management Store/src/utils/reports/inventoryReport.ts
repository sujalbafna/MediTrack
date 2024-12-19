import { Medicine } from '../../types';
import { isLowStock, isExpiringSoon, isExpired } from '../stock';

export interface InventoryReportData {
  totalItems: number;
  totalValue: number;
  lowStockItems: Medicine[];
  expiringItems: Medicine[];
  expiredItems: Medicine[];
  stockByCategory: Array<{
    category: string;
    count: number;
    value: number;
  }>;
}

export const generateInventoryReport = (medicines: Medicine[]): InventoryReportData => {
  const totalItems = medicines.length;
  const totalValue = medicines.reduce((sum, med) => sum + (med.price * med.stock), 0);

  const lowStockItems = medicines.filter(med => isLowStock(med.stock, med.minStockLevel));
  const expiringItems = medicines.filter(med => isExpiringSoon(med.expiryDate));
  const expiredItems = medicines.filter(med => isExpired(med.expiryDate));

  // Group by category
  const categoryMap = new Map<string, { count: number; value: number }>();
  medicines.forEach(med => {
    const existing = categoryMap.get(med.category) || { count: 0, value: 0 };
    categoryMap.set(med.category, {
      count: existing.count + 1,
      value: existing.value + (med.price * med.stock),
    });
  });

  const stockByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    ...data,
  }));

  return {
    totalItems,
    totalValue,
    lowStockItems,
    expiringItems,
    expiredItems,
    stockByCategory,
  };
};