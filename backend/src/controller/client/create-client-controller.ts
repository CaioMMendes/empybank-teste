import { Request, Response } from "express";

export const createClientController = (
  request: Request,
  response: Response
) => {
  return response.status(200).json({
    message: "Api funcionando",
  });
};
