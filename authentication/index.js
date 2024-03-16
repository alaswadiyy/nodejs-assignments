const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to extract authentication username and password from header
const extractAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');
    req.username = username;
    req.password = password;
  }
  next();
};

// Middleware to free up the body for other method types
app.use(bodyParser.json());

// Middleware to extract authentication info from header
app.use(extractAuth);

// Dummy authentication middleware for demonstration purposes
const authenticate = (req, res, next) => {
  if (req.username && req.password) {
    // Here you would perform actual authentication
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// Dummy middleware for endpoints to return a response
const dummyResponse = (req, res) => {
  res.send('Response from endpoint');
};

// Endpoints for books
app.get('/books', authenticate, dummyResponse);
app.post('/books', authenticate, dummyResponse);
app.put('/books/:id', authenticate, dummyResponse);
app.patch('/books/:id', authenticate, dummyResponse);
app.delete('/books/:id', authenticate, dummyResponse);

// Endpoints for authors
app.get('/authors', authenticate, dummyResponse);
app.post('/authors', authenticate, dummyResponse);
app.put('/authors/:id', authenticate, dummyResponse);
app.patch('/authors/:id', authenticate, dummyResponse);
app.delete('/authors/:id', authenticate, dummyResponse);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
