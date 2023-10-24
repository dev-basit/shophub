import express from "express";
import mongoose from "mongoose";

import data from "./constants/data.js";
import userRouter from "./routes/users.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shophub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => res.send("Server is ready"));

app.use("/api/users", userRouter);

app.get("/api/products", (req, res) => res.send(data.products));
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((product) => product._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// middleware for handling errors
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is listening to the port ${port}`));
