import { create } from "zustand";

type UseNumberOfLinkedClientsChangedTypes = {
  numberOfLinkedClientsChanged: number | null;
  setNumberOfLinkedClientsChanged: (number: number) => void;
  removeNumberOfLinkedClientsChanged: () => void;
};

const useNumberOfLinkedClientsChangedStore =
  create<UseNumberOfLinkedClientsChangedTypes>()((set) => ({
    numberOfLinkedClientsChanged: null,

    setNumberOfLinkedClientsChanged: (number) => {
      set(() => ({
        numberOfLinkedClientsChanged: number,
      }));
    },
    removeNumberOfLinkedClientsChanged: () => {
      set(() => ({
        numberOfLinkedClientsChanged: null,
      }));
    },
  }));

export default useNumberOfLinkedClientsChangedStore;
