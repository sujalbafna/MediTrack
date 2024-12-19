import express from 'express';
import { generateReport } from '../controllers/reportsController.js';

export const reportsRouter = express.Router();

reportsRouter.get('/', (req, res) => {
  res.render('reports', { 
    title: 'Reports',
    active: 'reports'
  });
});

reportsRouter.post('/generate', async (req, res) => {
  try {
    const { reportType, startDate, endDate, format } = req.body;
    const report = await generateReport(reportType, startDate, endDate, format);
    
    if (format === 'json') {
      res.json(report);
    } else {
      res.setHeader('Content-Type', format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=report.${format}`);
      res.send(report);
    }
  } catch (error) {
    res.status(500).render('error', { error });
  }
});