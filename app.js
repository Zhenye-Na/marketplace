// server.js
// load the things we need
var express = require("express");
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get("/", function(req, res) {
    res.render("landing");
})

// Camp grounds page
app.get("/campgrounds",  function(req, res) {
    var campgrounds = [
        {name: "hha", image: "123123"},
        {name: "hha", image: "123123"},
        {name: "hha", image: "123123"}
        ];
    
    res.render("campgrounds", {campgrounds: campgrounds});
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("hahaha");
});