import { SalesReportData } from './salesReport';
import { InventoryReportData } from './inventoryReport';
import { formatDate } from '../date';
import { formatCurrency } from '../currency';

export const generateReportFileName = (type: 'sales' | 'inventory', format: 'pdf' | 'excel'): string => {
  const date = formatDate(new Date().toISOString()).replace(/\//g, '-');
  return `${type}-report-${date}.${format}`;
};

export const formatSalesReportForExport = (data: SalesReportData) => {
  return {
    summary: {
      'Total Sales': data.totalSales,
      'Total Revenue': formatCurrency(data.totalRevenue),
      'Average Order Value': formatCurrency(data.averageOrderValue),
    },
    topSellingItems: data.topSellingItems.map(item => ({
      'Medicine Name': item.medicineName,
      'Quantity Sold': item.quantity,
      'Revenue': formatCurrency(item.revenue),
    })),
    dailySales: data.dailySales.map(day => ({
      'Date': day.date,
      'Number of Sales': day.sales,
      'Revenue': formatCurrency(day.revenue),
    })),
  };
};

export const formatInventoryReportForExport = (data: InventoryReportData) => {
  return {
    summary: {
      'Total Items': data.totalItems,
      'Total Value': formatCurrency(data.totalValue),
    },
    stockByCategory: data.stockByCategory.map(category => ({
      'Category': category.category,
      'Item Count': category.count,
      'Total Value': formatCurrency(category.value),
    })),
    lowStockItems: data.lowStockItems.map(item => ({
      'Name': item.name,
      'Current Stock': item.stock,
      'Minimum Stock Level': item.minStockLevel,
    })),
    expiringItems: data.expiringItems.map(item => ({
      'Name': item.name,
      'Expiry Date': formatDate(item.expiryDate),
      'Current Stock': item.stock,
    })),
  };
};