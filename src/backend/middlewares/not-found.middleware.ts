import type { RequestHandler } from "express";
import { ApiError } from "@/errors/ApiError";

/**
 * Express Middleware that trigger
 * an error indicating that the resource is not found
 * @param req Express Request
 * @param res Express Response
 * @param next Epress NextFunction
 */
export const notFound: RequestHandler = (req, res, next) => {
  // if code arrives here means
  // that no one has handled the request
  return next(ApiError.notFound());
};
