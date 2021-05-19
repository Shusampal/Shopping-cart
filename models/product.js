const mongoose = require('mongoose');
const Review = require('./review');

const productSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true,
        min:0
    },
    desc:{
        type: String,
        required: true
    },
    review:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    user: {
        type: String,
        required: true
    }
})


const Product = mongoose.model('Product', productSchema);


module.exports = Product;