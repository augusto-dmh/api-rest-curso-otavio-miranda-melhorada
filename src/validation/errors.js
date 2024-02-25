// Listed errors from Sequelize and controllers

export const nameLength = "Name must be between 3 and 255 characters.";
export const lastNameLength = "Last name must be between 3 and 255 characters.";
export const emailValidity = "Invalid email address.";
export const emailInUse = "Email already in use.";
export const ageNonInteger = "Age must be an integer.";
export const heightNonFloat = "Height must be a floating point number.";
export const originalnameEmpty = "Originalname is required.";
export const filenameEmpty = "Filename is required."; // Corrected "Originalname is required." to "Filename is required."
export const missingId = "Missing 'id' parameter.";
export const alunoNotFound = "Aluno not found.";
export const alunoId = "aluno_id does not refer to any aluno's id.";
export const missingCredentials = "Missing credentials.";
export const invalidCredentials = "Invalid credentials.";
export const passwordLength = "Password must be between 6 and 50 characters.";
export const passwordsNotMatch = "Invalid password.";
export const userNotFound = "User not found.";
export const passwordHashUpdate = "The field passwordHash can't be updated.";
