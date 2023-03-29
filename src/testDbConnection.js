const db = require('./database');
const express = require('express');
const router = express.Router();

async function testConnection() {
  try {
    const [rows] = await db.execute('SELECT 1');
    console.log('Database connection is successful.');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();
module.exports = router;