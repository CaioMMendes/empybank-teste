import { create } from "zustand";

type UseNumberOfUnlinkedClientsChangedTypes = {
  numberOfUnlinkedClientsChanged: number | null;
  setNumberOfUnlinkedClientsChanged: (number: number) => void;
  removeNumberOfUnlinkedClientsChanged: () => void;
};

const useNumberOfUnlinkedClientsChangedStore =
  create<UseNumberOfUnlinkedClientsChangedTypes>()((set) => ({
    numberOfUnlinkedClientsChanged: null,

    setNumberOfUnlinkedClientsChanged: (number) => {
      set(() => ({
        numberOfUnlinkedClientsChanged: number,
      }));
    },
    removeNumberOfUnlinkedClientsChanged: () => {
      set(() => ({
        numberOfUnlinkedClientsChanged: null,
      }));
    },
  }));

export default useNumberOfUnlinkedClientsChangedStore;
