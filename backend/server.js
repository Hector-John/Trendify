import express from "express";
import cors from "cors";
import { DBconnect } from "./config/db.js";
import shoeRouter from "./routes/shoeRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//    APP CONFIG
const app = express();

//    ROUTES
const port = 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

//  DATABASE CONNECTION
DBconnect();

//  API ENDPOINTS
app.use("/api/shoe", shoeRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter)



app.get("/", (req, res) => {
  res.send("API Works");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// mongodb+srv://hakheem67:Hakheem5674@trendify.kjoklnn.mongodb.net/?retryWrites=true&w=majority&appName=trendify
