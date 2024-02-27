import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const store = async (req, res) => {
  const { email = "", password = "" } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      errors: ["Missing credentials"],
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ["Invalid credentials"],
      });
    }
    // it would be more accurate to inform "Invalid credentials" on both, suggesting that at least one field is preventing the login,
    // or "No user found with matching email" at the validation above and "Wrong password" below, telling in which field
    // the problem lies and why.

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordsMatch) {
      return res.status(400).json({
        errors: ["Invalid password"],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ token, user: { nome: user.nome, id, email } });
  } catch (err) {
    res.status(500).json({
      errors: ["An unexpected error ocurred. Please try again later."],
    });
  }
};

export default { store };
