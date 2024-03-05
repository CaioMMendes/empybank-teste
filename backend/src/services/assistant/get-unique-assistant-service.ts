import { prisma } from "../../lib/prisma";

import AppError from "../../utils/appError";

export const getUniqueAssistantService = async (id: string) => {
  try {
    const assistant = await prisma.assistant.findUnique({
      where: {
        id,
      },
      include: {
        Client: {
          orderBy: [{ name: "asc" }, { network: "asc" }, { code: "asc" }],
        },
      },
    });
    return {
      status: "success",
      message: "Assistente encontrado com sucesso",
      data: { assistant },
    };
  } catch (error) {
    console.log(error);
    throw new AppError("Ocorreu um erro ao tentar encontrar o assistente", 400);
  }
};
