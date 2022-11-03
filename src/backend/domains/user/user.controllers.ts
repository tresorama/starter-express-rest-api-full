import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/errors/ApiError";
import type { UserWithoutSensitive } from './user.types';
import { Store_User } from "./user.model";
import { hashPassword, comparePassword } from "./utilities/password";
import { generateAuthTokenJWT } from "./utilities/auth-token-JWT";
import { getUserWithoutSensitive } from "./utilities/get-user-without-sensitive";

type RegisterUserRequestBody = {
  username: string;
  password: string;
};
type RegisterUserResponseBody = {
  user: UserWithoutSensitive;
  token: ReturnType<typeof generateAuthTokenJWT>;
};
/**
 * Express Middleware Controller for Register User
 */
export const registerUser = async (
  req: Request<{}, {}, RegisterUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  // parse request data
  const { username, password } = req.body;

  // check if request data is valid
  if (!username) {
    return next(ApiError.badRequest("Username is required"));
  }
  if (!password) {
    return next(ApiError.badRequest("Password is required"));
  }

  // check that user does not exists
  const userExists = await Store_User.findOne({ where: { username } });
  if (userExists) {
    return next(ApiError.badRequest("User with this username already exists"));
  }

  // create a new User
  // create a new user password
  // persist the user
  const createdUser = await Store_User.createOne({
    username,
    password: hashPassword(password)
  });

  // check if user is successfully created
  if (!createdUser) {
    return next(ApiError.badRequest("Impossible to create the user."));
  }

  // build an authorization token for the user to use in future requests
  const token = generateAuthTokenJWT(
    { id: createdUser.id },
    { expiresIn: "30d" }
  );

  // return the user and the token
  res.json({
    user: getUserWithoutSensitive(createdUser),
    token
  } as RegisterUserResponseBody);
};

// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================

type LoginUserRequestBody = {
  username: string;
  password: string;
};
type LoginUserResponseBody = {
  user: UserWithoutSensitive;
  token: ReturnType<typeof generateAuthTokenJWT>;
};
/**
 * Express Middleware Controller for Login User
 */
export const loginUser = async (
  req: Request<{}, {}, LoginUserRequestBody>,
  res: Response,
  next: NextFunction
) => {
  // parse request data
  const { username, password } = req.body;

  // Check if request data is valid
  if (!username) {
    return next(ApiError.badRequest("Username is required"));
  }
  if (!password) {
    return next(ApiError.badRequest("Password is required"));
  }

  // Check that user exists
  const user = await Store_User.findOne({ where: { username } });
  if (typeof user === 'undefined') {
    return next(ApiError.badRequest("User with this username not exists exists."));
  }

  // Check if password matches
  const passwordMatches = comparePassword(password, user.password);
  if (!passwordMatches) {
    return next(ApiError.badRequest("Password does not matches."));
  }

  // build an authorization token for the user
  const token = generateAuthTokenJWT({ id: user.id }, { expiresIn: "30d" });

  // return the user and the token
  res.json({
    user: getUserWithoutSensitive(user),
    token
  } as LoginUserResponseBody);
};

// ==============================================================
// ==============================================================
// ==============================================================
// ==============================================================
type GetUserDataResponseBody = {
  user: UserWithoutSensitive;
};
export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // parse request data from request
  // some middleware should have populated the "req.user" object at this time
  const { id } = req.user ?? {};

  // Check if request data is valid
  if (!id) {
    return next(ApiError.badRequest("Id is required"));
  }

  // Check that user exists
  const user = await Store_User.findOne({ where: { id } });
  const userExists = !!user;
  if (!userExists) {
    return next(ApiError.badRequest("User with this id not exists."));
  }

  // return user to client
  res.json({
    user: getUserWithoutSensitive(user)
  } as GetUserDataResponseBody);
};
