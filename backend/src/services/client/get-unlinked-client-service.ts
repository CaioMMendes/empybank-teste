import { prisma } from "../../lib/prisma";

import AppError from "../../utils/appError";

export const getUnlinkedClientService = async () => {
  try {
    const client = await prisma.client.findMany({
      where: {
        assistantId: null,
      },
      orderBy: [
        {
          name: "asc",
        },
        {
          network: "asc",
        },
        {
          code: "asc",
        },
      ],
    });

    return {
      status: "success",
      message: "Clientes encontrados com sucesso",
      data: { client },
    };
  } catch (error) {
    throw new AppError(
      "Ocorreu um erro ao tentar encontrar os clientes sem associação",
      400
    );
  }
};
