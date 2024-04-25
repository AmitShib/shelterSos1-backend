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

module.exports = client;