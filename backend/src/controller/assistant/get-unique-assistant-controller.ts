import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

import { getUniqueAssistantService } from "../../services/assistant/get-unique-assistant-service";

export const getUniqueAssistantController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    if (!id) {
      return new AppError(
        "Informe um id na url para que possa ser encontado o assistente",
        400
      );
    }

    const assistantResponse = await getUniqueAssistantService(id);

    if (assistantResponse?.status !== "success") {
      return next(
        new AppError(
          assistantResponse?.message ||
            "Ocorreu um erro ao tentar encontrar o assistente",
          400
        )
      );
    }

    return response.status(200).json({
      status: "success",
      statusCode: 200,
      message: assistantResponse?.message,
      data: { ...assistantResponse?.data },
    });
  }
);
