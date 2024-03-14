import { v4 as uuidv4 } from "uuid";
import Base from "./classes/Base";

export const createValidationError = (fields) =>
  new Base(
    "/errors/validation-failed",
    "Fields Validation Failed",
    400,
    "One or more fields contain invalid values.",
    `The fields '${fields}' contain invalid values.`,
    uuidv4(),
  );

export const createUnexpectedError = (path) =>
  new Base(
    "/errors/server-unexpected-error",
    "Unexpected Error on Server",
    500,
    "An unexpected error occurred on the server. Please try again later.",
    `An unexpected error occurred on ${path} - related to database, external services etc.`,
    uuidv4(),
  );

export const createMissingAuthorization = (path) =>
  new Base(
    "/errors/authorization-failed",
    "Missing Authorization Header",
    401,
    "'authorization' header is required.",
    `'authorization' header is required to access resource from ${path}.`,
    uuidv4(),
  );

export const createInvalidAuthorization = (path) =>
  new Base(
    "/errors/authorization-failed",
    "Invalid Authorization Header",
    401,
    "'authorization' header is invalid.",
    `'authorization' header sent to ${path} is invalid due to incorrect format (!== Bearer [token]).`,
    uuidv4(),
  );

export const createInvalidToken = (path) =>
  new Base(
    "/errors/authorization-failed",
    "Invalid Access Token",
    401,
    "Access token is invalid. Please log in.",
    `The access token provided on headers sent to ${path} is or has (expired) become invalid.`,
    uuidv4(),
  );

export const createMissingId = (path) =>
  new Base(
    "/errors/id-param-missing",
    "Missing Id Parameter",
    400,
    "'id' parameter is required.",
    `'id' parameter is required on ${path}. It's missing`,
    uuidv4(),
  );

export const createStudentNotFound = (id, path) =>
  new Base(
    "/errors/student-not-found",
    "Student Not Found",
    404,
    "No Student has been found.",
    `Student ${id} has not been found on ${path}.`,
    uuidv4(),
  );

export const createMissingCredentials = (path) =>
  new Base(
    "/errors/login-credentials",
    "Missing Credentials",
    400,
    "'email' and 'password' are required fields.",
    `'email' and 'password' are required on ${path}. One or both of them are missing,`,
    uuidv4(),
  );

export const createInvalidCredentials = () =>
  new Base(
    "/errors/login-credentials",
    "Invalid Credentials",
    401,
    "'email' or/and 'password' invalid.",
    `'email' or/and 'password' are invalid. Provide valid credentials.`,
    uuidv4(),
  );

export const createPasswordsNotMatch = () =>
  new Base(
    "/errors/passwords-not-match",
    "Passwords Not Match",
    401,
    "Invalid password.",
    `An user with the provided email exists, but the password is wrong.`,
    uuidv4(),
  );

export const createUserNotFound = (id, path) =>
  new Base(
    "/errors/user-not-found",
    "User Not Found",
    404,
    "No user has been found.",
    `User ${id} has not been found on ${path}.`,
    uuidv4(),
  );

export const createInvalidPhotoType = (type) =>
  new Base(
    "/errors/photo-invalid-type",
    "Invalid File Type",
    422,
    "File type not supported. Chose either PNG or JPG.",
    `The file type ${type} is not supported. Only PNG or JPG format is accepted.`,
    uuidv4(),
  );

export const createInvalidPhotoSize = (path) =>
  new Base(
    "/errors/photo-invalid-size",
    "Invalid Photo Size",
    422,
    "The photo exceeds the limit size (2MB).",
    `The file size of ${path} ultrapasses 2MB. Please choose other image.`,
    uuidv4(),
  );
