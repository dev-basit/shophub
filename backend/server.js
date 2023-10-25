import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/users";
import productRouter from "./routes/product";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/shophub", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => res.send("Server is ready"));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// middleware for handling errors
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is listening to the port ${port}`));
