const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController');

// Define routes and link them to controller functions
router.get('/', booksController.getAllBooks);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
