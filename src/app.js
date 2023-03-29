
const express = require('express');
const path = require('path');
const routes = require('./routes');
const db = require('./database');
const bodyParser = require('body-parser'); // Add this line

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const transactionsRoutes = require('./routes/transactions');
const accountsRoutes = require('./routes/accounts');
const categoriesRoutes = require('./routes/categories');
const transactionTypesRoutes = require('./routes/transactionTypes');
const banksRoutes = require('./routes/banks');
const usersRoutes = require('./routes/users');
const userLogsRoutes = require('./routes/userLogs');

app.use(express.static(path.join(__dirname, '../public')));

// Add these lines to configure the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/transaction-types', transactionTypesRoutes);
app.use('/api/banks', banksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/user-logs', userLogsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
