import mongoose from "mongoose";

import logger from "../logger/winston.logger.js";
import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
import { removeUnusedMulterImageFilesOnError } from "../utils/helpers.js";

// this middleware is responsible to catch the errors from any request handler wrapped inside the (asyncHandler)

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if error is an instance of na ApiError or not
  if (!(error instanceof ApiError)) {
    // if not
    // then create a new ApiError instance

    // assign an appropriate status code
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    // set  a message from native error instance or a custom one
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "developmen" ? { stack: error.stack } : {}),
  };
  logger.error(`${error.message}`);

  removeUnusedMulterImageFilesOnError(req);
  // send error response
  return res.status(error.statusCode).json(response);
};

export { errorHandler };
