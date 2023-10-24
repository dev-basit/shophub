import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../constants/data.js";
import User from "../models/users.js";

const router = express.Router();

router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default router;
