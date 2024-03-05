import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { createClientBody } from "../../types/client/create-client-type";
import AppError from "../../utils/appError";
import { createClientService } from "../../services/client/create-client-service";

export const createClientController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const body = createClientBody.safeParse(request.body);

    if (!body.success) {
      return next(new AppError(JSON.stringify(body.error), 400));
    }

    const { name, code, network } = request.body;

    const clientResponse = await createClientService({ name, code, network });

    return response.status(201).json({
      status: "success",
      statusCode: 201,
      message: clientResponse?.message || "Cliente criado com sucesso!",
      data: {
        ...clientResponse.data,
      },
    });
  }
);
