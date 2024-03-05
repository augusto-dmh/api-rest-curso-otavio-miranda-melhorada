import ApiError from "./classes/ApiError";

export const validationError = new ApiError(
  "/errors/validation-error",
  400,
  "Validation Error",
  "One or more validation errors occurred.",
);

export const internalServerError = new ApiError(
  "/errors/internal-server-error",
  500,
  "Internal Server Error",
  "An unexpected error occurred. Please try again later.",
);

export const missingId = new ApiError(
  "/errors/id-param-missing",
  400,
  "Missing Id Parameter",
  "'id' parameter is missing.",
);

export const studentNotFound = new ApiError(
  "/errors/student-not-found",
  404,
  "Student Not Found",
  "student not found.",
);

export const studentId = new ApiError(
  "/errors/studentId-invalid",
  400,
  "'studentId' Invalid",
  "'studentId' does not refer to any student's id.",
);

export const missingCredentials = new ApiError(
  "/errors/missing-credentials",
  400,
  "Missing Credentials",
  "'email' and 'password' are required.",
);

export const invalidCredentials = new ApiError(
  "/errors/invalid-credentials",
  400,
  "Invalid Credentials",
  "'email' or/and 'password' invalid",
);

export const passwordsNotMatch = new ApiError(
  "/errors/passwords-not-match",
  400,
  "Passwords Not Match",
  "Invalid password.",
);

export const userNotFound = new ApiError(
  "/errors/user-not-found",
  404,
  "User Not Found",
  "User not found.",
);

export const passwordHashAssigning = new ApiError(
  "/errors/passwordHash-assigning-forbidden",
  403,
  "PasswordHash Assigning Forbidden",
  "The field passwordHash can't be assigned.",
);

  415,
export const invalidPhotoType = new ApiError(
  "/errors/photo-invalid-type",
  "Invalid File Type",
  "File must be of type PNG or JPG",
);

export const invalidPhotoSize = new ApiError(
  "/errors/photo-invalid-size",
  422,
  "Invalid Photo Size",
  "The photo exceeds the limit size (2MB).",
);
