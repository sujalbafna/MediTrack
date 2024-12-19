import React from 'react';
import { InventoryReportData } from '../../utils/reports/inventoryReport';
import { formatCurrency } from '../../utils/currency';
import { formatDate } from '../../utils/date';

interface InventoryReportProps {
  data: InventoryReportData;
}

export function InventoryReport({ data }: InventoryReportProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
          <p className="mt-1 text-2xl font-semibold">{data.totalItems}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Inventory Value</h3>
          <p className="mt-1 text-2xl font-semibold">{formatCurrency(data.totalValue)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium p-4 border-b">Stock by Category</h3>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500">Category</th>
                <th className="text-right text-sm font-medium text-gray-500">Items</th>
                <th className="text-right text-sm font-medium text-gray-500">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.stockByCategory.map((category, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{category.category}</td>
                  <td className="text-right">{category.count}</td>
                  <td className="text-right">{formatCurrency(category.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium p-4 border-b">Low Stock Items</h3>
          <div className="p-4">
            <ul className="space-y-2">
              {data.lowStockItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-red-600">{item.stock} remaining</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium p-4 border-b">Expiring Soon</h3>
          <div className="p-4">
            <ul className="space-y-2">
              {data.expiringItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-orange-600">
                    Expires {formatDate(item.expiryDate)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}