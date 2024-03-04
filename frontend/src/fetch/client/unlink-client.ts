import { GenericAbortSignal } from "axios";
import fetchFunction from "../fetch-function";

export type UnlinkClientDataResponse = {
  data: {
    client: {
      count: number;
    };
  };
};

/**
 *
 * @param clientsId array com os ids dos clientes que vão ser desassociados do atual assistente
 * @param signal: GenericAbortSignal,
 * @returns retorna o numero de clientes que foram desvinculados do assistente
 */

export const unlinkClient = async (
  clientsId: string[],
  signal: GenericAbortSignal,
) => {
  const response: UnlinkClientDataResponse = await fetchFunction({
    url: `/client/unlink`,
    type: "patch",
    body: clientsId,
    signal,
  });

  return response;
};
