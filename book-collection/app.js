const express = require('express');
const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// Array to store books
let books = [];

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to add a book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const id = generateId();
  const book = {
    id,
    title,
    author,
    publishedDate
  };

  books.push(book);
  res.json(book);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted successfully' });
});

// Helper function to generate a unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
