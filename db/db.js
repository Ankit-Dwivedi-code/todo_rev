import mongoose from "mongoose";


// Database is in another continent
export const connectDb = async () =>{
     mongoose.connect(process.env.MONGODB_URI)
}

// It returns promise