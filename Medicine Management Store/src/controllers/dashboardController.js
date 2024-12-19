import Database from 'better-sqlite3';

export async function getDashboardStats() {
  const db = new Database('pharmacy.db');
  
  // Get total sales
  const totalSales = db.prepare(`
    SELECT SUM(quantity * price) as total
    FROM sales
  `).get().total || 0;

  // Get low stock count
  const lowStockCount = db.prepare(`
    SELECT COUNT(*) as count
    FROM inventory
    WHERE quantity <= reorder_level
  `).get().count;

  // Get active customers (made purchase in last 30 days)
  const activeCustomers = db.prepare(`
    SELECT COUNT(DISTINCT customer_id) as count
    FROM sales
    WHERE date >= datetime('now', '-30 days')
  `).get().count;

  // Get recent sales
  const recentSales = db.prepare(`
    SELECT 
      s.date,
      i.name as medicine_name,
      (s.quantity * s.price) as amount
    FROM sales s
    JOIN inventory i ON s.medicine_id = i.id
    ORDER BY s.date DESC
    LIMIT 5
  `).all();

  // Get low stock items
  const lowStockItems = db.prepare(`
    SELECT name, quantity, reorder_level
    FROM inventory
    WHERE quantity <= reorder_level
    ORDER BY quantity ASC
    LIMIT 5
  `).all();

  return {
    totalSales,
    lowStockCount,
    activeCustomers,
    recentSales,
    lowStockItems
  };
}