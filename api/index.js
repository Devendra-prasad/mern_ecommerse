import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
  "https://mern-ecommerse-nine.vercel.app"
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// app.use(cors({
//   origin:"https://mern-ecommerse-nine.vercel.app",
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server running on port: 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// check karne ke liye
app.get("/", (req, resp) =>{
  resp.send("API Running");
});

// frontend + backend same server per serve karte hai tab use hota hai ye 

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

import { ZodError } from "zod";

// ErrorHandler MiddleWare
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path[0]] = e.message;
    });
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation Error",
      errors,
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
