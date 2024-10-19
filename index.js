import mongoose from "mongoose";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!! ", err);
  });
