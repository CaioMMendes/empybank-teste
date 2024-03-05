import { create } from "zustand";
import * as assistantManage from "./helpers/selected-assistant-manage";

type ClientTypes = {
  assistantId: string | null;
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
  linkSelectedAssistantClients: (clients: ClientTypes[]) => void;
  unlinkSelectedAssistantClients: (ids: string[]) => void;
};

const useSelectedAssistantStore = create<UseSelectedAssistantTypes>()(
  (set) => ({
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
    linkSelectedAssistantClients: (clients) => {
      set((state) => ({
        selectedAssistant: assistantManage.linkAssistantClient(
          state.selectedAssistant,
          clients,
        ),
      }));
    },
    unlinkSelectedAssistantClients: (ids) => {
      set((state) => ({
        selectedAssistant: assistantManage.unlinkAssistantClient(
          state.selectedAssistant,
          ids,
        ),
      }));
    },
  }),
);
export default useSelectedAssistantStore;
