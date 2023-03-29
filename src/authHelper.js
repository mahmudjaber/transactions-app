const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function signToken(userId) {
  return jwt.sign({ userId: userId }, secret, { expiresIn: '1h' });
}

function verifyToken(token, callback) {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
}

module.exports = {
  signToken,
  verifyToken,
};