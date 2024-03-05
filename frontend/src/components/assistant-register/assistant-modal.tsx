//Libs
import { Dispatch, ReactNode, SetStateAction } from "react";
import { PiPlusCircle } from "react-icons/pi";

//Components
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

type AssistantModalProps = {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AssistantModal = ({
  children,
  isModalOpen = false,
  setIsModalOpen,
}: AssistantModalProps) => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AlertDialog open={isModalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={"iconLarge"}
          onClick={handleOpenModal}
          name="add sales assistant"
        >
          <PiPlusCircle size={22} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cadastro de Assistente Comercial</AlertDialogTitle>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AssistantModal;
