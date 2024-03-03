import { z } from "zod";

export const createAssistantBody = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/),

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
    .min(11, "Preencha o telefone todo")
    .max(11, "Você ultrapassou o limite de 11 caracteres")
    .regex(/^\d{11}$/, "Preencha todos os números")
    .transform((str) => str.replace(/\D/g, "")),
});
