import { Medicine } from '../types';

export const isLowStock = (currentStock: number, minStockLevel: number): boolean => {
  return currentStock <= minStockLevel;
};

export const isExpiringSoon = (expiryDate: string, thresholdDays: number = 30): boolean => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= thresholdDays && diffDays > 0;
};

export const isExpired = (expiryDate: string): boolean => {
  return new Date(expiryDate) <= new Date();
};

export const getStockStatus = (medicine: Medicine): 'low' | 'expired' | 'expiring' | 'ok' => {
  if (isExpired(medicine.expiryDate)) return 'expired';
  if (isLowStock(medicine.stock, medicine.minStockLevel)) return 'low';
  if (isExpiringSoon(medicine.expiryDate)) return 'expiring';
  return 'ok';
};