import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

export const dashboardRouter = express.Router();

dashboardRouter.get('/', async (req, res) => {
  try {
    const stats = await getDashboardStats();
    res.render('dashboard', { 
      title: 'Dashboard',
      stats,
      active: 'dashboard'
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});