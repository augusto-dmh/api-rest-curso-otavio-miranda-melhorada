import Base from "./classes/Base";

export const name = {
  invalidLength: new Base(
    "/errors/name-invalid-length",
    "Invalid Name Length",
    "'name' must be between 3 and 255 characters.",
  ),
  empty: new Base("/errors/name-empty", "Name is Empty", "'name' is required."),
};

export const lastName = {
  invalidLength: new Base(
    "/errors/lastName-invalid-length",
    "Invalid Last Name Length",
    "'last name' must be between 3 and 255 characters.",
  ),
  empty: new Base("/errors/lastName-empty", "Last Name is Empty", "'lastName' is required."),
};

export const email = {
  invalid: new Base("/errors/email-invalid", "Invalid Email", "Invalid email."),
  inUse: new Base(
    "/errors/email-in-use",
    "Email in use",
    "Email already in use. Please try another.",
  ),
  empty: new Base("/errors/email-empty", "Email is Empty", "'email' is required."),
};

export const age = {
  nonInteger: new Base("/errors/age-non-integer", "Age Non Integer", "'age' must be an integer."),
  empty: new Base("/errors/age-empty", "Age is Empty", "'age' is required."),
};

export const weight = {
  nonFloat: new Base("/errors/weight-non-float", "Weight Non Float", "'Weight' must be a float."),
  empty: new Base("/errors/weight-empty", "Weight is Empty", "'weight' is required."),
};

export const height = {
  nonFloat: new Base("/errors/height-non-float", "Height Non Float", "'height' must be a float."),
  empty: new Base("/errors/height-empty", "Height is Empty", "'height' is required."),
};

export const originalname = {
  empty: new Base(
    "/errors/originalname-empty",
    "Original Name is Empty",
    "'originalname' is required.",
  ),
};

export const filename = {
  empty: new Base("/errors/filenameEmpty-empty", "Filename Empty", "'filename' is required."),
};

export const password = {
  invalidLength: new Base(
    "/errors/password-invalid-length",
    "Invalid Password Length",
    "Password must be between 6 and 50 characters.",
  ),
  empty: new Base("/errors/password-empty", "Password is Empty", "'password' is required."),
};
