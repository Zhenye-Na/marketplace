// server.js
// load the things we need
var express = require("express");
var app = express();

// import body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// import mongoose
var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/")

// var personSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     avatar_url: String,
//     intro: String
// })

// var Person = mongoose.model("Person", personSchema);






// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get("/", function(req, res) {
    res.render("landing");
});

var campgrounds = [
    {name: "hha", image: "https://images.pexels.com/photos/60006/spring-tree-flowers-meadow-60006.jpeg?cs=srgb&dl=nature-flowers-sun-60006.jpg&fm=jpg"},
    {name: "hha", image: "https://steemitimages.com/DQmYNHVdnMmVyLBcUHvp17gHXP3fzSEg9tqXEVkGVnTjk4V/pexels-photo.jpg"},
    {name: "hha", image: "http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/3h/x2/p03hx26b.jpg"},
    {name: "hha", image: "https://images.pexels.com/photos/60006/spring-tree-flowers-meadow-60006.jpeg?cs=srgb&dl=nature-flowers-sun-60006.jpg&fm=jpg"},
    {name: "hha", image: "https://steemitimages.com/DQmYNHVdnMmVyLBcUHvp17gHXP3fzSEg9tqXEVkGVnTjk4V/pexels-photo.jpg"},
    {name: "hha", image: "http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/3h/x2/p03hx26b.jpg"}
    ];

// items page
app.get("/items",  function(req, res) {
    res.render("items", {campgrounds: campgrounds});
});

// Add new items page
app.post("/items", function(req, res) {
    // get data
    var name = req.body.name;
    var image = req.body.image;
    var newItem = {name: name, image: image};
    campgrounds.push(newItem);

    // redirect to items page
    res.redirect("/items");
});

//
app.get("/items/add", function(req, res) {
    res.render("add.ejs");
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Everything is working fine now!");
});