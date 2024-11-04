const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());


// Use CORS middleware
app.use(cors());

// Import the books routes
const booksRoutes = require('./routes/bookRoutes.js');

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the REST API!');
});

// Use books routes
app.use('/api/books', booksRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


