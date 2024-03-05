import { prisma } from "../../lib/prisma";

import AppError from "../../utils/appError";

type UnlinkClientServiceTypes = {
  clientIds: string[];
};

export const unlinkClientService = async ({
  clientIds,
}: UnlinkClientServiceTypes) => {
  try {
    const client = await prisma.client.updateMany({
      where: {
        id: {
          in: clientIds,
        },
      },
      data: {
        assistantId: null,
      },
    });

    return {
      status: "success",
      message: "Clientes desassociado com sucesso",
      data: { client },
    };
  } catch (error) {
    throw new AppError(
      "Ocorreu um erro ao tentar desassociar os clientes",
      400
    );
  }
};
