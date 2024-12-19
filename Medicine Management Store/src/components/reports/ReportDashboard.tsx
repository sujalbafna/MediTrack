import React from 'react';
import { ReportGenerator } from './ReportGenerator';
import { SalesReport } from './SalesReport';
import { InventoryReport } from './InventoryReport';
import { useMedicines } from '../../hooks/useMedicines';
import { useSales } from '../../hooks/useSales';
import { generateSalesReport } from '../../utils/reports/salesReport';
import { generateInventoryReport } from '../../utils/reports/inventoryReport';

export function ReportDashboard() {
  const { medicines } = useMedicines();
  const { sales } = useSales();
  const [reportType, setReportType] = React.useState<'sales' | 'inventory'>('sales');

  // Generate report data
  const salesReportData = React.useMemo(() => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    return generateSalesReport(sales, medicines, startDate, new Date());
  }, [sales, medicines]);

  const inventoryReportData = React.useMemo(() => {
    return generateInventoryReport(medicines);
  }, [medicines]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Reports & Analytics</h2>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setReportType('sales')}
              className={`px-4 py-2 rounded-md ${
                reportType === 'sales'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sales Report
            </button>
            <button
              onClick={() => setReportType('inventory')}
              className={`px-4 py-2 rounded-md ${
                reportType === 'inventory'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inventory Report
            </button>
          </div>
        </div>

        <ReportGenerator />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {reportType === 'sales' ? (
          <SalesReport data={salesReportData} />
        ) : (
          <InventoryReport data={inventoryReportData} />
        )}
      </div>
    </div>
  );
}