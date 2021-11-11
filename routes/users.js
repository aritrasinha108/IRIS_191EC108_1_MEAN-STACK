const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const passport = require('passport');
router.get('/login', (req, res) => {
    res.render("auth/login");
})


//To go to the register page
router.get('/register', (req, res) => {
    res.render("auth/register");
});

//To register an account
router.post('/register', (req, res) => {
    console.log(req.body);
    const { name, email, password, password2, key } = req.body;
    let errors = [];
    // Check if any field is unfilled
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please fill all the fields" });

    }
    // Check if the passwords match
    if (password != password2) {
        errors.push({ message: "Passwords do not match" });
    }
    // Check if the password length is less than 6
    if (password.length < 6) {
        errors.push({ message: "Password should be atleast 6 characters long" });
    }
    // Check the key (if entered)
    if (key && key != process.env.key) {
        errors.push({ message: "Invalid key! Please enter the correct key to register as an admin" });
    }
    // If any of the above criteria doesn't match, redirect to the register page
    if (errors.length > 0) {
        res.render("auth/register", {
            errors,
            name,
            email,
            password, password2
        });
    }
    else {
        // Check if user already exists
        Users.findOne({ email: email })
            .then(user => {
                if (user) {
                    res.render("auth/register", {
                        errors,
                        name,
                        email,
                        password, password2
                    });
                    errors.push({ message: "User already registered." });

                }
                else {
                    // Else register for a new user
                    const newUser = new Users({
                        name: name,
                        email: email,
                        password: password,
                    });
                    // Give admin access if the user provides the correct key
                    if (key && key == process.env.key)
                        newUser.admin = true;

                    // Hash and store the password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {

                                res.redirect('/users/login');
                                req.flash('success_msg', "You are registered successfully, login to continue");
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }

});
// To log in
router.post('/login', async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });

    // Authentication using passport


    //If user is an admin
    if (user.admin && user.admin == true)
        passport.authenticate('local', {
            successRedirect: '/main/',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    // If user is a student
    else
        passport.authenticate('local', {
            successRedirect: '/student/',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);

});

// To log out
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/login');
    req.flash('success', 'You are logged out');

});



module.exports = router;