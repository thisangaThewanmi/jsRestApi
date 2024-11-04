
////////////////////////////////       Adding the Database   /////////////////////////////////

const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Replace with your MySQL username
    password: 'Ijse@1234',   // Replace with your MySQL password
    database: 'books_db'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//////////////////////////////          Crud Operations  ///////////////////////////////



app.get('/api/books', (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});



//SAVE A BOOK
app.post('/api/books', (req, res) => {
    const { title, author } = req.body;
    const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
    db.query(query, [title, author], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Respond with the newly created book
        res.status(201).json({ id: result.insertId, title, author });
    });
});



//UPDATE A BOOK
app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const query = 'UPDATE books SET title = ?, author = ? WHERE id = ?';
    db.query(query, [title, author, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).send('Book not found');

        res.json({ id, title, author });
    });
});



// DELETE  A BOOK
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).send('Book not found');

        res.json({ message: `Book with id ${id} deleted successfully` });
    });
});
