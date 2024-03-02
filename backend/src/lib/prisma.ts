import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  //serve para mostrar as querys que o prisma fez no console
  //todo remover isso quando for fazer deploy
  log: ["query"],
});
