import type { StateCreator } from "zustand";

interface FinishGameStoreState {
  isOpenModalEnd: boolean;
}

interface FinishGameStoreActions {
  setIsOpenModalEnd: (isOpen: boolean) => void;
  toogleIsOpenModalEnd: () => void;
  reset: () => void;
}

export type FinishStoreSlice = FinishGameStoreState & FinishGameStoreActions;

const initialState: FinishGameStoreState = {
  isOpenModalEnd: false,
};

export const createFinishStoreSlice: StateCreator<FinishStoreSlice> = (set) => ({
  ...initialState,
  setIsOpenModalEnd: (isOpen) => set({ isOpenModalEnd: isOpen }),
  toogleIsOpenModalEnd: () => set((state) => ({ isOpenModalEnd: !state.isOpenModalEnd })),
  reset: () => set(initialState),
});
