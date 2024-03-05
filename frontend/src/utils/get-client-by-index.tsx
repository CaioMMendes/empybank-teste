import { clientFormSchema } from "@/components/unlinked-clients-section/client-register/types/client-form-schema";
import { z } from "zod";

type ClientFormData = z.infer<typeof clientFormSchema>;

type ClientsResponse = {
  assistantId: string | null;
  id: string;
  createdAt: Date;
} & ClientFormData;

/**
 *
 * @param index Índices a serem encontrados no array
 * @param clients Array de clientes
 * @returns Retorna um array contendo os clientes correspondentes aos índices
 */

export const getClientByIndex = (
  index: string[],
  clients: ClientsResponse[] | undefined,
) => {
  if (!clients) {
    return [];
  }

  const clientsResponse = [];

  for (let i = 0; i < clients.length; i++) {
    if (index.includes(String(i))) {
      const client = clients[i];
      clientsResponse.push(client);
    }
  }

  return clientsResponse;
};
