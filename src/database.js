const mysql = require('mysql2');
const express = require('express');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jaber123@',
  database: 'transactions_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();

