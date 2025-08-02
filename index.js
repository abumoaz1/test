const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection config
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

// Native function to fetch users
async function fetchUsers() {
  try {
    const result = await pool.query('SELECT name FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// IIFE to call the function
(async () => {
  try {
    const users = await fetchUsers();
    console.log('Users:', users);
  } catch (err) {
    console.error('Failed to fetch users:', err.message);
  } finally {
    await pool.end(); // Close the DB connection
  }
})();
