import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ValidationError } from "sequelize";
import * as errors from "../validation/errors";
import User from "../models/User";

const store = async (req, res) => {
  const { email = "", password = "" } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      errors: errors.controllers.missingCredentials,
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: errors.controllers.invalidCredentials,
      });
    }
    // it would be more accurate to inform "Invalid credentials" on both, suggesting that at least one field is preventing the login,
    // or "No user found with matching email" at the validation above and "Wrong password" below, telling in which field
    // the problem lies and why.

    const passwordsMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordsMatch) {
      return res.status(400).json({
        errors: errors.controllers.passwordsNotMatch,
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.json({ token, user: { nome: user.nome, id, email } });
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log(err);
      const apiError = errors.controllers.validationError;
      apiError.subErrors = err.errors.map((error) => error.message);

      res.status(400).json({
        error: apiError,
      });
      return;
    }

    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

export default { store };
