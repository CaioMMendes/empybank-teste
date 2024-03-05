//Libs
import { Dispatch, SetStateAction, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//Functions
import {
  ErrorWithResponse,
  handleErrorResponse,
} from "@/fetch/handle-error-response";
import {
  DataResponse,
  NewAssistantResponse,
  createAssistant,
} from "@/fetch/assistant/create-assistant";

//Components
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Input, InputContainer, InputLabel, InputLabelText } from "../ui/input";
import PhoneInput from "../assistant-register/phone-input";
import { toastSuccess } from "../toast";

//Types
import { assistantFormSchema } from "./types/assistant-form-schema";
type AssistantType = {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  phone: string;
};
export type AssistantDataType = {
  status: string;
  message: string;
  data:
    | {
        assistant: AssistantType[];
      }
    | undefined;
};
type AssistantFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};
export type AssistantFormData = z.infer<typeof assistantFormSchema>;

const AssistantForm = ({ setIsModalOpen }: AssistantFormProps) => {
  const abortControllerRef = useRef(new AbortController());
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<
    DataResponse,
    ErrorWithResponse,
    AssistantFormData
  >({
    mutationFn: (newAssistant) =>
      createAssistant(newAssistant, abortControllerRef.current.signal),
    onSuccess: (data) => handleSuccessResponse(data?.data?.assistant),
    onError: (error) =>
      handleErrorResponse(
        error,
        "Ocorreu um erro ao tentar cadastrar o assistente",
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AssistantFormData>({
    resolver: zodResolver(assistantFormSchema),
  });

  const onSubmit = async (data: AssistantFormData) => {
    mutate(data);
  };

  function handleSuccessResponse(newAssistant: NewAssistantResponse) {
    toastSuccess("Assistente cadastrado");
    reset();
    setValue("phone", "");

    queryClient.setQueryData(
      ["getAllAssistant"],
      (oldAssistants: AssistantDataType) => {
        const oldAssistantData = oldAssistants?.data?.assistant;
        if (newAssistant && oldAssistantData !== undefined) {
          const newData = [newAssistant, ...oldAssistantData];
          newData.sort((a, b) => a.name.localeCompare(b.name));
          return {
            ...oldAssistants,
            data: { ...oldAssistants.data, assistant: newData },
          };
        }
        return oldAssistants;
      },
    );
  }

  const handleCancelClick = () => {
    setIsModalOpen(false);
    abortControllerRef.current.abort();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
      <InputContainer error={!!errors.name} errorMessage={errors.name?.message}>
        <InputLabel>
          <InputLabelText>Nome Completo</InputLabelText>
          <Input
            autoFocus
            placeholder="Digite o nome do assistente..."
            {...register("name")}
            error={!!errors.name}
          />
        </InputLabel>
      </InputContainer>

      <InputContainer
        error={!!errors.email}
        errorMessage={errors.email?.message}
      >
        <InputLabel>
          <InputLabelText>E-mail</InputLabelText>
          <Input
            placeholder="Digite o email do assistente..."
            {...register("email")}
            error={!!errors.email}
          />
        </InputLabel>
      </InputContainer>
      <InputContainer
        error={!!errors.phone}
        errorMessage={errors.phone?.message}
      >
        <InputLabel>
          <InputLabelText>Telefone</InputLabelText>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <PhoneInput
                error={!!errors.phone}
                name={name}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </InputLabel>
      </InputContainer>

      <AlertDialogFooter className="flex w-full items-center justify-end gap-6">
        <AlertDialogCancel type="button" onClick={handleCancelClick}>
          Cancelar
        </AlertDialogCancel>

        <AlertDialogAction disabled={isPending} type="submit">
          Salvar
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};

export default AssistantForm;
