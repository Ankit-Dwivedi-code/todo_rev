import express from "express";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { connectDb } from "./db/db.js";
import cors from 'cors'

const app = express()
// const PORT = 3000
// app.options("*", cors()); 
// app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(cors({
  origin: "http://localhost:5173", // Set frontend URL explicitly
  credentials: true,  // Allow cookies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(cookieParser())
app.use(express.json())

const PORT = process.env.PORT || 8080
connectDb()
.then(()=>{
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
    console.log("Connected to DB")
  })
})
.catch((err)=>{
    console.log("Error while connecting to DB", err.message);
})

import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'

app.use(userRouter)  //http://localhost:8080/signup
app.use(todoRouter) 
// To run the server
