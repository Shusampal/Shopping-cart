const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

router.get('/register',(req,res)=>{

    try {
        res.render('signup');
        
    } catch (error) {
        res.send(error.message);
    }
})

router.post('/register', async (req, res) => {

    try {
        
        const user = await new User({
            username:req.body.name,
            email:req.body.email,
            retailer: req.body.retailer
        });

        await User.register(user,req.body.password);

        req.flash('success','Registered Successfully');

        res.redirect('/login');

    } catch (error) {
        res.send(error.message);
    }
})

router.get('/login', async (req, res) => {

    try {

        res.render('login')

    } catch (error) {
        res.send(error.message);
    }
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}),(req, res) => {

    try {
        req.flash('success',`Welcome ${req.user.username}`);
        res.redirect('/products');

    } catch (error) {
        res.send(error.message);
    }
})

router.get('/logout', async (req, res) => {

    try {

        req.logOut();
        res.redirect('/login');

    } catch (error) {
        res.send(error.message);
    }
})




module.exports = router;