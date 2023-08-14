import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.routes.js";
import morgan from "morgan";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
// midleware
app.use(cors());
app.use(cookieParser());
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// routers
app.use("/v1/auth", authRouter);
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log(`CONNECTED TO MONGODB`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
