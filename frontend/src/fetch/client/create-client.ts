import { GenericAbortSignal } from "axios";
import fetchFunction from "../fetch-function";
import { clientFormSchema } from "@/components/unlinked-clients-section/client-register/types/client-form-schema";
import { z } from "zod";

type ClientFormData = z.infer<typeof clientFormSchema>;

export type NewClientResponse = {
  id: string;
  createdAt: Date;
} & ClientFormData;

export type CreateClientDataResponse = {
  data: NewClientResponse;
};

/**
 *
 * @param newClient Objeto que contem os dados do cliente a ser criado
 * @param signal Signal para realizar o abort da requisição
 * @returns retorna o cliente criado
 */

export const createClient = async (
  newClient: ClientFormData,
  signal: GenericAbortSignal,
) => {
  const response: CreateClientDataResponse = await fetchFunction({
    url: "/client/create",
    type: "post",
    body: newClient,
    signal,
  });

  return response;
};
