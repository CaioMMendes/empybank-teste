import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  GenericAbortSignal,
} from "axios";

type TypeType = "post" | "get" | "patch" | "put" | "delete";

type fetchFunctionTypes<T> = {
  url: string;
  type?: TypeType;
  body?: T;
  options?: AxiosRequestConfig;
  signal?: GenericAbortSignal | undefined;
};

/**
 *
 * @param url Url da api
 * @param type tipo de requisição(get,patch,post,delete)
 * @param body Corpo da requisição
 * @param options Opções do axios
 * @param signal Parametro para abortar a request
 * @returns Retorna a resposta ou da um throw no erro
 */

const fetchFunction = async <T, R>({
  url = "",
  type = "get",
  body = undefined,
  options = undefined,
  signal = undefined,
}: fetchFunctionTypes<T>): Promise<R> => {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    if (type === "get" || type === "delete") {
      const response: AxiosResponse<R> = await axios[type](
        `${apiUrl}/api/v1${url}`,
        {
          signal,
          headers: {
            "content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
          ...options,
        },
      );
      return response.data;
    }

    const response: AxiosResponse<R> = await axios[type](
      `${apiUrl}/api/v1${url}`,
      body,
      {
        signal,
        headers: {
          "content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
        ...options,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchFunction;
