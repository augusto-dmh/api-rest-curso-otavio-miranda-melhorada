// only pure functions - handle the logic around send toasts outside.
import { z } from "zod";

export const isLengthValid = (value, min, max) => {
  const schema = z.string().min(min).max(max);
  return schema.safeParse(value).success;
};

export const isEmailValid = (email) => {
  const schema = z.string().email();
  return schema.safeParse(email).success;
};

export const isEmailUnique = (email, Model) =>
  !Model.findOne({ where: { email } });

export const isNumber = (value) => {
  const schema = z.number();
  return schema.safeParse(value).success;
};

export const isInteger = (value) => {
  const schema = z.number().int();
  return schema.safeParse(value).success;
};

export const isNotEmpty = (string) => {
  const schema = z.string().min(1);
  return schema.safeParse(string).success;
};
