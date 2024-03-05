import { NextFunction, Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

import { createAssistantBody } from "../../types/assistant/create-assistant-type";
import { createAssistantService } from "../../services/assistant/create-assistant-service";

export const createAssistantController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const body = createAssistantBody.safeParse(request.body);

    if (!body.success) {
      return next(new AppError(`${body.error}`, 400));
    }

    const { name, email, phone } = request.body;

    const assistantResponse = await createAssistantService({
      name,
      email,
      phone,
    });

    if (assistantResponse?.status !== "success") {
      return next(
        new AppError(
          assistantResponse?.message,
          assistantResponse?.statusCode || 400
        )
      );
    }

    return response.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Assistente criado com sucesso",
      data: { ...assistantResponse.data },
    });
  }
);
