import Base from "./classes/Base";

export const validationError = new Base(
  "/errors/validation-error",
  "Validation Error",
  "One or more validation errors occurred.",
  400,
);

export const internalServerError = new Base(
  "/errors/internal-server-error",
  "Internal Server Error",
  "An unexpected error occurred. Please try again later.",
  500,
);

export const missingId = new Base(
  "/errors/id-param-missing",
  "Missing Id Parameter",
  "'id' parameter is missing.",
  400,
);

export const studentNotFound = new Base(
  "/errors/student-not-found",
  "Student Not Found",
  "Student not found.",
  404,
);

export const studentId = new Base(
  "/errors/studentId-invalid",
  "'studentId' Invalid",
  "'studentId' does not refer to any student's id.",
  400,
);

export const missingCredentials = new Base(
  "/errors/missing-credentials",
  "Missing Credentials",
  "'email' and 'password' are required.",
  400,
);

export const invalidCredentials = new Base(
  "/errors/invalid-credentials",
  "Invalid Credentials",
  "'email' or/and 'password' invalid.",
  401,
);

export const passwordsNotMatch = new Base(
  "/errors/passwords-not-match",
  "Passwords Not Match",
  "Invalid password.",
  400,
);

export const userNotFound = new Base(
  "/errors/user-not-found",
  "User Not Found",
  "User not found.",
  404,
);

export const invalidPhotoType = new Base(
  "/errors/photo-invalid-type",
  "Invalid File Type",
  "File must be of type PNG or JPG.",
  422,
);

export const invalidPhotoSize = new Base(
  "/errors/photo-invalid-size",
  "Invalid Photo Size",
  "The photo exceeds the limit size (2MB).",
  422,
);
