var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    quantity: Number,
    hidden: Boolean,
    image: String,
    pricing: { old_price: Number, new_price: Number },
    date: { type: Date, default: Date.now },
    meta: { votes: Number, favs:  Number }
});
module.exports = mongoose.model("Product", productSchema);