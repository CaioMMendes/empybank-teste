import { create } from "zustand";

type ClientTypes = {
  assistantId: string;
  code: string;
  createdAt: Date;
  id: string;
  name: string;
  network: string;
};

type SelectedAssistantTypes = {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  phone: string;
  Client: ClientTypes[];
};

type UseSelectedAssistantTypes = {
  selectedAssistant: SelectedAssistantTypes | null;
  setSelectedAssistant: (selectedAssistant: SelectedAssistantTypes) => void;
  removeSelectedAssistant: () => void;
  linkSelectedAssistantClients: () => void;
  unlinkSelectedAssistantClients: () => void;
};

const useSelectedAssistantStore = create<UseSelectedAssistantTypes>()(
  (set /* get */) => ({
    selectedAssistant: null,

    setSelectedAssistant: (selectedAssistant) => {
      set(() => ({
        selectedAssistant: {
          ...selectedAssistant,
          Client: [...selectedAssistant.Client],
        },
      }));
    },
    removeSelectedAssistant: () => {
      set(() => ({ selectedAssistant: null }));
    },
    linkSelectedAssistantClients: () => {},
    unlinkSelectedAssistantClients: () => {},
  }),
);
export default useSelectedAssistantStore;
