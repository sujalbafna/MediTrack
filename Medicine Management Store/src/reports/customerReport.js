import { format } from 'date-fns';
import { generatePDF } from '../utils/pdfGenerator.js';
import { generateExcel } from '../utils/excelGenerator.js';
import Database from 'better-sqlite3';

export async function generateCustomerReport(startDate, endDate, outputFormat = 'json') {
  const db = new Database('pharmacy.db');
  
  const customers = db.prepare(`
    SELECT 
      c.*,
      COUNT(s.id) as total_purchases,
      SUM(s.quantity * s.price) as total_spent
    FROM customers c
    LEFT JOIN sales s ON c.id = s.customer_id
    WHERE s.date BETWEEN ? AND ?
    GROUP BY c.id
    ORDER BY total_spent DESC
  `).all(startDate, endDate);

  const report = {
    generatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    period: { startDate, endDate },
    totalCustomers: customers.length,
    totalRevenue: customers.reduce((sum, customer) => sum + (customer.total_spent || 0), 0),
    customers
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