import { Medicine } from '../types';
import { isLowStock, isExpiringSoon, isExpired } from './stock';

export interface AlertItem {
  id: string;
  type: 'low-stock' | 'expiring' | 'expired';
  message: string;
  severity: 'warning' | 'error';
}

export const generateAlerts = (medicines: Medicine[]): AlertItem[] => {
  const alerts: AlertItem[] = [];

  medicines.forEach(medicine => {
    if (isLowStock(medicine.stock, medicine.minStockLevel)) {
      alerts.push({
        id: `low-stock-${medicine.id}`,
        type: 'low-stock',
        message: `${medicine.name} is running low (${medicine.stock} units remaining)`,
        severity: 'warning',
      });
    }

    if (isExpired(medicine.expiryDate)) {
      alerts.push({
        id: `expired-${medicine.id}`,
        type: 'expired',
        message: `${medicine.name} has expired`,
        severity: 'error',
      });
    } else if (isExpiringSoon(medicine.expiryDate)) {
      alerts.push({
        id: `expiring-${medicine.id}`,
        type: 'expiring',
        message: `${medicine.name} will expire on ${new Date(medicine.expiryDate).toLocaleDateString()}`,
        severity: 'warning',
      });
    }
  });

  return alerts;
};