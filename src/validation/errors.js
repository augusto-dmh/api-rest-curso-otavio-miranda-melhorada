// Listed errors from Sequelize and controllers

const invalidName = "Name must be between 3 and 255 characters.";
const invalidLastName = "Last name must be between 3 and 255 characters.";
const invalidEmail = "Invalid email address.";
const emailInUse = "Email already in use.";
const ageNonInteger = "Age must be an integer.";
const heightNonFloat = "Height must be a floating point number.";
const originalnameIsRequired = "Originalname is required.";
const filenameIsRequired = "Filename is required."; // Corrected "Originalname is required." to "Filename is required."
const missingIdParameter = "Missing 'id' parameter.";
const alunoNotFound = "Aluno not found.";
const invalidAlunoid = "Invalid alunoId.";
const missingCredentials = "Missing credentials.";
const invalidCredentials = "Invalid credentials.";
const invalidPassword = "Invalid password.";
const userNotFound = "User not found.";
const passwordHashNotUpdatable = "The field passwordHash can't be updated.";

export {
  invalidName,
  invalidLastName,
  invalidEmail,
  emailInUse,
  ageNonInteger,
  heightNonFloat,
  originalnameIsRequired,
  filenameIsRequired,
  missingIdParameter,
  alunoNotFound,
  invalidAlunoid,
  missingCredentials,
  invalidCredentials,
  invalidPassword,
  userNotFound,
  passwordHashNotUpdatable,
};
