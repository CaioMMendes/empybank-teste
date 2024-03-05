import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

import { unlinkClientBody } from "../../types/client/unlink-client-type";
import { unlinkClientService } from "../../services/client/unlink-client-service";

export const unlinkClientController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const body = unlinkClientBody.safeParse(request.body);

    if (!body.success) {
      return next(new AppError(JSON.stringify(body.error), 400));
    }

    const clientIds = request.body;

    const clientResponse = await unlinkClientService({
      clientIds,
    });

    return response.status(200).json({
      status: "success",
      statusCode: 200,
      message: clientResponse?.message || "Clientes desassociados com sucesso",
      data: { ...clientResponse?.data },
    });
  }
);
