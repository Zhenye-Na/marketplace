// All the middleware goes here!

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
                res.redirect("back");
            }
        }
    });
    } else {
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
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};



module.exports = middlewareObj;