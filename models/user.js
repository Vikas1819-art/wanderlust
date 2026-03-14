const mongoose = require("mongoose");
const Schema = mongoose.Schema ;
// const passportLocalMongoose = require("passport-local-mongoose");
const passportLocalMongoose = require('passport-local-mongoose').default;


const userSchema = new Schema({
    email : {
        type: String,
        required : true
    }
});

userSchema.plugin(passportLocalMongoose);        // this plugin automatically gives fields like username password


module.exports = new mongoose.model("User" , userSchema);