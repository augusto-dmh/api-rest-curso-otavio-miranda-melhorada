import ApiError from "./classes/ApiError";

export const missingId = new ApiError(
  "/errors/id-param-missing",
  400,
  "Missing Id Parameter",
  "'id' parameter is missing.",
);

export const alunoNotFound = new ApiError(
  "/errors/aluno-not-found",
  404,
  "Aluno Not Found",
  "Aluno not found.",
);

export const alunoId = new ApiError(
  "/errors/alunoId-invalid",
  400,
  "AlunoId Invalid",
  "'aluno_id' does not refer to any aluno's id.",
);

export const missingCredentialsError = new ApiError(
  "/errors/missing-credentials",
  400,
  "Missing Credentials",
  "'email' and 'password' are required.",
);

export const invalidCredentialsError = new ApiError(
  "/errors/invalid-credentials",
  400,
  "Invalid Credentials",
  "'email' or/and 'password' invalid",
);

export const passwordLengthError = new ApiError(
  "/errors/password-invalid-length",
  400,
  "Invalid Password Length",
  "Password must be between 6 and 50 characters.",
);

export const passwordsNotMatchError = new ApiError(
  "/errors/passwords-not-match",
  400,
  "Passwords Not Match",
  "Invalid password.",
);

export const userNotFoundError = new ApiError(
  "/errors/user-not-found",
  404,
  "User Not Found",
  "User not found.",
);

export const passwordHashUpdateError = new ApiError(
  "/errors/passwordHash-update-forbidden",
  403,
  "PasswordHash Update Forbidden",
  "The field passwordHash can't be updated.",
);
