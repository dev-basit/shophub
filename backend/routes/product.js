import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/products.js";
import { isAdmin, isAuth } from "../utils/utils.js";
// import data from "../constants/data.js";

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

router.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productToAdd = new Product({
      name: "Product-name " + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "Product-category",
      brand: "Product-brand",
      countInStock: 1,
      rating: 1,
      numReviews: 2,
      description: "Product-description",
    });

    const createdProduct = await productToAdd.save();
    res.send({ message: "Product Created Successfully", product: createdProduct });
  })
);

// router.get(
//   "/seed",
//   expressAsyncHandler(async (req, res) => {
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({ createdProducts });
//   })
// );

export default router;
