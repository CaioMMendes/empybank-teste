import { prisma } from "../../lib/prisma";

import AppError from "../../utils/appError";

type linkClientServiceTypes = {
  clientIds: string[];
  assistantId: string;
};

export const linkClientService = async ({
  clientIds,
  assistantId,
}: linkClientServiceTypes) => {
  try {
    const client = await prisma.client.updateMany({
      where: {
        id: {
          in: clientIds,
        },
      },
      data: {
        assistantId,
      },
    });

    return {
      status: "success",
      message: "Clientes associados com sucesso",
      //todo updatemany não retorna os dados aparantemente
      data: { client },
    };
  } catch (error) {
    throw new AppError(
      "Ocorreu um erro ao tentar associar os clientes ao assistente",
      400
    );
  }
};
