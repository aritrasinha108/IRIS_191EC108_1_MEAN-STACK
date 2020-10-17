const express = require('express');

const router = express.Router();
const Books = require('../models/books');

const Requests = require('../models/request');
router.get('/', async (req, res) => {
    let books = await Books.find({});
    books = books.filter(book => book.qty >= 1);
    res.render('student/dashboard', { user: req.user, books: books });
});
router.get('/view/:id', async (req, res) => {
    const book = await Books.findById(req.params.id);
    res.render("student/view", { user: req.user, book: book });
});
router.get('/issue/:id', async (req, res) => {
    const book = await Books.findById(req.params.id);
    if (book.qty >= 1) {

        let prevreq = await Requests.find({ email: req.user.email });
        if (prevreq.findIndex(r => r.bookId == req.params.id) == -1) {
            let newReq = new Requests({
                name: req.user.name,
                email: req.user.email,
                book: book.title,
                bookId: book.id
            });
            await newReq.save();
            req.flash('success_msg', "Issue request created! Please wait for the admin to respond");
            res.redirect('/student');
        }
        else {
            req.flash('error_msg', "Book already requested for issue");
            res.redirect('/student');
        }
    }
    else {
        req.flash("error_msg", "Book not available!!");
        res.redirect('/student');
    }
});

router.get('/mybooks', async (req, res) => {

    let reqs = await Requests.find({ email: req.user.email });
    let index = 0;
    reqs.forEach(r => {
        if (r.status != "Approved") {
            reqs.splice(index, 1);
            index--;
        }
        index++;

    });
    let bookids = [];

    reqs = reqs.filter(r => r.status == "Approved");
    reqs.forEach(r => {
        bookids.push(r.bookId);

    });
    console.log(bookids);
    books = await Books.find({});


    books = books.filter(b => bookids.findIndex(id => id == b.id) != -1)
    console.log(books);
    res.render('student/mybooks', { user: req.user, mybooks: books });

});
router.post('/search', async (req, res) => {
    const tags = req.body.tags.split(' ');
    console.log(tags);
    reqBooks = [];
    let books = await Books.find({});
    books = books.filter(book => book.qty >= 1);

    tags.forEach(t => {
        t = t.toUpperCase();
        books.forEach(p => {
            if (reqBooks.findIndex(r => r == p) == -1 && p.tags.findIndex(tag => tag == t) != -1)
                reqBooks.push(p);
        })


    })


    res.render('student/dashboard', { user: req.user, books: reqBooks });




});
router.get('/return/:id', async (req, res) => {
    let book = await Books.findById(req.params.id);

    book.qty = book.qty + 1;
    let requests = await Requests.find({ bookId: req.params.id });
    let request;
    requests.forEach(r => {
        if (r.status == 'Approved' && r.email == req.user.email) {
            request = r;

        }

    })
    console.log(request);
    if (request) {
        request.status = "Returned";
        await request.save();
        await book.save();
        req.flash('succes_msg', "Book returned succesfully");
        res.redirect('/student/mybooks');
    }
    else {
        req.flash('succes_msg', "Book already returned");
        res.redirect('/student/mybooks');
    }
});
router.get('/trans', async (req, res) => {
    let reqs = await Requests.find({ email: req.user.email }).sort({ createdAt: 'desc' });


    res.render('student/transanctions', { user: req.user, reqs: reqs });
})


module.exports = router;