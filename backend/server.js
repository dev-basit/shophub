import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from "./routes/users.js";
import productsRouter from "./routes/product.js";
import ordersRouter from "./routes/orders.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shophub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => res.send("Server is ready"));

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// middleware for handling errors
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server is listening to the port ${port}`));
