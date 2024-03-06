import { z } from "zod";

export const assistantFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Você precisa preencher este campo")
    .max(200, "Você ultrapassou o limite de 200 caracteres")
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Este campo só aceita letras")
    .transform((str) => str.replace(/\s+/g, " ")),

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
    .max(15, "Você ultrapassou o limite de 15 caracteres")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Preencha todos os números")
    .transform((str) => str.replace(/\D/g, "")),
});
