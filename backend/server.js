import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usersRouter from "./routes/users.js";
import productsRouter from "./routes/product.js";
import ordersRouter from "./routes/orders.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shophub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => res.send("Server is ready"));

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

// middleware for handling errors
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is listening to the port ${port}`));
