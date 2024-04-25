const express = require('express');
const app = express();
const { Client } = require('pg');

// PostgreSQL connection details
const client = new Client({
  user: 'myuser',
  host: 'localhost', // Replace with the appropriate host (container IP or service name)
  database: 'shelterUsers',
  password: 'mysecretpassword',
  port: 5432,
});

// Connect to the PostgreSQL database
client.connect();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to fetch all users
app.get('/api/users', (req, res) => {
  const query = `
    SELECT "userName", "password", "isManager"
    FROM "users"."users";
  `;

  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching users' });
    }

    res.json(result.rows);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});