import jwt from "jsonwebtoken";
import User from "../models/User";
import ApiError from "../validation/errors/classes/ApiError";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import * as errors from "../validation/errors/controllers";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      const errorBase = !authorization ? errors.missingAuthorization : errors.invalidAuthorization;

      throw new ErrorContext(new ApiError(...errorBase), {
        function: "loginRequired",
        file: "src/middlewares/loginRequired",
        line: 10,
      });
    }

    const [, token] = authorization.split(" ");

    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      throw new ErrorContext(new ApiError(...errors.invalidToken), {
        function: "loginRequired",
        file: "src/middlewares/loginRequired",
        line: 24,
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (err) {
    next(err);
  }
};
