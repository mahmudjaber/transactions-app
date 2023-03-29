const express = require('express');
const router = express.Router();
const db = require('../database');

// Route handler for fetching all accounts
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM accounts');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching accounts.' });
  }
});

// Add more route handlers for accounts here (e.g., creating, updating, and deleting accounts)
// Route handler for updating an account by ID
router.put('/:id', async (req, res) => {
    const accountId = req.params.id;
    const { name } = req.body;
  
    try {
      const [result] = await db.execute('UPDATE accounts SET name = ? WHERE id = ?', [name, accountId]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Account not found.' });
      } else {
        res.json({ message: 'Account updated successfully.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the account.' });
    }
  });
// Route handler for fetching a single account by ID
router.get('/:id', async (req, res) => {
    const accountId = req.params.id;
  
    try {
      const [rows] = await db.execute('SELECT * FROM accounts WHERE id = ?', [accountId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'Account not found.' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the account.' });
    }
  });
    
module.exports = router;
