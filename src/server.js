const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const reportRoutes = require('./reportRoutes');

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mount the user routes
app.use('/', userRoutes);
app.use('/', reportRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});