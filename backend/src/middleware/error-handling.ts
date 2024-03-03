import { NextFunction, Request, Response } from "express";

interface Err extends Error {
  status?: string;
  statusCode?: number;
  isOperational?: boolean;
  code?: number;
}

// const handleValidationErrorDB = (error: Err) => {
//   const errors: string[] = Object.values(
//     error.errors as Record<string, { message: string }>
//   ).map((el: { message: string }) => {
//     return el.message;
//   });
//   const message = `Invalid input data. ${errors.join(". ")}`;
//   return new AppError(message, 400);
// };
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

// import { NextFunction, Request, Response } from "express";
// import AppError from "../utils/appError";
// interface Err extends Error {
//   status?: string;
//   statusCode?: number;
//   isOperational?: boolean;
//   path?: string;
//   value?: string;
//   keyValue?: {
//     name: string;
//   };
//   errmsg?: string;
//   code?: number;
//   errors?: any;
// }

// const handleCastErrorDB = (err: Err) => {
//   const message = `Invalid ${err.path}: ${err.value}`;
//   return new AppError(message, 400);
// };
// const handleDuplicatedFieldsErrorDB = (err: Err) => {
//   //como eu faria
//   const message = `Duplicate field value:${err.keyValue?.name}. Please use another value!`;
//   //   const message = `Duplicate field value:${value}. Please use another value!`;

//   return new AppError(message, 400);
// };
// const handleValidationErrorDB = (err: Err) => {
//   const errors: string[] = Object.values(
//     err.errors as Record<string, { message: string }>
//   ).map((el: { message: string }) => {
//     return el.message;
//   });
//   const message = `Invalid input data. ${errors.join(". ")}`;
//   return new AppError(message, 400);
// };
// const sendErrorDev = (err: Err, res: Response) => {
//   err.statusCode = err.statusCode || 500;

//   return res.status(err.statusCode).json({
//     status: err.status,
//     error: err,
//     stack: err.stack,
//     message: err.message,
//   });
// };
// const sendErrorProd = (err: Err, res: Response) => {
//   err.statusCode = err.statusCode || 500;

//   return res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     err: err,
//   });
// };

// export default function globalErrorHandler(
//   err: Err,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   err.status = err.status || "error";
//   err.statusCode = err.statusCode || 500;

//   let error = { ...err, name: err.name, message: err.message };

//   if (process.env.NODE_ENV === "development") {
//     return sendErrorDev(err, res);
//   } else if (process.env.NODE_ENV === "production") {
//     //cria outra variável porque não é uma boa prática sobrescrever coisas

//     // res.status(err.statusCode).json({
//     //   err: err,
//     //   error: error,
//     // });
//     if (error.name === "CastError") {
//       error = handleCastErrorDB(error);
//     }
//     if (error.code === 11000) {
//       error = handleDuplicatedFieldsErrorDB(error);
//     }
//     if (error.name === "ValidationError") {
//       error = handleValidationErrorDB(error);
//     }

//     return sendErrorProd(error, res);
//   }
//   return sendErrorProd(error, res);
// }
