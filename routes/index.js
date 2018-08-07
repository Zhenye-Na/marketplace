var express  = require("express"),
    passport = require("passport"),
    User     = require("../models/user");
var router = express.Router();


// Root Route
router.get("/", function(req, res) {
    res.render("landing");
});



// Signup
router.get("/signup", function(req, res) {
    res.render("signup");
});


// Signup
router.post("/signup", function(req, res) {
    var newUser = new User({
        email: req.body.username
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/items");
        });
    });
});


// Login
router.get("/login", function(req, res) {
    res.render("login");
});


// Login
router.post("/login", passport.authenticate("local", {
        successRedirect: "/items",
        failureRedirect: "/login"
    }), function(req, res) {
});


// Logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/items");
});


// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;