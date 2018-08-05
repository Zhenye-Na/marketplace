/* importing node module files */
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

/* express server configuration */
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/marketplace", { useNewUrlParser: true });

/* set the view engine to ejs */
app.set('view engine', 'ejs');

/* importing databaes */
var Product = require("./models/product");



// Demo add new products
// Product.create(
//     {
//         title: "Apple MacBook Pro MF841LL/A 13.3-Inch Laptop with Retina Display (512 GB hard drive, 2.9 GHz dual-core Intel Core i5 processor, 8 GB 1866 MHz LPDDR3 RAM), Silver) (2015 version)",
//         description: "2.9 GHz dual-core Intel Core i5 processor (Turbo Boost up to 3.3 GHz) with 3MB shared L3 cache; 8 GB 1866 MHz LPDDR3 RAM; 512 GB PCIe-based flash storage; 13.3-inch IPS Retina Display, 2560-by-1600 resolution; Intel Iris Graphics 6100; OS X El Capitan, Up to 10 Hours of Battery Life",
//         category: "Laptops",
//         quantity: 1,
//         hidden: false,
//         image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4caa2b0c51fbb1685b0c1a6a08b74dac&auto=format&fit=crop&w=1351&q=80"
//     },
//     function(err, newproduct) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(newproduct);
//         }
//     }
// );

// users Collection
// var userSchema = new mongoose.Schema({
//     username: String,
//     email: { type: String, unique: true, required: true, validate: emailValidator },
//     intro: String,
//     address: String,
//     password: String,
//     avatar_url: String,
//     products: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Product"
//         }
//     ]
// });
// var User = mongoose.model("User", userSchema);

// var UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   passwordConf: {
//     type: String,
//     required: true,
//   }
// });



// index page 
app.get("/", function(req, res) {
    res.render("landing");
});


// INDEX - Show all products
app.get("/items",  function(req, res) {
    // get all items from db
    Product.find({}, function(err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {products: allProducts});
        }
    });
});

// CREATE - Add new product to database
app.post("/items", function(req, res) {
    // get data
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var newProduct = {title: title, image: image, description: desc};

    // create a new item and save to database
    Product.create(newProduct, function(err, newproduct) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/items");
        }
    });
});

// NEW - Show form to add new product
app.get("/items/add", function(req, res) {
    res.render("add.ejs");
});

// SHOW - Show product information
app.get("/items/:id", function(req, res) {
    // find the prodcut with specific ID
    Product.findById(req.params.id, function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
            // render show template with that product
            res.render("show", {product: foundProduct});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Everything is working fine now!");
});