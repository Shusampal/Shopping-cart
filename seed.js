const mongoose = require('mongoose');
const productModel = require('./models/product');

const products = [
    {
        img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"Shoe",
        price:2000,
        desc:"NIKE, named for the Greek goddess of victory, is a shoe and apparel company. It designs, develops, and sells a variety of products to help in playing basketball and soccer (football), as well as in running, men's and women's training, and other action sports."
    },
    {
        img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2F0Y2h8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"watch",
        price:4000,
        desc:"So, when it comes to accuracy, which is better Omega or Rolex? In terms of overall accuracy, Omega wins, since they not only make mechanical watches but also quite a few quartz watches. Quartz watches, as we all know, are more accurate than their mechanical counterparts."
    },
    {
        img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGxhcHRvcHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"Dell Laptop",
        price:30000,
        desc:"Faster Memory, More Storage. Lightweight Design Features an InfinityEdge Display & Diamond-cut Edges For Sharper Style. Enjoy outstanding mobile performance, reliability & usability of Dell Desktop. Shop Now! Free MS Office Home. Dell Mobile Connect."
    },
    {
        img:"https://images.unsplash.com/photo-1578671999517-728f26ce77fc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGlwaG9uZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"I Phone",
        price:60000,
        desc:"The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface."
    },
    {
        img:"https://images.unsplash.com/photo-1536650731127-3b9ce7c98007?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWFycGhvbmVzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"Earphone",
        price:800,
        desc:"Earphones are a pair of small loudspeaker drivers worn on or around the head over a user's ears. They are electroacoustic transducers, which convert an electrical signal to a corresponding sound."
    },
    {
        img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHNwZWFrZXJzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"Speakers",
        price:6000,
        desc:"The JBL has better bass, a longer battery life & can charge other stuff. Bose has good bass, is smaller, lighter & a little more portable. Both have good volume. The JBL is also water resistant."
    },
    {
        img:"https://images.unsplash.com/photo-1617943539287-d6fe110ac7ad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcmZ1bWVzfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"Perfume",
        price:"4000",
        desc:"company has a fantastic collection of its own perfumes which are considered to be dupes for more popular designer fragrances. These are at a fraction of the price of the designer version, and are smell-alikes of perfumes from brands like Dior, Chanel and Viktor & Rolf"
    },
    {
        img:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VpdHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        name:"Suit",
        price:"4500",
        desc:"Here are some adjectives for suit: neat and chipper, sober navy-blue, somber italian, flamboyant orange, conservative feminine, immaculate double-breasted, complete second-hand, impeccably crisp, chinese, gray, black, mundane, expensive three-piece, orange wet, honorable naval, almost flimsy, new siren, well-tailored ..."
    }
]

const seedDB = async ()=>{
    await productModel.insertMany(products);
    console.log("Db Seeded");
}

module.exports = seedDB;