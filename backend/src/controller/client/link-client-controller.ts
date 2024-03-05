import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

import { linkClientBody } from "../../types/client/link-client-type";
import { linkClientService } from "../../services/client/link-client-service";

export const linkClientController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    if (!id) {
      return new AppError(
        "Informe um id na url para que possa ser encontado o assistente",
        400
      );
    }

    const body = linkClientBody.safeParse(request.body);

    if (!body.success) {
      return next(new AppError(JSON.stringify(body.error), 400));
    }

    const clientIds = request.body;

    const clientResponse = await linkClientService({
      clientIds,
      assistantId: id,
    });

    return response.status(200).json({
      status: "success",
      statusCode: 200,
      message: clientResponse?.message || "Clientes associados com sucesso",
      data: { ...clientResponse?.data },
    });
  }
);
