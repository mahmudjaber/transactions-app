const express = require('express');
const router = express.Router();
const db = require('../database');

// Route handler for fetching all banks
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM banks');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching accounts.' });
  }
});

// Add more route handlers for accounts here (e.g., creating, updating, and deleting accounts)
// Route handler for updating an account by ID
router.put('/:id', async (req, res) => {
    const bankId = req.params.id;
    const { name } = req.body;
  
    try {
      const [result] = await db.execute('UPDATE banks SET name = ? WHERE id = ?', [name, bankId]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'bank not found.' });
      } else {
        res.json({ message: 'bank updated successfully.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the bank.' });
    }
  });
// Route handler for fetching a single account by ID
router.get('/:id', async (req, res) => {
    const bankId = req.params.id;
  
    try {
      const [rows] = await db.execute('SELECT * FROM banks WHERE id = ?', [bankId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'bank not found.' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the bank.' });
    }
  });
    
module.exports = router;
