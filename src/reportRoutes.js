// reportRoutes.js
const express = require('express');
const router = express.Router();
const client = require('./dbConnection');

// Route to fetch all reports
router.get('/api/reports', (req, res) => {
  const query = `
    SELECT "shelterNum", "report"
    FROM "shelters"."reports";
  `;

  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error fetching reports' });
    }

    res.json(result.rows);
  });
});

// Route to add a new report
router.post('/api/reports', (req, res) => {
  const { shelterNum, report } = req.body;

  const query = `
    INSERT INTO "shelters"."reports" ("shelterNum", "report")
    VALUES ($1, $2)
    RETURNING *;
  `;

  client.query(query, [shelterNum, report], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error adding report' });
    }

    res.status(201).json(result.rows[0]);
  });
});

// Route to edit an existing report
router.put('/api/reports/:shelterNum', (req, res) => {
  const shelterNum = req.params.shelterNum;
  const { report } = req.body;

  const query = `
    UPDATE "shelters"."reports"
    SET "report" = $1
    WHERE "shelterNum" = $2
    RETURNING *;
  `;

  client.query(query, [report, shelterNum], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error updating report' });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(result.rows[0]);
  });
});

module.exports = router;
