import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import { errorMiddleware,notFoundMiddleware } from './helpers/errors.js';
import auth from './routes/auth.js'
// config
dotenv.config();
const app = express();
const server = mongoose;

//MIDLEWARES
app.use(express.json());

// ROUTES
app.use('/api/auth', auth)
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
