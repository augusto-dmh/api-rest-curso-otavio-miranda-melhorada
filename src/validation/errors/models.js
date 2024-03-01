import BaseError from "./classes/BaseError";

export const nameLength = new BaseError(
  "/errors/name-invalid-length",
  "Invalid Name Length",
  "'name' must be between 3 and 255 characters.",
);

export const nameEmpty = new BaseError(
  "/errors/name-empty",
  "Name is Empty",
  "'name' is required.",
);

export const lastNameLength = new BaseError(
  "/errors/lastName-invalid-length",
  "Invalid Last Name Length",
  "'last name' must be between 3 and 255 characters.",
);

export const lastNameEmpty = new BaseError(
  "/errors/lastName-empty",
  "Last Name is Empty",
  "'lastName' is required.",
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

export const emailEmpty = new BaseError(
  "/errors/email-empty",
  "Email is Empty",
  "'email' is required.",
);

export const ageNonInteger = new BaseError(
  "/errors/age-non-integer",
  "Age Non Integer",
  "'age' must be an integer.",
);

export const ageEmpty = new BaseError(
  "/errors/age-empty",
  "Age is Empty",
  "'age' is required.",
);

export const weightNonFloat = new BaseError(
  "/errors/weight-non-float",
  "Weight Non Float",
  "'Weight' must be an float.",
);

export const weightEmpty = new BaseError(
  "/errors/weight-empty",
  "Weight is Empty",
  "'weight' is required.",
);

export const heightNonFloat = new BaseError(
  "/errors/height-non-float",
  "Height Non Float",
  "'height' must be an float.",
);

export const heightEmpty = new BaseError(
  "/errors/height-empty",
  "Height is Empty",
  "'height' is required.",
);

export const originalnameEmpty = new BaseError(
  "/errors/originalname-empty",
  "Originalname is Empty",
  "'originalname' is required.",
);

export const filenameEmpty = new BaseError(
  "/errors/filenameEmpty-empty",
  "Filename Empty",
  "'filename' is required.",
);

export const passwordLength = new BaseError(
  "/errors/password-invalid-length",
  "Invalid Password Length",
  "Password must be between 6 and 50 characters.",
);

export const passwordEmpty = new BaseError(
  "/errors/password-empty",
  "Password is Empty",
  "'password' is required.",
);
