import express from 'express';
import { 
  getInventoryList,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from '../controllers/inventoryController.js';

export const inventoryRouter = express.Router();

inventoryRouter.get('/', async (req, res) => {
  try {
    const inventory = await getInventoryList();
    res.render('inventory', { 
      title: 'Inventory Management',
      inventory,
      active: 'inventory'
    });
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

inventoryRouter.post('/add', async (req, res) => {
  try {
    await addInventoryItem(req.body);
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

inventoryRouter.post('/update/:id', async (req, res) => {
  try {
    await updateInventoryItem(req.params.id, req.body);
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});

inventoryRouter.post('/delete/:id', async (req, res) => {
  try {
    await deleteInventoryItem(req.params.id);
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).render('error', { error });
  }
});