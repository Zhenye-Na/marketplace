/* importing node module files */
var express       = require("express"),
    bodyParser    = require("body-parser"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose      = require("mongoose"),
    seedDB        = require("./seeds");

seedDB();


/* importing databaes */
var Product = require("./models/product"),
    User    = require("./models/user"),
    Comment = require("./models/comment");


/* express server configuration */
var app = express();
mongoose.connect("mongodb://localhost:27017/marketplace", { useNewUrlParser: true });


/* body parser configuration */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* passport authenticator initialization */
app.use(require("express-session")({
    secret: "Launched by Zhenye Na in Aug. 2018 in Urbana, U.S.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

/* set the view engine to ejs */
app.set('view engine', 'ejs');


/* static pages configuration */
app.use(express.static(__dirname + '/public'));


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
            res.render("products/index", {
                products: allProducts,
                currentUser: req.user
            });
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
app.get("/items/new", function(req, res) {
    res.render("products/new");
});


// SHOW - Show product information
app.get("/items/:id", function(req, res) {
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


/* ======================================= Comment ======================================= */
app.get("/items/:id/comments/new", isLoggedIn, function(req, res) {
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


app.post("/items/:id/comments", isLoggedIn, function(req, res) {
    Product.findById(req.params.id, function(err, foundProduct) {
        if (err) {
            console.log(err);
            res.redirect("/items");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    foundProduct.comments.push(comment);
                    foundProduct.save();
                    res.redirect("/items/" + foundProduct._id);
                }
            });
        }
    });
});


/* ======================================= Authentication ======================================= */
app.get("/signup", function(req, res) {
    res.render("signup");
});


app.post("/signup", function(req, res) {
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


app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
        successRedirect: "/items",
        failureRedirect: "/login"
    }), function(req, res) {
});


app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/items");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Everything is working fine");
    console.log("We've got a server");
});