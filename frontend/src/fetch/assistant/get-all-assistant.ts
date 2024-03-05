import { z } from "zod";
import fetchFunction from "../fetch-function";
import { assistantFormSchema } from "@/components/assistant-register/types/assistant-form-schema";

type AssistantFormData = z.infer<typeof assistantFormSchema>;

export type GetAllAssistantResponse = {
  id: string;
  createdAt: Date;
} & AssistantFormData;

export type GetAllDataResponse = {
  data: {
    assistant: GetAllAssistantResponse[];
  };
};

/**
 *
 * @returns Retorna todos os assistentes
 */

export const getAllAssistant = async () => {
  const response: GetAllDataResponse = await fetchFunction({
    url: `/assistant/get/`,
  });
  return response;
};
