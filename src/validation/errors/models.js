import BaseError from "./classes/BaseError";

export const nameLength = new BaseError(
  "/errors/name-invalid-length",
  "Invalid Name Length",
  "'name' must be between 3 and 255 characters.",
);

export const lastNameLength = new BaseError(
  "/errors/lastName-invalid-length",
  "Invalid Last Name Length",
  "'last name' must be between 3 and 255 characters.",
);

export const emailValidity = new BaseError(
  "/errors/email-invalid",
  "Invalid Email",
  "Invalid email.",
);

export const emailInUse = new BaseError(
  "/errors/email-in-use",
  "Email in use",
  "Email already in use. Please try another",
);

export const ageNonInteger = new BaseError(
  "/errors/age-non-integer",
  "Age Non Integer",
  "'age' must be an integer.",
);

export const weightNonFloat = new BaseError(
  "/errors/weight-non-float",
  "Weight Non Float",
  "'Weight' must be an float.",
);

export const heightNonFloat = new BaseError(
  "/errors/height-non-float",
  "Height Non Float",
  "'height' must be an float.",
);

export const originalnameEmpty = new BaseError(
  "/errors/originalname-empty",
  "Originalname Emtpy",
  "'originalname' is required.",
);

export const filenameEmpty = new BaseError(
  "/errors/filenameEmpty-empty",
  "Filename Emtpy",
  "'filename' is required.",
);

export const passwordLength = new BaseError(
  "/errors/password-invalid-length",
  "Invalid Password Length",
  "Password must be between 6 and 50 characters.",
);
