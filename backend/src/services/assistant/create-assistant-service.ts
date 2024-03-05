import z from "zod";
import { createAssistantBody } from "../../types/assistant/create-assistant-type";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";

type CreateAssistantServiceTypes = z.infer<typeof createAssistantBody>;

export const createAssistantService = async ({
  name,
  email,
  phone,
}: CreateAssistantServiceTypes) => {
  try {
    const nameQuery = prisma.assistant.findFirst({
      where: {
        name,
      },
    });
    const emailQuery = prisma.assistant.findFirst({
      where: {
        email,
      },
    });
    const phoneQuery = prisma.assistant.findFirst({
      where: {
        phone,
      },
    });

    const [nameResult, emailResult, phoneResult] = await Promise.all([
      nameQuery,
      emailQuery,
      phoneQuery,
    ]);

    if (nameResult || emailResult || phoneResult) {
      return {
        status: "fail",
        statusCode: 409,
        message: `Os seguintes dados já estão registrados ${
          nameResult?.name ? nameResult.name : ""
        } ${emailResult?.email ? emailResult.email : ""} ${
          phoneResult?.phone ? phoneResult.phone : ""
        } `,
      };
    }

    const assistant = await prisma.assistant.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return {
      status: "success",
      message: "Assistente criado com sucesso",
      data: { assistant },
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Ocorreu um erro ao tentar criar o assistente", 400);
  }
};
