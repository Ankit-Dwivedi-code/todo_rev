import mongoose from "mongoose";


// Database is in another continent
export const connectDb = async () =>{
     try {
          mongoose.connect(process.env.MONGODB_URI)
     } catch (error) {
          console.log("Error while connecting to database!", error.message);
     }
}

// It returns promise