import fetchFunction from "../fetch-function";

/**
 *
 * @param clientsId array com os ids dos clientes que vão ser desassociados do atual assistente
 * @returns
 */

export const linkClient = async (clientsId: string[]) => {
  const response = await fetchFunction({
    url: `/client/unlink`,
    type: "patch",
    body: clientsId,
  });

  //todo o metodo updatemany não retorna nada, se precisar retornar vai ter que fazer outra consulta
  return response;
};
