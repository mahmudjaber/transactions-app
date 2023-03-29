
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
  const { username, password } = req.body;

  console.log('Username:', username);
  console.log('Password:', password);

  try {
    const [user] = (await db.query('SELECT * FROM users WHERE username = ?', [username]))[0];

    console.log('User from database:', user);

    if (user) {
      console.log('Before bcrypt.compare() - password:', password, 'user.password:', user.password);
      const passwordIsValid = await bcrypt.compare(password, user.password);

      console.log('Password is valid:', passwordIsValid);

      if (passwordIsValid) {
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token: token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;