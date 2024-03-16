const express = require('express');

const router = express.Router();

// Replace with your logic for data storage (e.g., database connection)
let authors = [];

// Global logger function (replace with your implementation)


// ** CRUD Endpoints **

// Create
router.post('/', (req, res) => {
  const newAuthor = req.body;
  authors.push(newAuthor);
  logger(`Author created: ${newAuthor.name}`);
  res.json(newAuthor);
});

// Read All
router.get('/', (req, res) => {
  logger(`All authors retrieved`);
  res.json(authors);
});

// Read One
router.get('/:id', (req, res) => {
  const authorId = req.params.id;
  const author = authors.find(author => author.id === authorId);
  if (author) {
    logger(`Author retrieved: ${author.name}`);
    res.json(author);
  } else {
    logger(`Author not found: ${authorId}`);
    res.status(404).send('Author not found');
  }
});

// Update
router.put('/:id', (req, res) => {
  const authorId = req.params.id;
  const updatedAuthor = req.body;
  const authorIndex = authors.findIndex(author => author.id === authorId);
  if (authorIndex !== -1) {
    authors[authorIndex] = updatedAuthor;
    logger(`Author updated: ${updatedAuthor.name}`);
    res.json(updatedAuthor);
  } else {
    logger(`Author not found for update: ${authorId}`);
    res.status(404).send('Author not found');
  }
});

// Delete
router.delete('/:id', (req, res) => {
  const authorId = req.params.id;
  const authorIndex = authors.findIndex(author => author.id === authorId);
  if (authorIndex !== -1) {
    const deletedAuthor = authors.splice(authorIndex, 1);
    logger(`Author deleted: ${deletedAuthor[0].name}`);
    res.json({ message: 'Author deleted' });
  } else {
    logger(`Author not found for deletion: ${authorId}`);
    res.status(404).send('Author not found');
  }
});

module.exports = router;
