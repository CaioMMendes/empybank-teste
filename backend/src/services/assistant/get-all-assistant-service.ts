import { prisma } from "../../lib/prisma";

import AppError from "../../utils/appError";

export const getAllAssistantService = async () => {
  try {
    const assistant = await prisma.assistant.findMany({
      where: {},
      orderBy: {
        name: "asc",
      },
    });
    return {
      status: "success",
      message: "Assistentes encontrados com sucesso",
      data: { assistant },
    };
  } catch (error) {
    console.log(error);
    throw new AppError(
      "Ocorreu um erro ao tentar procurar os assistentes",
      400
    );
  }
};
