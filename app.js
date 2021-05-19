if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}


const express = require('express');
const app = express();
const path = require('path');
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');


app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret:"thisisnotagoodsecret",
    resave:false,
    saveUninitialized:false
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
})

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(productRouter);
app.use(authRouter);



mongoose.connect(process.env.DB_URL,{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Db Connected");
    // seedDB();
})
.catch((e)=>{
    console.log("Some Error Happened : " , e.message);
})











app.listen(process.env.PORT || 8000,()=>{
    console.log("Listening to port 8000");
})