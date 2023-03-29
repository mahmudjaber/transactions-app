const express = require('express');
const router = express.Router();
const db = require('../database');

// Route handler for fetching all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
});

// Add more route handlers for accounts here (e.g., creating, updating, and deleting categories)
// Route handler for updating an categories by ID
router.put('/:id', async (req, res) => {
    const categoriesId = req.params.id;
    const { name } = req.body;
  
    try {
      const [result] = await db.execute('UPDATE accounts SET name = ? WHERE id = ?', [name, categoriesId]);
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'categories not found.' });
      } else {
        res.json({ message: 'categories updated successfully.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the categories.' });
    }
  });
// Route handler for fetching a single categories by ID
router.get('/:id', async (req, res) => {
    const categoriesId = req.params.id;
  
    try {
      const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [categoriesId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'categories not found.' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the account.' });
    }
  });
    
module.exports = router;
