import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { handleLogin } from "../../utils/auth";
import connectDb from "../../utils/connectDB";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(422).send(`User already exist with email ${email}.`);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error signup user. Please try again later.");
  }
};
