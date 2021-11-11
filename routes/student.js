const express = require('express');
const router = express.Router();
const Books = require('../models/books');

function isAdmin(req, res, next) {
    if (req.user.admin == false) {
        next();
    }
    else {
        req.flash('error_msg', "Please login as student to continue");
        res.redirect('/main/');
    }
}

// Landing page for students where list of available books are shown
router.get('/', isAdmin, async (req, res) => {
    let books = await Books.find({});

    books = books.filter(book => book.qty >= 1); //Checking for availibility 
    res.render('student/dashboard', { user: req.user, books: books });
});
// To view books according to the id
router.get('/view/:id', isAdmin, async (req, res) => {
    const book = await Books.findById(req.params.id);
    res.render("student/view", { user: req.user, book: book });
});

// To search for books using tags
router.post('/search', isAdmin, async (req, res) => {
    const tags = req.body.tags.split(' ');
    console.log(tags);
    reqBooks = [];
    let books = await Books.find({});
    books = books.filter(book => book.qty >= 1);

    tags.forEach(t => {
        t = t.toUpperCase();
        books.forEach(p => {
            if (reqBooks.findIndex(r => r == p) == -1 && p.tags.findIndex(tag => tag.toUpperCase() == t) != -1)
                reqBooks.push(p);
        })


    })


    res.render('student/dashboard', { user: req.user, books: reqBooks });




});

module.exports = router;