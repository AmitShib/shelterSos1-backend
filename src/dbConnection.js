const { Client } = require('pg');

const client = new Client({
  user: 'myuser',
  host: 'localhost', // Use the service name from the Docker Compose file
  database: 'shelterUsers', // Updated database name
  password: 'mysecretpassword',
  port: 5432, // Default PostgreSQL port
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database', err.stack));

// Query the users table within the users schema
const query = `
  SELECT *
  FROM "users"."users"; -- Double-quoted identifiers for case-sensitivity
`;

client.query(query, (err, res) => {
  if (err) throw err;
  console.log(res.rows);
  client.end(); // Close the connection
});