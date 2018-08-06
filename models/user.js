var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
    // passportLocalMongooseEmail = require('passport-local-mongoose-email');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: { type: String, unique: true, required: true},
    intro: String,
    avatar_url: String,
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });
module.exports = mongoose.model("User", userSchema);