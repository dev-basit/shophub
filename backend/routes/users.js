import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// import data from "../constants/data.js";
import User from "../models/users.js";
import { generateToken } from "../utils/token.js";

const router = express.Router();

// router.get(
//   "/seed",
//   expressAsyncHandler(async (req, res) => {
//     const createdUsers = await User.insertMany(data.users);
//     res.send({ createdUsers });
//   })
// );

router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }

    return res.status(401).send({ message: "Invalid email or password." });
  })
);

export default router;
