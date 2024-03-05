import z from "zod";
import { prisma } from "../../lib/prisma";

import AppError from "../../utils/appError";

import { createClientBody } from "./../../types/client/create-client-type";

type CreateClientServiceTypes = z.infer<typeof createClientBody>;

export const createClientService = async ({
  code,
  name,
  network,
}: CreateClientServiceTypes) => {
  const existClient = await prisma.client.findUnique({
    where: { code },
  });

  if (existClient) {
    throw new AppError("Já existe um cliente com esse código", 409);
  }

  try {
    const client = await prisma.client.create({
      data: {
        code,
        name,
        network,
      },
    });

    return {
      status: "success",
      message: "Cliente criado com sucesso",
      data: client,
    };
  } catch (error) {
    throw new AppError("Ocorreu um erro ao tentar criar o cliente", 400);
  }
};
