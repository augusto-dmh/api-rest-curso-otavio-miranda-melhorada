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

export const createUnexpectedError = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/server-unexpected-error",
    "Unexpected Error on Server",
    500,
    "An unexpected error occurred on the server. Please try again later.",
    `An unexpected error occurred on ${pathMatch[0]} - related to database, external services etc.`,
    uuidv4(),
  );
};

export const createMissingAuthorization = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/authorization-failed",
    "Missing Authorization Header",
    401,
    "'authorization' header is required.",
    `'authorization' header is required to access resource from ${pathMatch[0]}.`,
    uuidv4(),
  );
};

export const createInvalidAuthorizationFormat = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/authorization-failed",
    "Invalid Authorization Header Format",
    401,
    "'authorization' header format is invalid.",
    `'authorization' header sent to ${pathMatch[0]} is invalid due to incorrect format. Please provide it in "Bearer [Token]" format`,
    uuidv4(),
  );
};

export const createInvalidToken = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/authorization-failed",
    "Invalid Access Token",
    401,
    "The token is invalid.",
    `The access token provided in headers sent to ${pathMatch[0]} has been expired or tampered with.`,
    uuidv4(),
  );
};

export const createInvalidTokenDecodedPayload = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/authorization-failed",
    "Invalid Access Token Decoded Payload",
    401,
    "The token's decoded payload data is invalid",
    `The access token provided in headers sent to ${pathMatch[0]} has invalid data: the 'user' object decoded do not exists anymore.`,
    uuidv4(),
  );
};

export const createMissingId = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/id-param-missing",
    "Missing Id Parameter",
    400,
    "'id' parameter is required.",
    `'id' parameter is required on ${pathMatch[0]}. It's missing`,
    uuidv4(),
  );
};

export const createStudentNotFound = (id, path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/student-not-found",
    "Student Not Found",
    404,
    "No Student has been found.",
    `Student ${id} has not been found on ${pathMatch[0]}.`,
    uuidv4(),
  );
};

export const createMissingCredentials = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/login-credentials",
    "Missing Credentials",
    400,
    "'email' and 'password' are required fields.",
    `'email' and 'password' are required on ${pathMatch[0]}. One or both of them are missing,`,
    uuidv4(),
  );
};

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

export const createUserNotFound = (id, path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/user-not-found",
    "User Not Found",
    404,
    "No user has been found.",
    `User ${id} has not been found on ${pathMatch[0]}.`,
    uuidv4(),
  );
};

export const createInvalidPhotoType = () =>
  new Base(
    "/errors/photo-invalid-type",
    "Invalid File Type",
    422,
    "File type not supported. Chose either PNG or JPG.",
    `The file type is not supported. Only PNG or JPG format is accepted.`,
    uuidv4(),
  );

export const createInvalidPhotoSize = (path) => {
  const pathMatch = path.match(/src(.*)/) || path.match(/node_modules.*$/);
  return new Base(
    "/errors/photo-invalid-size",
    "Invalid Photo Size",
    422,
    "The photo exceeds the limit size (2MB).",
    `The file size of ${pathMatch[0]} ultrapasses 2MB. Please choose other image.`,
    uuidv4(),
  );
};
