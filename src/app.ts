import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
// import { connectDB } from "./utils/features.js";
import NodeCache from 'node-cache';
import { config } from "dotenv";
import morgan from 'morgan';
import { connectDB } from "./utils/features.js";
import Stripe from "stripe";
import cors from 'cors';

// importing routes
import userRoutes from './routes/user.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import paymentRoute from  "./routes/payment.js"
import dashboardRoute from "./routes/stats.js"

config({
    path: "./.env",
}) 

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const stripeKey = process.env.STRIPE_KEY || "";

//  connectDB(mongoURI) ;
if (mongoURI) {
  connectDB(mongoURI);
} 

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    // credentials:true,
    // origin:["http://localhost:5173/"]
  }))

app.get("/",(req,res) => {
    res.send("APi working");
});


 

 
 
// Using Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order",orderRoutes );
app.use("/api/v1/payment",paymentRoute );
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(PORT, ()=>{
    console.log(`Express is working on http://localhost:${PORT}`)
});

 