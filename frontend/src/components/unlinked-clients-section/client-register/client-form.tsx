import {
  CreateClientDataResponse,
  NewClientResponse,
  createClient,
} from "@/fetch/client/create-client";
import useNumberOfUnlinkedClientsChangedStore from "@/stores/number-unlinked-changed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ClientDataType } from "../../assistant-clients-section/assistant-clients-section";
import { toastError, toastSuccess } from "../../toast";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../../ui/alert-dialog";
import {
  Input,
  InputContainer,
  InputLabel,
  InputLabelText,
} from "../../ui/input";
import { clientFormSchema } from "./types/client-form-schema";

type ClientFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type ClientFormData = z.infer<typeof clientFormSchema>;

type ErrorWithResponse = {
  response: {
    data: {
      message: string;
    };
  };
} & Error;

const ClientForm = ({ setIsModalOpen }: ClientFormProps) => {
  const abortControllerRef = useRef(new AbortController());
  const queryClient = useQueryClient();
  const { setNumberOfUnlinkedClientsChanged } =
    useNumberOfUnlinkedClientsChangedStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const { mutate, isPending } = useMutation<
    CreateClientDataResponse,
    ErrorWithResponse,
    ClientFormData
  >({
    mutationFn: (newClient) =>
      createClient(newClient, abortControllerRef.current.signal),
    onSuccess: (data) => handleSuccessResponse(data?.data),
    onError: handleErrorResponse,
  });

  const handleCancelClick = () => {
    setIsModalOpen(false);
    abortControllerRef.current.abort();
  };

  const onSubmit = async (data: ClientFormData) => {
    mutate(data);
  };

  function handleSuccessResponse(newClient: NewClientResponse) {
    setNumberOfUnlinkedClientsChanged(1);
    queryClient.setQueryData(
      ["getUnlinkedClients"],
      (oldUnlinkedClients: ClientDataType) => {
        const oldAssistantData = oldUnlinkedClients?.data?.client;

        if (newClient && oldAssistantData !== undefined) {
          const newData = [newClient, ...oldAssistantData];
          return {
            ...oldUnlinkedClients,
            data: { ...oldUnlinkedClients.data, client: newData },
          };
        }
        return oldUnlinkedClients;
      },
    );

    toastSuccess("Cliente cadastrado");
    reset();
  }

  function handleErrorResponse(error: ErrorWithResponse) {
    if (error?.name === "CanceledError") {
      return toastError("A requisição foi cancelada");
    }

    const errorMessage = error?.response?.data?.message;
    toastError(errorMessage || "Ocorreu um erro ao tentar cadastrar o cliente");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
      <InputContainer error={!!errors.code} errorMessage={errors.code?.message}>
        <InputLabel>
          <InputLabelText>Código do Cliente</InputLabelText>
          <Input
            autoFocus
            placeholder="Digite o código do cliente..."
            {...register("code")}
            error={!!errors.code}
          />
        </InputLabel>
      </InputContainer>

      <InputContainer error={!!errors.name} errorMessage={errors.name?.message}>
        <InputLabel>
          <InputLabelText>Nome do Cliente</InputLabelText>
          <Input
            placeholder="Digite o nome do cliente..."
            {...register("name")}
            error={!!errors.name}
          />
        </InputLabel>
      </InputContainer>

      <InputContainer
        error={!!errors.network}
        errorMessage={errors.network?.message}
      >
        <InputLabel>
          <InputLabelText>Rede</InputLabelText>
          <Input
            placeholder="Digite a rede do cliente..."
            {...register("network")}
            error={!!errors.network}
          />
        </InputLabel>
      </InputContainer>

      <AlertDialogFooter className="flex w-full items-center justify-end gap-6">
        <AlertDialogCancel type="button" onClick={handleCancelClick}>
          Cancelar
        </AlertDialogCancel>

        <AlertDialogAction type="submit" disabled={isPending}>
          Salvar
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};

export default ClientForm;
