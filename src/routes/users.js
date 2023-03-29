const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const db = require('../database');

// Read the JWT secret key from the environment variable
const jwtSecret = process.env.JWT_SECRET;

// ... Other route handlers ...

// Middleware to verify JWT and extract user ID
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
}

router.get('/protected-route', requireAuth, (req, res) => {
  // ... Handle the request using the authenticated user ID from req.userId ...
});

router.post('/login', async (req, res) => {
  // ... Perform user authentication (e.g., check email and password) ...

  if (userIsValid) {
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token: token });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

module.exports = router;