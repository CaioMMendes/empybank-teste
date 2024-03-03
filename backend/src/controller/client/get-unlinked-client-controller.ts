import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { getUnlinkedClientService } from "../../services/client/get-unlinked-client-service";
import AppError from "../../utils/appError";

export const getUnlinkedClientController = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const clientResponse = await getUnlinkedClientService();

    if (clientResponse?.status !== "success") {
      return next(
        new AppError(
          clientResponse?.message ||
            "Ocorreu um erro ao tentar encontrar o cliente",
          400
        )
      );
    }

    return response.status(200).json({
      status: "success",
      statusCode: 200,
      message: clientResponse?.message,
      data: { ...clientResponse?.data },
    });
  }
);
