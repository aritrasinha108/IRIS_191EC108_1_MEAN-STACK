const express = require("express");
const path = require('path')
const app = express();
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const connectionDB = require("./config/db");
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
//Template engine 
app.set('views', path.join(__dirname, '/views'))
app.use(expressLayout);
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectionDB();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// To add flash messages to the page
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

//Routes
app.get('/', (req, res) => {
    res.render('auth/welcome');
});
// To ensure that the unauthenticated users can't get into the admin and student pages
const ensureAuthenticated = require('./config/auth');




app.use('/main', ensureAuthenticated, require('./routes/main'));
app.use('/student', ensureAuthenticated, require('./routes/student'));
app.use('/users', require('./routes/users'));
app.listen(PORT, () => console.log("The server started runnig on port 3000"));