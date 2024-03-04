import fetchFunction from "../fetch-function";
import { GenericAbortSignal } from "axios";
import { assistantFormSchema } from "@/components/assistant-register/types/assistant-form-schema";
import { z } from "zod";

type AssistantFormData = z.infer<typeof assistantFormSchema>;

export type NewAssistantResponse = {
  id: string;
  createdAt: Date;
} & AssistantFormData;

export type DataResponse = {
  data: {
    assistant: NewAssistantResponse;
  };
};

/**
 *
 * @param newAssistant Objeto que contem os dados do assistente a ser criado
 * @param signal Signal para realizar o abort da requisição
 * @returns retorna o assistente criado
 */

export const createAssistant = async (
  newAssistant: AssistantFormData,
  signal: GenericAbortSignal,
) => {
  const response: DataResponse = await fetchFunction({
    url: "/assistant/create",
    type: "post",
    body: newAssistant,
    signal,
  });

  return response;
};
