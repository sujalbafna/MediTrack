import { format } from 'date-fns';
import { generatePDF } from '../utils/pdfGenerator.js';
import { generateExcel } from '../utils/excelGenerator.js';
import Database from 'better-sqlite3';

export async function generateInventoryReport(outputFormat = 'json') {
  const db = new Database('pharmacy.db');
  
  const inventory = db.prepare(`
    SELECT 
      i.*,
      (SELECT COUNT(*) FROM sales s WHERE s.medicine_id = i.id) as total_sales,
      CASE 
        WHEN quantity <= reorder_level THEN 'Low Stock'
        ELSE 'In Stock'
      END as stock_status
    FROM inventory i
    ORDER BY total_sales DESC
  `).all();

  const report = {
    generatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    totalItems: inventory.length,
    lowStockItems: inventory.filter(item => item.stock_status === 'Low Stock'),
    inventory
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