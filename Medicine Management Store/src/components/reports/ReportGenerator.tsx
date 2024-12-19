import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { useMedicines } from '../../hooks/useMedicines';
import { useSales } from '../../hooks/useSales';
import { generateSalesReport } from '../../utils/reports/salesReport';
import { generateInventoryReport } from '../../utils/reports/inventoryReport';
import { formatSalesReportForExport, formatInventoryReportForExport } from '../../utils/reports/reportExport';

export function ReportGenerator() {
  const { medicines } = useMedicines();
  const { sales } = useSales();
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportType, setReportType] = useState<'sales' | 'inventory'>('sales');
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = async (format: 'pdf' | 'excel') => {
    try {
      setGenerating(true);
      let reportData;
      let formattedData;

      if (reportType === 'sales') {
        reportData = generateSalesReport(
          sales,
          medicines,
          new Date(startDate),
          new Date(endDate)
        );
        formattedData = formatSalesReportForExport(reportData);
      } else {
        reportData = generateInventoryReport(medicines);
        formattedData = formatInventoryReportForExport(reportData);
      }

      // Create a Blob with the report data
      const blob = new Blob(
        [JSON.stringify(formattedData, null, 2)],
        { type: format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Generate Reports</h2>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as 'sales' | 'inventory')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
            </select>
          </div>

          {reportType === 'sales' && (
            <>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => handleGenerateReport('pdf')}
            disabled={generating}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="h-5 w-5" />
            <span>{generating ? 'Generating...' : 'Export as PDF'}</span>
          </button>
          <button
            onClick={() => handleGenerateReport('excel')}
            disabled={generating}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileSpreadsheet className="h-5 w-5" />
            <span>{generating ? 'Generating...' : 'Export as Excel'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}