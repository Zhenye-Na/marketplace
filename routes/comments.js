var express = require("express");
var router = express.Router({mergeParams: true});

var Product = require("../models/product"),
    Comment = require("../models/comment");


// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


/* Comment NEW */
router.get("/new", isLoggedIn, function(req, res) {
    // find the prodcut with specific ID
    Product.findById(req.params.id,  function(err, foundProduct) {
       if (err) {
           console.log(err);
       } else {
           console.log(foundProduct);
           res.render("comments/new", {product: foundProduct});
       }
    });
});


/* Comment Create */
router.post("/", isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err);
            res.redirect("/items");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    foundProduct.comments.push(comment);
                    foundProduct.save();
                    res.redirect("/items/" + foundProduct._id);
                }
            });
        }
    });
});


module.exports = router;