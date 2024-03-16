const express = require('express');
const authorRouter = require('./authorRouter'); // Link the router

const app = express();

const logger = (message) => {
  console.log(`[${new Date().toISOString()}] - ${message}`);
};
// ** Global Logger Middleware (replace with your implementation) **
app.use((req, res, next) => {
  const method = req.method;
  const url = req.url;
  logger(`${method} ${url}`);
  next();
});

// Mount the author router on a specific path (e.g., /api/authors)
app.use('/api/authors', authorRouter);

// Error handling (optional)
app.use((err, req, res, next) => {
  logger(`Error: ${err.message}`);
  res.status(500).send('Internal server error');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});