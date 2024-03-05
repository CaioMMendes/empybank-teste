import { z } from "zod";
import { clientFormSchema } from "@/components/unlinked-clients-section/client-register/types/client-form-schema";

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
 * @returns Retorna um array contendo os ids clientes correspondentes aos índices
 */

export const getIdByIndex = (
  index: string[],
  clients: ClientsResponse[] | undefined,
) => {
  if (!clients) {
    return [];
  }

  const ids = new Set<string>();

  for (let i = 0; i < clients.length; i++) {
    if (index.includes(String(i))) {
      const client = clients[i];
      ids.add(client.id);
    }
  }

  return Array.from(ids);
};
