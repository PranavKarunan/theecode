import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import productRouter from './routes/product.js'
import cors from 'cors'

const app = express()
dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connrcted to mongodb");
    } catch (error) {
      throw error;
    }
  };
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

app.use(express())

//Middlewares
app.use(cors())
app.use(express.json())


app.use("/auth", authRouter)
app.use("/product", productRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Someting went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


app.listen(5000,()=>{
    connect()
    console.log("Connected to server!")
})