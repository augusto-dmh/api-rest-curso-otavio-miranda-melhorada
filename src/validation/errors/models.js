import BaseError from "./classes/BaseError";

export const name = {
  invalidLength: new BaseError(
    "/errors/name-invalid-length",
    "Invalid Name Length",
    "'name' must be between 3 and 255 characters.",
  ),
  empty: new BaseError("/errors/name-empty", "Name is Empty", "'name' is required."),
};

export const lastName = {
  invalidLength: new BaseError(
    "/errors/lastName-invalid-length",
    "Invalid Last Name Length",
    "'last name' must be between 3 and 255 characters.",
  ),
  empty: new BaseError("/errors/lastName-empty", "Last Name is Empty", "'lastName' is required."),
};

export const email = {
  invalid: new BaseError("/errors/email-invalid", "Invalid Email", "Invalid email."),
  inUse: new BaseError(
    "/errors/email-in-use",
    "Email in use",
    "Email already in use. Please try another.",
  ),
  empty: new BaseError("/errors/email-empty", "Email is Empty", "'email' is required."),
};

export const age = {
  nonInteger: new BaseError(
    "/errors/age-non-integer",
    "Age Non Integer",
    "'age' must be an integer.",
  ),
  empty: new BaseError("/errors/age-empty", "Age is Empty", "'age' is required."),
};

export const weight = {
  nonFloat: new BaseError(
    "/errors/weight-non-float",
    "Weight Non Float",
    "'Weight' must be a float.",
  ),
  empty: new BaseError("/errors/weight-empty", "Weight is Empty", "'weight' is required."),
};

export const height = {
  nonFloat: new BaseError(
    "/errors/height-non-float",
    "Height Non Float",
    "'height' must be a float.",
  ),
  empty: new BaseError("/errors/height-empty", "Height is Empty", "'height' is required."),
};

export const originalname = {
  empty: new BaseError(
    "/errors/originalname-empty",
    "Original Name is Empty",
    "'originalname' is required.",
  ),
};

export const filename = {
  empty: new BaseError("/errors/filenameEmpty-empty", "Filename Empty", "'filename' is required."),
};

export const password = {
  invalidLength: new BaseError(
    "/errors/password-invalid-length",
    "Invalid Password Length",
    "Password must be between 6 and 50 characters.",
  ),
  empty: new BaseError("/errors/password-empty", "Password is Empty", "'password' is required."),
};
