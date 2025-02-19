import mongoose from "mongoose";
import { User } from "./user.model.js";

const todoSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        content: {
            type : String,
            required : true,
        },
        isCompleted:{
            type : Boolean,
            default : false
        },
        createdBy:{
            type : mongoose.Schema.Types.ObjectId,
            ref : User
        }
    },
    {
        timestamps : true
    }
)

export const Todo = mongoose.model("Todo", todoSchema)