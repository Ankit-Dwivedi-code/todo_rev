import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const signup = async (req, res) =>{
    const {email, password, username} = req.body;

    if (!email || !password || !username) {
        throw new Error("All fields are required")
    }

    const pass = await bcrypt.hash(password, 10)

    console.log("Hashed pass is ", pass);
    

    // Check if user exits in database
    const user = await User.findOne({email})

    if(user){
        throw new Error("User already exists")
    }

    const newUser = {
        email,
        password : pass,
        username
    }

    const createdUser =  await new User(newUser)
    createdUser.save()

    res.status(201)
    .json("Signup Successfull")
}

const signin = async (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        throw new Error("All fields are required")
    }

    

    const user = await User.findOne({email})

    if (!user) {
        throw new Error("Invalid credentials!")
    }

    // console.log("user", user);

    const isPasswordCorrect =  bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials!")
    }
    
    const opt = {
        httpOnly: true,
        secure: true
    }

    const payload = {
        id : user._id,
        email : user.email,
        username : user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY} )

    
    res.cookie("token", token, opt)
    res.status(200).json("Login success")
}


const logout = async(req, res) =>{
    const opt = {
        httpOnly: true,
        secure: true
    }

    res.clearCookie("token", opt)
    res.status(200).json("Logout successfully")
}

const getuser = async(req, res) =>{
    return res.status(200).json(req.user)
}

const updateUser = async(req, res)=>{
    const {username} = req.body

    if (!username) {
        throw new Error("Username is required")
    }

    const user = req.user

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        username
    },{new : true})

    return res.status(200).json(updatedUser)
}

export {signup, signin, logout, getuser, updateUser}