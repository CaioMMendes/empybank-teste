import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "../ui/button";
import { PiPlusCircle } from "react-icons/pi";

type ClientModalProps = {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ClientModal = ({
  children,
  isModalOpen = false,
  setIsModalOpen,
}: ClientModalProps) => {
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <AlertDialog open={isModalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"default"}
          className="leading-none"
          onClick={handleOpenModal}
        >
          <PiPlusCircle size={18} />
          Adicionar cliente
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cadastro do Cliente</AlertDialogTitle>
        </AlertDialogHeader>

        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClientModal;
