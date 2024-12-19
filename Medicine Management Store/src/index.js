import express from 'express';
import session from 'express-session';
import ConnectSqlite3 from 'connect-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupDatabase } from './database/setup.js';
import { dashboardRouter } from './routes/dashboard.js';
import { inventoryRouter } from './routes/inventory.js';
import { reportsRouter } from './routes/reports.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SQLiteStore = ConnectSqlite3(session);

const app = express();
const port = 3000;

// Initialize database
setupDatabase();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: new SQLiteStore({
    db: 'sessions.db',
    dir: './src/database'
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/dashboard', dashboardRouter);
app.use('/inventory', inventoryRouter);
app.use('/reports', reportsRouter);

// Root route
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.listen(port, () => {
  console.log(`Pharmacy system running on port ${port}`);
});