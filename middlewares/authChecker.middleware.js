// Check user is logged in or not

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwt = async (req, _, next)=>{
        try {
            const token = req.cookies?.token
            // console.log("Token is: ", token);
            

            if (!token) {
                throw new Error("Invalid token format");
            }

            const verifiedJwt = jwt.verify(token, process.env.JWT_SECRET)

            if (!verifiedJwt) {
                throw new Error("Invalid token format")
            }

            const user = await User.findById(verifiedJwt?.id).select("-password")

            if (!user) {
                throw new Error("Invalid token format")
            }


            req.user = user

            next()

        } catch (error) {
            throw new Error("Invalid token", error.message)
        }
}