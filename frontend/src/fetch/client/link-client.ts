import fetchFunction from "../fetch-function";

/**
 *
 * @param assistantId id do assistente onde vão ser adicionados os clientes
 * @param clientsId array com os ids dos clientes que vão ser associados com o assistente
 * @returns
 */

export const linkClient = async (assistantId: string, clientsId: string[]) => {
  const response = await fetchFunction({
    url: `/client/link/${assistantId}`,
    type: "patch",
    body: clientsId,
  });

  //todo o metodo updatemany não retorna nada, se precisar retornar vai ter que fazer outra consulta
  return response;
};
