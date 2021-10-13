import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import connectDb from "../../utils/connectDB";

connectDb();

export default async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send("Wrong username or password.");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(200).json(token);
    } else {
      res.status(404).send("Wrong username or password.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error log in user. Please try again later.");
  }
}
