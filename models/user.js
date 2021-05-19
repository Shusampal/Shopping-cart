const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require('./product');
const Review = require('./review');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    retailer:{
        type:String,
        default:'off',
        required:true
    },
    img :{
        type:String,
        defaut:""
    },
    address:{
        type: String,
        defaut: ""
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
