import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

import { getAllAssistantService } from "../../services/assistant/get-all-assistant-service";

export const getAllAssistantController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const assistantResponse = await getAllAssistantService();

    if (assistantResponse?.status !== "success") {
      return next(
        new AppError(
          assistantResponse?.message ||
            "Ocorreu um erro ao tentar buscar os assistentes",
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
