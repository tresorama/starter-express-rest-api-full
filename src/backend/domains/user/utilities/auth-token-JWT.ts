import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "@/constants";

export const generateAuthTokenJWT = (
  payload: any,
  jwtSignOptions?: SignOptions
) => {
  return jwt.sign(payload, JWT_SECRET, jwtSignOptions);
};

export const decodeAuthTokenJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
