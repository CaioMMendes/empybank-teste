import { z } from "zod";

export const createClientBody = z.object({
  code: z
    .string({ invalid_type_error: "O valor precisa ser uma string" })
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(15, "Você ultrapassou o limite de 15 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "Este campo só aceita letras e números"),

  name: z
    .string()
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-Z0-9]+$/, "Este campo só aceita letras e números"),

  network: z
    .string({ invalid_type_error: "O valor precisa ser uma string" })
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(10, "Você ultrapassou o limite de 10 caracteres")
    .regex(/^[0-9]+$/, "O valor precisa ser um número"),
});
