import mongoose from "mongoose";
// const mongoose  = require("mongoose") <-- ye common js ke liye

const userSchema = new mongoose.Schema(
    {
        email:{
            type : String,
            required :true,
            unique:true
        },
        password:{
            type : String,
            required: true
        },
        username:{
            type : String
        },
    },
    {
        timestamps : true
    }
)

export const User = mongoose.model('User', userSchema)  // Database me User ==> users

// Signup Login Logout getuser updateUser deleteuser
