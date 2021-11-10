const express = require('express');
const router = express.Router();
const Requests = require('../models/request');
const Books = require('../models/books');

// If a student tries to enter through the url 
function isAdmin(req, res, next) {
    if (req.user.admin == true) {
        next();
    }
    else {
        req.flash('error_msg', "Please login as admin to continue");
        res.redirect('/student/');
    }
}
// Landing page for the admin to get all books uploaded
router.get('/', isAdmin, async (req, res) => {
    let books = await Books.find({});
    console.log(books);
    // books = books.filter(book => book.qty >= 1);

    res.render('main/dashboard', { user: req.user, books: books });
});
// Page to upload a new book
router.get('/new', isAdmin, (req, res) => {
    res.render('main/new', { user: req.user });
});
// Page to edit details of a book
router.get('/edit/:id', isAdmin, async (req, res) => {
    const book = await Books.findById(req.params.id);
    res.render('main/edit', { user: req.user, book: book });
});
// To add the new book
router.post('/new', isAdmin, async (req, res) => {
    console.log(req.body);
    console.log(req.body.tags);
    const tags = req.body.tags.split(' ');
    tags.forEach(t=>{
        t=t.toUpperCase();
    });
    console.log(tags);
    let newBook = new Books({
        title: req.body.title,
        qty: req.body.qty,
        desc: req.body.desc,
        isbn: req.body.isbn,
        tags: tags,

    });
    await newBook.save();
    console.log(newBook);
    req.flash('success_msg', 'book uploaded successfully');
    res.redirect('/main/new');
});
// To update the changes in the book
router.post('/edit/:id', isAdmin, async (req, res) => {
    let book = await Books.findById(req.params.id);
    book.title = req.body.title;
    book.desc = req.body.desc;
    book.qty = req.body.qty;
    book.isbn = req.body.isbn;
    if (req.body.tags) {
        const tags = req.body.tags.split(" ");
        tags.forEach(t => {
            book.tags.push(t);
        });

    }
    await book.save();
    req.flash('success_msg', "Book details updated successfully");
    res.redirect(`/main/edit/${book.id}`);

});
// To view any book details 
router.get('/view/:id', isAdmin, async (req, res) => {
    const book = await Books.findById(req.params.id);
    res.render("main/view", { user: req.user, book: book });
})
// To delete a book
router.get('/delete/:id', isAdmin, async (req, res) => {
    const book = await Books.findByIdAndDelete(req.params.id);
    console.log(book);
    res.redirect('/main/');
});
// Page to display all the requests made by the users
router.get('/requests', isAdmin, async (req, res) => {
    let requests = await Requests.find({}).sort({ createdAt: 'desc' });
    requests= requests.filter(r=>r.status=="Pending");
    res.render('main/requests', { user: req.user, reqs: requests });


});
// To approve a request
router.get('/app/:id', isAdmin, async (req, res) => {
    const request = await Requests.findById(req.params.id);
    const book = await Books.findById(request.bookId);
    // To check already responded
    if (request.status == 'Approved' || request.status == 'Declined') {
        req.flash('error_msg', "Request already addressed");
        res.redirect('/main');
        return;
    }
    // To check if book is available
    if (book.qty >= 1) {
        book.qty = book.qty - 1;
        request.status = "Approved";

        request.issueAt = new Date();
        request.admin = req.user.email;
        await book.save();
        await request.save();
        req.flash('sucess_msg', "Request approved")
        res.redirect('/main/requests')
        return

    }
    else {
        req.flash('error_msg', "Book not available");
        res.redirect('/main/requests')

    }



});
// To decline a request
router.get('/dec/:id', isAdmin, async (req, res) => {
    const request = await Requests.findById(req.params.id);
    if (request.status == 'Approved' || request.status == 'Declined') {
        req.flash('error_msg', "Request already addressed");
        res.redirect('/main');
        return;
    }


    request.status = "Declined";
    request.issueAt = new Date();
    request.admin = req.user.email;
    await request.save();
    req.flash('sucess_msg', "Request declines")
    res.redirect('/main/requests')
    return


});
// To search for books using tags
router.post('/search', isAdmin, async (req, res) => {
    const tags = req.body.tags.split(' ');
    console.log(tags);
    reqBooks = [];
    const books = await Books.find({});

    tags.forEach(t => {
        t = t.toUpperCase();
        books.forEach(p => {
            if (reqBooks.findIndex(r => r == p) == -1 && p.tags.findIndex(tag => tag.toUpperCase() == t) != -1)
                reqBooks.push(p);
        })


    })


    res.render('main/dashboard', { user: req.user, books: reqBooks });




});

router.get('/trans', isAdmin, async (req, res) => {
    let reqs = await Requests.find({ admin: req.user.email }).sort({ createdAt: 'desc' });
    

    res.render('main/transanctions', { user: req.user, reqs: reqs });
});



module.exports = router;