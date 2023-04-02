import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {errorMiddleware, notFoundMiddleware} from "./helpers/errors.js";
import { setUpSocket } from './helpers/socket.js';
import importMiddlewares from "./middlewaresHandler.js";
import http from "http";

// config
dotenv.config();
const app = express();
const middlewares = await importMiddlewares();
const server = http.createServer(app);
//MIDLEWARES



const io=setUpSocket()

middlewares.forEach((middleware) => {
  console.log(`Loading middleware /${middlewares.length}: ${middleware.name}`);
  app.use(middleware);
});

// ROUTES
// ERROR
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// server
server.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.SERVER).then(() => {
      console.log("server listening on port " + process.env.PORT);
    });
  } catch (error) {
    throw err;
  }
});
