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

export const heightNonInteger = new BaseError(
  "/errors/height-non-integer",
  "Height Non Integer",
  "'height' must be an integer.",
);

export const originalnameEmpty = new BaseError(
  "/errors/originalname-empty",
  "Originalname Emtpy",
  "'originalname' is required.",
);

export const filenameEmpty = new BaseError(
  "/errors/filenameEmpty-empty",
  "FilenameEmpty Emtpy",
  "'filename' is required.",
);
