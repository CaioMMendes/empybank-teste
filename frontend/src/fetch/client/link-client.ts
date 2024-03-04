import { GenericAbortSignal } from "axios";
import fetchFunction from "../fetch-function";

export type LinkClientDataResponse = {
  data: {
    client: {
      count: number;
    };
  };
};

/**
 *
 * @param assistantId id do assistente onde vão ser adicionados os clientes
 * @param clientsId array com os ids dos clientes que vão ser associados com o assistente
 * @param signal signal para abortar a requisição em caso de multiplas requests
 * @returns retorna o numero de clientes associados
 */

export const linkClient = async (
  assistantId: string,
  clientsId: string[],
  signal: GenericAbortSignal,
) => {
  const response: LinkClientDataResponse = await fetchFunction({
    url: `/client/link/${assistantId}`,
    type: "patch",
    body: [...clientsId],
    signal,
  });

  return response;
};
