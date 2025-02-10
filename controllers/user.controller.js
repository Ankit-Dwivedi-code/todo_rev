import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) =>{
    const {email, password, username} = req.body;

    if (!email || !password || !username) {
        throw new Error("All fields are required")
    }

    const user = await User.findOne({email})

    if(user){
        throw new Error("User already exists")
    }

    

    const newUser = {
        email,
        password,
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
    
    const opt = {
        httpOnly: true,
        secure: true
    }

    const payload = {
        email : user.email,
        username : user.username
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" } )

    
    res.cookie("token", token, opt)
    res.status(200).json("Login success")

}


export {signup, signin}