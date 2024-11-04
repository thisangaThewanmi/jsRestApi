const db = require('../config/db');

// Get all books
exports.getAllBooks = (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Save a new book
exports.createBook = (req, res) => {
    const { title, author } = req.body;
    const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
    db.query(query, [title, author], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, title, author });
    });
};

// Update a book
exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const query = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
    db.query(query, [title, author, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).send('Book not found');
        res.json({ id, title, author });
    });
};

// Delete a book
exports.deleteBook = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).send('Book not found');
        res.json({ message: `Book with id ${id} deleted successfully` });
    });
};
