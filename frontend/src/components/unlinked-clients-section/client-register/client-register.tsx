import { useState } from "react";

import ClientForm from "./client-form";
import ClientModal from "./client-modal";

const ClientRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ClientModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <ClientForm setIsModalOpen={setIsModalOpen} />
    </ClientModal>
  );
};

export default ClientRegister;
