import { Dispatch, SetStateAction } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Input, InputContainer, InputLabel, InputLabelText } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PhoneInput from "../assistant-register/phone-input";
import { assistantFormSchema } from "./types/assistant-form-schema";

type AssistantFormProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type AssistantFormData = z.infer<typeof assistantFormSchema>;

const AssistantForm = ({ setIsModalOpen }: AssistantFormProps) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AssistantFormData>({
    resolver: zodResolver(assistantFormSchema),
  });

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: AssistantFormData) => {
    console.log(data);
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
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
            render={({ field }) => (
              <PhoneInput error={!!errors.phone} onChange={field.onChange} />
            )}
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

export default AssistantForm;
