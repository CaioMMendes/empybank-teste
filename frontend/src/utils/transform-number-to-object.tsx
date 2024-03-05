/**
 *
 * @param number número de linhas a serem geradas
 * @returns retorna um objeto com o numero de linhas [index]:true
 */
export const transformNumberToObject = (number: number | null) => {
  if (!number) {
    return {};
  }
  let object = {};
  for (let index = 0; index < number; index++) {
    object = { ...object, [index]: true };
  }

  return object;
};
