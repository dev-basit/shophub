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
    res.send({ message: "Product Created Successfully.", product: createdProduct });
  })
);

router.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated Successfully.", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product not found for given id." });
    }
  })
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deletedProduct = await product.remove();
      res.send({ message: "Product Deleted Successfully.", product: deletedProduct });
    } else {
      res.status(404).send({ message: "Product not found for given id." });
    }
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
