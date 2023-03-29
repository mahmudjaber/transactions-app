const bcrypt = require('bcrypt');
const db = require('./database');

// Replace the values below with your predefined user's information
const predefinedUser = {
  email: 'mahmud@test.com',
  password: 'Jaber123@', // Replace with the user's password
  username: 'mahmoud',
};

async function addPredefinedUser() {
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(predefinedUser.password, 10);

    // Insert the user into the users table with the hashed password
    const query = `
      INSERT INTO users (email, password, username)
      VALUES (?, ?, ?);
    `;
    const result = await db.query(query, [predefinedUser.email, hashedPassword, predefinedUser.username]);

    console.log('Predefined user added successfully:', predefinedUser.email);
  } catch (error) {
    console.error('Error adding predefined user:', error.message);
  } finally {
    // Close the database connection
    await db.end();
  }
}

addPredefinedUser();
