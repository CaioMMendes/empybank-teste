import { useState } from "react";
import AssistantForm from "./assistant-form";
import AssistantModal from "./assistant-modal";

const AssistantRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <AssistantModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <AssistantForm setIsModalOpen={setIsModalOpen} />
    </AssistantModal>
  );
};

export default AssistantRegister;
