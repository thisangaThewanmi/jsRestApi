const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const books = [
    { id: 1, title: "Book One", author: "Author One" },
    { id: 2, title: "Book Two", author: "Author Two" },
];

// GET all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

