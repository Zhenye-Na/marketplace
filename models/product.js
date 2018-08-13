var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: String,
    description: String,
    hidden: Boolean,
    image: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    contact: String,
    pricing: Number,
    date: { type: Date, default: Date.now },
    meta: { votes: Number, favs:  Number }
});
module.exports = mongoose.model("Product", productSchema);