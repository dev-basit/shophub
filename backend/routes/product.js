import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../constants/data";
import Product from "../models/products";

const router = express.Router();

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) res.send(product);
    else res.status(404).send({ message: "Product Not Found for given id." });
  })
);

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

export default router;
