import Base from "./classes/ApiError/Base";

export const validationError = new Base(
  "/errors/validation-error",
  400,
  "Validation Error",
  "One or more validation errors occurred.",
);

export const internalServerError = new Base(
  "/errors/internal-server-error",
  500,
  "Internal Server Error",
  "An unexpected error occurred. Please try again later.",
);

export const missingId = new Base(
  "/errors/id-param-missing",
  400,
  "Missing Id Parameter",
  "'id' parameter is missing.",
);

export const studentNotFound = new Base(
  "/errors/student-not-found",
  404,
  "Student Not Found",
  "Student not found.",
);

export const studentId = new Base(
  "/errors/studentId-invalid",
  400,
  "'studentId' Invalid",
  "'studentId' does not refer to any student's id.",
);

export const missingCredentials = new Base(
  "/errors/missing-credentials",
  400,
  "Missing Credentials",
  "'email' and 'password' are required.",
);

export const invalidCredentials = new Base(
  "/errors/invalid-credentials",
  401,
  "Invalid Credentials",
  "'email' or/and 'password' invalid.",
);

export const passwordsNotMatch = new Base(
  "/errors/passwords-not-match",
  400,
  "Passwords Not Match",
  "Invalid password.",
);

export const userNotFound = new Base(
  "/errors/user-not-found",
  404,
  "User Not Found",
  "User not found.",
);

export const invalidPhotoType = new Base(
  "/errors/photo-invalid-type",
  422,
  "Invalid File Type",
  "File must be of type PNG or JPG.",
);

export const invalidPhotoSize = new Base(
  "/errors/photo-invalid-size",
  422,
  "Invalid Photo Size",
  "The photo exceeds the limit size (2MB).",
);
