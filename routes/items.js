var express = require("express"),
    Product = require("../models/product");

var router  = express.Router();


// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkProductOnwership(req, res, next) {
    if (req.isAuthenticated()) {
        Product.findById(req.params.id, function(err, foundProduct) {
            if (err) {
                res.redirect("back");
            } else {
                // foundProduct.author.id.equals is a mongoose object
                if (foundProduct.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}


// INDEX - Show all products
router.get("/",  function(req, res) {
    // get all items from db
    Product.find({}, function(err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            res.render("products/index", {
                products: allProducts,
                currentUser: req.user
            });
        }
    });
});


// CREATE - Add new product to database
router.post("/", isLoggedIn, function(req, res) {
    // get data
    var title = req.body.title;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newProduct = {title: title, image: image, description: desc, author: author};

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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("products/new");
});


// SHOW - Show product information
router.get("/:id", function(req, res) {
    // find the prodcut with specific ID
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
        if (err) {
            console.log(err);
        } else {
            // render show template with that product
            res.render("products/show", {product: foundProduct});
        }
    });
});


// Edit products
router.get("/:id/edit", checkProductOnwership, function(req, res) {

    Product.findById(req.params.id, function(err, foundProduct) {
        res.render("products/edit", {product: foundProduct});
    });
});

// Update products
router.put("/:id", checkProductOnwership, function(req, res) {
    // Find and update the product
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct) {
        if (err) {
            res.redirect("/items");
        } else {
            res.redirect("/items/" + req.params.id);
        }
    });
});

// Destroy products
router.delete("/:id", checkProductOnwership, function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/items/");
        } else {
            res.redirect("/items/");
        }
    });
});



module.exports = router;