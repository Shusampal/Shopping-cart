const express = require('express');
const router = express.Router();
const productModel = require('../models/product');
const reviewModel = require('../models/review');
const passport = require('passport');
const User = require('../models/user');
const path = require('path');
const multer = require("multer");
const { config, uploader } = require("cloudinary");
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const dotenv = require('dotenv');
dotenv.config();

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next();
}

router.use(cloudinaryConfig);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('img');



let file = "";

const data_string = async (req, res, next) => {

    try {

        file = parser.format(
            path.extname(req.file.originalname).toString(),
            req.file.buffer
        ).content;
        next();


    } catch (error) {
        console.log("error => ", error.message);
    }

}


router.get('/',(req,res)=>{

    try {

        res.render('home');
    } catch (error) {
        res.send(error.message);
    }
    
})


router.get('/products', async (req, res) => {

    try {
        
        const products = await productModel.find({});
        res.render('index', { products });
    } catch (error) {
        res.send(error.message);
    }

    
})

router.get('/products/new',(req, res) => {
    try {

        if(req.user && req.user.retailer === 'on')
        {
            return res.render('new');
        }
        req.flash('error', 'Please Login first');
        res.redirect('/login');
        
    } catch (error) {
        
        
    }

})


router.get('/products/:id', async (req,res)=>{

    try {
        if(!req.user)
        {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }
        const product = await productModel.findById(req.params.id).populate('review');
        res.render('show', { product });
    } catch (error) {
        res.send(error.message);
    }
    
})



router.post('/products', async (req,res)=>{

    try {
        
        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        await productModel.create({
            img: req.body.img,
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc,
            user:req.user.username
        })

        req.flash('success','Product added successfully');
        res.redirect('/products');
    } catch (error) {
        res.send(error.message);
    }
    
})

router.get('/products/:id/edit',async (req,res)=>{
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }
        
        const product = await productModel.findById(req.params.id);

        res.render('edit' , {product});
    } catch (error) {
        res.send(error.message);
    }
})


router.patch('/products/:id',async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const edittedProduct = {
            img: req.body.img,
            name: req.body.name,
            price: req.body.price,
            desc: req.body.desc
        }
        await productModel.findOneAndReplace({ _id: req.params.id }, edittedProduct)


        req.flash('success','Product Updated successfully');

        res.redirect('/products');

    } catch (error) {
        res.send(error.message);
    }
})


router.delete('/products/:id',async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        await productModel.findByIdAndDelete(req.params.id);

        req.flash('success','Product Deleted Successfully');
        res.redirect('/products');

    } catch (error) {
        res.send(error.message);
    }
})

router.post('/products/:id/review', async (req,res)=>{

    try {
        
        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const product = await productModel.findById(req.params.id);

        const rev = await new reviewModel({
            rating: req.body.rating,
            review: req.body.review,
            user: req.user.username
        })

        product.review.push(rev);

        await rev.save();

        await product.save();


        res.redirect(`/products/${req.params.id}`);
    } catch (error) {
        res.send(error.message);
    }

    
})


router.delete('/products/:id/review/:rid', async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        await reviewModel.findByIdAndDelete(req.params.rid);
        await productModel.findByIdAndUpdate(req.params.id , {$pull:{review:req.params.rid}});
        
        req.flash('success', 'Review Deleted Successfully');
        res.redirect(`/products/${req.params.id}`);

    } catch (error) {
        res.send(error.message);
    }
})

router.post('/products/:id/cart', async (req, res) => {

    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const user = await User.findById(req.user._id);
        user.cart.push(req.params.id);

        await user.save();


        req.flash('success','Added to Cart Successfully');
        res.redirect(`/${req.user._id}/cart`);
    } catch (error) {
        res.send(error.message);
    }


})

router.delete('/:userid/products/:id/cart', async (req, res) => {

    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const user = await User.findByIdAndUpdate(req.params.userid, { $pull: { cart: req.params.id}});
        
        await user.save();



        req.flash('success', 'Deleted from  Cart Successfully');
        res.redirect(`/${req.params.userid}/cart`);
    } catch (error) {
        res.send(error.message);
    }


})

router.get('/:id/cart', async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const u = await User.findById(req.params.id).populate('cart');

        res.render('cart',{u});
    } catch (error) {
        res.send(error.message);
    }
})


router.get('/:id/profile', async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const u = await User.findById(req.params.id).populate('cart');

        res.render('profile', { u });
    } catch (error) {
        res.send(error.message);
    }
})

router.post('/:id/profile', multerUploads, data_string ,async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        if (req.file) {
            uploader.upload(file).then(async (result) => {
                const image = result.url;
                
                await User.findByIdAndUpdate(req.params.id, { img: image })

                res.redirect(`/${req.params.id}/profile`);


            }).catch((err) => res.status(400).json({
                messge: 'someting went wrong while processing your request',
                data: {
                    err
                }
            }))
        }


        
    } catch (error) {
        res.send(error.message);
    }
})


router.get('/:id/payments', async (req, res) => {
    try {

        if (!req.user) {
            req.flash('error', 'Please Login first');
            return res.redirect('/login');
        }

        const u = await User.findById(req.params.id).populate('cart');

        res.render('payments', { u });
    } catch (error) {
        res.send(error.message);
    }
})
module.exports = router;