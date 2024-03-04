import { GenericAbortSignal } from "axios";
import fetchFunction from "../fetch-function";
import { z } from "zod";
import { assistantFormSchema } from "@/components/assistant-register/types/assistant-form-schema";
import { clientFormSchema } from "@/components/client-register/types/client-form-schema";

type AssistantFormData = z.infer<typeof assistantFormSchema>;
type ClientFormData = z.infer<typeof clientFormSchema>;

type ClientResponse = {
  id: string;
  createdAt: Date;
  assistantId: string;
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
