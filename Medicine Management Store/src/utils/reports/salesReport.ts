import { Sale, SaleItem, Medicine } from '../../types';
import { formatCurrency } from '../currency';
import { formatDate } from '../date';

export interface SalesReportData {
  totalSales: number;
  totalRevenue: number;
  averageOrderValue: number;
  topSellingItems: Array<{
    medicineName: string;
    quantity: number;
    revenue: number;
  }>;
  dailySales: Array<{
    date: string;
    sales: number;
    revenue: number;
  }>;
}

export const generateSalesReport = (
  sales: Sale[],
  medicines: Medicine[],
  startDate: Date,
  endDate: Date
): SalesReportData => {
  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate >= startDate && saleDate <= endDate;
  });

  const totalSales = filteredSales.length;
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageOrderValue = totalRevenue / totalSales || 0;

  // Calculate sales by medicine
  const salesByMedicine = new Map<string, { quantity: number; revenue: number }>();
  filteredSales.forEach(sale => {
    sale.items.forEach(item => {
      const existing = salesByMedicine.get(item.medicineId) || { quantity: 0, revenue: 0 };
      salesByMedicine.set(item.medicineId, {
        quantity: existing.quantity + item.quantity,
        revenue: existing.revenue + item.subtotal,
      });
    });
  });

  // Get top selling items
  const topSellingItems = Array.from(salesByMedicine.entries())
    .map(([medicineId, data]) => ({
      medicineName: medicines.find(m => m.id === medicineId)?.name || 'Unknown',
      quantity: data.quantity,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Calculate daily sales
  const dailySales = getDailySalesData(filteredSales, startDate, endDate);

  return {
    totalSales,
    totalRevenue,
    averageOrderValue,
    topSellingItems,
    dailySales,
  };
};

const getDailySalesData = (sales: Sale[], startDate: Date, endDate: Date) => {
  const dailyData = new Map<string, { sales: number; revenue: number }>();
  
  // Initialize all dates in range
  const current = new Date(startDate);
  while (current <= endDate) {
    dailyData.set(formatDate(current.toISOString()), { sales: 0, revenue: 0 });
    current.setDate(current.getDate() + 1);
  }

  // Fill in sales data
  sales.forEach(sale => {
    const date = formatDate(sale.date);
    const existing = dailyData.get(date) || { sales: 0, revenue: 0 };
    dailyData.set(date, {
      sales: existing.sales + 1,
      revenue: existing.revenue + sale.total,
    });
  });

  return Array.from(dailyData.entries()).map(([date, data]) => ({
    date,
    ...data,
  }));
};