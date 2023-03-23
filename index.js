import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { errorMiddleware,notFoundMiddleware } from './helpers/errors.js';
// config
dotenv.config();
const app = express();
const server = mongoose;

// ERROR
app.use(notFoundMiddleware)
app.use(errorMiddleware)

// server
app.listen(process.env.PORT, () => {
  server
    .connect(process.env.SERVER)
    .then(() => {
      console.log("server listening on port " + process.env.PORT);
    })
    .catch((err) => {
      throw err;
    });
});
