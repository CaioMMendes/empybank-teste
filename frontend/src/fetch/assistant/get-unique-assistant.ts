import { z } from "zod";
import { GenericAbortSignal } from "axios";
import fetchFunction from "../fetch-function";
import { assistantFormSchema } from "@/components/assistant-register/types/assistant-form-schema";
import { clientFormSchema } from "@/components/unlinked-clients-section/client-register/types/client-form-schema";

type AssistantFormData = z.infer<typeof assistantFormSchema>;
type ClientFormData = z.infer<typeof clientFormSchema>;

type ClientResponse = {
  id: string;
  createdAt: Date;
  assistantId: string | null;
} & ClientFormData;

export type GetUniqueAssistantResponse = {
  id: string;
  createdAt: Date;
  Client: ClientResponse[];
} & AssistantFormData;

export type GetUniqueDataResponse = {
  data: {
    assistant: GetUniqueAssistantResponse;
  };
};

/**
 *
 * @param assistantId Id do assistente
 * @param signal Signal para realizar o abort da requisição
 * @returns Retorna o assistente que contem esse id com seus clientes
 */

export const getUniqueAssistant = async (
  assistantId: string,
  signal: GenericAbortSignal,
) => {
  const response: GetUniqueDataResponse = await fetchFunction({
    url: `/assistant/get/${assistantId}`,
    signal,
  });
  return response;
};
