// requiring express routes
var router = require('express').Router();

// require our book Schema
var Book = require('../models/book');

// our home route
router.get('/', function(req, res, next) {
    Book.find({}).exec(function(err, books) {
        // return an error when it occurs
        if (err) return next(err);
        // return the books object to iterate on the view
        res.render('book/book-list', { 
        	book: books,
        	success: ""
        });
    });
});

// switch to the add-book view
router.get('/book', function(req, res, next) {
    res.render('book/add-book', { message: "" });
})

// post or add a new book
router.post('/book', function(req, res, next) {
    // create a new book instance
    var newBook = new Book();

    // get the submitted book attributes
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function(err, book) {
        // incase of an error return it
        if (err) return next(err);
        // return success feedback
        res.render('book/add-book', { message: 'Book successfully added' });
    });
});

router.get('/update-book/:id', function(req, res, next) {
    // return a single book
    Book.findOne({ _id: req.params.id }).exec(function(err, book) {
        // return an error message when it occurs
        if (err) return next(err);
        // return the single book
        res.render('book/edit-book', {
            book: book,
            success: ""
        });
    });
});

router.post('/update-book/:id', function(req, res, next) {
    // find a book to update
    Book.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                category: req.body.category
            }
        }, { upsert: true },
        function(err, newBook) {
            if (err) return next(err);
            res.render('book/edit-book', {
                success: 'Record successfully updated',
                book: newBook
            });

        });
});

router.get('/delete-book/:id', function(req, res, next) {
    res.render('book/book-list');
});

router.post('/delete-book/:id', function(req, res, next) {
    Book.findOneAndRemove({
        _id: req.params.id
    }, function(err, book) {
        if (err) return next(err);

        Book.find({}).exec(function(err, books) {
        	if (err) return next(err);
        	if (err) return next(err);
            res.render('book/book-list', {
                success: "Book successfully deleted",
                book: books
            });
        });

    });
});

// export routes that they be used in other files
module.exports = router;
