import Base from "./classes/Base";

export const validationError = new Base(
  400,
  "/errors/validation-error",
  "Validation Error",
  "One or more validation errors occurred.",
);

export const internalServerError = new Base(
  500,
  "/errors/internal-server-error",
  "Internal Server Error",
  "An unexpected error occurred. Please try again later.",
);

export const missingId = new Base(
  400,
  "/errors/id-param-missing",
  "Missing Id Parameter",
  "'id' parameter is required.",
);

export const studentNotFound = new Base(
  404,
  "/errors/student-not-found",
  "Student Not Found",
  "Student not found.",
);

export const studentId = new Base(
  "/errors/studentId-invalid",
  "'studentId' Invalid",
  "'studentId' does not refer to any student's id.",
  400,
);

export const missingCredentials = new Base(
  400,
  "/errors/missing-credentials",
  "Missing Credentials",
  "'email' and 'password' are required.",
);

export const invalidCredentials = new Base(
  401,
  "/errors/invalid-credentials",
  "Invalid Credentials",
  "'email' or/and 'password' invalid.",
);

export const passwordsNotMatch = new Base(
  400,
  "/errors/passwords-not-match",
  "Passwords Not Match",
  "Invalid password.",
);

export const userNotFound = new Base(
  404,
  "/errors/user-not-found",
  "User Not Found",
  "User not found.",
);

export const invalidPhotoType = new Base(
  422,
  "/errors/photo-invalid-type",
  "Invalid File Type",
  "File must be of type PNG or JPG.",
);

export const invalidPhotoSize = new Base(
  422,
  "/errors/photo-invalid-size",
  "Invalid Photo Size",
  "The photo exceeds the limit size (2MB).",
);
