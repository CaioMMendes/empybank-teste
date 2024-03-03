import { z } from "zod";

export const createAssistantBody = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-Z0-9]+$/, "Este campo só aceita letras e números"),

  email: z
    .string()
    .trim()
    .min(1, "Você precisa preencher este campo")
    .email("Digite um e-mail válido")
    .max(150, "Você ultrapassou o limite de 150 caracteres")
    .toLowerCase(),

  phone: z
    .string({ invalid_type_error: "O valor precisa ser uma string" })
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(9, "Você ultrapassou o limite de 9 caracteres")
    .transform((str) => str.replace(/\D/g, "")),
});
