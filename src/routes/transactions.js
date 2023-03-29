const express = require('express');
const router = express.Router();

// Add your route handlers for transactions here

  // Route handler for fetching all transactions
router.get('/', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM transactions');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching transactions.' });
    }
  });
  // Route handler for updating a transaction by ID
router.put('/:id', async (req, res) => {
    const transactionId = req.params.id;
    const { name } = req.body;
  
    try {
      const [result] = await db.execute('UPDATE transactions SET name = ? WHERE id = ?', [name, transactionId]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'transaction not found.' });
      } else {
        res.json({ message: 'transaction updated successfully.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the transaction.' });
    }
  });
  // Route handler for fetching a single transaction by ID
router.get('/:id', async (req, res) => {
    const transactionId = req.params.id;
  
    try {
      const [rows] = await db.execute('SELECT * FROM transactions WHERE id = ?', [transactionId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'transaction not found.' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the transaction.' });
    }
  });
  
module.exports = router;