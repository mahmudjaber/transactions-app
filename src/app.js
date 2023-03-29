const express = require('express');
const path = require('path');
const routes = require('./routes');
const db = require('./database');

// Use the `db` object to perform database operations, such as queries

const app = express();
const port = process.env.PORT || 3000;
const transactionsRoutes = require('./routes/transactions');
const accountsRoutes = require('./routes/accounts');
const categoriesRoutes = require('./routes/categories');
const transactionTypesRoutes = require('./routes/transactionTypes');
const banksRoutes = require('./routes/banks');
const usersRoutes = require('./routes/users');
const userLogsRoutes = require('./routes/userLogs');
// ...
app.use('/api/users', userRoutes);
require('dotenv').config();
// ...
// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
// Middleware to parse JSON request bodies
app.use(express.json());
// Use routes
app.use('/', routes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/transaction-types', transactionTypesRoutes);
app.use('/api/banks', banksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/user-logs', userLogsRoutes);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});