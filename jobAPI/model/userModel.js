const mongoose = require("mongoose");
const {isEmail, trim} = require("validator")

const userSchema =  mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        trim:true
    },
    email: {
        type: String,
        required: [true, "Enter a valid email"],
        lowercase:true,
        unique:true,
        trim:true,
        validate: [isEmail, "Enter a valid email"]
    }, 
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "Password should be at least 8 characters long"],
        
    }
});

const User = mongoose.model("user",userSchema);

module.exports = User;
