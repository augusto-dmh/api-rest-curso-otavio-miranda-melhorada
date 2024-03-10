import BaseError from "./classes/BaseError";

export const validationError = new BaseError(
  "/errors/validation-error",
  400,
  "Validation Error",
  "One or more validation errors occurred.",
);

export const internalServerError = new BaseError(
  "/errors/internal-server-error",
  500,
  "Internal Server Error",
  "An unexpected error occurred. Please try again later.",
);

export const missingId = new BaseError(
  "/errors/id-param-missing",
  400,
  "Missing Id Parameter",
  "'id' parameter is missing.",
);

export const studentNotFound = new BaseError(
  "/errors/student-not-found",
  "Student not found.",
  "Student Not Found",
  404,
);

export const studentId = new BaseError(
  "/errors/studentId-invalid",
  400,
  "'studentId' Invalid",
  "'studentId' does not refer to any student's id.",
);

export const missingCredentials = new BaseError(
  "/errors/missing-credentials",
  400,
  "Missing Credentials",
  "'email' and 'password' are required.",
);

export const invalidCredentials = new BaseError(
  "/errors/invalid-credentials",
  401,
  "Invalid Credentials",
  "'email' or/and 'password' invalid.",
);

export const passwordsNotMatch = new BaseError(
  "/errors/passwords-not-match",
  400,
  "Passwords Not Match",
  "Invalid password.",
);

export const userNotFound = new BaseError(
  "/errors/user-not-found",
  404,
  "User Not Found",
  "User not found.",
);

export const invalidPhotoType = new BaseError(
  "/errors/photo-invalid-type",
  422,
  "Invalid File Type",
  "File must be of type PNG or JPG.",
);

export const invalidPhotoSize = new BaseError(
  "/errors/photo-invalid-size",
  422,
  "Invalid Photo Size",
  "The photo exceeds the limit size (2MB).",
);
