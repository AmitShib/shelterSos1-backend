const express = require('express');
const router = express.Router();
const client = require('./dbConnection');

// Route to fetch all users
router.get('/api/users', (req, res) => {
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

// Route to add a new user
router.post('/api/users', (req, res) => {
    const { userName, password, isManager } = req.body;
  
    const query = `
      INSERT INTO "users"."users" ("userName", "password", "isManager")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  
    client.query(query, [userName, password, isManager], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error adding user' });
      }
  
      res.status(201).json(result.rows[0]);
    });
  });
  
  // Route to find a user by userName
  router.get('/api/users/:userName', (req, res) => {
    const userName = req.params.userName;
  
    const query = `
      SELECT "userName", "password", "isManager"
      FROM "users"."users"
      WHERE "userName" = $1;
    `;
  
    client.query(query, [userName], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching user' });
      }
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(result.rows[0]);
    });
  });
  

module.exports = router;