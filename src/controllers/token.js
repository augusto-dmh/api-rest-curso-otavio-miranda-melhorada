import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as errors from "../validation/errors";
import User from "../models/User";

const store = async (req, res, next) => {
  const { email = "", password = "" } = req.body;

  if (!email || !password) {
    next(errors.controllers.missingCredentials);
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      next(errors.controllers.invalidCredentials);
      return;
    }
    // it would be more accurate to inform "Invalid credentials" on both, suggesting that at least one field is preventing the login,
    // or "No user found with matching email" at the validation above and "Wrong password" below, telling in which field
    // the problem lies and why.

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      next(errors.controllers.passwordsNotMatch);
      return;
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ token, user: { name: user.name, id, email } });
  } catch (err) {
    next(err);
  }
};

export default { store };
