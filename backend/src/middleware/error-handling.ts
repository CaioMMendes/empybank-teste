import { NextFunction, Request, Response } from "express";

interface Err extends Error {
  status?: string;
  statusCode?: number;
  isOperational?: boolean;
  code?: number;
}

const sendErrorDev = (error: Err, response: Response) => {
  error.statusCode = error.statusCode || 500;

  return response.status(error.statusCode).json({
    status: error.status,
    error: error,
    stack: error.stack,
    message: error.message,
  });
};
const sendErrorProd = (error: Err, response: Response) => {
  error.statusCode = error.statusCode || 500;

  return response.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error: error,
  });
};

export default function globalErrorHandler(
  error: Err,
  req: Request,
  response: Response,
  next: NextFunction
) {
  error.status = error.status || "error";
  error.statusCode = error.statusCode || 500;

  let errorResponse = { ...error, name: error.name, message: error.message };

  if (process.env.NODE_ENV === "production") {
    return sendErrorProd(errorResponse, response);
  }
  return sendErrorDev(error, response);
}
