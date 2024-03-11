import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import User from "../models/User";

const store = async (req, res, next) => {
  const { email = "", password = "" } = req.body;

  if (!email || !password) {
    throw new ErrorContext(new ApiError(...errors.controllers.missingCredentials), {
      function: "tokenController.store",
      file: "src/controllers/token.js",
      line: 9,
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ErrorContext(new ApiError(...errors.controllers.invalidCredentials), {
        function: "tokenController.store",
        file: "src/controllers/token.js",
        line: 24,
      });
    }
    // it would be more accurate to inform "Invalid credentials" on both, suggesting that at least one field is preventing the login,
    // or "No user found with matching email" at the validation above and "Wrong password" below, telling in which field
    // the problem lies and why.

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new ErrorContext(new ApiError(...errors.controllers.passwordsNotMatch), {
        function: "tokenController.store",
        file: "src/controllers/token.js",
        line: 41,
      });
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
