const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  
  // Get the endpoint and additional parameters from the parsed URL
  const { pathname } = parsedUrl;
  
  // Set the response header with a JSON content type
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Handle different endpoints
  if (pathname === '/books' && req.method === 'GET') {
    // Handle GET /books
    res.end(JSON.stringify({ message: 'Get all books' }));
  } else if (pathname === '/books' && req.method === 'PUT') {
    // Handle PUT /books
    res.end(JSON.stringify({ message: 'Update books' }));
  } else if (pathname === '/books' && req.method === 'DELETE') {
    // Handle DELETE /books
    res.end(JSON.stringify({ message: 'Delete all books' }));
  } else if (pathname.startsWith('/books/author/') && req.method === 'GET') {
    // Handle GET /books/author/:authorId
    const authorId = pathname.split('/').pop();
    res.end(JSON.stringify({ message: `Get books by author with ID ${authorId}` }));
  } else if (pathname.startsWith('/books/author/') && req.method === 'POST') {
    // Handle POST /books/author/:authorId
    const authorId = pathname.split('/').pop();
    res.end(JSON.stringify({ message: `Create a book for author with ID ${authorId}` }));
  } else if (pathname.startsWith('/books/author/') && req.method === 'PUT') {
    // Handle PUT /books/author/:authorId
    const authorId = pathname.split('/').pop();
    res.end(JSON.stringify({ message: `Update books by author with ID ${authorId}` }));
  } else {
    // Handle unknown endpoint
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const port = 3000;
const hostname = 'localhost';

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
