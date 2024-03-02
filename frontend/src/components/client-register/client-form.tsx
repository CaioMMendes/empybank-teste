import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Input, InputContainer, InputLabel, InputLabelText } from "../ui/input";
import { clientFormSchema } from "./types/client-form-schema";

type ClientFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type ClientFormData = z.infer<typeof clientFormSchema>;

const ClientForm = ({ setIsModalOpen }: ClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
  });

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: ClientFormData) => {
    console.log(data);
    setIsModalOpen(false);
  };

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

        <AlertDialogAction type="submit">Salvar</AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};

export default ClientForm;
