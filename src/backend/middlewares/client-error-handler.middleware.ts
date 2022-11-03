import type { ErrorRequestHandler } from "express";
import { IS_DEVELOPMENT } from "@/constants";

/**
 * Class used to instanciate an Error Object
 * that can be handled by "clientErrorHandler" express error middlaware
 */
export class ErrorForClient extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "ErrorForClient";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ErrorForClient.prototype);
  }
}

/**
 * Final Error Handler middleware,
 * Intended to be used as last error handler middleware of the chain, because internally never call "next()".
 *
 * It's responsibility is to send to client the error response.
 * Response to the client doesnot include sensitive info, like error, stack track ...
 *
 * @param err The Error object
 * @param req Express Request
 * @param res Exxpress Response
 * @param next Express NextFunction
 */
export const clientErrorHandler: ErrorRequestHandler = async (
  err: ErrorForClient | Error,
  req,
  res,
  next
) => {
  const logErrorStackTrace = () => {
    console.log("Error stack trace:");
    console.error(err);
  };
  const logResponseToClient = () => {
    console.log("What client receive:");
    console.log({
      status: exitStatusCode,
      message: exitMessage
    });
  };
  const sendResponseToClient = () => {
    // Respond accordingly to the "Accept" HTTP header of the request,
    // Usually this means:
    // «Respond with the same format of the request»
    res.format({
      json: function () {
        res.status(exitStatusCode);
        res.send({ message: exitMessage });
      },
      text: function () {
        res.status(exitStatusCode);
        res.send(exitMessage);
      },
      html: function () {
        res.status(exitStatusCode);
        res.send(`<p>${exitMessage}</p>`);
      }
    });
  };

  // Start
  console.log("clientErrorHandler invoked");

  // Build data to send back to client
  let exitStatusCode: number;
  let exitMessage: string;

  if (err instanceof ErrorForClient) {
    exitStatusCode = err.statusCode;
    exitMessage = err.message;
  } else {
    // err is instance of Error
    exitStatusCode = 500;
    exitMessage = "Server Error !";
  }

  // In develoopment only log the error trace
  if (IS_DEVELOPMENT) logErrorStackTrace();
  // In every env send response to client
  logResponseToClient();
  sendResponseToClient();
};
