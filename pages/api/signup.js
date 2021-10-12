import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import User from "../../models/User";
import connectDb from "../../utils/connectDB";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!isLength(name, { min: 3, max: 15 })) {
      return res.status(422).send("Name must be 3-15 characters long");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send("Password must be at least 6 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).send(`User already exist with email ${email}.`);
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

    return res.status(201).json(token);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error signup user. Please try again later.");
  }
};
