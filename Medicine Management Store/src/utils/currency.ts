import { Medicine, Sale, SaleItem } from '../types';

const CURRENCY_SYMBOL = '₹';
const LOCALE = 'en-IN';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Helper for reports
export const formatReportCurrency = (amount: number): string => {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Helper for sales calculations
export const calculateSaleTotal = (items: SaleItem[]): number => {
  return items.reduce((total, item) => total + item.subtotal, 0);
};

// Helper for inventory value calculations
export const calculateInventoryValue = (medicines: Medicine[]): number => {
  return medicines.reduce((total, medicine) => total + (medicine.price * medicine.stock), 0);
};