import type { Request, Response, NextFunction } from "express";
import { omit } from "lodash";
import { ApiError } from "@/errors/ApiError";
import { Store_User } from "../user.model";
import { decodeAuthTokenJWT } from "../utilities/auth-token-JWT";

export const onlyAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // parse authorization header
    const { authorization } = req.headers;

    // check that Bearer Authorization is set
    if (!authorization || !authorization.startsWith("Bearer")) {
      throw new Error();
    }

    // check user
    const token = authorization.split(" ")[1];
    const { id } = decodeAuthTokenJWT(token) as { id: string; };
    const user = await Store_User.findOne({ where: { id } });
    if (!user) {
      throw new Error();
    }

    // inject user into request so next middleware can use it
    req.user = omit(user, "password");

    // go on in middleware chain
    next();
  } catch (error) {
    return next(ApiError.unauthorized());
  }
};
