import React from 'react';
import { SalesReportData } from '../../utils/reports/salesReport';
import { formatCurrency } from '../../utils/currency';

interface SalesReportProps {
  data: SalesReportData;
}

export function SalesReport({ data }: SalesReportProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="mt-1 text-2xl font-semibold">{data.totalSales}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-1 text-2xl font-semibold">{formatCurrency(data.totalRevenue)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
          <p className="mt-1 text-2xl font-semibold">{formatCurrency(data.averageOrderValue)}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium p-4 border-b">Top Selling Items</h3>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500">Medicine</th>
                <th className="text-right text-sm font-medium text-gray-500">Quantity</th>
                <th className="text-right text-sm font-medium text-gray-500">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.topSellingItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{item.medicineName}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{formatCurrency(item.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium p-4 border-b">Daily Sales Trend</h3>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-gray-500">Date</th>
                <th className="text-right text-sm font-medium text-gray-500">Sales</th>
                <th className="text-right text-sm font-medium text-gray-500">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.dailySales.map((day, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{day.date}</td>
                  <td className="text-right">{day.sales}</td>
                  <td className="text-right">{formatCurrency(day.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}