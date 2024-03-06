import { z } from "zod";

function removeConsecutiveSpaces(valor: string) {
  return valor.replace(/\s+/g, " ");
}

export const createClientBody = z.object({
  code: z
    .string({ invalid_type_error: "O valor precisa ser uma string" })
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(7, "Você ultrapassou o limite de 7 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "Este campo só aceita letras e números"),

  name: z
    .string()
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/)
    .transform((str) => str.replace(/\s+/g, " ")),

  network: z
    .string({ invalid_type_error: "O valor precisa ser uma string" })
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(5, "Você ultrapassou o limite de 5 caracteres")
    .regex(/^[0-9]+$/, "O valor precisa ser um número")
    .regex(/^(?!-)[0-9]*(?:\.[0-9]+)?$/, {
      message: "O valor precisa ser um número positivo",
    }),
});
