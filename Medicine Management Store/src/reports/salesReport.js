import { format } from 'date-fns';
import { generatePDF } from '../utils/pdfGenerator.js';
import { generateExcel } from '../utils/excelGenerator.js';
import Database from 'better-sqlite3';

export async function generateSalesReport(startDate, endDate, outputFormat = 'json') {
  const db = new Database('pharmacy.db');
  
  const sales = db.prepare(`
    SELECT 
      s.id,
      i.name as medicine_name,
      c.name as customer_name,
      s.quantity,
      s.price,
      s.date
    FROM sales s
    JOIN inventory i ON s.medicine_id = i.id
    JOIN customers c ON s.customer_id = c.id
    WHERE s.date BETWEEN ? AND ?
    ORDER BY s.date DESC
  `).all(startDate, endDate);

  const report = {
    generatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    period: { startDate, endDate },
    totalSales: sales.reduce((sum, sale) => sum + (sale.quantity * sale.price), 0),
    salesCount: sales.length,
    sales
  };

  switch (outputFormat.toLowerCase()) {
    case 'pdf':
      return generatePDF(report);
    case 'excel':
      return generateExcel(report);
    default:
      return report;
  }
}