import React from 'react';
import { Medicine } from '../../types';
import { generateAlerts } from '../../utils/alerts';

interface StockAlertsProps {
  medicines: Medicine[];
}

export function StockAlerts({ medicines }: StockAlertsProps) {
  const alerts = generateAlerts(medicines);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`p-4 rounded-md ${
            alert.severity === 'error'
              ? 'bg-red-50 text-red-800'
              : 'bg-yellow-50 text-yellow-800'
          }`}
        >
          <p className="font-medium">{alert.message}</p>
        </div>
      ))}
    </div>
  );
}