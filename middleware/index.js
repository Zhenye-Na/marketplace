// All the middleware goes here!

var Product = require("../models/product"),
    Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkProductOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            res.redirect("back");
        } else {
            // foundProduct.author.id.equals is a mongoose object
            if (foundProduct.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "您没有此权限！");
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "请您先登陆再进行操作！");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // foundProduct.author.id.equals is a mongoose object
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "您没有此权限！");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "请您先登陆再进行操作！");
        res.redirect("back");
    }
};



middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "请您先登陆再进行操作！");
    res.redirect("/login");
};


module.exports = middlewareObj;