const express = require('express');
const router = express.Router();
const Books = require('../models/books');
const Request = require('../models/request');
router.get('/', async (req, res) => {
    const books = await Books.find({});
    res.render('student/dashboard', { user: req.user, books: books });
});
router.get('/view/:id', async (req, res) => {
    const book = await Books.findById(req.params.id);
    res.render("student/view", { user: req.user, book: book });
});
router.get('/issue/:id', async (req, res) => {
    const book = await Books.findById(req.params.id);
    let newReq = new Request({
        name: req.user.name,
        email: req.user.email,
        book: book.title,
        bookId: book.id
    });
    await newReq.save();
    req.flash('success_msg', "Issue request created! Please wait for the admin to respond");
    res.redirect('/student');
});


module.exports = router;