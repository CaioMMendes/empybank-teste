import { toastError } from "@/components/toast";

export type ErrorWithResponse = {
  response: {
    data: {
      message: string;
    };
  };
} & Error;

export function handleErrorResponse(
  error: ErrorWithResponse,
  defaultMessage: string = "Ocorreu um erro",
  callback?: () => void,
) {
  if (error?.name === "CanceledError") {
    return toastError("A requisição foi cancelada");
  }

  const errorMessage = error?.response?.data?.message;
  toastError(errorMessage || defaultMessage);
  callback && callback();
}
