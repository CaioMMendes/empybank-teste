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
    return toastError("A requisição foi cancelada.");
  }

  const errorMessage = error?.response?.data?.message;

  if (
    errorMessage.includes(
      "Os seguintes dados já estão registrados do assistente",
    )
  ) {
    errorMessage.includes("name:") &&
      toastError("Este nome já foi cadastrado.");
    errorMessage.includes("email:") &&
      toastError("Este e-mail já foi cadastrado.");
    errorMessage.includes("phone:") &&
      toastError("Este telefone já foi cadastrado.");
  } else {
    toastError(errorMessage || defaultMessage);
  }
  callback && callback();
}
