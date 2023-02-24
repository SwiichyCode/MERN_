import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import authorRoutes from "./routes/Author";
import bookRoutes from "./routes/Book";

const router = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    StartServer();
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log(error);
  });

const StartServer = () => {
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  // Routes
  router.use("/authors", authorRoutes);
  router.use("/books", bookRoutes);

  router.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
  });

  router.use((req, res, next) => {
    const error = new Error("Not found");
    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    console.log(`Server is listening on port ${config.server.port}`);
  });
};
